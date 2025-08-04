import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle, Mail, MapPin, Building, User, Phone, FileText, Send, Loader, Home } from 'lucide-react';

// Move InputField outside the main component to prevent recreation on each render
const InputField = ({ 
  icon: Icon, 
  label, 
  name, 
  type = 'text', 
  placeholder, 
  children, 
  value,
  onChange,
  onFocus,
  onBlur,
  focusedField,
  errors 
}) => (
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
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
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

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleFocus = useCallback((fieldName) => {
    setFocusedField(fieldName);
  }, []);

  const handleBlur = useCallback(() => {
    setFocusedField('');
  }, []);

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
      // Simulate email sending (replace with actual EmailJS code)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', formData);
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

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-cyan-50 flex items-center justify-center p-4">
        {/* Home Icon for Success Page */}
        <button
          onClick={handleHomeClick}
          className="fixed bottom-6 right-6 z-10 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 group"
          title="Go to Home"
        >
          <Home className="w-6 h-6 text-cyan-600 group-hover:text-cyan-700 transition-colors duration-300" />
        </button>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-4 h-4 bg-green-300 rounded-full opacity-60"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-cyan-300 rounded-full opacity-60"></div>
          <div className="absolute bottom-32 left-20 w-5 h-5 bg-green-200 rounded-full opacity-60"></div>
          <div className="absolute bottom-20 right-32 w-2 h-2 bg-cyan-400 rounded-full opacity-60"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md w-full relative overflow-hidden">
          {/* Success ripple effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-100 via-transparent to-cyan-100 animate-pulse opacity-30"></div>
          
          <div className="relative z-10">
            <div className="relative">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border-4 border-green-200 animate-ping opacity-20"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Success!</h2>
            <p className="text-gray-600 mb-6">Your dealership registration has been submitted successfully. Confirmation email sent!</p>
            <div className="flex justify-center">
              <div className="relative">
                <Mail className="w-6 h-6 text-cyan-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 flex items-center justify-center p-4">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-3 h-3 bg-cyan-200 rounded-full opacity-40"></div>
        <div className="absolute top-60 right-16 w-4 h-4 bg-blue-200 rounded-full opacity-40"></div>
        <div className="absolute bottom-40 left-16 w-2 h-2 bg-cyan-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-60 right-20 w-5 h-5 bg-blue-100 rounded-full opacity-40"></div>
        <div className="absolute top-40 left-1/2 w-3 h-3 bg-cyan-100 rounded-full opacity-40"></div>
      </div>

      {/* Home Icon */}
      <button
        onClick={handleHomeClick}
        className="fixed bottom-6 right-6 z-10 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 group"
        title="Go to Home"
      >
        <Home className="w-6 h-6 text-cyan-600 group-hover:text-cyan-700 transition-all duration-300 group-hover:rotate-12" />
      </button>

      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative overflow-hidden">
        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-100 via-transparent to-blue-100 animate-pulse opacity-20"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-cyan-600 mb-2">
              Delna Dealership
            </h1>
            <p className="text-gray-600 text-lg">Join our premium network</p>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="space-y-6">
            {/* Name and Firm Name */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputField 
                icon={User} 
                label="Full Name" 
                name="name" 
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                focusedField={focusedField}
                errors={errors}
              />
              <InputField 
                icon={Building} 
                label="Firm Name" 
                name="firmName" 
                placeholder="Enter firm name"
                value={formData.firmName}
                onChange={handleInputChange}
                onFocus={() => handleFocus('firmName')}
                onBlur={handleBlur}
                focusedField={focusedField}
                errors={errors}
              />
            </div>

            {/* State and City */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputField 
                icon={MapPin} 
                label="State" 
                name="state"
                focusedField={focusedField}
                errors={errors}
              >
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('state')}
                  onBlur={handleBlur}
                  disabled={loadingStates}
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 focus:outline-none transform hover:scale-[1.02] ${
                    loadingStates
                      ? 'bg-gray-100 cursor-not-allowed'
                      : errors.state 
                        ? 'border-red-400 bg-red-50' 
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

              <InputField 
                icon={MapPin} 
                label="City" 
                name="city"
                focusedField={focusedField}
                errors={errors}
              >
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('city')}
                  onBlur={handleBlur}
                  disabled={!formData.state || loadingCities}
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 focus:outline-none transform hover:scale-[1.02] ${
                    !formData.state || loadingCities
                      ? 'bg-gray-100 cursor-not-allowed' 
                      : errors.city 
                        ? 'border-red-400 bg-red-50' 
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
            <div>
              <InputField 
                icon={MapPin} 
                label="Address" 
                name="address" 
                placeholder="Enter complete address"
                value={formData.address}
                onChange={handleInputChange}
                onFocus={() => handleFocus('address')}
                onBlur={handleBlur}
                focusedField={focusedField}
                errors={errors}
              />
            </div>

            {/* Email and Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputField 
                icon={Mail} 
                label="Email ID" 
                name="email" 
                type="email" 
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                focusedField={focusedField}
                errors={errors}
              />
              <InputField 
                icon={Phone} 
                label="Phone Number" 
                name="phone" 
                type="tel" 
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleInputChange}
                onFocus={() => handleFocus('phone')}
                onBlur={handleBlur}
                focusedField={focusedField}
                errors={errors}
              />
            </div>

            <InputField 
              icon={FileText} 
              label="Description / Message" 
              name="description"
              focusedField={focusedField}
              errors={errors}
            >
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                onFocus={() => handleFocus('description')}
                onBlur={handleBlur}
                placeholder="Tell us about your business, experience, and why you'd like to join our network..."
                rows="4"
                className={`w-full px-4 py-3 border-2 rounded-lg resize-none transition-all duration-300 focus:outline-none transform hover:scale-[1.01] ${
                  focusedField === 'description' 
                    ? 'border-cyan-400 bg-cyan-50 shadow-md scale-[1.01]' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              />
            </InputField>

            {/* Error message for email sending */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:shadow-xl'
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
          <div className="text-center mt-8 text-gray-500 text-sm">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-8 h-0.5 bg-cyan-300"></div>
              <Building className="w-4 h-4 text-cyan-400 animate-pulse" />
              <div className="w-8 h-0.5 bg-cyan-300"></div>
            </div>
            <p>© 2025 Delna. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealershipForm;