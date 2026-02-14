import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VentAI = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_KEY
  });

  async function getGemini(userText) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${userText} -> for this message generate a small response acting as a humble person and do not provide suggestion just answer like u are a person listening and answering`,
      maxOutputTokens: 256,
    });

    return response.text;
  }

  async function sendMessage() {
    if (!input.trim() || waiting) return;

    const userText = input;
    setMessages(prev => [...prev, { type: "user", text: userText }]);
    setInput("");
    setWaiting(true);

    try {
      const aiText = await getGemini(userText);
      setMessages(prev => [...prev, { type: "ai", text: aiText }]);
    } catch {
      setMessages(prev => [...prev, { type: "ai", text: "AI error." }]);
    }

    setWaiting(false);
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex flex-col">

      <div className="absolute top-4 right-40 z-20">
        <button
          onClick={() => navigate("/")}
          className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          
        </button>
      </div>

      <div className="h-[10vh] flex items-center justify-center border-b border-white/10 backdrop-blur-md">
        <h1 className="text-3xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Vent-AI
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 text-white scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[75%] p-4 rounded-2xl shadow-lg backdrop-blur-md ${
              m.type === "user"
                ? "ml-auto bg-gradient-to-br from-purple-700/30 to-purple-900/40 border border-purple-500/30"
                : "mr-auto bg-gradient-to-br from-zinc-700/40 to-zinc-900/40 border border-pink-500/20"
            }`}
          >
            <div className="text-xs uppercase tracking-wide text-zinc-400 mb-2">
              {m.type === "user" ? "You" : "AI"}
            </div>
            <div className="whitespace-pre-wrap leading-relaxed text-sm">
              {m.text}
            </div>
          </div>
        ))}

        {waiting && (
          <div className="text-sm text-zinc-400 italic animate-pulse">
            AI is thinking…
          </div>
        )}
      </div>

      <div className="h-[10vh] px-6 py-4 bg-zinc-900/80 backdrop-blur-md border-t border-white/10 flex gap-4">
        <textarea
          className="flex-1 bg-zinc-800/70 text-white placeholder-zinc-400 p-4 rounded-2xl resize-none outline-none focus:ring-2 focus:ring-purple-600 transition"
          placeholder={waiting ? "Waiting for AI…" : "Type what you feel…"}
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={waiting}
          rows={2}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={waiting || !input.trim()}
          className="px-8 rounded-2xl text-white font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 active:scale-95 transition disabled:opacity-40"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default VentAI;
