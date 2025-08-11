import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, Star, ZoomIn, Share2 } from 'lucide-react';


const ProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({});
  const [showZoom, setShowZoom] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState(false);
  const [imageLoadStates, setImageLoadStates] = useState({});

  // Fetch product data from public folder
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/products.json');
        if (!response.ok) {
          throw new Error('Failed to fetch products data');
        }
        const data = await response.json();
        setProducts(data.products || []);
        setCategories(data.categories || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Keyboard support for full screen image
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && fullScreenImage) {
        closeFullScreenImage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [fullScreenImage]);

  const showHeaderFooter = typeof window !== 'undefined' && window.location?.pathname === "/products";

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setFullScreenImage(false);
    document.body.style.overflow = 'auto';
  };

  const openFullScreenImage = () => {
    setFullScreenImage(true);
  };

  const closeFullScreenImage = () => {
    setFullScreenImage(false);
    setShowZoom(false);
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
  };

  const handleImageLoad = (productId) => {
    setImageLoadStates(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  // Zoom functionality for full screen images
  const handleMouseMove = (e) => {
    if (!fullScreenImage) return;
    
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2.5)',
    });
    setShowZoom(true);
  };

  const handleMouseLeave = () => {
    if (!fullScreenImage) return;
    setShowZoom(false);
    setZoomStyle({
      transform: 'scale(1)',
    });
  };

  const handleShare = async (product) => {
    const shareData = {
      title: product.name,
      text: `Check out this product: ${product.name} - ${product.description}`,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Product link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Product link copied to clipboard!');
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError);
      }
    }
  };

  // Helper functions to check if sections should be displayed
  const hasFeatures = (product) => {
    return product.features && Array.isArray(product.features) && product.features.length > 0;
  };

  const hasSpecifications = (product) => {
    return product.specifications && 
           typeof product.specifications === 'object' && 
           product.specifications !== null &&
           Object.keys(product.specifications).length > 0;
  };

  const hasVariants = (product) => {
    return product.variants && Array.isArray(product.variants) && product.variants.length > 0;
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-600 mt-4 text-lg">Loading Products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Unable to Load Products</h2>
          <p className="text-gray-600 mb-4">Please ensure products.json exists in the public folder</p>
          <p className="text-red-600 text-sm mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8 mt-16">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Categories</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              All Products ({products.length})
            </button>
            {categories.map((category) => {
              const count = products.filter(p => p.category.toLowerCase() === category.id.toLowerCase()).length;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="bg-white rounded-lg border border-gray-200 hover:shadow-lg cursor-pointer transition-all duration-200 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                {product.image && (
                  <div className="relative">
                    {!imageLoadStates[product.id] && (
                      <div className="w-full h-48 bg-gray-200 animate-pulse rounded-t-lg flex items-center justify-center">
                        <div className="text-gray-400 text-sm">Loading...</div>
                      </div>
                    )}
                    
                    <img
                      src={product.image.startsWith('/') ? product.image : `/${product.image}`}
                      alt={product.name}
                      onError={handleImageError}
                      onLoad={() => handleImageLoad(product.id)}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                      style={{ 
                        display: imageLoadStates[product.id] ? 'block' : 'none'
                      }}
                    />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {product.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 hover:opacity-100 transition-opacity duration-200">
                  <ZoomIn className="w-6 h-6 text-white bg-black/50 rounded p-1" />
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors w-full">
                  View Details
                </button>
                

              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                <p className="text-blue-600 font-medium">{selectedProduct.category}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleShare(selectedProduct)}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                  title="Share this product"
                >
                  <Share2 className="w-6 h-6 text-gray-600 hover:text-blue-600" />
                </button>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Image Section */}
              <div className="space-y-4">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      onError={handleImageError}
                      onClick={(e) => {
                        e.stopPropagation();
                        openFullScreenImage();
                      }}
                      className="w-full h-96 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                    />
                    
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium">
                        🔍 Click for full screen
                      </div>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded text-sm font-medium">
                        Click to open full screen view
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-6">
                <div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {selectedProduct.description}
                    </p>
                  </div>
                </div>

                {/* Features */}
                {hasFeatures(selectedProduct) && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      Key Features
                      <div className="ml-2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-700 text-xs font-bold">{selectedProduct.features.length}</span>
                      </div>
                    </h3>
                    <div className="space-y-3">
                      {selectedProduct.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-200"
                        >
                          <span className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Variants */}
                {hasVariants(selectedProduct) && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-6 h-1 bg-purple-600 rounded mr-3"></span>
                      Available Variants
                      <div className="ml-2 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 text-xs font-bold">{selectedProduct.variants.length}</span>
                      </div>
                    </h3>
                    <div className="space-y-4">
                      {selectedProduct.variants.map((variant, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 bg-white rounded-lg p-4 hover:border-purple-300 hover:shadow-md transition-all"
                        >
                          <h4 className="font-bold text-gray-900 mb-3 text-lg flex items-center">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                            {variant.model}
                            <div className="ml-auto bg-purple-500 text-white px-2 py-1 rounded text-xs font-bold">
                              NEW
                            </div>
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            {Object.entries(variant).map(([key, value]) => {
                              if (key === 'model') return null;
                              return (
                                <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="capitalize font-medium text-gray-600">
                                    {key.replace('_', ' ')}:
                                  </span>
                                  <span className="font-bold text-gray-900 bg-white px-2 py-1 rounded border">
                                    {Array.isArray(value) ? value.join(', ') : value}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specifications */}
                {hasSpecifications(selectedProduct) && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-6 h-1 bg-green-600 rounded mr-3"></span>
                      Specifications
                      <div className="ml-2 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-xs font-bold">{Object.keys(selectedProduct.specifications).length}</span>
                      </div>
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(selectedProduct.specifications).map(([key, value], index) => (
                        <div
                          key={key}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors border border-gray-200"
                        >
                          <span className="text-gray-600 font-semibold flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                            {key}:
                          </span>
                          <span className="text-gray-900 font-bold bg-white px-3 py-1 rounded border">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Image Modal with Zoom */}
      {fullScreenImage && selectedProduct && (
        <div className="fixed inset-0 z-60 bg-black/95">
          <div className="flex items-center justify-center min-h-screen p-4">
            {/* Close Button */}
            <button
              onClick={closeFullScreenImage}
              className="absolute top-4 right-4 z-70 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              <X className="w-8 h-8 text-white" />
            </button>

            {/* Instructions */}
            <div className="absolute top-4 left-4 z-70 bg-black/70 text-white px-4 py-2 rounded text-sm">
              Hover anywhere on image to zoom • Press ESC to close
            </div>

            {/* Full Screen Image with Zoom */}
            <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                onError={handleImageError}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`w-full h-full object-contain cursor-crosshair transition-transform duration-150 ${
                  showZoom ? 'zoom-image' : ''
                }`}
                style={showZoom ? zoomStyle : { transform: 'scale(1)' }}
              />
              
              {/* Zoom indicator */}
              {showZoom && (
                <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium">
                  🔍 2.5x Zoom - Move mouse to explore
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .zoom-image {
          transition: transform 0.1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductShowcase;