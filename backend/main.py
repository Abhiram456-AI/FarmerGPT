import requests

API_KEY = "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"
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
