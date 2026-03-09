import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

function SIPCalculator({ language, onBack }) {
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [expectedReturn, setExpectedReturn] = useState('');
  const [duration, setDuration] = useState('');
  const [result, setResult] = useState(null);
  const [graphData, setGraphData] = useState([]);

  const lang = {
    english: {
      title: '🧮 SIP Calculator',
      back: '⬅ Back to Home',
      monthly: 'Monthly Investment (₹)',
      return: 'Expected Annual Return (%)',
      duration: 'Investment Duration (Years)',
      calculate: 'Calculate',
      invested: 'Total Invested',
      returns: 'Estimated Returns',
      maturity: 'Maturity Value',
      chartTitle: 'Investment Growth Over Time',
    },
    telugu: {
      title: '🧮 SIP కాలిక్యులేటర్',
      back: '⬅ హోమ్‌కు తిరుగు',
      monthly: 'ప్రతి నెల పెట్టుబడి (₹)',
      return: 'అంచనా వార్షిక రాబడి (%)',
      duration: 'పెట్టుబడి వ్యవధి (సంవత్సరాలు)',
      calculate: 'లెక్కించు',
      invested: 'మొత్తం పెట్టుబడి',
      returns: 'అంచనా లాభాలు',
      maturity: 'ముళ్లధన విలువ',
      chartTitle: 'కాలానుగుణంగా పెరుగుతున్న పెట్టుబడి',
    },
  }[language];

  const calculateSIP = () => {
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(expectedReturn) / 100 / 12;
    const n = parseFloat(duration) * 12;

    if (!P || !r || !n) return;

    const maturityValue =
      P * (((Math.pow(1 + r, n) - 1) * (1 + r)) / r);
    const totalInvested = P * n;
    const estimatedReturns = maturityValue - totalInvested;

    setResult({
      totalInvested: totalInvested.toFixed(0),
      estimatedReturns: estimatedReturns.toFixed(0),
      maturityValue: maturityValue.toFixed(0),
    });

    // 📈 Prepare graph data
    const yearlyData = [];
    for (let i = 1; i <= n; i++) {
      const value = P * (((Math.pow(1 + r, i) - 1) * (1 + r)) / r);
      if (i % 12 === 0) {
        yearlyData.push({
          year: i / 12,
          value: parseFloat(value.toFixed(0)),
        });
      }
    }
    setGraphData(yearlyData);
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
          <label className="block font-medium">{lang.monthly}</label>
          <input
            type="number"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">{lang.return}</label>
          <input
            type="number"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">{lang.duration}</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button
          onClick={calculateSIP}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {lang.calculate}
        </button>
      </div>

      {result && (
        <div className="mt-8 space-y-4 bg-blue-50 p-4 rounded shadow max-w-md mx-auto">
          <p>
            <strong>{lang.invested}:</strong> ₹{result.totalInvested}
          </p>
          <p>
            <strong>{lang.returns}:</strong> ₹{result.estimatedReturns}
          </p>
          <p>
            <strong>{lang.maturity}:</strong> ₹{result.maturityValue}
          </p>
        </div>
      )}

      {/* 📈 Graph */}
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
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default SIPCalculator;
