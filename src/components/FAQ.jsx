import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQAccordion = ({ sections }) => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (sectionTitle, questionIndex) => {
    const key = `${sectionTitle}-${questionIndex}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-purple-600 mb-4">{section.title}</h3>
          <div className="space-y-4">
            {section.items.map((item, itemIndex) => {
              const key = `${section.title}-${itemIndex}`;
              const isOpen = openItems[key];
              
              return (
                <div key={itemIndex} className="border-b border-gray-200 last:border-0">
                  <button
                    className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                    onClick={() => toggleItem(section.title, itemIndex)}
                  >
                    <span className="font-medium text-gray-900">{item.question}</span>
                    {isOpen ? (
                      <ChevronUp className="text-purple-600 w-5 h-5" />
                    ) : (
                      <ChevronDown className="text-purple-600 w-5 h-5" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-96 pb-4' : 'max-h-0'
                    }`}
                  >
                    <div className="text-gray-600">{item.answer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const FAQ = () => {
  const faqSections = [
    {
      title: "Electrical Wires",
      items: [
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
      items: [
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
      items: [
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
      title: "General Questions About Delna Electricals",
      items: [
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
          question: "Does Delna Electricals offer customized electrical solutions?",
          answer: "Yes, we provide customized electrical solutions for large-scale residential, commercial, and industrial projects, ensuring tailored services for our clients."
        },
        {
          question: "Why should I choose Delna Electricals over other brands?",
          answer: (
            <div className="space-y-2">
              <p>We offer:</p>
              <ul className="list-none space-y-1">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  Premium quality products that meet national and international standards.
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  Advanced R&D for innovative and durable solutions.
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  Energy-efficient and safe electrical solutions.
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  Excellent after-sales support and warranty coverage.
                </li>
              </ul>
            </div>
          )
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600">
            Find answers to common questions about our products and services.
          </p>
        </div>
        <FAQAccordion sections={faqSections} />
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
  );
};

export default FAQ;