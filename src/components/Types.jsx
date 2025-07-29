import React from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Calculator, Share2 } from "lucide-react";

function Home() {
  const navigate = useNavigate(); // Correct way to use navigation

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto p-8  bg-gradient-to-br from-purple-50 to-blue-50">
      
      {/* Pricelist/Brochures Section */}
      <div
        onClick={() => navigate("/pdfdowload")} // Navigate to the corresponding page
        className="bg-white p-8 rounded-lg shadow-lg text-center cursor-pointer hover:shadow-xl transition-shadow"
      >
        <div className="flex justify-center mb-4">
          <FileText className="w-16 h-16 text-orange-500" />
        </div>
        <h2 className="text-xl font-bold mb-4">BROCHURES</h2>
        <p className="text-gray-600">Download our latest Brochure for all our Products</p>
{/* <h2>        Price List</h2>    */}
   </div>

      {/* Cable Assist Calculator Section */}
      <div
        onClick={() => navigate("/CableAssit")} // Navigate to calculator page
        className="bg-white p-8 rounded-lg shadow-lg text-center cursor-pointer hover:shadow-xl transition-shadow"
      >
        <div className="flex justify-center mb-4">
          <Calculator className="w-16 h-16 text-orange-500" />
        </div>
        <h2 className="text-xl font-bold mb-4">CABLE ASSIST CALCULATOR</h2>
        <p className="text-gray-600">Help us, Help You through our Cabel Assist Calculator</p>
      </div>

      {/* RR Connect App Section */}
      <div
        onClick={() => navigate("/Connect")} // Navigate to connect page
        className="bg-white p-8 rounded-lg shadow-lg text-center cursor-pointer hover:shadow-xl transition-shadow"
      >
        <div className="flex justify-center mb-4">
          <Share2 className="w-16 h-16 text-orange-500" />
        </div>
        <h2 className="text-xl font-bold mb-4">DELNA CONNECT APP</h2>
        <p className="text-gray-600">Earn Loyalty Points and join our community</p>
      </div>
      
    </div>
  );
}

export default Home;
