import React, { useState } from 'react';

const plans = {
  sipYoung: {
    title: 'Aggressive Growth SIP Plan',
    funds: [
      { name: 'HDFC Flexi Cap Fund', percent: 40, reason: 'Covers large, mid, and small caps for long-term growth' },
      { name: 'Motilal Oswal Large & Midcap Fund', percent: 20, reason: 'Focus on quality large + mid companies' },
      { name: 'Parag Parikh Flexi Cap', percent: 15, reason: 'Global + Indian stocks, consistent returns' },
      { name: 'Quant ELSS Tax Saver', percent: 15, reason: 'Equity + tax benefit under 80C' },
      { name: 'ICICI Balanced Advantage Fund', percent: 10, reason: 'Mix of debt & equity → safe + returns' },
    ],
  },
  sipMid: {
    title: 'Balanced Monthly Plan',
    funds: [
      { name: 'ICICI Balanced Advantage Fund', percent: 40, reason: 'Dynamic equity/debt mix, medium risk' },
      { name: 'HDFC Hybrid Equity Fund', percent: 30, reason: 'Combines growth + safety' },
      { name: 'Kotak Multicap Fund', percent: 20, reason: 'Exposure to all 3 market caps' },
      { name: 'Axis Bluechip Fund', percent: 10, reason: 'Reliable large-cap focused fund' },
    ],
  },
  oneTimeSenior: {
    title: 'Safe Wealth Builder (One-Time)',
    funds: [
      { name: 'ICICI Corporate Bond Fund', percent: 40, reason: 'Stable returns from high-quality debt' },
      { name: 'HDFC Retirement Savings Hybrid', percent: 30, reason: 'Balanced hybrid mix' },
      { name: 'Axis Regular Saver Fund', percent: 20, reason: 'Conservative hybrid option' },
      { name: 'Bank Fixed Deposit', percent: 10, reason: 'Emergency buffer' },
    ],
  },
};

function SuggestedPlans({ language, onBack }) {
  const [age, setAge] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('monthly');
  const [duration, setDuration] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSubmit = () => {
    const ageNum = parseInt(age);
    const amt = parseInt(amount);
    const dur = parseInt(duration);

    if (!ageNum || !amt || !dur || !type) return;

    let plan;
    if (type === 'monthly') {
      if (ageNum < 35) plan = plans.sipYoung;
      else plan = plans.sipMid;
    } else {
      plan = plans.oneTimeSenior;
    }

    // Calculate amount per fund
    const fundData = plan.funds.map((f) => ({
      ...f,
      amount: Math.round((f.percent / 100) * amt),
    }));

    setSelectedPlan({
      ...plan,
      amount: amt,
      duration: dur,
      type: type,
      funds: fundData,
    });
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-white text-gray-800">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ⬅ {language === 'telugu' ? 'వెనక్కి' : 'Back to Home'}
      </button>

      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        💼 {language === 'telugu' ? 'సిఫారసు చేసిన ప్రణాళికలు' : 'Suggested Plans'}
      </h1>

      {/* 📝 Input Form */}
      <div className="space-y-4 max-w-md mx-auto">
        <input
          type="number"
          placeholder={language === 'telugu' ? 'వయస్సు' : 'Your Age'}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder={language === 'telugu' ? 'పెట్టుబడి మొత్తం (₹)' : 'Amount to Invest (₹)'}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="monthly">{language === 'telugu' ? 'ప్రతి నెల SIP' : 'Monthly SIP'}</option>
          <option value="oneTime">{language === 'telugu' ? 'ఒక్కసారి పెట్టుబడి' : 'One-Time Investment'}</option>
        </select>
        <input
          type="number"
          placeholder={language === 'telugu' ? 'సంవత్సరాలు' : 'Investment Duration (Years)'}
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {language === 'telugu' ? 'సిఫారసు పొందండి' : 'Get Suggestion'}
        </button>
      </div>

      {/* 🧠 Suggested Plan Output */}
      {selectedPlan && (
        <div className="mt-10 bg-blue-50 p-6 rounded shadow max-w-2xl mx-auto space-y-4">
          <h2 className="text-xl font-bold text-center">{selectedPlan.title}</h2>
          <p className="text-center text-gray-600">
            {type === 'monthly' ? 'Monthly Investment' : 'One-Time Investment'}: ₹{selectedPlan.amount} • {selectedPlan.duration} Years
          </p>
          <div className="mt-4 space-y-3">
            {selectedPlan.funds.map((fund, idx) => (
              <div key={idx} className="p-4 border rounded bg-white shadow-sm">
                <p className="font-semibold">{idx + 1}. {fund.name}</p>
                <p>Amount: ₹{fund.amount} ({fund.percent}%)</p>
                <p className="text-sm text-gray-700">📌 {fund.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SuggestedPlans;
