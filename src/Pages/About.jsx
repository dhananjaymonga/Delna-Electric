import React from 'react';
import { Target, Lightbulb, Home, Factory, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
const About = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen pt-16 bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Company Overview */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">Delna Electricals Pvt. Ltd.</h1>
            <p className="text-gray-600 leading-relaxed">
              Established in 2015, Delna Electricals Pvt. Ltd. is a Delhi-based company dedicated to providing world-class electrical solutions. With a strong commitment to quality, innovation, and safety, we specialize in manufacturing premium electrical wires, electrical conduit pipes, and cutting-edge lighting solutions that meet the highest industry standards.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Over the years, we have expanded our presence across 7 states, building a robust network of 450+ dealers who trust and promote our products. Our in-house Research & Development team continuously works on technological advancements, ensuring that our products remain at the forefront of the industry.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-3xl font-bold text-purple-600">7+</div>
                <div className="text-gray-600">States</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-3xl font-bold text-purple-600">450+</div>
                <div className="text-gray-600">Dealers</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Electrical Solutions"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-purple-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                At Delna Electricals Pvt. Ltd., our mission is to illuminate the world with the safest, most efficient, and innovative electrical solutions. We are committed to delivering the highest quality electrical wires, conduit pipes, and lighting solutions that redefine safety, durability, and performance. Through continuous innovation and excellence, we aim to empower homes, industries, and infrastructure with reliable and sustainable electrical products that enhance everyday life.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <Lightbulb className="w-8 h-8 text-purple-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Our vision is to be a global leader in the electrical industry, setting new benchmarks for quality, innovation, and sustainability. We strive to revolutionize the way the world experiences electricity by providing cutting-edge solutions that ensure safety, efficiency, and energy conservation. By fostering trust and excellence, we envision a future where Delna Electricals Pvt. Ltd. is synonymous with reliability, innovation, and progress in electrical infrastructure worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Residential Solutions */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <Home className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Residential Solutions</h3>
              </div>
              <p className="text-gray-600 mb-6">
                We are dedicated to providing top-tier residential electrical solutions that ensure safety, efficiency, and aesthetic appeal.
              </p>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Our Services Include:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Electrical Wiring and Rewiring</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Lighting Solutions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Safety Inspections</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Emergency Repairs</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Industrial Installations */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <Factory className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Industrial Installations</h3>
              </div>
              <p className="text-gray-600 mb-6">
                We specialize in delivering comprehensive industrial electrical services, ensuring that your facility operates safely and efficiently.
              </p>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Our Services Include:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Industrial Electrification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Turnkey Factory Electrical Works</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Factory Maintenance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Power Distribution Systems</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg shadow-md">
              <Award className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Expertise</h3>
              <p className="text-gray-600">
                Our team of certified professionals brings extensive experience to every project, ensuring high-quality workmanship.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg shadow-md">
              <Award className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Customer-Centric</h3>
              <p className="text-gray-600">
                We prioritize your needs, offering personalized solutions that align with your requirements and preferences.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg shadow-md">
              <Award className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Quality Assurance</h3>
              <p className="text-gray-600">
                We use premium materials and adhere to stringent quality standards to ensure the longevity and reliability of our installations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;