const express = require("express");
const router = express.Router();

async function queryHF(prompt) {
  const response = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-base", {

    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.HF_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: prompt })
  });

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    console.error("HF Raw Response:", text);
    throw new Error("Hugging Face returned non-JSON response.");
  }
}

// Advice route
router.post("/advice", async (req, res) => {
  try {
    const { userInput } = req.body;
    const prompt = `The user is seeking advice. Respond in a warm, supportive way:\n\nUser: ${userInput}\nAI:`;

    const data = await queryHF(prompt);

    res.json({ reply: data[0]?.generated_text || data[0]?.generated_texts || "⚠️ No reply generated" });
  } catch (err) {
    console.error("AI Advice Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
