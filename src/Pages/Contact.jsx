import React, { useState, useEffect } from 'react';
import { 
  Zap, Phone, Star, Shield, Clock, Award, Users, Building, Home, Factory, 
  ChevronDown, Mail, MapPin, User, MessageSquare, DollarSign, Wrench
} from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from "./Footer"

const DelnaElectricContact = () => {
  const [projectCount, setProjectCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedService, setSelectedService] = useState('residential');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceType: 'residential',
    budget: ''
  });

  // Service-specific information
  const serviceInfo = {
    residential: {
      icon: Home,
      label: "Residential Services",
      color: "bg-blue-500",
      description: "Complete electrical solutions for your home",
      services: [
        "Home Rewiring & Panel Upgrades",
        "Outlet & Switch Installation", 
        "Lighting Design & Installation",
        "Ceiling Fan Installation",
        "Electrical Safety Inspections",
        "Smart Home Automation",
        "Generator Installation",
        "EV Charging Station Setup"
      ],
      budgetRanges: [
        "Under $500",
        "$500 - $1,500", 
        "$1,500 - $5,000",
        "$5,000 - $15,000",
        "Over $15,000"
      ]
    },
    commercial: {
      icon: Building,
      label: "Commercial Services", 
      color: "bg-green-500",
      description: "Professional electrical services for businesses",
      services: [
        "Office Building Electrical Systems",
        "Retail Store Lighting Solutions",
        "Security System Installation",
        "Energy-Efficient LED Retrofits",
        "Emergency Power Systems",
        "Data Center Electrical Infrastructure",
        "Parking Lot & Exterior Lighting",
        "Electrical Code Compliance"
      ],
      budgetRanges: [
        "Under $2,000",
        "$2,000 - $10,000",
        "$10,000 - $25,000", 
        "$25,000 - $75,000",
        "Over $75,000"
      ]
    },
    industrial: {
      icon: Factory,
      label: "Industrial Services",
      color: "bg-purple-500", 
      description: "Heavy-duty electrical solutions for industrial facilities",
      services: [
        "Manufacturing Equipment Wiring",
        "High-Voltage Power Distribution",
        "Motor Control & Automation",
        "Industrial Lighting Systems",
        "Power Factor Correction",
        "Electrical Maintenance Programs",
        "Hazardous Location Installations",
        "Plant Electrical Upgrades"
      ],
      budgetRanges: [
        "Under $10,000",
        "$10,000 - $50,000",
        "$50,000 - $150,000",
        "$150,000 - $500,000", 
        "Over $500,000"
      ]
    }
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Johnson Enterprises", 
      text: "Exceptional electrical work! Fast, professional, and reliable service.",
      rating: 5
    },
    {
      name: "Mike Chen",
      company: "Chen Manufacturing",
      text: "Delna Electric transformed our facility's electrical system. Outstanding!",
      rating: 5
    },
    {
      name: "Lisa Rodriguez", 
      company: "Rodriguez Holdings",
      text: "Available 24/7 and always delivers quality work. Highly recommended!",
      rating: 5
    }
  ];

  // Animated counters
  useEffect(() => {
    const projectTimer = setInterval(() => {
      setProjectCount(prev => {
        if (prev < 1247) return prev + 17;
        clearInterval(projectTimer);
        return 1247;
      });
    }, 30);

    const clientTimer = setInterval(() => {
      setClientCount(prev => {
        if (prev < 523) return prev + 7;
        clearInterval(clientTimer);
        return 523;
      });
    }, 50);

    return () => {
      clearInterval(projectTimer);
      clearInterval(clientTimer);
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handle service type change
  const handleServiceChange = (serviceType) => {
    setSelectedService(serviceType);
    setSelectedBudget('');
    setFormData(prev => ({
      ...prev,
      serviceType,
      budget: ''
    }));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.budget || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Thank you for your inquiry! We will contact you soon.');
  };

  const ElectricParticle = ({ delay = 0 }) => (
    <div 
      className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-70"
      style={{
        animation: `float 3s ease-in-out infinite ${delay}s, pulse 2s ease-in-out infinite ${delay}s`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }}
    />
  );

  const currentServiceInfo = serviceInfo[selectedService];
  const IconComponent = currentServiceInfo.icon;

  return (
    <>
    <div className=''>

    <Navbar/>
    </div>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden  ">
  
      {/* Background Effects */}
      <div className="absolute inset-0    bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Cdefs%3E%3Cpattern%20id%3D%22grid%22%20width%3D%2210%22%20height%3D%2210%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Cpath%20d%3D%22M%2010%200%20L%200%200%200%2010%22%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%220.5%22%20opacity%3D%220.1%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22url(%23grid)%22/%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Floating Electric Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none  ">
        {[...Array(12)].map((_, i) => (
          <ElectricParticle key={i} delay={i * 0.3} />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 mt-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="relative inline-block mb-8">
              <Zap className="w-16 h-16 text-yellow-400 mx-auto animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-white to-blue-400 bg-clip-text text-transparent">
                Get Your Free Quote
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Professional electrical services tailored to your needs. Licensed, insured, and available 24/7.
            </p>
          </div>

          {/* Service Type Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(serviceInfo).map(([key, service]) => {
              const ServiceIcon = service.icon;
              return (
                <button
                  key={key}
                  onClick={() => handleServiceChange(key)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 transform ${
                    selectedService === key 
                      ? `${service.color} text-white shadow-lg shadow-blue-500/25` 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <ServiceIcon className="w-6 h-6" />
                  <span className="font-semibold text-lg">{service.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            
            {/* Service Information Panel */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-2xl ${currentServiceInfo.color}`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{currentServiceInfo.label}</h3>
                  <p className="text-gray-300">{currentServiceInfo.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-yellow-400" />
                  Our Services Include:
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {currentServiceInfo.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="w-5 h-5 text-red-400 animate-pulse" />
                  <span className="text-white font-semibold">24/7 Emergency Service</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">Electrical emergencies don't wait. Neither do we.</p>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105">
                  Call (555) 123-4567
                </button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Request Your Quote</h3>
                  <p className="text-gray-300">Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>

                {/* Name Field */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Full Name"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Email Field */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email Address"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Phone Field */}
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Your Phone Number"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Service Type Field (Hidden but updates with buttons) */}
                <input type="hidden" name="serviceType" value={formData.serviceType} />

                {/* Budget Range Field */}
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 appearance-none"
                  >
                    <option value="" disabled className="bg-slate-800">Select Your Budget Range</option>
                    {currentServiceInfo.budgetRanges.map((range, index) => (
                      <option key={index} value={range} className="bg-slate-800">{range}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>

                {/* Message Field */}
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your project in detail..."
                    required
                    rows={4}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl transform flex items-center justify-center gap-3"
                >
                  <Zap className="w-5 h-5" />
                  Get My Free Quote
                </button>

                <p className="text-center text-sm text-gray-400">
                  We respect your privacy. Your information will never be shared.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 border border-white/20">
              <div className="text-4xl font-bold text-yellow-400 mb-2">{projectCount.toLocaleString()}+</div>
              <div className="text-gray-300 font-semibold">Projects Completed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 border border-white/20">
              <div className="text-4xl font-bold text-blue-400 mb-2">{clientCount.toLocaleString()}+</div>
              <div className="text-gray-300 font-semibold">Happy Clients</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-8 h-8 text-green-400 mr-2" />
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-gray-300 font-semibold">24/7 Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 border border-white/20">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="text-gray-300 font-semibold">5-Star Rated</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 min-h-[200px] flex flex-col justify-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-gray-300 mb-6 italic">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <div className="text-white font-semibold">{testimonials[currentTestimonial].name}</div>
              <div className="text-gray-400">{testimonials[currentTestimonial].company}</div>
            </div>
            <div className="flex justify-center gap-3 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index ? 'bg-yellow-400 scale-125' : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      <Footer />
    </div>
    </>
  );
};

export default DelnaElectricContact;