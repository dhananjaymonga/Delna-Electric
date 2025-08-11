import React, { useState } from 'react';
import { Download, FileText, Eye, Calendar, ArrowRight, CheckCircle } from 'lucide-react';

const BrochuresPage = () => {
  const [downloadedItems, setDownloadedItems] = useState(new Set());

  const brochures = [
    {
      id: 1,
      title: "Complete Product Catalog 2025",
      description: "Comprehensive overview of all our electrical products and solutions",
      category: "General",
      size: "15.2 MB",
      pages: 48,
      language: "English",
      lastUpdated: "January 2025",
      image: "/brochure-covers/catalog-2025.jpg",
      downloadUrl: "/downloads/product-catalog-2025.pdf"
    },
    {
      id: 2,
      title: "LED Lighting Solutions",
      description: "Energy-efficient LED lighting products for all applications",
      category: "Lighting",
      size: "8.5 MB",
      pages: 24,
      language: "English",
      lastUpdated: "December 2024",
      image: "/brochure-covers/led-lighting.jpg",
      downloadUrl: "/downloads/led-lighting-brochure.pdf"
    },
    {
      id: 3,
      title: "Submersible Pumps Range",
      description: "Complete range of high-efficiency submersible pumps",
      category: "Pumps",
      size: "6.8 MB",
      pages: 16,
      language: "English",
      lastUpdated: "November 2024",
      image: "/brochure-covers/pumps.jpg",
      downloadUrl: "/downloads/submersible-pumps.pdf"
    },
    {
      id: 4,
      title: "Electrical Wires & Cables",
      description: "Premium quality wires and cables for all electrical needs",
      category: "Wires",
      size: "4.2 MB",
      pages: 12,
      language: "English",
      lastUpdated: "October 2024",
      image: "/brochure-covers/wires.jpg",
      downloadUrl: "/downloads/electrical-wires.pdf"
    },
    {
      id: 5,
      title: "Conduit Pipes & Fittings",
      description: "Durable conduit pipes and fittings for electrical installations",
      category: "Pipes",
      size: "3.8 MB",
      pages: 10,
      language: "English",
      lastUpdated: "September 2024",
      image: "/brochure-covers/conduits.jpg",
      downloadUrl: "/downloads/conduit-pipes.pdf"
    },
    {
      id: 6,
      title: "Installation Guidelines",
      description: "Professional installation guidelines and safety instructions",
      category: "Technical",
      size: "2.1 MB",
      pages: 8,
      language: "English",
      lastUpdated: "August 2024",
      image: "/brochure-covers/guidelines.jpg",
      downloadUrl: "/downloads/installation-guidelines.pdf"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Brochures' },
    { id: 'General', name: 'General Catalog' },
    { id: 'Lighting', name: 'LED Lighting' },
    { id: 'Pumps', name: 'Water Pumps' },
    { id: 'Wires', name: 'Electrical Wires' },
    { id: 'Pipes', name: 'Conduit Pipes' },
    { id: 'Technical', name: 'Technical Docs' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredBrochures = selectedCategory === 'all' 
    ? brochures 
    : brochures.filter(brochure => brochure.category === selectedCategory);

  const handleDownload = (brochure) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = brochure.downloadUrl;
    link.download = `${brochure.title.replace(/\s+/g, '-').toLowerCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Mark as downloaded
    setDownloadedItems(prev => new Set(prev).add(brochure.id));
    
    // Show success message
    alert(`${brochure.title} downloaded successfully!`);
  };

  const handlePreview = (brochure) => {
    // Open preview in new tab
    window.open(brochure.downloadUrl, '_blank');
  };

  const handleContactTeam = () => {
    window.location.href = '/contact';
  };

  const handleCustomBrochure = () => {
    window.location.href = '/dealership-form';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Brochures</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Download our latest brochures to explore our complete range of electrical products and solutions. 
              Get detailed specifications, features, and technical information.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">{brochures.length}</div>
            <div className="text-gray-600 text-sm">Available Brochures</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {brochures.reduce((sum, b) => sum + b.pages, 0)}
            </div>
            <div className="text-gray-600 text-sm">Total Pages</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">6</div>
            <div className="text-gray-600 text-sm">Product Categories</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">Free</div>
            <div className="text-gray-600 text-sm">Download Cost</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const count = category.id === 'all' 
                ? brochures.length 
                : brochures.filter(b => b.category === category.id).length;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {category.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Brochures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrochures.map((brochure) => (
            <div
              key={brochure.id}
              className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              {/* Brochure Cover */}
              <div className="relative h-48 bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <FileText className="w-16 h-16 mx-auto mb-3 opacity-80" />
                    <div className="text-lg font-bold">{brochure.category}</div>
                    <div className="text-sm opacity-90">{brochure.pages} Pages</div>
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-white text-blue-600 px-2 py-1 rounded text-xs font-bold">
                    {brochure.category}
                  </span>
                </div>

                {/* Downloaded Badge */}
                {downloadedItems.has(brochure.id) && (
                  <div className="absolute top-3 left-3">
                    <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Downloaded
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {brochure.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {brochure.description}
                </p>

                {/* Meta Information */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {brochure.lastUpdated}
                    </span>
                    <span>{brochure.size}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{brochure.pages} pages</span>
                    <span>{brochure.language}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handlePreview(brochure)}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </button>
                  <button
                    onClick={() => handleDownload(brochure)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredBrochures.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Brochures Found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Custom Information?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Contact our technical team for custom product 
            information, detailed specifications, or personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleContactTeam}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              Contact Technical Team
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            <button 
              onClick={handleCustomBrochure}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Request Custom Brochure
            </button>
          </div>
        </div>

        {/* Download All Section */}
        <div className="mt-8 bg-blue-50 rounded-lg border border-blue-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Download All Brochures</h3>
              <p className="text-gray-600 text-sm">
                Get the complete collection of all our product brochures in one ZIP file
              </p>
            </div>
            <button 
              onClick={() => {
                alert('All brochures download started!');
                // Simulate bulk download
                brochures.forEach(b => setDownloadedItems(prev => new Set(prev).add(b.id)));
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Download All (38.6 MB)
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-bold text-gray-900 mb-2">Mobile Optimized</h3>
            <p className="text-gray-600 text-sm">All brochures are optimized for viewing on mobile devices</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="font-bold text-gray-900 mb-2">Regular Updates</h3>
            <p className="text-gray-600 text-sm">Our brochures are updated regularly with latest product information</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="font-bold text-gray-900 mb-2">Multiple Languages</h3>
            <p className="text-gray-600 text-sm">Available in multiple languages for global accessibility</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BrochuresPage;