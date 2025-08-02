import React, { useState, useEffect } from 'react';
import { Calculator, Zap, Info, Home, ArrowUp, X, Mail, Phone, User, MessageSquare } from 'lucide-react';

const CalculatorPage = () => {
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [power, setPower] = useState('');
  const [calculationType, setCalculationType] = useState('power');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    calculationType: 'General Inquiry'
  });

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculatePower = () => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);
    if (!isNaN(v) && !isNaN(i)) {
      setPower((v * i).toFixed(2));
    }
  };

  const calculateCurrent = () => {
    const v = parseFloat(voltage);
    const p = parseFloat(power);
    if (!isNaN(v) && !isNaN(p) && v !== 0) {
      setCurrent((p / v).toFixed(2));
    }
  };

  const calculateVoltage = () => {
    const i = parseFloat(current);
    const p = parseFloat(power);
    if (!isNaN(i) && !isNaN(p) && i !== 0) {
      setVoltage((p / i).toFixed(2));
    }
  };

  const clearAll = () => {
    setVoltage('');
    setCurrent('');
    setPower('');
  };

  const handleCalculate = () => {
    switch (calculationType) {
      case 'power':
        calculatePower();
        break;
      case 'current':
        calculateCurrent();
        break;
      case 'voltage':
        calculateVoltage();
        break;
      default:
        break;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  const handleContactClick = () => {
    setShowContactForm(true);
  };

  const closeContactForm = () => {
    setShowContactForm(false);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Create email body
    const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company}
Inquiry Type: ${formData.calculationType}

Message:
${formData.message}

---
Sent from Electrical Calculator Contact Form
    `.trim();

    // Create mailto link
    const subject = encodeURIComponent('Engineering Consultation Request');
    const body = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:engineering@company.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.open(mailtoLink);
    
    // Reset form and close popup
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      calculationType: 'General Inquiry'
    });
    setShowContactForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={handleHomeClick}
              className="flex items-center space-x-2 text-sky-800 hover:text-sky-900 transition-colors"
            >
              <Home className="h-6 w-6" />
              <span className="font-semibold">Home</span>
            </button>
            <h1 className="text-lg font-bold text-gray-800">Electrical Calculator</h1>
            <div className="w-16"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <Calculator className="h-10 w-10 mr-4 text-sky-800" />
            Electrical Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate voltage, current, and power using Ohm's Law (P = V × I)
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Zap className="h-6 w-6 mr-2 text-sky-800" />
              Power Calculator
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What would you like to calculate?
                </label>
                <select
                  value={calculationType}
                  onChange={(e) => setCalculationType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                >
                  <option value="power">Power (Watts)</option>
                  <option value="current">Current (Amperes)</option>
                  <option value="voltage">Voltage (Volts)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="voltage" className="block text-sm font-medium text-gray-700 mb-2">
                    Voltage (V)
                  </label>
                  <input
                    type="number"
                    id="voltage"
                    value={voltage}
                    onChange={(e) => setVoltage(e.target.value)}
                    disabled={calculationType === 'voltage'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label htmlFor="current" className="block text-sm font-medium text-gray-700 mb-2">
                    Current (A)
                  </label>
                  <input
                    type="number"
                    id="current"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                    disabled={calculationType === 'current'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label htmlFor="power" className="block text-sm font-medium text-gray-700 mb-2">
                    Power (W)
                  </label>
                  <input
                    type="number"
                    id="power"
                    value={power}
                    onChange={(e) => setPower(e.target.value)}
                    disabled={calculationType === 'power'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleCalculate}
                  className="flex-1 bg-sky-800 text-white py-3 rounded-lg font-semibold hover:bg-sky-900 transition-colors"
                >
                  Calculate
                </button>
                <button
                  onClick={clearAll}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Information Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Info className="h-5 w-5 mr-2 text-sky-800" />
                Ohm's Law Formulas
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-sky-50 rounded-lg">
                  <h4 className="font-semibold text-sky-800 mb-2">Power Calculation</h4>
                  <p className="text-gray-700 font-mono">P = V × I</p>
                  <p className="text-sm text-gray-600 mt-1">Power (Watts) = Voltage (Volts) × Current (Amperes)</p>
                </div>
                <div className="p-4 bg-sky-50 rounded-lg">
                  <h4 className="font-semibold text-sky-800 mb-2">Current Calculation</h4>
                  <p className="text-gray-700 font-mono">I = P ÷ V</p>
                  <p className="text-sm text-gray-600 mt-1">Current (Amperes) = Power (Watts) ÷ Voltage (Volts)</p>
                </div>
                <div className="p-4 bg-sky-50 rounded-lg">
                  <h4 className="font-semibold text-sky-800 mb-2">Voltage Calculation</h4>
                  <p className="text-gray-700 font-mono">V = P ÷ I</p>
                  <p className="text-sm text-gray-600 mt-1">Voltage (Volts) = Power (Watts) ÷ Current (Amperes)</p>
                </div>
              </div>
            </div>

            <div className="bg-sky-800 text-white rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">Need Help with Calculations?</h3>
              <p className="mb-4">
                Our engineering team can help you with complex electrical calculations and system design.
              </p>
              <button 
                onClick={handleContactClick}
                className="bg-white text-sky-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Engineers
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-sky-800 text-white p-3 rounded-full shadow-lg hover:bg-sky-900 transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <Mail className="h-6 w-6 mr-2 text-sky-800" />
                Contact Engineers
              </h3>
              <button
                onClick={closeContactForm}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="your.email@company.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company/Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label htmlFor="calculationType" className="block text-sm font-medium text-gray-700 mb-2">
                  Inquiry Type
                </label>
                <select
                  id="calculationType"
                  name="calculationType"
                  value={formData.calculationType}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Power Calculations">Power Calculations</option>
                  <option value="Circuit Design">Circuit Design</option>
                  <option value="Load Analysis">Load Analysis</option>
                  <option value="Safety Compliance">Safety Compliance</option>
                  <option value="System Integration">System Integration</option>
                  <option value="Custom Calculator">Custom Calculator Request</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="h-4 w-4 inline mr-1" />
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                  placeholder="Describe your project requirements, calculations needed, or any specific questions..."
                />
              </div>

              <div className="bg-sky-50 p-4 rounded-lg">
                <p className="text-sm text-sky-800">
                  <Info className="h-4 w-4 inline mr-1" />
                  Your message will open in your default email client. Make sure to send the email to complete your inquiry.
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-sky-800 text-white py-3 rounded-lg font-semibold hover:bg-sky-900 transition-colors flex items-center justify-center"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </button>
                <button
                  type="button"
                  onClick={closeContactForm}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorPage;