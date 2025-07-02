import React, { useState } from 'react';
import LearnBasics from './LearnBasics';
import SIPCalculator from './SIPCalculator';
import SuggestedPlans from './SuggestedPlans';
import OneTimeCalculator from './OneTimeCalculator';
import VoiceBot from './VoiceBot'; // ✅ Add this line


function App() {
  const [language, setLanguage] = useState('english');
  const [page, setPage] = useState('home');

  return (
    <div className="bg-gray-100 min-h-screen">
      {page === 'home' && (
        <div className="p-10 text-center">
          <h1 className="text-4xl font-bold mb-6 text-blue-700">
            📈 {language === 'telugu' ? 'ఈజీ ఇన్వెస్ట్‌కు స్వాగతం' : 'Welcome to EasyInvest'}
          </h1>

          {/* 🌐 Language Toggle */}
          <div className="mb-6">
            <button
              onClick={() => setLanguage('english')}
              className={`px-4 py-2 mr-2 rounded ${
                language === 'english' ? 'bg-blue-700 text-white' : 'bg-white border'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('telugu')}
              className={`px-4 py-2 rounded ${
                language === 'telugu' ? 'bg-blue-700 text-white' : 'bg-white border'
              }`}
            >
              తెలుగు
            </button>
          </div>

          {/* 🧭 Navigation */}
          <div className="space-y-4 max-w-md mx-auto">
            <button
              onClick={() => setPage('learn')}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              📘 {language === 'telugu' ? 'బేసిక్స్ నేర్చుకోండి' : 'Learn Basics'}
            </button>
            <button
              onClick={() => setPage('sip')}
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
            >
              🧮 {language === 'telugu' ? 'SIP కాలిక్యులేటర్' : 'SIP Calculator'}
            </button>
            <button
              onClick={() => setPage('oneTime')}
              className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
            >
              💰 {language === 'telugu' ? 'ఒక్కసారి పెట్టుబడి' : 'One-Time Calculator'}
            </button>
            <button
              onClick={() => setPage('suggested')}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              💼 {language === 'telugu' ? 'సిఫారసు చేసిన ప్రణాళికలు' : 'Suggested Plans'}
            </button>
            <button
              onClick={() => setPage('voice')}
              className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
            >
              🎤 {language === 'telugu' ? 'వాయిస్ బాట్' : 'Voice Chatbot'}
            </button>
          </div>
        </div>
      )}

      {page === 'learn' && <LearnBasics language={language} onBack={() => setPage('home')} />}
      {page === 'sip' && <SIPCalculator language={language} onBack={() => setPage('home')} />}
      {page === 'oneTime' && <OneTimeCalculator language={language} onBack={() => setPage('home')} />}
      {page === 'suggested' && <SuggestedPlans language={language} onBack={() => setPage('home')} />}
      {page === 'voice' && <VoiceBot language={language} onBack={() => setPage('home')} />}
    </div>
  );
}

export default App;

