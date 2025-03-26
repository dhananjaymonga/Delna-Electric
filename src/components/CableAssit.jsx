import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Cable current carrying capacity data (simplified)
const currentRatings = {
  low: {
    copper: {
      pvc: {
        a1: [15, 20, 27, 34, 43, 54, 67, 83, 101, 123], // 1.5mm² to 25mm²
        b1: [18, 24, 32, 41, 52, 66, 82, 101, 125, 151],
        c: [19, 26, 35, 46, 59, 76, 96, 120, 151, 185],
        d: [22, 30, 40, 52, 67, 86, 110, 137, 170, 210]
      },
      xlpe: {
        a1: [18, 24, 32, 41, 52, 66, 82, 101, 125, 151],
        b1: [21, 28, 38, 49, 63, 80, 101, 125, 154, 187],
        c: [23, 31, 42, 55, 72, 93, 119, 149, 185, 226],
        d: [26, 35, 48, 63, 82, 106, 136, 170, 211, 257]
      }
    },
    aluminum: {
      pvc: {
        a1: [12, 16, 22, 28, 36, 46, 58, 72, 89, 108],
        b1: [14, 19, 26, 34, 44, 56, 71, 89, 110, 134],
        c: [15, 20, 28, 37, 48, 62, 79, 100, 124, 152],
        d: [17, 23, 32, 42, 55, 71, 92, 115, 143, 176]
      },
      xlpe: {
        a1: [14, 19, 26, 34, 44, 56, 71, 89, 110, 134],
        b1: [16, 22, 30, 40, 52, 67, 86, 108, 134, 164],
        c: [18, 24, 33, 44, 58, 75, 96, 122, 152, 187],
        d: [20, 27, 38, 50, 66, 86, 111, 140, 174, 215]
      }
    }
  }
};

// Cable sizes available
const cableSizes = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70]; // mm²

// Resistances for copper and aluminum (Ω/km at 20°C)
const resistances = {
  copper: [12.1, 7.41, 4.61, 3.08, 1.83, 1.15, 0.727, 0.524, 0.387, 0.263],
  aluminum: [19.8, 12.1, 7.54, 5.04, 3.00, 1.88, 1.19, 0.858, 0.634, 0.431]
};

// Reactances (Ω/km)
const reactances = [0.11, 0.10, 0.09, 0.09, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08];

const CableCalculator = () => {
  const [voltage, setVoltage] = useState('low');
  const [installationMethod, setInstallationMethod] = useState('a1');
  const [cableType, setCableType] = useState('pvc');
  const [conductorMaterial, setConductorMaterial] = useState('copper');
  const [load, setLoad] = useState('');
  const [distance, setDistance] = useState('');
  const [voltageDrop, setVoltageDrop] = useState(3);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // ✅ Initialize useNavigate
  
  const calculateCableSize = () => {
    const loadValue = parseFloat(load);
    const distanceValue = parseFloat(distance);
    
    if (!loadValue || !distanceValue) {
      setError('Please enter valid load and distance values');
      return null;
    }

    // Get current ratings for the selected parameters
    const ratings = currentRatings[voltage]?.[conductorMaterial]?.[cableType]?.[installationMethod];
    
    if (!ratings) {
      setError('Invalid parameter combination');
      return null;
    }

    // Find the smallest cable that can handle the load
    let selectedIndex = -1;
    for (let i = 0; i < ratings.length; i++) {
      if (ratings[i] >= loadValue) {
        selectedIndex = i;
        break;
      }
    }

    if (selectedIndex === -1) {
      setError('Load exceeds maximum capacity for available cable sizes');
      return null;
    }

    // Calculate voltage drop
    const resistance = resistances[conductorMaterial][selectedIndex];
    const reactance = reactances[selectedIndex];
    const voltageDropCalculated = (loadValue * distanceValue * (resistance * 0.001) * Math.sqrt(3)) / 1000;

    // Convert to percentage (assuming 400V for low voltage)
    const voltageDropPercentage = (voltageDropCalculated / 400) * 100;

    // Check if voltage drop is within limits
    if (voltageDropPercentage > voltageDrop) {
      // Need to select larger cable to meet voltage drop requirements
      for (let i = selectedIndex + 1; i < ratings.length; i++) {
        const newResistance = resistances[conductorMaterial][i];
        const newVoltageDrop = (loadValue * distanceValue * (newResistance * 0.001) * Math.sqrt(3)) / 1000;
        const newVoltageDropPercentage = (newVoltageDrop / 400) * 100;
        
        if (newVoltageDropPercentage <= voltageDrop) {
          selectedIndex = i;
          break;
        }
      }
    }

    return {
      cableSize: cableSizes[selectedIndex],
      currentRating: ratings[selectedIndex],
      voltageDropPercentage: voltageDropPercentage.toFixed(2)
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      const calculation = calculateCableSize();
      if (calculation) {
        setResult({
          cableSize: `${calculation.cableSize} mm²`,
          currentRating: `${calculation.currentRating} A`,
          voltageDropResult: `${calculation.voltageDropPercentage} %`,
          meetsRequirements: parseFloat(calculation.voltageDropPercentage) <= voltageDrop
        });
      }
      setLoading(false);
    }, 500);
  };

  const resetForm = () => {
    setVoltage('low');
    setInstallationMethod('a1');
    setCableType('pvc');
    setConductorMaterial('copper');
    setLoad('');
    setDistance('');
    setVoltageDrop(3);
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Advanced Cable Calculator</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Voltage Selection - Fixed Version */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Voltage</label>
  <select
    value={voltage}
    onChange={(e) => {
      // Prevent selection of disabled options
      if (e.target.value === 'medium') {
        return; // Don't update state for disabled option
      }
      setVoltage(e.target.value);
    }}
    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  >
    <option value="low">Low Voltage (≤ 1kV)</option>
    <option value="medium" disabled style={{ color: '#999' }}>
    Medium Voltage (&gt; 1kV) - Coming Soon
    </option>
  </select>
</div>
          
          {/* Installation Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Installation Method</label>
            <select
              value={installationMethod}
              onChange={(e) => setInstallationMethod(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="a1">Method A1 - Enclosed in conduit in thermally insulating wall</option>
              <option value="b1">Method B1 - Enclosed in conduit on a wall</option>
              <option value="c">Method C - Clipped direct</option>
              <option value="d">Method D - In free air</option>
            </select>
          </div>
          
          {/* Cable Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cable Type</label>
            <select
              value={cableType}
              onChange={(e) => setCableType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pvc">PVC Insulated</option>
              <option value="xlpe">XLPE Insulated</option>
              <option value="micc" disabled>Mineral Insulated (Coming Soon)</option>
            </select>
          </div>
          
          {/* Conductor Material */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Conductor Material</label>
            <select
              value={conductorMaterial}
              onChange={(e) => setConductorMaterial(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="copper">Copper</option>
              <option value="aluminum">Aluminum</option>
            </select>
          </div>
          
          {/* Load */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Load (Amps)</label>
            <input
              type="number"
              value={load}
              onChange={(e) => setLoad(e.target.value)}
              min="0.1"
              step="0.1"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter load in amps"
              required
            />
          </div>
          
          {/* Distance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Distance (meters)</label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              min="0.1"
              step="0.1"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter distance in meters"
              required
            />
          </div>
          
          {/* Voltage Drop */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Voltage Drop (%)</label>
            <div className="flex items-center">
              <input
                type="range"
                min="1"
                max="10"
                value={voltageDrop}
                onChange={(e) => setVoltageDrop(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="ml-4 w-12 text-center">{voltageDrop}%</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Calculating...' : 'Calculate'}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Reset
          </button>
        </div>
      </form>
      
      {result && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Calculation Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-md shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Recommended Cable Size</h3>
              <p className="text-2xl font-bold text-blue-600">{result.cableSize}</p>
            </div>
            <div className="p-4 bg-white rounded-md shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Current Rating</h3>
              <p className="text-2xl font-bold text-blue-600">{result.currentRating}</p>
            </div>
            <div className="p-4 bg-white rounded-md shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Voltage Drop</h3>
              <p className={`text-2xl font-bold ${result.meetsRequirements ? 'text-green-600' : 'text-red-600'}`}>
                {result.voltageDropResult} {!result.meetsRequirements && '(Exceeds limit)'}
              </p>
            </div>
          </div>
          
          {!result.meetsRequirements && (
            <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded text-sm">
              Note: The calculated voltage drop exceeds your specified limit. Consider using a larger cable size or reducing the distance.
            </div>
          )}
          
          <div className="mt-6 text-sm text-gray-600">
            <h3 className="font-medium mb-1">Calculation Notes:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Calculations based on IEC 60364-5-52 standards</li>
              <li>Ambient temperature assumed at 30°C</li>
              <li>3-phase balanced load assumed for voltage drop calculation</li>
            </ul>
          </div>
        </div>
      )}
      
      <div className="mt-8 text-sm text-gray-500">
        <p>Note: This calculator provides estimates based on standard conditions. For critical applications, consult with a qualified electrical engineer.</p>
      </div>
      <button
        onClick={() => navigate("/")} // ✅ Correct navigation
        className="mt-8 text-orange-500 hover:text-orange-600"
      >
        ← Back to Home
      </button>
    </div>
  );
};

export default CableCalculator;
