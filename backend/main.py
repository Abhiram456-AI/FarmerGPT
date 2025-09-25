from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
# Import your AI logic directly
from AI import generate_answer, store_conversation

app = FastAPI(title="FarmerGPT Backend API")

# Enable CORS so frontend can call backend API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class AIRequest(BaseModel):
    question: str
    language: str = "auto"

class AIResponse(BaseModel):
    answer: str

# Root endpoint to confirm backend is running
@app.get("/")
async def root():
    return {"message": "FarmerGPT Backend is running"}

# Health check
@app.get("/health")
async def health():
    return {"status": "ok"}

# AI query endpoint
@app.post("/ask", response_model=AIResponse)
async def ask_ai(data: AIRequest):
    try:
        # Sanitize language input
        valid_languages = {"auto", "tenglish", "telugu", "malayalam", "hindi", "kannada"}
        language_input = data.language.strip().lower() if data.language else "auto"
        language = language_input if language_input in valid_languages else "auto"

        # Call your AI function
        answer = generate_answer(data.question, language)
        if not answer or not isinstance(answer, str) or answer.strip() == "":
            answer = "Sorry, I could not generate an answer. Please try again."

        # Store conversation asynchronously
        async def store_bg():
            try:
                await store_conversation(data.question, answer, language)
            except Exception as e:
                print(f"Supabase store error: {e}")

        asyncio.create_task(store_bg())
        return AIResponse(answer=answer.strip())

    except Exception as e:
        print(f"AI /ask endpoint error: {e}")
        raise HTTPException(status_code=500, detail=f"AI model error: {str(e)}")