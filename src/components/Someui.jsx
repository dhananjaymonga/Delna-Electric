import React, { useEffect, useState } from 'react';
import { Battery, Bolt, Globe2, Lightbulb, Shield, Sun, Wind } from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bolt className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-800">PowerFuture</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Powering Tomorrow's
            <span className="text-blue-600"> Energy Solutions</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Sustainable energy solutions for a brighter future. Join us in creating a cleaner, more efficient world.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors">
              Learn More
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Sun className="w-12 h-12 text-yellow-500" />}
              title="Solar Solutions"
              description="Harness the power of the sun with our advanced solar technology solutions."
            />
            <FeatureCard
              icon={<Wind className="w-12 h-12 text-blue-500" />}
              title="Wind Energy"
              description="Clean, renewable wind energy systems for sustainable power generation."
            />
            <FeatureCard
              icon={<Battery className="w-12 h-12 text-green-500" />}
              title="Energy Storage"
              description="State-of-the-art battery solutions for reliable power storage."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <StatCard number="500+" text="Projects Completed" />
            <StatCard number="100K+" text="Homes Powered" />
            <StatCard number="1M+" text="CO₂ Reduced (tons)" />
            <StatCard number="50+" text="Countries Served" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Renewable Energy"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Leading the Energy Revolution
              </h2>
              <p className="text-gray-600 mb-6">
                With over two decades of experience in renewable energy solutions, we're committed to transforming how the world thinks about and uses energy. Our innovative approaches and cutting-edge technology make sustainable energy accessible to all.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <span>Certified Solutions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe2 className="w-6 h-6 text-blue-600" />
                  <span>Global Presence</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                  <span>Innovation First</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Battery className="w-6 h-6 text-blue-600" />
                  <span>Energy Storage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Bolt className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold">PowerFuture</span>
              </div>
              <p className="text-gray-400">
                Sustainable energy solutions for a brighter tomorrow.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400">Home</a></li>
                <li><a href="#" className="hover:text-blue-400">About</a></li>
                <li><a href="#" className="hover:text-blue-400">Services</a></li>
                <li><a href="#" className="hover:text-blue-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400">Solar Energy</a></li>
                <li><a href="#" className="hover:text-blue-400">Wind Power</a></li>
                <li><a href="#" className="hover:text-blue-400">Energy Storage</a></li>
                <li><a href="#" className="hover:text-blue-400">Consulting</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>123 Energy Street</li>
                <li>New York, NY 10001</li>
                <li>contact@powerfuture.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PowerFuture. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ number, text }) {
  return (
    <div className="p-6">
      <div className="text-4xl font-bold mb-2">{number}</div>
      <div className="text-blue-100">{text}</div>
    </div>
  );
}

export default App;