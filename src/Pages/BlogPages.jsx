import React, { useState, useEffect, useRef } from 'react';
import { Search, Calendar, Tag, Eye, ArrowRight, Zap, Shield, Lightbulb, Factory, Home, Wrench, ChevronUp, X } from 'lucide-react';

const DelnaElectricalsBlog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const observerRef = useRef();

  // Blog data from the document
  const blogPosts = [
    {
      id: 1,
      day: 1,
      title: "Why Quality Electrical Wires Matter in Modern Homes",
      excerpt: "Electrical wiring is the hidden lifeline of every modern home, yet it's often overlooked until problems arise...",
      content: `Electrical wiring is the hidden lifeline of every modern home, yet it's often overlooked until problems arise. Whether you're constructing a new house or upgrading an old one, the quality of wires used plays a vital role in safety, performance, and long-term cost savings.

Poor-quality wires may seem like a cheaper option upfront, but they come with high hidden risks—overheating, fire hazards, voltage drops, and frequent breakdowns. Over time, these issues can lead to expensive repairs or worse, property damage and safety hazards.

At Delna Electricals, we manufacture high-performance Double PVC and ZHFR wires that meet ISI standards. Our wires undergo rigorous testing for insulation strength, heat resistance, and conductivity to ensure they perform reliably under various conditions.

Investing in certified, high-quality wiring ensures:
• Safety from electrical fires
• Long-term durability
• Stable power flow
• Reduced maintenance

So, before you finalize your wiring, remember: good wires don't just carry electricity—they carry peace of mind. Choose right. Choose Delna.`,
      category: "Home Wiring",
      readTime: "3 min read",
      icon: Home,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      day: 2,
      title: "ZHFR vs PVC Wires: Which One Should You Choose?",
      excerpt: "When it comes to wiring, one size—or type—does not fit all. The choice between ZHFR and PVC wires depends on your application...",
      content: `When it comes to wiring, one size—or type—does not fit all. The choice between ZHFR and PVC wires depends on your application, safety requirements, and budget.

PVC Wires are commonly used due to their affordability and good insulation properties. They are suitable for general-purpose wiring in homes, shops, and offices where fire risk is minimal.

ZHFR Wires (Zero Halogen Flame Retardant), however, are designed for high-safety environments. In case of a fire, they emit very low smoke and zero toxic halogen gases, making evacuation easier and reducing health risks. These wires are ideal for schools, hospitals, commercial spaces, and modern homes that prioritize safety.

At Delna Electricals, we manufacture both PVC and ZHFR wires with precise insulation, flexibility, and long life. Not sure which one to choose? Reach out to our team, and we'll recommend the perfect fit for your installation.`,
      category: "Wire Types",
      readTime: "4 min read",
      icon: Shield,
      gradient: "from-green-500 to-teal-500"
    },
    {
      id: 3,
      day: 4,
      title: "Benefits of Double PVC Wires for Residential Wiring",
      excerpt: "Double PVC wires are quickly becoming the preferred choice for modern residential wiring—and for good reason...",
      content: "Double PVC wires are quickly becoming the preferred choice for modern residential wiring—and for good reason. With two layers of insulation, these wires offer enhanced protection from heat, abrasion, moisture, and even minor mechanical damage.",
      category: "Home Wiring",
      readTime: "3 min read",
      icon: Home,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      day: 5,
      title: "Fire Safety in Wiring: Role of Flame Retardant Cables",
      excerpt: "Fire safety isn't just about smoke detectors—it starts with the right wiring...",
      content: "Fire safety isn't just about smoke detectors—it starts with the right wiring. Flame Retardant and ZHFR cables are engineered to withstand high temperatures and prevent fire from spreading through electrical circuits.",
      category: "Safety",
      readTime: "5 min read",
      icon: Shield,
      gradient: "from-red-500 to-orange-500"
    },
    {
      id: 5,
      day: 6,
      title: "How to Choose the Right MCB for Your Home or Factory",
      excerpt: "Miniature Circuit Breakers (MCBs) protect your circuits from overload and short circuits—but choosing the right one is key...",
      content: "Miniature Circuit Breakers (MCBs) protect your circuits from overload and short circuits—but choosing the right one is key. For homes: Use single-pole or double-pole MCBs based on room loads and heavy appliances. For factories and commercial spaces: Go for TP or TPN MCBs.",
      category: "Components",
      readTime: "4 min read",
      icon: Wrench,
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      id: 6,
      day: 7,
      title: "Lighting Trends 2025: What's New in LED Tech",
      excerpt: "As LED lighting continues to evolve, 2025 is shaping up to be all about smart efficiency and sleek design...",
      content: "As LED lighting continues to evolve, 2025 is shaping up to be all about smart efficiency and sleek design. Smart LEDs with app and voice control, slim panels for ceiling integration, tunable white lights to adjust ambiance.",
      category: "Lighting",
      readTime: "4 min read",
      icon: Lightbulb,
      gradient: "from-yellow-500 to-amber-500"
    },
    {
      id: 7,
      day: 8,
      title: "What is Wire Thickness & Why It Matters in Wiring",
      excerpt: "Wire thickness directly affects electrical performance. Thicker wires allow more current flow and reduce the chances of overheating...",
      content: "Wire thickness directly affects electrical performance. Thicker wires allow more current flow and reduce the chances of overheating, while thinner wires may fail under heavy load. Selection depends on load requirement, installation environment, and appliance type.",
      category: "Technical",
      readTime: "3 min read",
      icon: Zap,
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      id: 8,
      day: 10,
      title: "Choosing the Right Submersible Pump for Coolers & Fountains",
      excerpt: "When it comes to efficient water circulation in desert coolers, decorative fountains, or compact water features...",
      content: "When it comes to efficient water circulation in desert coolers, decorative fountains, or compact water features, a full-sized agricultural pump isn't what you need. Small submersible pumps are quiet, energy-efficient, and easy to install.",
      category: "Pumps",
      readTime: "5 min read",
      icon: Factory,
      gradient: "from-teal-500 to-green-500"
    },
    {
      id: 9,
      day: 11,
      title: "How to Plan Safe and Efficient Electrical Wiring for Factories",
      excerpt: "Wiring a factory isn't just about connecting machines—it's about ensuring long-term safety, scalability, and efficiency...",
      content: "Wiring a factory isn't just about connecting machines—it's about ensuring long-term safety, scalability, and efficiency. A well-planned wiring layout can prevent costly breakdowns, save energy, and protect workers and equipment.",
      category: "Industrial",
      readTime: "6 min read",
      icon: Factory,
      gradient: "from-gray-600 to-gray-800"
    },
    {
      id: 10,
      day: 20,
      title: "Why Factories Need Flame Retardant Wiring More Than Ever",
      excerpt: "Factory environments pose a higher risk of electrical fires due to heavy machinery, continuous operation, and exposure to heat...",
      content: "Factory environments pose a higher risk of electrical fires due to heavy machinery, continuous operation, and exposure to heat. Using ordinary wires here can be dangerous. ZHFR wires prevent fire from spreading through conduits.",
      category: "Industrial",
      readTime: "4 min read",
      icon: Factory,
      gradient: "from-red-600 to-pink-600"
    }
  ];

  const categories = ['All', 'Home Wiring', 'Wire Types', 'Safety', 'Components', 'Lighting', 'Technical', 'Pumps', 'Industrial'];

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Intersection Observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Scroll progress and scroll to top
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.pageYOffset;
      const scrolled = (currentProgress / totalScroll) * 100;
      setScrollProgress(scrolled);
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setShowModal(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPost(null);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  const BlogCard = ({ post, index }) => {
    const IconComponent = post.icon;
    
    return (
      <div 
        className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 opacity-0 translate-y-8 animate-fade-in-up overflow-hidden group`}
        style={{ animationDelay: `${index * 0.1}s` }}
        ref={(el) => {
          if (el && observerRef.current) {
            observerRef.current.observe(el);
          }
        }}
      >
        {/* Card Header with Gradient */}
        <div className={`h-2 bg-gradient-to-r ${post.gradient}`}></div>
        
        <div className="p-6">
          {/* Day Badge and Category */}
          <div className="flex justify-between items-center mb-4">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${post.gradient} text-white shadow-lg`}>
              <Calendar className="w-3 h-3 mr-1" />
              Day {post.day}
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Tag className="w-3 h-3 mr-1" />
              {post.category}
            </div>
          </div>

          {/* Icon and Title */}
          <div className="flex items-start mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${post.gradient} text-white mr-4 group-hover:scale-110 transition-transform duration-300`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-sky-700 transition-colors duration-300">
                {post.title}
              </h3>
              <div className="flex items-center text-gray-500 text-sm">
                <Eye className="w-4 h-4 mr-1" />
                {post.readTime}
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Read More Button */}
          <button 
            onClick={() => openModal(post)}
            className="inline-flex items-center text-sky-600 font-semibold hover:text-sky-800 transition-colors duration-300 group-hover:translate-x-2 transform"
          >
            Read More
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-sky-500 to-sky-700 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-sky-800 to-sky-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-bounce"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-sky-400 opacity-20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-cyan-400 opacity-15 rounded-full animate-ping"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-400 opacity-10 rounded-full animate-spin slow"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in-down">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent animate-pulse">
                Delna Electricals Blog
              </h1>
            </div>
            <div className="animate-fade-in-up animation-delay-300">
              <p className="text-xl md:text-2xl text-sky-100 mb-8 leading-relaxed">
                Your trusted source for electrical insights, safety tips, and industry expertise
              </p>
            </div>
            <div className="animate-fade-in-up animation-delay-600">
              <div className="inline-flex items-center px-8 py-4 bg-white bg-opacity-20 rounded-full backdrop-blur-sm border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300">
                <Zap className="w-6 h-6 mr-3 animate-pulse" />
<span className="text-lg font-semibold text-gray-500">30 Days of Electrical Excellence</span>           
   </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-8 animate-fade-in-up">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search electrical insights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-sky-200 focus:border-sky-500 outline-none transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center animate-fade-in-up animation-delay-300">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-sky-600 to-sky-700 text-white shadow-xl'
                    : 'bg-white text-gray-700 hover:bg-sky-50 shadow-md hover:shadow-lg'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="max-w-md mx-auto">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No posts found</h3>
              <p className="text-gray-600">Try adjusting your search terms or selected category.</p>
            </div>
          </div>
        )}
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-50"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {/* Modal for Full Post Content */}
      {showModal && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in">
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${selectedPost.gradient} p-6 text-white relative`}>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center mb-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-xl mr-4">
                  <selectedPost.icon className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm font-semibold">Day {selectedPost.day}</span>
                    <span className="mx-2">•</span>
                    <Tag className="w-4 h-4 mr-1" />
                    <span className="text-sm">{selectedPost.category}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                    {selectedPost.title}
                  </h2>
                </div>
              </div>
              
              <div className="flex items-center text-white text-opacity-80">
                <Eye className="w-4 h-4 mr-2" />
                {selectedPost.readTime}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="prose prose-lg max-w-none">
                {selectedPost.content.split('\n').map((paragraph, index) => {
                  if (paragraph.trim() === '') return null;
                  
                  if (paragraph.startsWith('•')) {
                    return (
                      <div key={index} className="flex items-start mb-2">
                        <div className="w-2 h-2 bg-sky-500 rounded-full mr-3 mt-3 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">{paragraph.substring(1).trim()}</p>
                      </div>
                    );
                  }
                  
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
              
              {/* CTA Section */}
              <div className={`mt-8 p-6 bg-gradient-to-r ${selectedPost.gradient} bg-opacity-10 rounded-xl border-l-4 border-sky-500`}>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to upgrade your electrical setup?</h3>
                <p className="text-gray-600 mb-4">Contact Delna Electricals for high-quality, certified electrical products.</p>
                <button 
                  onClick={() => window.location.href = '/contact'}
                  className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:from-sky-600 hover:to-sky-700"
                >
                  Get Quote Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .animate-spin.slow {
          animation: spin 8s linear infinite;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DelnaElectricalsBlog;