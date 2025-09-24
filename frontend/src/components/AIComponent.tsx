import { useState } from "react";
import { askAI } from "../services/api";

export default function AIComponent() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("te");

  const handleAsk = async () => {
    if (!question.trim()) {
      setAnswer("Please enter a question.");
      return;
    }
    setLoading(true);
    setAnswer(""); // Clear previous answer
    try {
      const res = await askAI(question, language);
      setAnswer(res || "No response from AI. Please try again.");
    } catch (err) {
      console.error(err);
      setAnswer("Error fetching AI response. Check backend is running.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      >
        <option value="te">Telugu</option>
        <option value="ml">Malayalam</option>
        <option value="en">English</option>
      </select>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask AI..."
        className="border p-2 rounded w-full mb-2"
      />
      <button
        onClick={handleAsk}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask"}
      </button>
      <div className="mt-4 text-gray-700 whitespace-pre-line">{answer}</div>
    </div>
  );
}
