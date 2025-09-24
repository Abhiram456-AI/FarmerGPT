from supabase import create_client, Client
import requests
from dotenv import load_dotenv
import os
import threading

# Load environment variables from .env
load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")  # Get API key from .env
BASE_URL = os.getenv("OPENROUTER_BASE_URL")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

SUPPORTED_LANGUAGES = ["auto", "Telugu", "Malayalam", "English", "Kannada"]

# How many past Q&As to remember
CONVERSATION_MEMORY = 5

def validate_language(language: str) -> str:
    language = language.strip()
    if language not in SUPPORTED_LANGUAGES:
        return "auto"
    return language

def ask_model(question: str, language: str = "auto") -> str:
    """
    Ask the AI model a question and get a response.
    language: 'auto' (default), 'Telugu', 'Malayalam', 'English', 'Kannada', etc.
    """
    language = validate_language(language)
    system_message = (
        f"You are an expert farming advisor. Answer in {language}. "
        "Give short, clear, and step-by-step answers. "
        "Use bullet points if possible. Avoid long paragraphs."
    )

    # Build messages list with system message first and current user question
    messages = [{"role": "system", "content": system_message}]
    messages.append({"role": "user", "content": question})

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "z-ai/glm-4.5-air:free",
        "messages": messages
    }
    try:
        response = requests.post(BASE_URL, headers=headers, json=payload, timeout=30)
        response.raise_for_status()
        result = response.json()
        if "choices" in result and len(result["choices"]) > 0:
            return result["choices"][0]["message"]["content"].strip()
        else:
            return f"Error: {result}"
    except Exception as e:
        return f"Exception: {str(e)}"

# Function to be used by FastAPI
def generate_answer(question: str, language: str = "auto") -> str:
    answer = ask_model(question, language)
    # Store conversation asynchronously
    threading.Thread(target=store_conversation, args=(question, answer, language), daemon=True).start()
    return answer

# The 'conversations' table must be created manually in Supabase before storing conversations.
# Store conversation in Supabase
def store_conversation(user_question: str, ai_answer: str, language: str = "auto"):
    """
    Store each Q&A in Supabase table 'conversations'.
    Table columns: id (serial), question (text), answer (text), language (text), created_at (timestamp)
    """
    try:
        supabase.table("conversations").insert({
            "question": user_question,
            "answer": ai_answer,
            "language": language
        }).execute()
    except Exception as e:
        print(f"Could not store conversation: {str(e)}")

if __name__ == "__main__":
    print("🌱 AI Farming Advisor (type 'exit' to quit)\n")
    while True:
        user_input = input("👨‍🌾 Your question (optionally 'question | language'): ")
        if user_input.lower() in ["exit", "quit"]:
            print("Goodbye, farmer!")
            break
        if '|' in user_input:
            question_part, language_part = user_input.split('|', 1)
            question = question_part.strip()
            language = validate_language(language_part.strip())
        else:
            question = user_input
            language = "auto"
        answer = generate_answer(question, language)
        print("Answer:\n", answer, "\n")
