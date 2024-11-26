import React, { useState } from 'react';
import axios from 'axios';

function LoveCalculator() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const calculateLove = async () => {
    if (name1.trim() && name2.trim()) {
      try {
        const response = await axios.post('https://lovecalculator-be.onrender.com/calculate', {
          name1,
          name2,
        });
        setResult(response.data.result);
        setError(null);
      } catch (err) {
        setError('Failed to calculate love percentage. Please try again later.');
        setResult(null);
      }
    } else {
      setError('Please enter both names.');
      setResult(null);
    }
  };

  const resetCalculator = () => {
    setName1('');
    setName2('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 p-4">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Love Calculator</h1>
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter First Name"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Second Name"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={calculateLove}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Calculate
          </button>
          <button
            onClick={resetCalculator}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
        {result && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
            {result}
          </div>
        )}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoveCalculator;
