import React, { useState, useEffect } from 'react';

type BMIRecord = {
  age: number;
  height: number;
  weight: number;
  bmi: number;
  category: string;
};

const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 24.9) return 'Normal';
  if (bmi < 29.9) return 'Overweight';
  return 'Obese';
};

const App: React.FC = () => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiRecords, setBmiRecords] = useState<BMIRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Fetch BMI records from backend
  const fetchBMIRecords = async () => {
    try {
      const res = await fetch('/api/user/bmi');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setBmiRecords(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load BMI records.' });
    }
  };

  useEffect(() => {
    fetchBMIRecords();
  }, []);

  const handleCalculate = async () => {
    setMessage(null);
    const ageNum = Number(age);
    const heightCm = Number(height);
    const weightKg = Number(weight);

    if (!ageNum || !heightCm || !weightKg) {
      setMessage({ type: 'error', text: 'Please enter valid age, height, and weight.' });
      return;
    }

    if (ageNum < 2 || ageNum > 120) {
      setMessage({ type: 'error', text: 'Please enter a valid age between 2 and 120.' });
      return;
    }

    if (heightCm < 50 || heightCm > 250) {
      setMessage({ type: 'error', text: 'Please enter a valid height between 50cm and 250cm.' });
      return;
    }

    if (weightKg < 2 || weightKg > 500) {
      setMessage({ type: 'error', text: 'Please enter a valid weight between 2kg and 500kg.' });
      return;
    }

    const heightM = heightCm / 100;
    const bmi = +(weightKg / (heightM * heightM)).toFixed(2);
    const category = getBMICategory(bmi);

    const newRecord: BMIRecord = {
      age: ageNum,
      height: heightCm,
      weight: weightKg,
      bmi,
      category,
    };

    setLoading(true);

    try {
      const res = await fetch('/api/create/bmi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord),
      });
      if (!res.ok) throw new Error('Failed to save');
      await fetchBMIRecords();
      setAge('');
      setHeight('');
      setWeight('');
      setMessage({ type: 'success', text: 'BMI calculated and saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save BMI record.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-8">BMI Calculator</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Age (years)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              min="2"
              max="120"
              placeholder="Enter your age"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              min="50"
              max="250"
              placeholder="Enter your height"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              min="2"
              max="500"
              placeholder="Enter your weight"
            />
          </div>
          
          <button
            onClick={handleCalculate}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Calculating...' : 'Calculate BMI'}
          </button>
        </div>
      </div>

      {message && (
        <div className={`mt-4 p-4 rounded-md w-full max-w-md ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}

      <div className="mt-8 w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">BMI History</h2>
        {bmiRecords.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Height (cm)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (kg)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BMI</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bmiRecords.map((record, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.height}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.weight}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.bmi}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${record.category === 'Underweight' ? 'bg-blue-100 text-blue-800' :
                          record.category === 'Normal' ? 'bg-green-100 text-green-800' :
                          record.category === 'Overweight' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                        {record.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No BMI records yet. Calculate your BMI to see results here.</p>
        )}
      </div>
    </div>
  );
};

export default App;