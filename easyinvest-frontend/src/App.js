import React, { useState } from 'react';
import LearnBasics from './LearnBasics';
import SIPCalculator from './SIPCalculator';
import SuggestedPlans from './SuggestedPlans';
import OneTimeCalculator from './OneTimeCalculator';
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [language, setLanguage] = useState('english');
  const [page, setPage] = useState('home');

  // Button stagger animation
  const buttonContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const buttonItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Overlay */}
      <div className="min-h-screen bg-white bg-opacity-80">

        <AnimatePresence mode="wait">

          {/* ================= HOME PAGE ================= */}
          {page === 'home' && (
            <motion.div
              key="home"
              className="p-10 text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
            >
              {/* Title */}
              <motion.h1
                className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-700"
                initial={{ opacity: 0, y: -30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                {language === 'telugu'
                  ? 'ఈజీ ఇన్వెస్ట్‌కు స్వాగతం'
                  : 'Welcome to EasyInvest'}
              </motion.h1>

              {/* Underline */}
              <motion.div
                className="h-1 w-24 bg-blue-600 mx-auto mb-6 rounded"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              />

              {/* Subtitle */}
              <motion.p
                className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {language === 'telugu'
                  ? 'పెట్టుబడులను సులభంగా నేర్చుకుని మీ భవిష్యత్తును సురక్షితంగా నిర్మించుకోండి'
                  : 'Learn investments in a simple way and build a secure financial future'}
              </motion.p>

              {/* Language Toggle */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <button
                  onClick={() => setLanguage('english')}
                  className={`px-4 py-2 mr-2 rounded-lg ${
                    language === 'english'
                      ? 'bg-blue-700 text-white'
                      : 'bg-white border'
                  }`}
                >
                  English
                </button>

                <button
                  onClick={() => setLanguage('telugu')}
                  className={`px-4 py-2 rounded-lg ${
                    language === 'telugu'
                      ? 'bg-blue-700 text-white'
                      : 'bg-white border'
                  }`}
                >
                  తెలుగు
                </button>
              </motion.div>

              {/* Buttons */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto"
                variants={buttonContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.button
                  variants={buttonItem}
                  onClick={() => setPage('learn')}
                  className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold shadow-md"
                >
                  📘 {language === 'telugu' ? 'బేసిక్స్ నేర్చుకోండి' : 'Learn Basics'}
                </motion.button>

                <motion.button
                  variants={buttonItem}
                  onClick={() => setPage('sip')}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl text-lg font-semibold shadow-md"
                >
                  🧮 {language === 'telugu' ? 'SIP కాలిక్యులేటర్' : 'SIP Calculator'}
                </motion.button>

                <motion.button
                  variants={buttonItem}
                  onClick={() => setPage('oneTime')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-xl text-lg font-semibold shadow-md"
                >
                  💰 {language === 'telugu' ? 'ఒక్కసారి పెట్టుబడి' : 'One-Time Calculator'}
                </motion.button>

                <motion.button
                  variants={buttonItem}
                  onClick={() => setPage('suggested')}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold shadow-md"
                >
                  💼 {language === 'telugu' ? 'సిఫారసు చేసిన ప్రణాళికలు' : 'Suggested Plans'}
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* ================= OTHER PAGES ================= */}
          {page === 'learn' && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5 }}
            >
              <LearnBasics language={language} onBack={() => setPage('home')} />
            </motion.div>
          )}

          {page === 'sip' && (
            <motion.div
              key="sip"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5 }}
            >
              <SIPCalculator language={language} onBack={() => setPage('home')} />
            </motion.div>
          )}

          {page === 'oneTime' && (
            <motion.div
              key="oneTime"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5 }}
            >
              <OneTimeCalculator language={language} onBack={() => setPage('home')} />
            </motion.div>
          )}

          {page === 'suggested' && (
            <motion.div
              key="suggested"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5 }}
            >
              <SuggestedPlans language={language} onBack={() => setPage('home')} />
            </motion.div>
          )}

        </AnimatePresence>

        {/* ================= FOOTER ================= */}
       <motion.footer
  className="mt-20 py-6 bg-black bg-opacity-70 text-center"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.2 }}
>
  <p className="text-white text-lg font-medium tracking-wide">
    {language === 'telugu'
      ? '“ముందుగా నేర్చుకోండి. వివేకంగా నిర్ణయించండి. బాధ్యతాయుతంగా పెట్టుబడి పెట్టండి.”'
      : '“Learn first. Decide wisely. Invest responsibly.”'}
  </p>
</motion.footer>


      </div>
    </div>
  );
}

export default App;
