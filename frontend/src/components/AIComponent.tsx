import { useState } from "react";
import { askAI } from "../services/api";

export default function AIComponent() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    try {
      const res = await askAI(question, "te"); // "te" for Telugu
      setAnswer(res);
    } catch (err) {
      console.error(err);
      setAnswer("Error fetching AI response");
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
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
      <div className="mt-4 text-gray-700">{answer}</div>
    </div>
  );
}
