import emailjs from 'emailjs-com';
import React, { useState, useEffect } from 'react';
import { CheckCircle, Mail, MapPin, Building, User, Phone, FileText, Send, Loader, Home } from 'lucide-react';

const DealershipForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    firmName: '',
    state: '',
    city: '',
    address: '',
    email: '',
    phone: '',
    description: ''
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState('');
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_aqioluh';
  const EMAILJS_TEMPLATE_ID = 'template_5c5stvz';
  const EMAILJS_PUBLIC_KEY = 'bbVS_3JUKDOa_iYM6';

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoadingStates(true);
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "country": "India"
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.error === false && data.data && data.data.states) {
            const statesData = data.data.states.map(state => ({
              name: state.name,
              state_code: state.state_code
            }));
            setStates(statesData.sort((a, b) => a.name.localeCompare(b.name)));
          } else {
            throw new Error('Invalid API response');
          }
        } else {
          throw new Error('API request failed');
        }
      } catch (error) {
        console.error('Error fetching states:', error);
        // Fallback to hardcoded data if API fails
        const fallbackStates = [
          { name: 'Andhra Pradesh', state_code: 'AP' },
          { name: 'Arunachal Pradesh', state_code: 'AR' },
          { name: 'Assam', state_code: 'AS' },
          { name: 'Bihar', state_code: 'BR' },
          { name: 'Chhattisgarh', state_code: 'CG' },
          { name: 'Delhi', state_code: 'DL' },
          { name: 'Goa', state_code: 'GA' },
          { name: 'Gujarat', state_code: 'GJ' },
          { name: 'Haryana', state_code: 'HR' },
          { name: 'Himachal Pradesh', state_code: 'HP' },
          { name: 'Jharkhand', state_code: 'JH' },
          { name: 'Karnataka', state_code: 'KA' },
          { name: 'Kerala', state_code: 'KL' },
          { name: 'Madhya Pradesh', state_code: 'MP' },
          { name: 'Maharashtra', state_code: 'MH' },
          { name: 'Manipur', state_code: 'MN' },
          { name: 'Meghalaya', state_code: 'ML' },
          { name: 'Mizoram', state_code: 'MZ' },
          { name: 'Nagaland', state_code: 'NL' },
          { name: 'Odisha', state_code: 'OR' },
          { name: 'Punjab', state_code: 'PB' },
          { name: 'Rajasthan', state_code: 'RJ' },
          { name: 'Sikkim', state_code: 'SK' },
          { name: 'Tamil Nadu', state_code: 'TN' },
          { name: 'Telangana', state_code: 'TS' },
          { name: 'Tripura', state_code: 'TR' },
          { name: 'Uttar Pradesh', state_code: 'UP' },
          { name: 'Uttarakhand', state_code: 'UK' },
          { name: 'West Bengal', state_code: 'WB' }
        ];
        setStates(fallbackStates);
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  // Fetch cities when state changes
  useEffect(() => {
    if (formData.state) {
      const fetchCities = async () => {
        try {
          setLoadingCities(true);
          const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "country": "India",
              "state": formData.state
            })
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.error === false && data.data) {
              const citiesData = data.data.map(cityName => ({
                name: cityName,
                id: cityName.toLowerCase().replace(/\s+/g, '-')
              }));
              setCities(citiesData.sort((a, b) => a.name.localeCompare(b.name)));
            } else {
              setCities([]);
            }
          } else {
            setCities([]);
          }
        } catch (error) {
          console.error('Error fetching cities:', error);
          setCities([]);
        } finally {
          setLoadingCities(false);
        }
      };

      fetchCities();
      setFormData(prev => ({ ...prev, city: '' }));
    } else {
      setCities([]);
    }
  }, [formData.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleHomeClick = () => {
    // Redirect to home page
    window.location.href = '/';
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.firmName.trim()) newErrors.firmName = 'Firm name is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Prepare email template parameters
      const templateParams = {
        to_name: 'Delna Admin',
        from_name: formData.name,
        firm_name: formData.firmName,
        applicant_name: formData.name,
        applicant_email: formData.email,
        applicant_phone: formData.phone,
        state: formData.state,
        city: formData.city,
        address: formData.address,
        description: formData.description || 'No additional description provided',
        submission_date: new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      console.log('Sending email with parameters:', templateParams);

      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', result);
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form after success animation
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: '',
          firmName: '',
          state: '',
          city: '',
          address: '',
          email: '',
          phone: '',
          description: ''
        });
        setCities([]);
      }, 3000);

    } catch (error) {
      console.error('Error sending email:', error);
      setIsSubmitting(false);
      
      // Show error to user
      setErrors({ submit: 'Failed to send email. Please try again.' });
      
      // You could also show a toast notification here
      alert('Failed to send email. Please check your internet connection and try again.');
    }
  };

  const InputField = ({ icon: Icon, label, name, type = 'text', placeholder, children }) => (
    <div className="group relative">
      <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
        focusedField === name ? 'text-cyan-600' : 'text-gray-700'
      }`}>
        <Icon className="inline w-4 h-4 mr-2" />
        {label}
      </label>
      <div className="relative">
        {children || (
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
            onFocus={() => setFocusedField(name)}
            onBlur={() => setFocusedField('')}
            placeholder={placeholder}
            className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 focus:outline-none transform hover:scale-[1.02] ${
              errors[name] 
                ? 'border-red-400 bg-red-50 animate-shake' 
                : focusedField === name 
                  ? 'border-cyan-400 bg-cyan-50 shadow-md scale-[1.02]' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          />
        )}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-cyan-50 flex items-center justify-center p-4 animate-fade-in">
        {/* Home Icon for Success Page */}
        <button
          onClick={handleHomeClick}
          className="fixed bottom-6 right-6 z-10 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 group animate-float"
          title="Go to Home"
        >
          <Home className="w-6 h-6 text-cyan-600 group-hover:text-cyan-700 transition-colors duration-300" />
        </button>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-4 h-4 bg-green-300 rounded-full animate-float-slow opacity-60"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-cyan-300 rounded-full animate-float-medium opacity-60"></div>
          <div className="absolute bottom-32 left-20 w-5 h-5 bg-green-200 rounded-full animate-float-fast opacity-60"></div>
          <div className="absolute bottom-20 right-32 w-2 h-2 bg-cyan-400 rounded-full animate-float-slow opacity-60"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md w-full transform animate-scale-up relative overflow-hidden">
          {/* Success ripple effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-100 via-transparent to-cyan-100 animate-pulse opacity-30"></div>
          
          <div className="relative z-10">
            <div className="relative">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-bounce-slow" />
              <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border-4 border-green-200 animate-ping opacity-20"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-slide-up">Success!</h2>
            <p className="text-gray-600 mb-6 animate-slide-up animation-delay-200">Your dealership registration has been submitted successfully. Confirmation email sent!</p>
            <div className="flex justify-center">
              <div className="relative">
                <Mail className="w-6 h-6 text-cyan-600 animate-bounce-gentle" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-3 h-3 bg-cyan-200 rounded-full animate-float-slow opacity-40"></div>
        <div className="absolute top-60 right-16 w-4 h-4 bg-blue-200 rounded-full animate-float-medium opacity-40"></div>
        <div className="absolute bottom-40 left-16 w-2 h-2 bg-cyan-300 rounded-full animate-float-fast opacity-40"></div>
        <div className="absolute bottom-60 right-20 w-5 h-5 bg-blue-100 rounded-full animate-float-slow opacity-40"></div>
        <div className="absolute top-40 left-1/2 w-3 h-3 bg-cyan-100 rounded-full animate-float-medium opacity-40"></div>
      </div>

      {/* Home Icon */}
      <button
        onClick={handleHomeClick}
        className="fixed bottom-6 right-6 z-10 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 group animate-float"
        title="Go to Home"
      >
        <Home className="w-6 h-6 text-cyan-600 group-hover:text-cyan-700 transition-all duration-300 group-hover:rotate-12" />
      </button>

      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl transform animate-slide-up relative overflow-hidden">
        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-100 via-transparent to-blue-100 animate-pulse opacity-20"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8 animate-slide-down">
            <h1 className="text-4xl font-bold text-cyan-600 mb-2 animate-glow">
              Delna Dealership
            </h1>
            <p className="text-gray-600 text-lg animate-fade-in animation-delay-300">Join our premium network</p>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mt-4 rounded-full animate-expand"></div>
          </div>

        <div className="space-y-6 animate-stagger-in">
          {/* Name and Firm Name */}
          <div className="grid md:grid-cols-2 gap-6 animate-slide-in-left">
            <InputField 
              icon={User} 
              label="Full Name" 
              name="name" 
              placeholder="Enter your full name" 
            />
            <InputField 
              icon={Building} 
              label="Firm Name" 
              name="firmName" 
              placeholder="Enter firm name" 
            />
          </div>

          {/* State and City */}
          <div className="grid md:grid-cols-2 gap-6 animate-slide-in-right">
            <InputField icon={MapPin} label="State" name="state">
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('state')}
                onBlur={() => setFocusedField('')}
                disabled={loadingStates}
                className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 focus:outline-none transform hover:scale-[1.02] ${
                  loadingStates
                    ? 'bg-gray-100 cursor-not-allowed'
                    : errors.state 
                      ? 'border-red-400 bg-red-50 animate-shake' 
                      : focusedField === 'state' 
                        ? 'border-cyan-400 bg-cyan-50 shadow-md scale-[1.02]' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <option value="">
                  {loadingStates ? 'Loading states...' : 'Select State'}
                </option>
                {states.map(state => (
                  <option key={state.state_code} value={state.name}>{state.name}</option>
                ))}
              </select>
            </InputField>

            <InputField icon={MapPin} label="City" name="city">
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('city')}
                onBlur={() => setFocusedField('')}
                disabled={!formData.state || loadingCities}
                className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 focus:outline-none transform hover:scale-[1.02] ${
                  !formData.state || loadingCities
                    ? 'bg-gray-100 cursor-not-allowed' 
                    : errors.city 
                      ? 'border-red-400 bg-red-50 animate-shake' 
                      : focusedField === 'city' 
                        ? 'border-cyan-400 bg-cyan-50 shadow-md scale-[1.02]' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <option value="">
                  {loadingCities 
                    ? 'Loading cities...' 
                    : !formData.state 
                      ? 'First select a state' 
                      : 'Select City'
                  }
                </option>
                {cities.map(city => (
                  <option key={city.id} value={city.name}>{city.name}</option>
                ))}
              </select>
            </InputField>
          </div>

          {/* Address */}
          <div className="animate-slide-in-left animation-delay-200">
            <InputField 
              icon={MapPin} 
              label="Address" 
              name="address" 
              placeholder="Enter complete address" 
            />
          </div>

          {/* Email and Phone */}
          <div className="grid md:grid-cols-2 gap-6 animate-slide-in-right animation-delay-300">
            <InputField 
              icon={Mail} 
              label="Email ID" 
              name="email" 
              type="email" 
              placeholder="Enter email address" 
            />
            <InputField 
              icon={Phone} 
              label="Phone Number" 
              name="phone" 
              type="tel" 
              placeholder="Enter phone number" 
            />
          </div>

          {/* Description */}
          <div className="animate-slide-in-up animation-delay-400">
            <InputField icon={FileText} label="Description / Message" name="description">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('description')}
                onBlur={() => setFocusedField('')}
                placeholder="Tell us about your business, experience, and why you'd like to join our network..."
                rows="4"
                className={`w-full px-4 py-3 border-2 rounded-lg resize-none transition-all duration-300 focus:outline-none transform hover:scale-[1.01] ${
                  focusedField === 'description' 
                    ? 'border-cyan-400 bg-cyan-50 shadow-md scale-[1.01]' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              />
            </InputField>
          </div>

          {/* Error message for email sending */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-slide-in-up">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4 animate-slide-in-up animation-delay-500">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:shadow-xl animate-gradient-x'
              }`}
            >
              <div className="flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 mr-3 animate-spin" />
                    <span className="animate-pulse">Sending Email...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:translate-x-1" />
                    Submit Registration
                  </>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm animate-fade-in animation-delay-600">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-8 h-0.5 bg-cyan-300 animate-expand-left"></div>
            <Building className="w-4 h-4 text-cyan-400 animate-pulse" />
            <div className="w-8 h-0.5 bg-cyan-300 animate-expand-right"></div>
          </div>
          <p>© 2025 Delna. All rights reserved.</p>
        </div>
        </div>
      </div>

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 5px rgba(6, 182, 212, 0.3); }
          50% { text-shadow: 0 0 20px rgba(6, 182, 212, 0.6); }
        }
        
        @keyframes expand {
          from { width: 0; }
          to { width: 6rem; }
        }
        
        @keyframes expand-left {
          from { width: 0; margin-right: auto; }
          to { width: 2rem; margin-right: auto; }
        }
        
        @keyframes expand-right {
          from { width: 0; margin-left: auto; }
          to { width: 2rem; margin-left: auto; }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.6s ease-out; }
        .animate-slide-down { animation: slide-down 0.6s ease-out; }
        .animate-slide-in-left { animation: slide-in-left 0.6s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.6s ease-out; }
        .animate-slide-in-up { animation: slide-up 0.6s ease-out; }
        .animate-scale-up { animation: scale-up 0.6s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 3.5s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 2.5s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-expand { animation: expand 0.8s ease-out; }
        .animate-expand-left { animation: expand-left 0.8s ease-out; }
        .animate-expand-right { animation: expand-right 0.8s ease-out; }
        .animate-gradient-x { 
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
};

export default DealershipForm;