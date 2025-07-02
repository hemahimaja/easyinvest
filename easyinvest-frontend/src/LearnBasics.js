import React from 'react';

function LearnBasics({ language, onBack }) {
  const content = {
    english: {
      title: '📘 Learn Investment Basics',
      back: '⬅ Back to Home',
      sections: [
        {
          heading: 'Stock Market for Beginners',
          text: 'Learn how the stock market works, what stocks are, and how to start investing.',
          video: 'https://www.youtube.com/watch?v=bb6_M_srMBk',
        },
        {
          heading: 'What is a Mutual Fund?',
          text: 'A beginner-friendly explanation of how mutual funds work, and how they help grow your money.',
          video: 'https://www.youtube.com/watch?v=YQc7ydMul7Q',
        },
        {
          heading: 'SIP Explained (by Groww)',
          text: 'Learn how SIPs work, how to start one, and why they are powerful for wealth building.',
          video: 'https://www.youtube.com/watch?v=K2VGgsuHXBQ',
        },
      ],
      channelName: 'Groww',
      channelUrl: 'https://www.youtube.com/@Groww',
    },

    telugu: {
      title: '📘 పెట్టుబడి ప్రాథమికాలు',
      back: '⬅ హోమ్‌కు తిరుగు',
      sections: [
        {
          heading: 'మ్యూచువల్ ఫండ్స్ అంటే ఏమిటి?',
          text: 'మ్యూచువల్ ఫండ్ అనేది మన డబ్బును నిపుణులు వివిధ స్టాక్స్ లో పెట్టే విధానం.',
          video: 'https://youtu.be/Yt4SLOLpYBA?si=Sh8ztDNmcKHfU2xx',
        },
        {
          heading: 'SIP అంటే ఏమిటి?',
          text: 'SIP అంటే ప్రతి నెల కొంత మొత్తాన్ని మ్యూచువల్ ఫండ్ లో పెట్టుబడి పెట్టడం.',
          video: 'https://youtu.be/Gd8LXUn9E6U?si=rSst6T_9jDr2SJK7',
        },
        {
          heading: 'స్టాక్ మార్కెట్ బేసిక్స్',
          text: 'స్టాక్ మార్కెట్ అంటే ఏమిటి? ఎలా పని చేస్తుంది? మొదలైన విషయాలపై ప్రాథమిక అవగాహన.',
          video: 'https://youtu.be/nyrWxSueoKY?si=u9p1hBRkLMj8YhA3',
        },
      ],
      channelName: 'Day Trader Telugu',
      channelUrl: 'https://www.youtube.com/@DayTraderTelugu',
    },
  };

  const lang = content[language];

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 text-gray-800">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {lang.back}
      </button>

      <h1 className="text-3xl font-bold text-blue-700 mb-8">{lang.title}</h1>

      <div className="space-y-10">
        {lang.sections.map((section, idx) => (
          <div key={idx} className="border-l-4 border-blue-400 pl-4">
            <h2 className="text-xl font-semibold text-green-700 mb-2">{section.heading}</h2>
            <p className="text-base mb-2">{section.text}</p>
            <a
              href={section.video}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium hover:bg-blue-200 transition"
            >
              ▶️ {language === 'english' ? 'Watch Video' : 'వీడియో చూడండి'}
            </a>
          </div>
        ))}
      </div>

      {/* 🔗 Visit Channel */}
      <div className="mt-12 text-center">
        <a
          href={lang.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-purple-100 text-purple-700 px-6 py-3 rounded-full font-semibold text-lg hover:bg-purple-200 transition"
        >
          🔗 Visit {lang.channelName} Channel
        </a>
      </div>
    </div>
  );
}

export default LearnBasics;
