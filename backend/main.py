from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import asyncio

# Import your existing AI logic function and Supabase client
from AI import generate_answer, store_conversation  # Ensure AI.py has these functions

# Load environment variables
load_dotenv()

app = FastAPI(title="FarmAI Backend API")

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request and response models
class AIRequest(BaseModel):
    question: str
    language: str = "auto"  # Supports Tenglish, Telugu, Malayalam, Hindi, Kannada, or auto-detect

class AIResponse(BaseModel):
    answer: str

# Endpoint to check health
@app.get("/health")
async def health():
    return {"status": "ok"}

# Endpoint to ask AI
@app.post("/ask", response_model=AIResponse)
async def ask_ai(data: AIRequest):
    try:
        # Validate language parameter robustly (case-insensitive)
        valid_languages = {"auto", "tenglish", "telugu", "malayalam", "hindi", "kannada"}
        language_input = data.language.strip().lower() if data.language else "auto"
        language = language_input if language_input in valid_languages else "auto"

        # Generate answer
        answer = generate_answer(data.question, language)

        # Ensure answer is a non-empty string
        if not answer or not isinstance(answer, str) or answer.strip() == "":
            answer = "Sorry, I could not generate an answer. Please try again."

        # Store conversation in background with error handling
        async def store_bg():
            try:
                await store_conversation(data.question, answer, language)
            except Exception as supabase_err:
                # Log error instead of breaking endpoint
                print(f"Supabase store error: {supabase_err}")

        asyncio.create_task(store_bg())

        return AIResponse(answer=answer.strip())

    except Exception as e:
        # Log the exception to backend logs
        print(f"AI /ask endpoint error: {e}")
        raise HTTPException(status_code=500, detail=f"AI model error: {str(e)}")

# Root endpoint
@app.get("/")
async def root():
    return {"message": "FarmAI Backend is running"}