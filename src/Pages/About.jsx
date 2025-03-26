import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Users, Rocket, Award, Globe, Leaf, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from './Footer';
const Counter = ({ end, duration = 2, label }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
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
  const [ref, inView] = useInView({
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
  const [ref, inView] = useInView({
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

function App() {
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

  return (
    <>
    <div>
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
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

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Counter end={5000} label="Sides" />
            <Counter end={15} label="Warehouses" />
            <Counter end={15} label="Awards Won" />
            <Counter end={15} label="Awards Won" />
            <Counter end={800} label="Customer statification" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Our dedicated team of experts brings together decades of experience in tech and innovation.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="text-center"
              >
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-4">Our Journey</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              From our humble beginnings to our current success, these milestones have helped us stay committed.
            </p>
          </AnimatedSection>

          <div className="space-y-12">
            {[
              {
                year: "2018",
                title: "Company Founded",
                description: "Our story began with a simple mission to create innovative solutions.",
                icon: Users
              },
              {
                year: "2019",
                title: "First Product Launch",
                description: "Successfully launched our flagship product to global markets.",
                icon: Rocket
              },
              {
                year: "2020",
                title: "International Expansion",
                description: "Opened new offices across three continents to serve our growing customer base.",
                icon: Globe
              },
              {
                year: "2021",
                title: "Innovation Award",
                description: "Recognized for breakthrough technology at the Tech Innovation Awards.",
                icon: Award
              },
              {
                year: "2022",
                title: "Sustainable Initiative",
                description: "Launched our eco-friendly program reducing carbon footprint.",
                icon: Leaf
              },
              {
                year: "2023",
                title: "Next Generation",
                description: "Began work on revolutionary AI-driven solutions.",
                icon: Zap
              }
            ].map((item, index) => (
              <TimelineItem key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>
      
    </div>
            {/* <Footer/> */}
    </div>
    </>
  );
}

export default App;