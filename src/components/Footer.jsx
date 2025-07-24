import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

function Footer({ setCurrentPage }) {
    const navigate = useNavigate();
  return (
    <div className="w-full">
      {/* Orange line animation */}
      <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-600 animate-pulse"></div>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Delna</h3>
            <p className="text-gray-400">Leading manufacturer of electrical instruments and cables, providing quality solutions since 2015.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage('pdfs')} className="text-gray-400 hover:text-orange-500">Products</button></li>
              <li><button  onClick={() => navigate("/CableAssit")} className="text-gray-400 hover:text-orange-500">Cable Calculator</button></li>
              <li><button onClick={() => navigate("/Connect")}  className="text-gray-400 hover:text-orange-500">Dekna  Connect App</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <button 
              onClick={() => setCurrentPage('contact')}
              className="flex items-center gap-2 text-gray-400 hover:text-orange-500"
            >
              <Phone size={18} />
              <span>Connect with Us</span>
            </button>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Dealership</h3>
            <button 
 onClick={() => navigate("/DealerShip")}
              className="flex items-center gap-2 text-gray-400 hover:text-orange-500"
            >
              <MapPin size={18} />
              <span>Apply for Dealership</span>
            </button>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">© 2025  Delna. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const Footer = () => {
    const [visitorCount, setVisitorCount] = useState(100000);

    useEffect(() => {
        const fetchVisitorCount = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/visitor-count');
                const data = await response.json();
                setVisitorCount(data.count);
            } catch (error) {
                console.error('Error fetching visitor count:', error);
            }
        };

        fetchVisitorCount();
    }, []);

    const formatNumber = (num) => {
        return new Intl.NumberFormat().format(num);
    };

    return (
        <footer>
            <div className="visitor-counter">
                <p>Total Visitors: {formatNumber(visitorCount)}</p>
            </div>
        </footer>
    );
};

export default Footer;