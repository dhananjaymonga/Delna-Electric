// import React, { useState, useEffect } from 'react';
// import { Menu, X, Home, Info, Phone, Package, HelpCircle } from 'lucide-react';
// import { NavLink } from 'react-router-dom';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navItems = [
//     { name: 'Home', icon: <Home size={18} />, to: '/' },
//     { name: 'About', icon: <Info size={18} />, to: '/About' },
//     { name: 'Products', icon: <Package size={18} />, to: "/products" },
//     { name: 'Contact', icon: <Phone size={18} />, to: "/Contact" },
//     { name: 'FAQ', icon: <HelpCircle size={18} />, to: "/Faq-Page" },
//   ];

//   return (
//     <nav className={`fixed w-full z-50 transition-all duration-300 ${
//       scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
//     }`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo + Company Name */}
//           <div className="flex items-center flex-shrink-0 space-x-3">
//             <img
//               src="/images/logo.png"
//               alt="Delna Logo"
//               className="h-70 w-70 object-contain" // logo aur bada
//               style={{ maxWidth: 100, maxHeight: 100 }}
//             />
//             {/* <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
//               Delna Electric
//             </span> */}
//           </div>
          
//           {/* Desktop Navigation */}
//           <div className="hidden md:block">
//             <div className="ml-10 flex items-center space-x-8">
//               {navItems.map((item) => (
//                 <NavLink
//                   key={item.name}
//                   to={item.to}
//                   className="group flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors duration-300"
//                 >
//                   <span className="transform group-hover:scale-110 transition-transform duration-300">
//                     {item.icon}
//                   </span>
//                   <span>{item.name}</span>
//                 </NavLink>
//               ))}
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 focus:outline-none"
//             >
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       <div className={`md:hidden transition-all duration-300 ease-in-out ${
//         isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
//       } overflow-hidden bg-white/80 backdrop-blur-md`}>
//         <div className="px-2 pt-2 pb-3 space-y-1">
//           {navItems.map((item) => (
//             <NavLink
//               key={item.name}
//               to={item.to}
//               className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-300"
//             >
//               {item.icon}
//               <span>{item.name}</span>
//             </NavLink>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Info, Phone, Package, HelpCircle, Zap, ChevronDown } from 'lucide-react';
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
      hasDropdown: true,
      dropdownItems: [
        { name: 'Accessories', to: '/accessories' },
        { name: 'Switches', to: '/switches' },
        { name: 'Cables', to: '/cables' },
        { name: 'Tools', to: '/tools' }
      ]
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
            
            {/* Logo + Company Name with Enhanced Animation */}
            <div className="flex items-center flex-shrink-0 space-x-4 group">
              <div className="relative">
                {/* Animated background circle */}
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-sky-600 rounded-full opacity-20 scale-110 group-hover:scale-125 group-hover:opacity-30 transition-all duration-500"></div>
                
                {/* Logo with multiple animations */}
                <img
                  src="/images/logo.png"
                  alt="Delna Logo"
                  className="relative h-20 w-20 object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 drop-shadow-lg"
                  style={{ maxWidth: 160, maxHeight: 160 }}
                />
                
                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-full bg-sky-400 opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
              </div>
              
              {/* Company name with enhanced styling */}
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-sky-800 via-sky-600 to-sky-800 bg-clip-text text-transparent animate-gradient-x">
                  Delna Electric
                </span>
                <span className="text-xs text-sky-600 font-medium tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  POWERING YOUR FUTURE
                </span>
              </div>
              
              {/* Electric spark animation */}
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Zap className="h-6 w-6 text-sky-500 animate-pulse" />
              </div>
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