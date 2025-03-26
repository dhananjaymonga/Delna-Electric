import React from "react";
import { X } from "lucide-react"; // Cross icon from lucide-react

const PopupModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[450px] max-h-[500px] relative border border-gray-300">
        
        {/* Close Icon */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        {/* Popup Content */}
        <img 
          src="/images/led.webp" // Replace with your image URL
          alt="Welcome" 
          className="w-full h-[250px] object-cover rounded-t-lg"
        />

        <div className="p-3 text-center">
          <h2 className="text-xl font-bold">Welcome to Our Website!</h2>
          <p className="text-gray-600 mt-1 text-sm">Check out our latest products and offers.</p>
          
          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default PopupModal;
