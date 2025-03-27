import React, { useState } from 'react';
import {useLocation } from "react-router-dom";
import Navbar from './Navbar';
import Footer from '../Pages/Footer';
import { 
  Zap, 
  Cable, 
  Lightbulb, 
  Building2, 
  ChevronDown,
  Shield, 
  MapPin,
  Phone,
  Clock,
  CheckCircle2
} from 'lucide-react';

const faqCategories = [
  {
    title: "Electrical Wires",
    icon: <Cable className="w-6 h-6" />,
    description: "High-quality electrical wires for all your needs",
    questions: [
      {
        question: "What types of electrical wires does Delna Electricals offer?",
        answer: "We offer a wide range of high-quality electrical wires, including household wiring, industrial wiring, flexible wires, flame-retardant (FR), and zero halogen flame-retardant (ZHFR) wires designed for enhanced safety and efficiency."
      },
      {
        question: "Are your electrical wires safe for home and industrial use?",
        answer: "Yes, our wires meet the highest safety standards, ensuring high conductivity, heat resistance, and long-term durability, making them ideal for both residential and industrial applications."
      },
      {
        question: "How do I choose the right wire for my needs?",
        answer: "The choice depends on the electrical load, application, and environment. Our experts can guide you in selecting the best wire based on your requirements."
      },
      {
        question: "Do your wires meet national safety standards?",
        answer: "Absolutely! Our wires are ISI-certified and meet all Bureau of Indian Standards (BIS) regulations, ensuring safety and reliability."
      }
    ]
  },
  {
    title: "Electrical Conduit Pipes",
    icon: <Zap className="w-6 h-6" />,
    description: "Premium quality conduit pipes for safe installations",
    questions: [
      {
        question: "What types of electrical conduit pipes do you offer?",
        answer: "We provide a variety of extra pure PVC conduit pipes, rigid conduit pipes, and flexible conduit pipes, suitable for residential, commercial, and industrial installations."
      },
      {
        question: "Why should I use electrical conduit pipes?",
        answer: "Our conduit pipes protect electrical wiring from physical damage, moisture, and corrosion, ensuring long-lasting and safe electrical installations."
      },
      {
        question: "Can your conduit pipes be used for underground wiring?",
        answer: "Yes, our rigid and heavy-duty conduit pipes are designed for underground wiring, offering excellent moisture and impact resistance."
      }
    ]
  },
  {
    title: "Lighting Solutions",
    icon: <Lightbulb className="w-6 h-6" />,
    description: "Energy-efficient LED lighting solutions",
    questions: [
      {
        question: "What types of lighting solutions does Delna Electricals offer?",
        answer: "We provide a wide range of LED lighting solutions, including LED bulbs, panel lights, floodlights, and street lights, designed for energy efficiency and superior illumination."
      },
      {
        question: "Are LED lights better than traditional bulbs?",
        answer: "Yes, LED lights consume up to 80% less energy, last much longer, and provide brighter, more efficient lighting compared to traditional bulbs."
      },
      {
        question: "Do you offer smart lighting solutions?",
        answer: "Yes, we offer smart LED lighting options with features like dimmable brightness, motion sensors, and remote control via mobile apps."
      },
      {
        question: "How long do your LED lights last?",
        answer: "Our LED lights have an average lifespan of 50,000 to 100,000 hours, making them a long-term, cost-effective solution."
      }
    ]
  },
  {
    title: "About Delna Electricals",
    icon: <Building2 className="w-6 h-6" />,
    description: "Learn more about our company and services",
    questions: [
      {
        question: "Where is Delna Electricals Pvt. Ltd. located?",
        answer: "We are a Delhi-based company established in 2015, with operations in 7 states and a strong network of 450+ dealers."
      },
      {
        question: "Do you offer warranties on your products?",
        answer: "Yes, all our products come with warranties, ensuring quality and durability. The warranty period varies depending on the product type."
      },
      {
        question: "How can I purchase Delna Electricals products?",
        answer: "Our products are available through our extensive dealer network across 7 states. You can also contact us for bulk orders and dealership inquiries."
      },
      {
        question: "Why should I choose Delna Electricals over other brands?",
        answer: (
          <div className="space-y-2">
            <p>We offer:</p>
            <ul className="space-y-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Premium quality products that meet national and international standards</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Advanced R&D for innovative and durable solutions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Energy-efficient and safe electrical solutions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Excellent after-sales support and warranty coverage</span>
              </li>
            </ul>
          </div>
        )
      }
    ]
  }
];

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-purple-200 last:border-none">
      <button
        className="w-full py-4 flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-purple-600 transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-gray-600 leading-relaxed">{answer}</div>
      </div>
    </div>
  );
}

function CategorySection({ category }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
          {category.icon}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-purple-500">{category.title}</h2>
          <p className="text-gray-600">{category.description}</p>
        </div>
      </div>
      <div className="space-y-2">
        {category.questions.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>
    </div>
  );
}

function App() {
   const location = useLocation();
    console.log("Current Path:", location.pathname); // Debugging ke liye
    
    const showHeaderFooter = location.pathname === "/Faq-Page"; 
  return (
    <>
    {showHeaderFooter && <Navbar />}

    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <Shield className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-purple-600 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our electrical products and services at Delna Electricals Pvt. Ltd.
          </p>
        </div>

        <div className="space-y-6">
          {faqCategories.map((category, index) => (
            <CategorySection key={index} category={category} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Have more questions? Feel free to{" "}
            <a href="/contact" className="text-purple-600 hover:text-purple-700 font-medium">
              contact us
            </a>
            ! We are happy to assist you in choosing the best electrical solutions for your needs.
          </p>
        </div>
      </div>
    </div>
       {showHeaderFooter && <Footer />}

    </>
  );
}

export default App;