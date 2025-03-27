import Navbar from '../components/Navbar';
import {useLocation } from "react-router-dom";

import React, { useState,useEffect } from 'react';
import { ArrowRight, Users, Rocket, Award, Globe, Leaf, Zap } from 'lucide-react';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin } from 'lucide-react';
import Footer from './Footer';

const ContactPageClone = () => {

    const [isStatsVisible, setIsStatsVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);
      const [isFormVisible, setIsFormVisible] = useState(false);
      const [isProjectsVisible, setIsProjectsVisible] = useState(false);
    
      useEffect(() => {
        const handleScroll = () => {
          setScrollY(window.scrollY);
          if (window.scrollY > 400) {
            setIsFormVisible(true);
          }
          if (window.scrollY > 800) {
            setIsStatsVisible(true);
          }
          if (window.scrollY > 1200) {
            setIsProjectsVisible(true);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

      const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        contactSection?.scrollIntoView({ behavior: 'smooth' });
      };
      const location = useLocation();


 const showHeaderFooter = location.pathname === "/Contact"; // Sirf About page pe show hoga
    console.log("Current Path:", location.pathname);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
      

  return (
    <>
      <Navbar/>
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
            We're pushing the boundaries of technology to create solutions that matter.
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
<section className="py-24 px-4 relative overflow-hidden">
<div 
  className="absolute inset-0 z-0"
  style={{
    backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(0.2)',
  }}
/>
<div className="max-w-7xl mx-auto relative z-10">
  <div className="grid md:grid-cols-4 gap-8">
    {[
      { number: "250+", label: "Projects Completed" },
      { number: "50+", label: "Team Members" },
      { number: "30+", label: "Countries Served" },
      { number: "95%", label: "Client Satisfaction" }
    ].map((stat, index) => (
      <div 
        key={index}
        className={`text-center transform transition-all duration-1000 ${
          isStatsVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
        style={{ transitionDelay: `${index * 200}ms` }}
      >
        <div className="text-5xl font-bold text-white mb-2">{stat.number}</div>
        <div className="text-xl text-purple-200">{stat.label}</div>
      </div>
    ))}
  </div>
</div>
</section>
    <div className="min-h-screen bg-white p-4">
      <div className="container mx-auto grid md:grid-cols-2 gap-8  mt-22">
       {/* { Contact Information Section} */}
        <div className="space-y-6 mt-10">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Get in Touch</h1>
            <p className="text-gray-600 mt-2">Have questions or feedback? We'd love to hear from you.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
              <Mail className="text-blue-500 w-6 h-6" />
              <div>
                <p className="font-semibold text-gray-700">Email Us</p>
                <p className="text-gray-600 text-sm">Our support team will get back to you within 24 hours</p>
                <p className="text-gray-600 text-sm">info@electronic.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
              <Phone className="text-green-500 w-6 h-6" />
              <div>
                <p className="font-semibold text-gray-700">Call Us</p>
                <p className="text-gray-600 text-sm">Available Monday to Friday, 9am to 6pm EST</p>
                <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
              <MapPin className="text-red-500 w-6 h-6" />
              <div>
                <p className="font-semibold text-gray-700">Visit Us</p>
                <p className="text-gray-600 text-sm">123 Music Street, Harmony City, NC 10001</p>
                <a href="#" className="text-blue-500 text-sm">Get Directions</a>
              </div>
            </div>
          </div>
        </div>

         {/* Contact Form Section */}
       <div className="bg-white shadow-md rounded-lg p-6">

          <h2 className="text-xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
             <div>
               <label className="block text-gray-700 text-sm mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="How can we help you?"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us more about your inquiry"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Additional Section */}
      <div className="text-center mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Have More Questions?</h3>
        <p className="text-gray-600 mt-2">Check out our frequently asked questions for quick answers to common inquiries.</p>
        <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
          View FAQ
        </button>
      </div>

      {/* Business Hours */}
      <div className="text-center mt-8 bg-gray-50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-800">Business Hours</h4>
        <div className="mt-4 space-y-2">
          <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
          <p className="text-gray-600">Sunday: Closed</p>
        </div>
      </div>
    </div>
    {showHeaderFooter && <Footer />}

    </>
  );
};

export default ContactPageClone;
// import React, { useEffect, useState } from 'react';
// import { Building2, Mail, Phone, MapPin, Globe, ArrowDown, Code, Users, Zap, Target, Award, Briefcase } from 'lucide-react';

// function App() {
//   const [scrollY, setScrollY] = useState(0);
// const [isStatsVisible, setIsStatsVisible] = useState(false);

//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [isProjectsVisible, setIsProjectsVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//       if (window.scrollY > 400) {
//         setIsFormVisible(true);
//       }
//       if (window.scrollY > 800) {
//         setIsStatsVisible(true);
//       }
//       if (window.scrollY > 1200) {
//         setIsProjectsVisible(true);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToContact = () => {
//     const contactSection = document.getElementById('contact');
//     contactSection?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 text-gray-800">
//       {/* Hero Section */}
//       <section className="relative h-screen flex items-center justify-center overflow-hidden">
//         <div 
//           className="absolute inset-0 z-0"
//           style={{
//             backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80)',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             filter: 'brightness(0.3)',
//             transform: `translateY(${scrollY * 0.5}px)`,
//           }}
//         />
//         <div className="relative z-10 text-center px-4">
//           <h1 
//             className="text-7xl font-bold mb-6 transform transition-all duration-1000 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
//             style={{ 
//               opacity: 1 - scrollY / 500,
//               transform: `translateY(${scrollY * 0.2}px)`
//             }}
//           >
//             Delna
//           </h1>
//           <p 
//             className="text-2xl mb-8 max-w-3xl mx-auto text-white"
//             style={{ 
//               opacity: 1 - scrollY / 400,
//               transform: `translateY(${scrollY * 0.3}px)`
//             }}
//           >
//             Transforming ideas into digital reality with cutting-edge solutions
//           </p>
//           <button
//             onClick={scrollToContact}
//             className="animate-bounce absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white hover:text-purple-200 transition-colors"
//           >
//             <ArrowDown size={32} />
//           </button>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="py-24 px-4 bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Our Services</h2>
//           <div className="grid md:grid-cols-3 gap-12">
//             {[
//               { icon: Code, title: "Web Development", desc: "Creating responsive and dynamic web applications" },
//               { icon: Target, title: "Digital Strategy", desc: "Strategic planning for digital transformation" },
//               { icon: Zap, title: "Innovation", desc: "Cutting-edge solutions for modern challenges" }
//             ].map((service, index) => (
//               <div 
//                 key={index}
//                 className={`bg-white p-8 rounded-xl transform transition-all duration-1000 hover:scale-105 shadow-lg hover:shadow-xl border border-purple-100 ${
//                   scrollY > 500 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
//                 }`}
//                 style={{ transitionDelay: `${index * 200}ms` }}
//               >
//                 <service.icon size={48} className="mb-6 text-purple-600" />
//                 <h3 className="text-2xl font-bold mb-4 text-gray-800">{service.title}</h3>
//                 <p className="text-gray-600">{service.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-24 px-4 relative overflow-hidden">
//         <div 
//           className="absolute inset-0 z-0"
//           style={{
//             backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80)',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             filter: 'brightness(0.2)',
//           }}
//         />
//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="grid md:grid-cols-4 gap-8">
//             {[
//               { number: "250+", label: "Projects Completed" },
//               { number: "50+", label: "Team Members" },
//               { number: "30+", label: "Countries Served" },
//               { number: "95", label: "Client Satisfaction" }
//             ].map((stat, index) => (
//               <div 
//                 key={index}
//                 className={`text-center transform transition-all duration-1000 ${
//                   isStatsVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
//                 }`}
//                 style={{ transitionDelay: `${index * 200}ms` }}
//               >
//                 <div className="text-5xl font-bold text-white mb-2">{stat.number}</div>
//                 <div className="text-xl text-purple-200">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Company Details */}
//       <section className="py-24 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
//         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
//           <div 
//             className={`transform transition-all duration-1000 ${
//               scrollY > 300 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
//             }`}
//           >
//             <Building2 size={56} className="mb-8 text-purple-600" />
//             <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Our Company</h2>
//             <p className="text-gray-700 leading-relaxed text-lg mb-6">
//               With over a decade of experience in digital innovation, we've been at the forefront
//               of technological advancement, helping businesses transform their digital presence
//               and achieve unprecedented growth.
//             </p>
//             <div className="grid grid-cols-2 gap-6 mt-8">
//               <div className="flex items-center space-x-3">
//                 <Award className="text-purple-600" />
//                 <span className="text-gray-800">Award Winning</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Users className="text-purple-600" />
//                 <span className="text-gray-800">Expert Team</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Briefcase className="text-purple-600" />
//                 <span className="text-gray-800">Professional</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Target className="text-purple-600" />
//                 <span className="text-gray-800">Goal Oriented</span>
//               </div>
//             </div>
//           </div>
//           <div 
//             className={`transform transition-all duration-1000 delay-200 ${
//               scrollY > 300 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
//             }`}
//           >
//             <Globe size={56} className="mb-8 text-purple-600" />
//             <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Global Reach</h2>
//             <p className="text-gray-700 leading-relaxed text-lg mb-6">
//               Operating across multiple continents, we bring diverse perspectives and
//               innovative solutions to clients worldwide, ensuring cutting-edge technology
//               meets local expertise.
//             </p>
//             <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100">
//               <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Global Presence</h3>
//               <ul className="space-y-3">
//                 <li className="flex items-center space-x-2">
//                   <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
//                   <span className="text-gray-700">North America Headquarters</span>
//                 </li>
//                 <li className="flex items-center space-x-2">
//                   <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
//                   <span className="text-gray-700">European Operations Center</span>
//                 </li>
//                 <li className="flex items-center space-x-2">
//                   <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
//                   <span className="text-gray-700">Asia Pacific Hub</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" className="py-24 px-4 bg-gradient-to-br from-white to-purple-50">
//         <div className="max-w-5xl mx-auto">
//           <h2 className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Get in Touch</h2>
//           <div className="grid md:grid-cols-2 gap-16">
//             <div 
//               className={`transform transition-all duration-1000 ${
//                 isFormVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
//               }`}
//             >
//               <form className="space-y-8">
//                 <div>
//                   <label className="block text-lg font-medium mb-3 text-gray-700">Name</label>
//                   <input
//                     type="text"
//                     className="w-full px-5 py-3 rounded-lg bg-white border border-purple-200 focus:outline-none focus:border-purple-500 transition-colors duration-300 text-gray-800 placeholder-gray-400"
//                     placeholder="Your name"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-lg font-medium mb-3 text-gray-700">Email</label>
//                   <input
//                     type="email"
//                     className="w-full px-5 py-3 rounded-lg bg-white border border-purple-200 focus:outline-none focus:border-purple-500 transition-colors duration-300 text-gray-800 placeholder-gray-400"
//                     placeholder="your@email.com"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-lg font-medium mb-3 text-gray-700">Message</label>
//                   <textarea
//                     rows={5}
//                     className="w-full px-5 py-3 rounded-lg bg-white border border-purple-200 focus:outline-none focus:border-purple-500 transition-colors duration-300 text-gray-800 placeholder-gray-400"
//                     placeholder="Your message"
//                   ></textarea>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] text-lg shadow-lg hover:shadow-xl"
//                 >
//                   Send Message
//                 </button>
//               </form>
//             </div>
//             <div 
//               className={`space-y-8 transform transition-all duration-1000 delay-200 ${
//                 isFormVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
//               }`}
//             >
//               <div className="flex items-center space-x-6">
//                 <MapPin size={32} className="text-purple-600" />
//                 <div>
//                   <h3 className="text-xl font-medium mb-1 text-gray-800">Address</h3>
//                   <p className="text-gray-600 text-lg">123 Innovation Street, Tech City, TC 12345</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-6">
//                 <Phone size={32} className="text-purple-600" />
//                 <div>
//                   <h3 className="text-xl font-medium mb-1 text-gray-800">Phone</h3>
//                   <p className="text-gray-600 text-lg">+1 (555) 123-4567</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-6">
//                 <Mail size={32} className="text-purple-600" />
//                 <div>
//                   <h3 className="text-xl font-medium mb-1 text-gray-800">Email</h3>
//                   <p className="text-gray-600 text-lg">contact@delna.com</p>
//                 </div>
//               </div>
//               <div className="bg-white p-8 rounded-xl shadow-lg mt-12 border border-purple-100">
//                 <h3 className="text-2xl font-bold mb-4 text-gray-800">Business Hours</h3>
//                 <div className="space-y-3">
//                   <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
//                   <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
//                   <p className="text-gray-600">Sunday: Closed</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default App; 