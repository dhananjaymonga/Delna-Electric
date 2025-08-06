import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Welcome to Delna Electric',
      subtitle: 'Innovation & Excellence',
      description: 'Experience innovation and excellence in everything we do. Discover our world-class products and services.',
      buttonText: 'Read More',
      buttonAction: () => console.log('Navigate to about')
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Professional Services',
      subtitle: 'Expert Support',
      description: 'Our team of certified professionals provides comprehensive electrical services with unmatched expertise.',
      buttonText: 'Contact Us',
      buttonAction: () => console.log('Navigate to contact')
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Power Grid Solutions',
      subtitle: 'Reliable Infrastructure',
      description: 'Building and maintaining robust electrical infrastructure for communities and industries across the region.',
      buttonText: 'Learn More',
      buttonAction: () => console.log('Navigate to services')
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Smart Energy Systems',
      subtitle: 'Future-Ready Solutions',
      description: 'Implementing intelligent electrical systems that adapt to modern energy demands and sustainability goals.',
      buttonText: 'Discover More',
      buttonAction: () => console.log('Navigate to technology')
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="relative h-[80vh] overflow-hidden">
        {/* Carousel Slides */}
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
              {/* Background with gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-sky-100">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-30"
                  style={{ backgroundImage: `url(${slide.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-sky-900/20 to-sky-800/20"></div>
              </div>
              
              {/* Content */}
              <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
                <div className={`transition-all duration-500 ${index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                  <div className="mb-4">
                    <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-sky-700 mb-2">
                      {slide.subtitle}
                    </span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                    {slide.id === 1 ? (
                      <>Welcome to <span className="bg-gradient-to-r from-sky-700 to-sky-800 bg-clip-text text-transparent">Delna Electric</span></>
                    ) : (
                      <span className="bg-gradient-to-r from-sky-700 to-sky-800 bg-clip-text text-transparent">{slide.title}</span>
                    )}
                  </h1>
                  <p className="text-xl text-gray-600 max-w-2xl mb-8">
                    {slide.description}
                  </p>
                  <button
                    className="bg-gradient-to-r from-sky-700 to-sky-800 text-white px-8 py-3 rounded-lg hover:from-sky-800 hover:to-sky-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={slide.buttonAction}
                  >
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-gray-800 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-gray-800 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;