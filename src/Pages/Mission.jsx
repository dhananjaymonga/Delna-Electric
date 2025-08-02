import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Users, Rocket, Award, Globe, Leaf, Zap, Home, Factory, Shield} from 'lucide-react';
import {  Lightbulb, Wrench} from "lucide-react"
import Navbar from '../components/Navbar';
import Footer from './Footer';

function ServiceCard({ icon: Icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function App() {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-purple-50 to-blue-50">
      <Navbar />
      
      {/* Mission & Vision Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <section>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-blue-600">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
We are committed to delivering high-quality electrical products that redefine safety, durability, and performance — empowering both homes and industries with smart, reliable energy solutions.                </p>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-blue-600">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our vision is to be a global leader in the electrical industry, setting new benchmarks for quality, innovation, and sustainability. We strive to revolutionize the way the world experiences electricity by providing cutting-edge solutions that ensure safety, efficiency, and energy conservation.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Residential Solutions Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <section>
            <h2 className="text-4xl font-bold text-center mb-4">Residential Solutions</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              We provide top-tier residential electrical solutions that ensure safety, efficiency, and aesthetic appeal.
            </p>
          </section>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <ServiceCard
              icon={Home}
              title="Electrical Wiring and Rewiring"
              description="Meticulous installation and upgrading of electrical wiring to ensure safety and compliance with the latest standards."
              delay={0.2}
            />
            <ServiceCard
              icon={Lightbulb}
              title="Lighting Solutions"
              description="Energy-efficient lighting installations that enhance the ambiance of your home while reducing energy consumption."
              delay={0.4}
            />
            <ServiceCard
              icon={Shield}
              title="Safety Inspections"
              description="Thorough electrical safety inspections to identify potential hazards, ensuring peace of mind for homeowners."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Industrial Installations Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <section>
            <h2 className="text-4xl font-bold text-center mb-4">Industrial Installations</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Comprehensive industrial electrical services ensuring safe and efficient operation of your facility.
            </p>
          </section>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <ServiceCard
              icon={Factory}
              title="Industrial Electrification"
              description="Complete electrical installations for industrial plants, ensuring all systems are safe, efficient, and compliant with industry standards."
              delay={0.2}
            />
            <ServiceCard
              icon={Factory}
              title="Turnkey Factory Electrical Works"
              description="Our turnkey solutions manage everything from design and installation to testing and commissioning."
              delay={0.4}
            />
            <ServiceCard
              icon={Wrench}
              title="Factory Maintenance"
              description="Scheduled maintenance services to prevent downtime and ensure optimal performance of your electrical systems."
              delay={0.6}
            />
          </div>
        </div>
      </section>
      
      {/* <Footer /> */}
    </div>
  );
}

export default App;