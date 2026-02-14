const axios = require("axios");

const API_URL =
  "https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-roberta-base-sentiment";

const labelMap = {
  LABEL_0: "negative",
  LABEL_1: "neutral",
  LABEL_2: "positive",
};

async function analyzeSentiment(text) {
  try {
    const response = await axios.post(
      API_URL,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 20000,
      }
    );

    const prediction = response.data[0][0];

    return {
      label: labelMap[prediction.label],
      confidence: prediction.score,
    };
  } catch (err) {
    console.error("Sentiment error:", err.response?.data || err.message);

    return {
      label: "neutral",
      confidence: 0,
    };
  }
}

module.exports = analyzeSentiment;
