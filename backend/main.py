from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import asyncio

from backend.AI import generate_answer, store_conversation

# Load environment variables
load_dotenv()

app = FastAPI(title="FarmerGPT Backend API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve React frontend build if it exists
frontend_build_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "frontend", "build")
if os.path.exists(frontend_build_dir):
    app.mount("/static", StaticFiles(directory=os.path.join(frontend_build_dir, "static")), name="static")

    @app.get("/", include_in_schema=False)
    async def serve_frontend():
        index_path = os.path.join(frontend_build_dir, "index.html")
        if os.path.exists(index_path):
            return FileResponse(index_path)
        else:
            return {"message": "Frontend build exists but index.html is missing."}
else:
    @app.get("/", include_in_schema=False)
    async def backend_only():
        return {"message": "FarmerGPT Backend is running"}

# Request and response models
class AIRequest(BaseModel):
    question: str
    language: str = "auto"  # Supports Tenglish, Telugu, Malayalam, Hindi, Kannada, or auto-detect

class AIResponse(BaseModel):
    answer: str

# Health endpoint
@app.get("/health")
async def health():
    return {"status": "ok"}

# AI query endpoint
@app.post("/ask", response_model=AIResponse)
async def ask_ai(data: AIRequest):
    try:
        # Validate language input
        valid_languages = {"auto", "tenglish", "telugu", "malayalam", "hindi", "kannada"}
        language_input = data.language.strip().lower() if data.language else "auto"
        language = language_input if language_input in valid_languages else "auto"

        # Generate AI answer
        answer = generate_answer(data.question, language)
        if not answer or not isinstance(answer, str) or answer.strip() == "":
            answer = "Sorry, I could not generate an answer. Please try again."

        # Store conversation asynchronously in the background
        async def store_bg():
            try:
                await store_conversation(data.question, answer, language)
            except Exception as supabase_err:
                print(f"Supabase store error: {supabase_err}")

        asyncio.create_task(store_bg())

        return AIResponse(answer=answer.strip())

    except Exception as e:
        print(f"AI /ask endpoint error: {e}")
        raise HTTPException(status_code=500, detail=f"AI model error: {str(e)}")