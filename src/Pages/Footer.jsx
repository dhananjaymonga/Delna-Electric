import React, { useEffect, useState } from 'react';
import { Heart, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Linkedin, MessageCircle, X, Home, FileText, Users, Headphones } from 'lucide-react';

const START_COUNT = 250000;

const Footer = () => {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('visitorCount');
    return saved ? parseInt(saved) : START_COUNT;
  });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Increment counter by 1 on page load
    setCount(prevCount => {
      const newCount = prevCount + 1;
      localStorage.setItem('visitorCount', newCount.toString());
      return newCount;
    });
  }, []);

  const handleInfoClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleNavigation = (path) => {
    // Close popup first
    closePopup();
    // Navigate to the specified path
    window.location.href = path;
  };

  return (
    <div className="relative">
      {/* Quick Access Menu Icon - Clean Design */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleInfoClick}
          className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-blue-500"
          title="Quick Access Menu"
        >
          <MessageCircle size={26} className="group-hover:scale-110 transition-transform duration-300" />
        </button>
      </div>

      {/* Improved Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-hidden transform animate-in slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center">
                  <MessageCircle size={20} className="mr-2" />
                  Quick Access
                </h3>
                <p className="text-blue-100 text-sm mt-1">Navigate to important sections</p>
              </div>
              <button
                onClick={closePopup}
                className="text-white hover:text-blue-200 hover:bg-white/10 p-2 rounded-full transition-all duration-200"
              >
                <X size={22} />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleNavigation('/dealership-form')}
                  className="group p-5 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all duration-200 text-left border border-blue-200 hover:border-blue-300 hover:shadow-md"
                >
                  <div className="flex items-center mb-3">
                    <Users size={22} className="text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-blue-800">Dealership</span>
                  </div>
                  <div className="text-sm text-blue-600">Apply to become our dealer partner</div>
                </button>
                
                <button
                  onClick={() => handleNavigation('/faq')}
                  className="group p-5 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all duration-200 text-left border border-green-200 hover:border-green-300 hover:shadow-md"
                >
                  <div className="flex items-center mb-3">
                    <FileText size={22} className="text-green-600 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-green-800">FAQ</span>
                  </div>
                  <div className="text-sm text-green-600">Frequently asked questions</div>
                </button>
                
                <button
                  onClick={() => handleNavigation('/contact')}
                  className="group p-5 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all duration-200 text-left border border-purple-200 hover:border-purple-300 hover:shadow-md"
                >
                  <div className="flex items-center mb-3">
                    <Headphones size={22} className="text-purple-600 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-purple-800">Professional</span>
                  </div>
                  <div className="text-sm text-purple-600">Expert consultation service</div>
                </button>
                
                <button
                  onClick={() => handleNavigation('/cable-assist')}
                  className="group p-5 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl transition-all duration-200 text-left border border-orange-200 hover:border-orange-300 hover:shadow-md"
                >
                  <div className="flex items-center mb-3">
                    <Home size={22} className="text-orange-600 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-orange-800">Cable Calculator</span>
                  </div>
                  <div className="text-sm text-orange-600">Motor Cable Size Calculator</div>
                </button>
              </div>

              {/* Footer inside popup */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                    <span>Made with</span>
                    <Heart size={14} className="text-red-500 animate-pulse" />
                    <span>for electrical professionals</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Quick access to all important sections
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Content */}
      <div className="h-1 bg-gradient-to-r from-sky-500 to-sky-600 animate-pulse"></div>
      <footer className="bg-gray-900 text-white py-12 px-5">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            
            {/* About Section */}
            <div className="reveal-on-scroll reveal-delay-100">
              <h3 className="text-xl font-bold mb-4 text-sky-400">About Delna</h3>
              <p className="text-gray-300 mb-6">
                Your trusted electrical solutions provider, delivering premium quality products and innovative electrical instruments for all your needs.
              </p>
              <div className="flex space-x-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 hover:bg-sky-600 transition-colors duration-300">
                  <Instagram size={18} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 hover:bg-sky-600 transition-colors duration-300">
                  <Twitter size={18} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 hover:bg-sky-600 transition-colors duration-300">
                  <Facebook size={18} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 hover:bg-sky-600 transition-colors duration-300">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="reveal-on-scroll reveal-delay-200">
              <h3 className="text-xl font-bold mb-4 text-sky-400">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="/" className="text-gray-300 hover:text-sky-400 transition-colors duration-300">Home</a></li>
                <li><a href="/products" className="text-gray-300 hover:text-sky-400 transition-colors duration-300">Products</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-sky-400 transition-colors duration-300">About Us</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-sky-400 transition-colors duration-300">Contact</a></li>
                <li><a href="/faq" className="text-gray-300 hover:text-sky-400 transition-colors duration-300">FAQ</a></li>
              </ul>
            </div>

            {/* Services & Tools */}
            <div className="reveal-on-scroll reveal-delay-300">
              <h3 className="text-xl font-bold mb-4 text-sky-400">Services & Tools</h3>
              <ul className="space-y-3">
                <li><a href="/cable-calculator" className="text-gray-300 hover:text-sky-400 transition-colors duration-300">Cable Calculator</a></li>
                <li><a href="/cable-assist" className="text-gray-300 hover:text-sky-400 transition-colors duration-300">Motor Cable Size Calculator</a></li>
                <li><a href="/dealership-form" className="text-gray-300 hover:text-sky-400 transition-colors duration-300">Dealership Form</a></li>
                <li><a href="/products/electrical-instruments" className="text-gray-300 hover:text-sky-400 transition-colors duration-300">Electrical Instruments</a></li>
                <li><a href="/products/accessories" className="text-gray-300 hover:text-sky-400 transition-colors duration-300">Accessories</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            {/* <div className="reveal-on-scroll reveal-delay-400">
              <h3 className="text-xl font-bold mb-4 text-sky-400">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin size={18} className="mr-3 mt-1 text-sky-400 flex-shrink-0" />
                  <span className="text-gray-300">123 Electrical Plaza, Industrial Area, Ganaur, Haryana 131021</span>
                </li>
                <li className="flex items-center">
                  <Phone size={18} className="mr-3 text-sky-400" />
                  <span className="text-gray-300">+91 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <Mail size={18} className="mr-3 text-sky-400" />
                  <span className="text-gray-300">info@delna.com</span>
                </li>
              </ul>
            </div> */}
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <p className="text-gray-400 text-sm">
                  © 2025 Delna | Trusted Electrical Solutions. All rights reserved.
                </p>
                <p className="text-gray-400 text-sm flex items-center">
                  Made with <Heart size={14} className="mx-1 text-sky-400" /> for electrical professionals
                </p>
              </div>
              <div className="text-sm text-gray-400">
                Total Visitors: <span className="font-bold text-sky-400">{count.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;