import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// 🌍 Auto-detect API base URL using environment
const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000" // Local backend during `npm start`
    : "https://easyinvest.onrender.com"; // Render backend for production

function VoiceBot({ language, onBack }) {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const recognitionRef = useRef(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);

  // 🔊 Speak text wrapped in useCallback (fixes warning)
  const speak = useCallback(
    (text) => {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = language === 'telugu' ? 'te-IN' : 'en-IN';
      window.speechSynthesis.speak(utter);
    },
    [language]
  );

  // ✅ Handle user input (text/voice)
  const handleInput = useCallback(
    async (userText) => {
      setChat((prev) => [...prev, { sender: 'user', text: userText }]);

      try {
        const res = await axios.post(`${API_BASE_URL}/api/chat`, {
          message: userText,
          language,
        });

        const botText = res.data.reply;
        setChat((prev) => [...prev, { sender: 'bot', text: botText }]);
        speak(botText);
      } catch (error) {
        console.error("Chatbot API Error:", error.message);
        const errorMsg =
          language === 'telugu'
            ? 'సర్వర్ నుండి సమాధానం అందించలేకపోయాం.'
            : 'Unable to get response from the server.';
        setChat((prev) => [...prev, { sender: 'bot', text: errorMsg }]);
      }

      setInput('');
    },
    [language, speak]
  );

  // 🎤 Voice recognition setup
  useEffect(() => {
    if (!SpeechRecognition) {
      setIsSpeechSupported(false);
      return;
    }

    const recog = new SpeechRecognition();
    recog.lang = language === 'telugu' ? 'te-IN' : 'en-IN';
    recog.continuous = false;
    recog.interimResults = false;

    recog.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      handleInput(transcript);
    };

    recognitionRef.current = recog;
  }, [language, handleInput]);

  const startListening = () => {
    if (!isSpeechSupported) {
      alert('Please use Google Chrome for voice input.');
      return;
    }
    recognitionRef.current.start();
  };

  const handleManualSubmit = () => {
    if (input.trim()) handleInput(input);
  };

  return (
    <div className="p-6 md:p-10 bg-white min-h-screen">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ⬅ {language === 'telugu' ? 'వెనక్కి' : 'Back to Home'}
      </button>

      <h1 className="text-3xl font-bold mb-4 text-blue-700">
        🎤 {language === 'telugu' ? 'వాయిస్ చాట్ బాట్' : 'Voice Chatbot'}
      </h1>

      {!isSpeechSupported && (
        <p className="text-red-600 mb-4">
          {language === 'telugu'
            ? 'ఈ బ్రౌజర్ వాయిస్ ఇన్‌పుట్‌ను మద్దతు ఇవ్వదు. దయచేసి గూగుల్ క్రోమ్ ఉపయోగించండి.'
            : 'Your browser does not support voice input. Please use Google Chrome.'}
        </p>
      )}

      <div className="bg-gray-100 p-4 rounded max-h-[400px] overflow-y-auto mb-4">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 p-2 rounded ${
              msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-green-100 text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          placeholder={language === 'telugu' ? 'మీ ప్రశ్నను టైప్ చేయండి...' : 'Type your question...'}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleManualSubmit}
          className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
        >
          {language === 'telugu' ? 'పంపించండి' : 'Send'}
        </button>
        <button
          onClick={startListening}
          className="bg-purple-600 text-white px-4 rounded hover:bg-purple-700"
        >
          🎙
        </button>
      </div>
    </div>
  );
}

export default VoiceBot;
