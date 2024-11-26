import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [names, setNames] = useState({ name1: "", name2: "" });
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setNames({ ...names, [e.target.name]: e.target.value });
  };

  const calculateLove = async () => {
    try {
      const response = await axios.post("https://lovecalculator-be.onrender.com", names);
      setResult(response.data.message);
    } catch (error) {
      setResult("Error calculating love percentage.");
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-red-500 mb-6">Love Calculator</h1>
      <input
        type="text"
        name="name1"
        placeholder="Your Name"
        value={names.name1}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded mb-4"
      />
      <input
        type="text"
        name="name2"
        placeholder="Partner's Name"
        value={names.name2}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={calculateLove}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Calculate Love Percentage
      </button>
      {result && <p className="mt-4 text-xl">{result}</p>}
    </div>
  );
};

export default App;
