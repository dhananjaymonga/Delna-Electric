import React from 'react';
import { useState, useEffect } from 'react';
import { ArrowUp, Home } from 'lucide-react';
import { AlertTriangle } from 'lucide-react';

export default function CableAssistCalculator() {
  const [motorOutput, setMotorOutput] = useState(15);
  const [unit, setUnit] = useState('kW');
  const [voltage, setVoltage] = useState(415);
  const [phases, setPhases] = useState(3);
  const [powerFactor, setPowerFactor] = useState(0.85);
  const [efficiency, setEfficiency] = useState(0.9);
  const [activeTab, setActiveTab] = useState('motors');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Navigate to home (you can replace this with actual navigation)
  const goToHome = () => {
    // Replace with your actual home navigation logic
    window.location.href = '/';
  };
  
  // Real electrical calculations
  const calculateMotorCurrent = () => {
    let powerInKW = unit === 'HP' ? motorOutput * 0.746 : motorOutput;
    let current;
    
    if (phases === 3) {
      // Three phase: I = P / (√3 × V × cosφ × η)
      current = powerInKW * 1000 / (Math.sqrt(3) * voltage * powerFactor * efficiency);
    } else {
      // Single phase: I = P / (V × cosφ × η)
      current = powerInKW * 1000 / (voltage * powerFactor * efficiency);
    }
    
    return current;
  };
  
  const getRecommendedCableSize = (current) => {
    // Cable sizing based on current capacity (Copper)
    if (current <= 20) return { size: 1.5, capacity: 20 };
    if (current <= 27) return { size: 2.5, capacity: 27 };
    if (current <= 37) return { size: 4, capacity: 37 };
    if (current <= 47) return { size: 6, capacity: 47 };
    if (current <= 65) return { size: 10, capacity: 65 };
    if (current <= 85) return { size: 16, capacity: 85 };
    if (current <= 110) return { size: 25, capacity: 110 };
    if (current <= 140) return { size: 35, capacity: 140 };
    if (current <= 175) return { size: 50, capacity: 175 };
    if (current <= 215) return { size: 70, capacity: 215 };
    if (current <= 260) return { size: 95, capacity: 260 };
    return { size: 120, capacity: 300 };
  };
  
  const getAluminumCableSize = (copperSize) => {
    // Aluminum cable one size larger than copper for same current
    const sizeMap = {
      1.5: 2.5, 2.5: 4, 4: 6, 6: 10, 10: 16, 16: 25,
      25: 35, 35: 50, 50: 70, 70: 95, 95: 120, 120: 150
    };
    return sizeMap[copperSize] || copperSize * 1.5;
  };
  
  const currentDOL = calculateMotorCurrent();
  const currentStarDelta = currentDOL / 3; // Star current is 1/3 of delta
  const copperCable = getRecommendedCableSize(currentDOL);
  const aluminumSize = getAluminumCableSize(copperCable.size);
  
  const getStatusColor = (current, capacity) => {
    const utilization = (current / capacity) * 100;
    if (utilization > 90) return 'bg-red-100 border-red-300 text-red-800';
    if (utilization > 70) return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    return 'bg-green-100 border-green-300 text-green-800';
  };

  const wireRatings = {
    copper: [
      { size: 1.5, current: 20 }, { size: 2.5, current: 27 }, { size: 4, current: 37 },
      { size: 6, current: 47 }, { size: 10, current: 65 }, { size: 16, current: 85 },
      { size: 25, current: 110 }, { size: 35, current: 140 }, { size: 50, current: 175 },
      { size: 70, current: 215 }, { size: 95, current: 260 }, { size: 120, current: 300 }
    ],
    aluminum: [
      { size: 2.5, current: 20 }, { size: 4, current: 27 }, { size: 6, current: 35 },
      { size: 10, current: 50 }, { size: 16, current: 65 }, { size: 25, current: 85 },
      { size: 35, current: 105 }, { size: 50, current: 130 }, { size: 70, current: 160 },
      { size: 95, current: 195 }, { size: 120, current: 230 }, { size: 150, current: 270 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-lg shadow-sm border-b p-6">
          <h1 className="text-2xl font-bold text-gray-900 text-center">Cable Assist Calculator</h1>
          <p className="text-gray-600 text-center mt-2">Calculate motor current and recommended cable sizes</p>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b flex">
          <button 
            onClick={() => setActiveTab('motors')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'motors' 
                ? 'border-blue-500 text-blue-600 bg-blue-50' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Motor Cable Calculator
          </button>
          <button 
            onClick={() => setActiveTab('wires')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'wires' 
                ? 'border-blue-500 text-blue-600 bg-blue-50' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Wire Current Ratings
          </button>
        </div>

        <div className="bg-white rounded-b-lg shadow-sm">
          {activeTab === 'motors' ? (
            <div className="p-6">
              {/* Input Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Motor Power</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={motorOutput}
                      onChange={(e) => setMotorOutput(Number(e.target.value))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      step="0.1"
                    />
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="kW">kW</option>
                      <option value="HP">HP</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Voltage (V)</label>
                  <select
                    value={voltage}
                    onChange={(e) => setVoltage(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={230}>230V</option>
                    <option value={415}>415V</option>
                    <option value={440}>440V</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phases</label>
                  <select
                    value={phases}
                    onChange={(e) => setPhases(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={1}>Single Phase</option>
                    <option value={3}>Three Phase</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Power Factor</label>
                  <input
                    type="number"
                    value={powerFactor}
                    onChange={(e) => setPowerFactor(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0.1"
                    max="1"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Efficiency</label>
                  <input
                    type="number"
                    value={efficiency}
                    onChange={(e) => setEfficiency(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0.1"
                    max="1"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                {/* Full Load Current */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Full Load Current</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`rounded-lg p-4 border-2 ${getStatusColor(currentDOL, copperCable.capacity)}`}>
                      <div className="text-2xl font-bold mb-1">{currentDOL.toFixed(1)} A</div>
                      <div className="text-sm">Direct Online (DOL)</div>
                    </div>
                    <div className={`rounded-lg p-4 border-2 ${getStatusColor(currentStarDelta, copperCable.capacity)}`}>
                      <div className="text-2xl font-bold mb-1">{currentStarDelta.toFixed(1)} A</div>
                      <div className="text-sm">Star Delta (Starting)</div>
                    </div>
                  </div>
                </div>

                {/* Cable Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Cable Sizes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                      <div className="text-xl font-bold text-orange-800 mb-1">{copperCable.size} sq.mm</div>
                      <div className="text-sm text-orange-700 mb-2">Copper Cable</div>
                      <div className="text-xs text-gray-600">Capacity: {copperCable.capacity}A</div>
                      <div className="text-xs text-gray-600">Utilization: {((currentDOL/copperCable.capacity)*100).toFixed(1)}%</div>
                    </div>
                    <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-4">
                      <div className="text-xl font-bold text-gray-800 mb-1">{aluminumSize} sq.mm</div>
                      <div className="text-sm text-gray-700 mb-2">Aluminum Cable</div>
                      <div className="text-xs text-gray-600">Alternative Option</div>
                      <div className="text-xs text-gray-600">Lower Cost Solution</div>
                    </div>
                  </div>
                </div>

             {/* Disclaimer */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Important Note
                  </h3>
                  <p className="text-sm text-yellow-700 leading-relaxed">
                    The current-carrying capacities mentioned above are based on standard reference values and ideal installation conditions. However, in actual practice, current ratings are often lower due to factors such as heat buildup, wire grouping, conduit usage, and ambient temperature.
                  </p>
                  <p className="text-sm text-yellow-700 leading-relaxed mt-2">
                    At Delna, we follow a more conservative and safety-focused approach, ensuring our wires operate well within safe limits. This means our rated ampacity may appear lower, but it provides greater protection and longer lifespan in real-world usage.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Current Carrying Capacity*</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Copper */}
                <div>
                  <h4 className="text-lg font-semibold text-orange-700 mb-4">Copper Conductors</h4>
                  <div className="space-y-2">
                    {wireRatings.copper.map((wire, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <span className="font-medium text-orange-800">{wire.size} sq.mm</span>
                        <span className="font-bold text-orange-600">{wire.current} A</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Aluminum */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Aluminum Conductors</h4>
                  <div className="space-y-2">
                    {wireRatings.aluminum.map((wire, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-100 border border-gray-300 rounded-lg">
                        <span className="font-medium text-gray-800">{wire.size} sq.mm</span>
                        <span className="font-bold text-gray-600">{wire.current} A</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

           <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
  <h5 className="font-semibold text-blue-800 mb-2">Notes:</h5>
  <ul className="text-sm text-blue-700 space-y-1">
    <li>• ⚠ Disclaimer: This tool provides approximate values for motor current and cable size under standard conditions. Actual requirements may vary depending on installation method, temperature, cable length, and safety factors. Always consult a licensed electrician or refer to IS standards for final selection</li>
    <li>• Values are for ambient temperature of 30°C</li>
    <li>• For bundled cables, apply derating factors</li>
    <li>• Copper has higher conductivity than aluminum</li>
    <li>• Always follow local electrical codes</li>
  </ul>
</div>
            </div>
          )}
        </div>

        {/* Back to Top and Home Button */}
        {showScrollTop && (
          <div className="fixed bottom-6 right-6 flex flex-col gap-3">
            {/* Home Button */}
            <button
              onClick={goToHome}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group flex flex-col items-center"
              title="Go to Home"
            >
              <Home size={24} className="group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-xs mt-1">Home</span>
            </button>
            
            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
              title="Back to Top"
            >
              <ArrowUp size={24} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}