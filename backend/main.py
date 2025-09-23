from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv

# Import your existing AI logic function
from AI import run_ai_cli  # Updated to match the patched AI.py function

# Load environment variables
load_dotenv()

app = FastAPI(title="FarmAI Backend API")

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend URL if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request and response models
class AIRequest(BaseModel):
    question: str
    language: str = "auto"  # default language, can be Tenglish, Telugu, Malayalam, etc.

class AIResponse(BaseModel):
    answer: str

# Function to call your AI logic
def ask_model(question: str, language: str) -> str:
    return run_ai_cli(question, language)

# Health check
@app.get("/health")
async def health():
    return {"status": "ok"}

# AI endpoint
@app.post("/ask", response_model=AIResponse)
async def ask_ai(data: AIRequest):
    try:
        answer = ask_model(data.question, data.language)
        return AIResponse(answer=answer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Root endpoint
@app.get("/")
async def root():
    return {"message": "FarmAI Backend is running"}