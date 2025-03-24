import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function KabelCalculator({ setCurrentPage }) {
    const navigate = useNavigate(); // ✅ Initialize useNavigate

  const [calculatorData, setCalculatorData] = useState({
    current: '',
    voltage: '',
    length: '',
    phase: 'single'
  });
  const [recommendation, setRecommendation] = useState(null);

  const calculateRecommendation = () => {
    const { current, voltage, length, phase } = calculatorData;
    
    let cableSize = '';
    const currentValue = parseFloat(current);
    
    if (phase === 'single') {
      if (currentValue <= 10) cableSize = '1.5 mm²';
      else if (currentValue <= 16) cableSize = '2.5 mm²';
      else if (currentValue <= 25) cableSize = '4 mm²';
      else if (currentValue <= 32) cableSize = '6 mm²';
      else cableSize = '10 mm²';
    } else {
      if (currentValue <= 8) cableSize = '1.5 mm²';
      else if (currentValue <= 13) cableSize = '2.5 mm²';
      else if (currentValue <= 20) cableSize = '4 mm²';
      else if (currentValue <= 25) cableSize = '6 mm²';
      else cableSize = '10 mm²';
    }

    setRecommendation({
      cableSize,
      type: currentValue > 25 ? 'XLPE' : 'PVC',
      cores: phase === 'single' ? '2 Core' : '4 Core'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Kabel Assist Calculator</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current (Amperes)
            </label>
            <input
              type="number"
              value={calculatorData.current}
              onChange={(e) => setCalculatorData({...calculatorData, current: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter current in amperes"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Voltage (Volts)
            </label>
            <input
              type="number"
              value={calculatorData.voltage}
              onChange={(e) => setCalculatorData({...calculatorData, voltage: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter voltage"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cable Length (Meters)
            </label>
            <input
              type="number"
              value={calculatorData.length}
              onChange={(e) => setCalculatorData({...calculatorData, length: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter cable length"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phase Type
            </label>
            <select
              value={calculatorData.phase}
              onChange={(e) => setCalculatorData({...calculatorData, phase: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="single">Single Phase</option>
              <option value="three">Three Phase</option>
            </select>
          </div>

          <button
            onClick={calculateRecommendation}
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Calculate Recommendation
          </button>
        </div>

        {recommendation && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Recommended Cable Specifications:</h3>
            <div className="grid gap-2">
              <p><span className="font-medium">Cable Size:</span> {recommendation.cableSize}</p>
              <p><span className="font-medium">Insulation Type:</span> {recommendation.type}</p>
              <p><span className="font-medium">Number of Cores:</span> {recommendation.cores}</p>
            </div>
          </div>
        )}
      </div>
      
      <button
        onClick={() => navigate("/")} // ✅ Correct navigation
        className="mt-8 text-orange-500 hover:text-orange-600"
      >
        ← Back to Home
      </button>
    </div>
  );
}

export default KabelCalculator;