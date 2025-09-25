from supabase import create_client, Client
import requests
from dotenv import load_dotenv
import os
import threading
import speech_recognition as sr

# Load environment variables from .env
load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")  # Get API key from .env
BASE_URL = os.getenv("OPENROUTER_BASE_URL")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Map language names to their native scripts
LANGUAGE_MAP = {
    "auto": "English",
    "Telugu": "తెలుగు",
    "Malayalam": "മലയാളം",
    "English": "English",
    "Kannada": "ಕನ್ನಡ"
}

CONVERSATION_MEMORY = 5
conversation_history = []

def validate_language(language: str) -> str:
    language = language.strip()
    return LANGUAGE_MAP.get(language, "English")

# STT function
def transcribe_audio(audio_path: str) -> str:
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        audio_data = recognizer.record(source)
    try:
        text = recognizer.recognize_google(audio_data)
        return text
    except Exception as e:
        return f"[STT Error]: {str(e)}"

# Build messages with conversation memory
def build_messages(question: str, language: str) -> list:
    messages = []
    system_message = (
        f"You are an expert farming advisor. Answer in {language}. "
        "Give short, clear, and step-by-step answers. Use bullet points if possible. Avoid long paragraphs."
    )
    messages.append({"role": "system", "content": system_message})
    for qa in conversation_history[-CONVERSATION_MEMORY:]:
        messages.append({"role": "user", "content": qa['question']})
        messages.append({"role": "assistant", "content": qa['answer']})
    messages.append({"role": "user", "content": question})
    return messages

# Ask AI model
def ask_model(question: str, language: str = "auto") -> str:
    language = validate_language(language)
    messages = build_messages(question, language)
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

# Store conversation in Supabase
def store_conversation(user_question: str, ai_answer: str, language: str = "auto"):
    try:
        supabase.table("conversations").insert({
            "question": user_question,
            "answer": ai_answer,
            "language": language
        }).execute()
    except Exception as e:
        print(f"Could not store conversation: {str(e)}")

# Unified function: text or audio input
def generate_answer(question: str = None, language: str = "auto", audio_file: str = None) -> str:
    if audio_file:
        question = transcribe_audio(audio_file)
    answer = ask_model(question, language)
    conversation_history.append({"question": question, "answer": answer})
    threading.Thread(target=store_conversation, args=(question, answer, language), daemon=True).start()
    return answer

# CLI interface
if __name__ == "__main__":
    print("🌱 AI Farming Advisor (type 'exit' to quit)\n")
    while True:
        choice = input("Do you want to (1) Type or (2) Speak your question? Enter 1 or 2: ").strip()
        if choice.lower() in ["exit", "quit"]:
            print("Goodbye, farmer!")
            break

        if choice == "2":
            audio_path = input("Enter path to audio file (WAV format recommended): ").strip()
            answer = generate_answer(audio_file=audio_path)
        else:
            user_input = input("👨‍🌾 Your question (optionally 'question | language'): ").strip()
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