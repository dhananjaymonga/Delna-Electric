import React from 'react';
import { useNavigate } from 'react-router-dom';
function Connect({  }) {
    const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-8"> Delna Connect App</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <p className="text-gray-600 mb-8">
          Download the Delna Connect App from Google Play Store or Apple App Store to earn Loyalty Points and join our community.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            Download on App Store
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            Get it on Google Play
          </button>
        </div>
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

export default Connect;