import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'; // Add this import
import Navbar from '../components/Navbar';
import Footer from './Footer';

import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, Users, Rocket, Award, Globe, Leaf, Zap, Shield, CheckCircle, Target, Eye, Heart, Lightbulb, Factory, Truck, Wrench, Phone } from 'lucide-react';

// Custom hook to replace useInView
const useIntersectionObserver = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.triggerOnce) {
          observer.disconnect();
        }
      } else if (!options.triggerOnce) {
        setIsInView(false);
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px'
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.triggerOnce]);

  return [ref, isInView];
};

const Counter = ({ end, duration = 2, label }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useIntersectionObserver({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      setCount(Math.floor(end * percentage));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (inView) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, inView]);
  
  useEffect(() => {
    window.scrollTo(0,0)
   }, []);
 const showHeaderFooter = location.pathname === "/About"; // Sirf About page pe show hoga

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ type: "spring", duration: 1, bounce: 0.5 }}
        className="mb-2"
      >
        <span className="text-4xl font-bold text-blue-600">{count}+</span>
      </motion.div>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

const AnimatedSection = ({ children, delay = 0 }) => {
  const [ref, inView] = useIntersectionObserver({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};

const TimelineItem = ({ year, title, description, icon: Icon, index }) => {
  const controls = useAnimation();
  const ref = useRef();
  const inView = useInView(ref, {
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, delay: index * 0.2 }
      });
    }
  }, [controls, inView, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -100 }}
      animate={controls}
      className="flex gap-4 items-start"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="bg-blue-500 p-3 rounded-full text-white"
      >
        <Icon className="w-6 h-6" />
      </motion.div>
      <div>
        <span className="text-blue-500 font-semibold">{year}</span>
        <h3 className="text-xl font-bold mt-1">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </motion.div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4"
      >
        <Icon className="w-8 h-8 text-blue-600" />
      </motion.div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

function App() {
  const location = useLocation();
  const showHeaderFooter = location.pathname === "/About"; // Sirf About page pe show hoga
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
    },
    {
      name: "Sarah Williams",
      role: "Lead Designer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
    },
    {
      name: "David Chen",
      role: "Tech Lead",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
    }
  ];
  
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      {showHeaderFooter && <Navbar />}
      <div>
        <div className="min-h-screen bg-gray-50">
        {/* Note: Navbar and Footer components would be included here */}
        
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400 text-white overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center px-4 relative z-10"
          >
            <motion.h1 
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Innovation Meets Excellence
            </motion.h1>
            <motion.p 
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            >
              Discover our cutting-edge electrical solutions designed to power your world with reliability and efficiency.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto hover:bg-blue-50 transition-colors"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </section>

        {/* About Us Section */}
        <section className="py-20 bg-white px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">About Delna Electric</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  At Delna Electric, we're dedicated to delivering reliable, high-quality electrical solutions designed to meet the evolving needs of homes, businesses, and industries. With a focus on safety, innovation, and durability, we manufacture and supply a wide range of electrical products — from wiring and lighting to MCBs, conduit pipes, and power accessories.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection delay={0.2}>
                <div>
                  <h3 className="text-3xl font-bold mb-6">Powering Progress Since 2015</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Driven by a commitment to performance and long-term reliability, every Delna product is crafted to ensure maximum efficiency and value. Whether you're powering up a household or managing large-scale electrical infrastructure, our solutions are built to last.
                  </p>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    We operate with a clear vision: To make premium electrical products accessible, trusted, and built for the future. We believe great power begins with smart connections. At Delna, we don't just power circuits — we power progress.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    onClick={() => setShowInfo((prev) => !prev)}
                  >
                    Learn More About Our Products
                  </motion.button>
                  {showInfo && (
                    <div className="mt-4 text-blue-700 font-medium text-center">
                      Delna Electric offers a wide range of premium electrical products designed for safety, reliability, and innovation. Explore our catalog for more details!
                    </div>
                  )}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
                    alt="Delna Electric Manufacturing"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Mission, Vision & Values Section */}
        <section className="py-20 bg-gray-100 px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <h2 className="text-4xl font-bold text-center mb-16">Our Core Values</h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Target className="w-10 h-10 text-blue-600" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide innovative, reliable, and sustainable electrical solutions that enhance the quality of life while ensuring safety and efficiency in every connection.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Eye className="w-10 h-10 text-green-600" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To become India's most trusted electrical brand, leading the industry through innovation, quality, and customer satisfaction across all market segments.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Heart className="w-10 h-10 text-red-600" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">Our Values</h3>
                <p className="text-gray-600 leading-relaxed">
                  Integrity, innovation, sustainability, and customer-centricity form the foundation of everything we do, ensuring long-term partnerships and trust.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-4xl font-bold text-center mb-12">Our Impact in Numbers</h2>
            </AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              <Counter end={5500} label="Sites Covered" />
              <Counter end={2} label="Warehouses" />
              <Counter end={7} label="States" />
              <Counter end={10} label="Years of Expertise" />
              <Counter end={450} label="Channel Partners" />
            </div>
          </div>
        </section>

        {/* Why Choose Delna Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">Why Choose Delna?</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  We combine cutting-edge technology with decades of expertise to deliver electrical solutions that exceed expectations.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={Shield}
                title="Premium Quality"
                description="Premium quality materials and finishes ensure long-lasting performance in real-world conditions."
                index={0}
              />
              <FeatureCard
                icon={CheckCircle}
                title="Industry Compliance"
                description="Industry-compliant standards & safety focus with rigorous testing and quality assurance processes."
                index={1}
              />
              <FeatureCard
                icon={Factory}
                title="Manufacturing Excellence"
                description="State-of-the-art manufacturing facilities with advanced technology and skilled craftsmanship."
                index={2}
              />
              <FeatureCard
                icon={Truck}
                title="Reliable Distribution"
                description="Extensive distribution network ensuring timely delivery across multiple states and regions."
                index={3}
              />
              <FeatureCard
                icon={Wrench}
                title="Technical Support"
                description="Dedicated technical support team providing expert guidance and after-sales service."
                index={4}
              />
              <FeatureCard
                icon={Lightbulb}
                title="Continuous Innovation"
                description="Committed to research and development, continuously improving our products and services."
                index={5}
              />
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="py-20 bg-white px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <h2 className="text-4xl font-bold text-center mb-4">Our Journey</h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                From our humble beginnings to our current success, these milestones have helped us stay committed to excellence.
              </p>
            </AnimatedSection>

            <div className="space-y-12">
              {[
                {
                  year: "2015",
                  title: "Foundation of Excellence",
                  description: "Established with a vision to provide high-quality electrical solutions with unwavering commitment to customer satisfaction.",
                  icon: Users
                },
                {
                  year: "2020",
                  title: "Launch of Delna Brand",
                  description: "Introduced Delna as a premium brand, expanding our product portfolio to serve diverse market segments.",
                  icon: Rocket
                },
                {
                  year: "2021",
                  title: "Production Expansion",
                  description: "Established our second manufacturing facility, significantly increasing production capacity to meet growing market demand.",
                  icon: Factory
                },
                {
                  year: "2022",
                  title: "Quality Certification",
                  description: "Achieved multiple industry certifications and awards for quality excellence and customer satisfaction.",
                  icon: Award
                },
                {
                  year: "2023",
                  title: "Sustainability Initiative",
                  description: "Launched comprehensive eco-friendly manufacturing program, reducing our carbon footprint and promoting green practices.",
                  icon: Leaf
                },
                {
                  year: "2025",
                  title: "Future Innovation",
                  description: "Pioneering next-generation smart electrical solutions with IoT integration and AI-driven performance optimization.",
                  icon: Zap
                }
              ].map((item, index) => (
                <TimelineItem key={index} {...item} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-4xl font-bold mb-6">Ready to Power Your Future?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of satisfied customers who trust Delna Electric for their electrical needs. Experience the difference quality makes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                  onClick={() => window.location.href = "/contact"}
                >
                  <Phone className="w-5 h-5" />
                  Contact Us Today
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                  onClick={() => window.location.href = "/products"}
                >
                  <Globe className="w-5 h-5" />
                  View Our Products
                </motion.button>
              </div>
            </AnimatedSection>
          </div>
        </section>
        
        </div>
        
        {/* Note: Footer component would be included here */}
                 
      </div>
      {showHeaderFooter && <Footer />}
    </>
  );
}

export default App;