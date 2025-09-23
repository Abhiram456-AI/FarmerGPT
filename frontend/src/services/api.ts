export interface AIRequest {
  question: string;
  language?: string; // optional language code like 'ml' for Malayalam, 'te' for Telugu, etc.
}

export interface AIResponse {
  answer: string;
}

export async function askAI(question: string, language: string = "te"): Promise<string> {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";
  const response = await fetch(`${backendUrl}/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question, language } as AIRequest),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  const data: AIResponse = await response.json();
  return data.answer;
}
