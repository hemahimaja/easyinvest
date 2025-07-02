const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Optional: homepage route to confirm backend is working
app.get('/', (req, res) => {
  res.send('🎉 EasyInvest Backend is Running!');
});

// Main ChatGPT route
app.post('/api/chat', async (req, res) => {
  const { message, language } = req.body;

  const prompt =
    language === 'telugu'
      ? `ఇన్వెస్ట్మెంట్ గురించి ఒక ప్రారంభించాలనుకునే వ్యక్తికి తెలుగులో సరళంగా సమాధానం ఇవ్వండి: ${message}`
      : `Explain to a beginner in simple English about investments: ${message}`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Error from OpenAI API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get response from ChatGPT' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ EasyInvest backend running on http://localhost:${PORT}`);
});
