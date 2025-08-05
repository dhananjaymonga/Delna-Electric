import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Info, Phone, Package, HelpCircle, Zap, ChevronDown, BookOpen } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      name: 'Home', 
      icon: <Home size={20} />, 
      to: '/',
      hasDropdown: false
    },
    { 
      name: 'About', 
      icon: <Info size={20} />, 
      to: '/About',
      hasDropdown: false
    },
    { 
      name: 'Products', 
      icon: <Package size={20} />, 
      to: "/products",
      hasDropdown: false
    },
    { 
      name: 'Blog', 
      icon: <BookOpen size={20} />, 
      to: "/Blog",
      hasDropdown: false
    },
    { 
      name: 'Contact', 
      icon: <Phone size={20} />, 
      to: "/Contact",
      hasDropdown: false
    },
    { 
      name: 'FAQ', 
      icon: <HelpCircle size={20} />, 
      to: "/Faq-Page",
      hasDropdown: false
    },
  ];

  const handleDropdownToggle = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-sky-200/50' 
          : 'bg-gradient-to-r from-white/80 to-sky-50/80 backdrop-blur-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24"> {/* Much bigger height */}
            
            {/* Logo Only - Clean and Simple */}
            <div className="flex items-center flex-shrink-0">
              {/* Logo - increased size */}
              <img
                src="/images/logo.png"
                alt="Delna Logo"
                className="h-32 w-32 object-contain transition-all duration-300 drop-shadow-lg"
                style={{ maxWidth: 220, maxHeight: 220 }}
              />
            </div>
                     
            {/* Desktop Navigation with Enhanced Animations */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-2">
                {navItems.map((item) => (
                  <div key={item.name} className="relative group">
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `relative flex items-center space-x-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 overflow-hidden ${
                          isActive
                            ? 'text-white bg-gradient-to-r from-sky-800 to-sky-600 shadow-lg shadow-sky-800/30'
                            : 'text-gray-700 hover:text-sky-800 hover:bg-gradient-to-r hover:from-sky-50 hover:to-sky-100'
                        }`
                      }
                      onMouseEnter={() => item.hasDropdown && handleDropdownToggle(item.name)}
                    >
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-sky-600 opacity-0 group-hover:opacity-10 transition-all duration-300 rounded-xl"></div>
                      
                      {/* Icon with bounce animation */}
                      <span className="relative z-10 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        {item.icon}
                      </span>
                      
                      {/* Text with slide animation */}
                      <span className="relative z-10 transform group-hover:translate-x-1 transition-all duration-300">
                        {item.name}
                      </span>
                      
                      {/* Dropdown arrow */}
                      {item.hasDropdown && (
                        <ChevronDown 
                          size={16} 
                          className={`relative z-10 transform transition-all duration-300 ${
                            activeDropdown === item.name ? 'rotate-180' : 'group-hover:rotate-180'
                          }`} 
                        />
                      )}
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"></div>
                    </NavLink>

                    {/* Dropdown Menu */}
                    {item.hasDropdown && (
                      <div className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-sky-100 overflow-hidden transition-all duration-300 ${
                        activeDropdown === item.name ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform -translate-y-4'
                      }`}>
                        {item.dropdownItems?.map((dropItem, index) => (
                          <NavLink
                            key={dropItem.name}
                            to={dropItem.to}
                            className="block px-4 py-3 text-gray-700 hover:bg-sky-50 hover:text-sky-800 transition-all duration-200 border-b border-sky-50 last:border-b-0 group"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <span className="transform group-hover:translate-x-2 transition-transform duration-200 inline-block">
                              {dropItem.name}
                            </span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile menu button with animation */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative inline-flex items-center justify-center p-3 rounded-xl text-gray-700 hover:text-sky-800 hover:bg-sky-50 focus:outline-none transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-sky-400 opacity-0 group-hover:opacity-10 rounded-xl transition-all duration-300"></div>
                <div className="relative">
                  {isOpen ? (
                    <X size={26} className="transform rotate-0 group-hover:rotate-90 transition-transform duration-300" />
                  ) : (
                    <Menu size={26} className="transform group-hover:scale-110 transition-transform duration-300" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation with Enhanced Animations */}
        <div className={`md:hidden transition-all duration-500 ease-out ${
          isOpen 
            ? 'max-h-96 opacity-100 transform translate-y-0' 
            : 'max-h-0 opacity-0 transform -translate-y-4'
        } overflow-hidden bg-gradient-to-b from-white/98 to-sky-50/98 backdrop-blur-xl border-t border-sky-200/50 shadow-2xl`}>
          <div className="px-6 pt-6 pb-8 space-y-3">
            {navItems.map((item, index) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-4 px-5 py-4 rounded-xl font-semibold transition-all duration-300 group relative overflow-hidden ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-sky-800 to-sky-600 shadow-lg shadow-sky-800/30'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-sky-50 hover:to-sky-100 hover:text-sky-800'
                  }`
                }
                onClick={() => setIsOpen(false)}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: isOpen ? 'slideInLeft 0.5s ease-out forwards' : 'none'
                }}
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-sky-600 opacity-0 group-hover:opacity-10 transition-all duration-300 rounded-xl"></div>
                
                {/* Icon with enhanced animation */}
                <span className="relative z-10 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 text-sky-800">
                  {item.icon}
                </span>
                
                {/* Text with slide animation */}
                <span className="relative z-10 transform group-hover:translate-x-2 transition-all duration-300">
                  {item.name}
                </span>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"></div>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </>
  );
};

export default Navbar;