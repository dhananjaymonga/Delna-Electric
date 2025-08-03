import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Lightbulb, Zap, Wrench, Home, Building, Factory } from 'lucide-react';

const DelnaTestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      designation: "Electrical Contractor",
      location: "Delhi",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "Delna Spot Lights have transformed our commercial projects. The quality is exceptional and installation is hassle-free. Our clients are always impressed with the lighting aesthetics.",
      product: "Delna Spot Lights",
      category: "Lighting Solutions"
    },
    {
      id: 2,
      name: "Priya Sharma",
      designation: "Interior Designer",
      location: "Mumbai",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: "The Track Lights from Delna are perfect for modern interiors. The adjustable beam angles and premium build quality make them my go-to choice for residential projects.",
      product: "Delna Track Lights",
      category: "Lighting Solutions"
    },
    {
      id: 3,
      name: "Vikram Patel",
      designation: "Building Contractor",
      location: "Ahmedabad",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "Delna HRFR Wires are our standard choice for all construction projects. Superior insulation and fire resistance give us complete peace of mind for safety compliance.",
      product: "Delna HRFR Wires",
      category: "Electrical Wiring"
    },
    {
      id: 4,
      name: "Meera Reddy",
      designation: "Architect",
      location: "Bangalore",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "The Cylinder Lights provide excellent focused illumination for our office spaces. Energy efficient and long-lasting - exactly what we needed for our sustainable designs.",
      product: "Delna Cylinder Lights",
      category: "Commercial Lighting"
    },
    {
      id: 5,
      name: "Arjun Singh",
      designation: "Facility Manager",
      location: "Gurgaon",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      text: "Delna Deep Surface Lights are perfect for our warehouse lighting needs. Uniform light distribution and robust construction handle industrial environments beautifully.",
      product: "Delna Deep Surface Light",
      category: "Industrial Lighting"
    },
    {
      id: 6,
      name: "Anita Gupta",
      designation: "Home Builder",
      location: "Pune",
      rating: 5,
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      text: "The SMPS Adapters are incredibly reliable. We've been using them for LED installations across multiple projects with zero failures. Great value for money!",
      product: "Delna SMPS Adapters",
      category: "Power Solutions"
    },
    {
      id: 7,
      name: "Suresh Malhotra",
      designation: "Plumbing Contractor",
      location: "Jaipur",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
      text: "Delna Submersible Pumps have been running flawlessly for 3+ years. Excellent water flow rate and energy efficiency. Highly recommend for residential applications.",
      product: "Delna Submersible Pumps",
      category: "Water Solutions"
    },
    {
      id: 8,
      name: "Kavya Nair",
      designation: "Project Engineer",
      location: "Chennai",
      rating: 5,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      text: "Delna Conduit Pipes provide excellent cable protection. Easy to install and durable construction ensures our electrical systems are safe and organized.",
      product: "Delna Conduit Pipes",
      category: "Cable Management"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(nextSlide, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, currentSlide]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Lighting Solutions':
      case 'Commercial Lighting':
      case 'Industrial Lighting':
        return <Lightbulb className="w-5 h-5 text-yellow-500" />;
      case 'Electrical Wiring':
      case 'Power Solutions':
        return <Zap className="w-5 h-5 text-blue-500" />;
      case 'Water Solutions':
        return <Home className="w-5 h-5 text-cyan-500" />;
      case 'Cable Management':
        return <Wrench className="w-5 h-5 text-green-500" />;
      default:
        return <Building className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from professionals who trust Delna for their electrical and lighting solutions
          </p>
        </div>

        {/* Testimonials Grid - 3 cards visible */}
        <div className="relative">
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            {/* Show 3 testimonials at a time */}
            {[0, 1, 2].map((offset) => {
              const index = (currentSlide + offset) % testimonials.length;
              const testimonial = testimonials[index];
              
              return (
                <div
                  key={`${testimonial.id}-${offset}`}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                    offset === 1 ? 'lg:scale-105 lg:shadow-xl border-2 border-blue-100' : ''
                  }`}
                >
                  {/* Quote Icon */}
                  <div className="flex justify-between items-start mb-4">
                    <Quote className="w-8 h-8 text-blue-200" />
                    <div className="flex items-center space-x-1">
                      {getCategoryIcon(testimonial.category)}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                    "{testimonial.text}"
                  </blockquote>

                  {/* Product Info */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-500 mb-1">Product Used</p>
                    <p className="font-semibold text-blue-700 text-sm">{testimonial.product}</p>
                    <p className="text-xs text-gray-600">{testimonial.category}</p>
                  </div>

                  {/* Customer Info */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-blue-600 font-medium">{testimonial.designation}</p>
                      <p className="text-xs text-gray-500">{testimonial.location}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-blue-50 rounded-full p-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 group z-10"
          >
            <ChevronLeft className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-blue-50 rounded-full p-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 group z-10"
          >
            <ChevronRight className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center space-x-2 mb-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-blue-500' 
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>


      </div>
    </div>
  );
};

export default DelnaTestimonialSlider;