import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function OneTimeCalculator({ language, onBack }) {
  const [investment, setInvestment] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState(null);
  const [graphData, setGraphData] = useState([]);

  const lang = {
    english: {
      title: '💰 One-Time Investment Calculator',
      back: '⬅ Back to Home',
      invest: 'Investment Amount (₹)',
      return: 'Expected Annual Return (%)',
      duration: 'Investment Duration (Years)',
      calculate: 'Calculate',
      maturity: 'Maturity Value',
      profit: 'Estimated Returns',
      chartTitle: 'Investment Growth Over Time',
    },
    telugu: {
      title: '💰 ఒక్కసారి పెట్టుబడి కాలిక్యులేటర్',
      back: '⬅ హోమ్‌కు తిరుగు',
      invest: 'పెట్టుబడి మొత్తం (₹)',
      return: 'అంచనా వార్షిక రాబడి (%)',
      duration: 'పెట్టుబడి వ్యవధి (సంవత్సరాలు)',
      calculate: 'లెక్కించు',
      maturity: 'ముళ్లధన విలువ',
      profit: 'అంచనా లాభం',
      chartTitle: 'కాలానుగుణంగా పెరుగుతున్న పెట్టుబడి',
    },
  }[language];

  const calculate = () => {
    const P = parseFloat(investment);
    const r = parseFloat(rate) / 100;
    const n = parseFloat(years);

    if (!P || !r || !n) return;

    const maturityValue = P * Math.pow(1 + r, n);
    const returns = maturityValue - P;

    setResult({
      maturityValue: maturityValue.toFixed(0),
      returns: returns.toFixed(0),
    });

    // Prepare graph data
    const data = [];
    for (let i = 1; i <= n; i++) {
      const yearValue = P * Math.pow(1 + r, i);
      data.push({ year: i, value: parseFloat(yearValue.toFixed(0)) });
    }

    setGraphData(data);
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 text-gray-800">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {lang.back}
      </button>

      <h1 className="text-3xl font-bold text-blue-700 mb-8">{lang.title}</h1>

      <div className="space-y-6 max-w-md mx-auto">
        <div>
          <label className="block font-medium">{lang.invest}</label>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">{lang.return}</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">{lang.duration}</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {lang.calculate}
        </button>
      </div>

      {result && (
        <div className="mt-8 space-y-4 bg-blue-50 p-4 rounded shadow max-w-md mx-auto">
          <p><strong>{lang.maturity}:</strong> ₹{result.maturityValue}</p>
          <p><strong>{lang.profit}:</strong> ₹{result.returns}</p>
        </div>
      )}

      {graphData.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-center">
            {lang.chartTitle}
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={graphData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default OneTimeCalculator;

