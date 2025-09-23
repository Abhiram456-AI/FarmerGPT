import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")  # Get API key from .env
BASE_URL = "https://openrouter.ai/api/v1/chat/completions"

def ask_model(question: str):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "z-ai/glm-4.5-air:free",
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are an expert farming advisor. "
                    "Give short, clear, and step-by-step answers. "
                    "Use bullet points if possible. Avoid long paragraphs."
                )
            },
            {"role": "user", "content": question}
        ]
    }
    response = requests.post(BASE_URL, headers=headers, json=payload)
    result = response.json()

    if "choices" in result:
        return result["choices"][0]["message"]["content"].strip()
    else:
        return f"❌ Error: {result}"

if __name__ == "__main__":
    print("🌱 AI Farming Advisor (type 'exit' to quit)\n")
    while True:
        user_q = input("👨‍🌾 Your question: ")
        if user_q.lower() in ["exit", "quit"]:
            print("👋 Goodbye, farmer!")
            break
        answer = ask_model(user_q)
        print("🤖 Answer:\n", answer, "\n")
