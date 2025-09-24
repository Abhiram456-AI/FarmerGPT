export interface AIRequest {
  question: string;
  language?: string; // optional language code like 'ml' for Malayalam, 'te' for Telugu, etc.
}

export interface AIResponse {
  answer: string;
}

export async function askAI(question: string, language: string = "en"): Promise<string> {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";
    const payload: AIRequest = {
      question,
      language,
    };

    const response = await fetch(`${backendUrl}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Backend returned error: ${response.status} - ${errorText}`);
      return "Sorry, could not get a response from the server.";
    }

    const data: AIResponse = await response.json();
    if (!data.answer) {
      console.warn("Backend returned no answer field. Returning default message.");
      return "Sorry, no answer available.";
    }

    return data.answer;
  } catch (err) {
    console.error("Error in askAI:", err);
    return "An error occurred while contacting the AI service.";
  }
}
