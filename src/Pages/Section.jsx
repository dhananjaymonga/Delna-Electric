import React from 'react'
import { Battery, Bolt, Globe2, Lightbulb, Shield, Sun, Wind } from 'lucide-react';

const Section = () => {
  return (
    <div>
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
          Innovating Excellence  Our In House R&D Team

        </h2>
        <p className="text-gray-600 mb-6">

At Delna, innovation drives everything we do. Our dedicated in-house R&D team is constantly developing cutting-edge solutions across our entire product range — from lighting and wiring to conduit pipes, MCBs, and exhaust systems. With a strong focus on technological advancement, quality enhancement, and energy efficiency, we ensure that every Delna product delivers superior performance, durability, and safety. Each solution is crafted to meet and exceed the highest industry standards, powering modern spaces with reliability and smart engineering.        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <span>
            Advanced Technology

              </span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe2 className="w-6 h-6 text-blue-600" />
            <span> Strict quality tests
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-6 h-6 text-blue-600" />
            <span>Innovation First</span>
          </div>
          <div className="flex items-center space-x-2">
            <Battery className="w-6 h-6 text-blue-600" />
            <span> Energy-efficient solutions

            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Section