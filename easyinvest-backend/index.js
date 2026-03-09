const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS setup (allow frontend from Netlify + local dev)
const allowedOrigins = [
  "http://localhost:3000", // local React
  "https://easyinvestbycai23.netlify.app/" // 🔁 replace with your actual Netlify URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("🎉 EasyInvest Backend is Running!");
});

// ✅ Chat route
app.post("/api/chat", async (req, res) => {
  const { message, language } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "⚠️ Missing OpenAI API Key in server" });
  }

  const prompt =
    language === "telugu"
      ? `ఇన్వెస్ట్మెంట్ గురించి ఒక ప్రారంభించాలనుకునే వ్యక్తికి తెలుగులో సరళంగా సమాధానం ఇవ్వండి: ${message}`
      : `Explain to a beginner in simple English about investments: ${message}`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("❌ Error from OpenAI API:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from ChatGPT" });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 EasyInvest backend running on http://localhost:${PORT}`);
});
