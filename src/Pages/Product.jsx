// import React, { useState, useEffect } from 'react';
// import { ArrowLeft, X, Star, ZoomIn, Share2 } from 'lucide-react';

// const ProductShowcase = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [zoomStyle, setZoomStyle] = useState({});
//   const [showZoom, setShowZoom] = useState(false);
//   const [fullScreenImage, setFullScreenImage] = useState(false);
//   const [imageLoadStates, setImageLoadStates] = useState({});

//   // Fetch product data from public folder
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch('/products.json');
//         if (!response.ok) {
//           throw new Error('Failed to fetch products data');
//         }
//         const data = await response.json();
//         setProducts(data.products || []);
//         setCategories(data.categories || []);
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching products:', err);
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Keyboard support for full screen image
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'Escape' && fullScreenImage) {
//         closeFullScreenImage();
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [fullScreenImage]);

//   const showHeaderFooter = typeof window !== 'undefined' && window.location?.pathname === "/products";

//   const filteredProducts = selectedCategory === 'all' 
//     ? products 
//     : products.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());

//   const handleProductClick = (product) => {
//     setSelectedProduct(product);
//     document.body.style.overflow = 'hidden';
//   };

//   const closeModal = () => {
//     setSelectedProduct(null);
//     setFullScreenImage(false);
//     document.body.style.overflow = 'auto';
//   };

//   const openFullScreenImage = () => {
//     setFullScreenImage(true);
//   };

//   const closeFullScreenImage = () => {
//     setFullScreenImage(false);
//     setShowZoom(false);
//   };

//   const handleImageError = (e) => {
//     e.target.style.display = 'none';
//   };

//   // Simple image load handler
//   const handleImageLoad = (productId) => {
//     setImageLoadStates(prev => ({
//       ...prev,
//       [productId]: true
//     }));
//   };

//   // Zoom functionality for full screen images
//   const handleMouseMove = (e) => {
//     const { left, top, width, height } = e.target.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
    
//     setZoomStyle({
//       transformOrigin: `${x}% ${y}%`,
//       transform: 'scale(2.5)',
//     });
//     setShowZoom(true);
//   };

//   const handleMouseLeave = () => {
//     setShowZoom(false);
//     setZoomStyle({});
//   };

//   const handleShare = async (product) => {
//     const shareData = {
//       title: product.name,
//       text: `Check out this product: ${product.name} - ${product.description}`,
//       url: window.location.href
//     };

//     try {
//       if (navigator.share && navigator.canShare(shareData)) {
//         await navigator.share(shareData);
//       } else {
//         await navigator.clipboard.writeText(window.location.href);
//         alert('Product link copied to clipboard!');
//       }
//     } catch (error) {
//       console.error('Error sharing:', error);
//       try {
//         await navigator.clipboard.writeText(window.location.href);
//         alert('Product link copied to clipboard!');
//       } catch (clipboardError) {
//         console.error('Clipboard error:', clipboardError);
//       }
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
//           <p className="text-gray-600 mt-4 text-lg">Loading Products...</p>
//           <div className="mt-2 w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
//             <div className="h-full bg-blue-600 animate-pulse"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center p-8">
//           <div className="text-6xl mb-4">⚠️</div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Unable to Load Products</h2>
//           <p className="text-gray-600 mb-4">Please ensure products.json exists in the public folder</p>
//           <p className="text-red-600 text-sm mb-4">Error: {error}</p>
//           <button 
//             onClick={() => window.location.reload()} 
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Category Filter */}
//         <div className="mb-8 mt-16">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Categories</h2>
//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => setSelectedCategory('all')}
//               className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
//                 selectedCategory === 'all'
//                   ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
//                   : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-200'
//               }`}
//             >
//               All Products ({products.length})
//             </button>
//             {categories.map((category) => {
//               const count = products.filter(p => p.category.toLowerCase() === category.id.toLowerCase()).length;
//               return (
//                 <button
//                   key={category.id}
//                   onClick={() => setSelectedCategory(category.id)}
//                   className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
//                     selectedCategory === category.id
//                       ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
//                       : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-200'
//                   }`}
//                 >
//                   {category.name} ({count})
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredProducts.map((product, index) => (
//             <div
//               key={product.id}
//               onClick={() => handleProductClick(product)}
//               className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 cursor-pointer transition-all duration-500 transform hover:-translate-y-2 group"
//               style={{
//                 animationDelay: `${index * 100}ms`,
//                 animation: 'slideUp 0.6s ease-out forwards'
//               }}
//             >
//               <div className="relative overflow-hidden rounded-t-xl">
//                 {product.image && (
//                   <div className="relative">
//                     {/* Loading placeholder - only show if image hasn't loaded */}
//                     {!imageLoadStates[product.id] && (
//                       <div className="w-full h-48 bg-gray-200 animate-pulse rounded-t-xl flex items-center justify-center">
//                         <div className="text-gray-400 text-sm">Loading...</div>
//                       </div>
//                     )}
                    
//                     {/* Main image - always visible, no opacity manipulation */}
//                     <img
//                       src={product.image.startsWith('/') ? product.image : `/${product.image}`}
//                       alt={product.name}
//                       onError={handleImageError}
//                       onLoad={() => handleImageLoad(product.id)}
//                       className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-125"
//                       style={{ 
//                         display: imageLoadStates[product.id] ? 'block' : 'none'
//                       }}
//                     />
//                   </div>
//                 )}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 <div className="absolute top-3 right-3">
//                   <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
//                     {product.category}
//                   </span>
//                 </div>
//                 <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
//                   <ZoomIn className="w-8 h-8 text-white bg-black/50 rounded-full p-2 backdrop-blur-sm" />
//                 </div>
//               </div>
              
//               <div className="p-5">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
//                   {product.name}
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
//                   {product.description}
//                 </p>
                
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-1">
//                     {[...Array(5)].map((_, i) => (
//                       <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
//                     ))}
//                     <span className="text-gray-500 text-sm ml-2">(4.8)</span>
//                   </div>
//                   <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md">
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredProducts.length === 0 && (
//           <div className="text-center py-16">
//             <div className="text-6xl mb-4">🔍</div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
//             <p className="text-gray-600">Try selecting a different category</p>
//           </div>
//         )}
//       </div>

//       {/* Product Detail Modal */}
//       {selectedProduct && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
//           <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-modalSlideUp">
//             {/* Modal Header */}
//             <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
//                 <p className="text-blue-600 font-medium">{selectedProduct.category}</p>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <button
//                   onClick={() => handleShare(selectedProduct)}
//                   className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
//                   title="Share this product"
//                 >
//                   <Share2 className="w-6 h-6 text-gray-400 hover:text-blue-600 transition-colors duration-200" />
//                 </button>
//                 <button
//                   onClick={closeModal}
//                   className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>
//             </div>

//             <div className="grid lg:grid-cols-2 gap-8 p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
//               {/* Image Section */}
//               <div className="space-y-4">
//                 <div className="relative group">
//                   <div className="relative overflow-hidden rounded-xl bg-gray-100">
//                     <img
//                       src={selectedProduct.image}
//                       alt={selectedProduct.name}
//                       onError={handleImageError}
//                       onClick={openFullScreenImage}
//                       className="w-full h-96 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
//                     />
                    
//                     {/* Click to zoom indicator */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
//                       <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
//                         🔍 Click to zoom
//                       </div>
//                       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
//                         Click for detailed view
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Details Section */}
//               <div className="space-y-6">
//                 <div>
//                   <p className="text-gray-700 leading-relaxed text-lg">
//                     {selectedProduct.description}
//                   </p>
//                 </div>

//                 {/* Features */}
//                 {selectedProduct.features && selectedProduct.features.length > 0 && (
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
//                       <span className="w-6 h-1 bg-blue-600 rounded-full mr-3"></span>
//                       Key Features
//                     </h3>
//                     <div className="space-y-3">
//                       {selectedProduct.features.map((feature, index) => (
//                         <div
//                           key={index}
//                           className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200"
//                           style={{
//                             animationDelay: `${index * 100}ms`,
//                             animation: 'slideRight 0.5s ease-out forwards'
//                           }}
//                         >
//                           <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
//                           <span className="text-gray-700">{feature}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Specifications */}
//                 {selectedProduct.specifications && Object.keys(selectedProduct.specifications).length > 0 && (
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
//                       <span className="w-6 h-1 bg-green-600 rounded-full mr-3"></span>
//                       Specifications
//                     </h3>
//                     <div className="space-y-2">
//                       {Object.entries(selectedProduct.specifications).map(([key, value], index) => (
//                         <div
//                           key={key}
//                           className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors duration-200"
//                           style={{
//                             animationDelay: `${index * 100}ms`,
//                             animation: 'slideLeft 0.5s ease-out forwards'
//                           }}
//                         >
//                           <span className="text-gray-600 font-medium">{key}:</span>
//                           <span className="text-gray-900 font-semibold">{value}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Full Screen Image Modal with Zoom */}
//       {fullScreenImage && selectedProduct && (
//         <div className="fixed inset-0 z-60 bg-black/95 backdrop-blur-sm animate-fadeIn">
//           <div className="flex items-center justify-center min-h-screen p-4">
//             {/* Close Button */}
//             <button
//               onClick={closeFullScreenImage}
//               className="absolute top-4 right-4 z-70 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
//             >
//               <X className="w-8 h-8 text-white" />
//             </button>

//             {/* Instructions */}
//             <div className="absolute top-4 left-4 z-70 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
//               Hover to zoom • Press ESC to close
//             </div>

//             {/* Full Screen Image with Zoom */}
//             <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg">
//               <img
//                 src={selectedProduct.image}
//                 alt={selectedProduct.name}
//                 onError={handleImageError}
//                 onMouseMove={handleMouseMove}
//                 onMouseLeave={handleMouseLeave}
//                 className={`w-full h-full object-contain cursor-crosshair transition-transform duration-100 ${
//                   showZoom ? 'zoom-image' : ''
//                 }`}
//                 style={showZoom ? zoomStyle : {}}
//               />
              
//               {/* Zoom indicator */}
//               {showZoom && (
//                 <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg">
//                   🔍 2.5x Zoom
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideRight {
//           from {
//             opacity: 0;
//             transform: translateX(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes slideLeft {
//           from {
//             opacity: 0;
//             transform: translateX(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
        
//         @keyframes modalSlideUp {
//           from {
//             opacity: 0;
//             transform: translateY(50px) scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }
        
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
        
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
        
//         .animate-modalSlideUp {
//           animation: modalSlideUp 0.4s ease-out;
//         }
        
//         /* Smooth zoom transition */
//         .zoom-image {
//           transition: transform 0.1s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductShowcase;
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

  // Simple image load handler
  const handleImageLoad = (productId) => {
    setImageLoadStates(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  // Zoom functionality for full screen images
  const handleMouseMove = (e) => {
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
    setShowZoom(false);
    setZoomStyle({});
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
          <div className="mt-2 w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 animate-pulse"></div>
          </div>
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
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-200'
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
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-200'
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
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 cursor-pointer transition-all duration-500 transform hover:-translate-y-2 group"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'slideUp 0.6s ease-out forwards'
              }}
            >
              <div className="relative overflow-hidden rounded-t-xl">
                {product.image && (
                  <div className="relative">
                    {/* Loading placeholder - only show if image hasn't loaded */}
                    {!imageLoadStates[product.id] && (
                      <div className="w-full h-48 bg-gray-200 animate-pulse rounded-t-xl flex items-center justify-center">
                        <div className="text-gray-400 text-sm">Loading...</div>
                      </div>
                    )}
                    
                    {/* Main image - always visible, no opacity manipulation */}
                    <img
                      src={product.image.startsWith('/') ? product.image : `/${product.image}`}
                      alt={product.name}
                      onError={handleImageError}
                      onLoad={() => handleImageLoad(product.id)}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-125"
                      style={{ 
                        display: imageLoadStates[product.id] ? 'block' : 'none'
                      }}
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-3 right-3">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                    {product.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ZoomIn className="w-8 h-8 text-white bg-black/50 rounded-full p-2 backdrop-blur-sm" />
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-gray-500 text-sm ml-2">(4.8)</span>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md">
                    View Details
                  </button>
                </div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-modalSlideUp">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50 animate-headerSlide">
              <div className="animate-titleSlide">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedProduct.name}</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  <p className="text-blue-600 font-medium">{selectedProduct.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 animate-buttonsSlide">
                <button
                  onClick={() => handleShare(selectedProduct)}
                  className="p-3 hover:bg-white/70 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-sm hover:shadow-md group"
                  title="Share this product"
                >
                  <Share2 className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-all duration-300" />
                </button>
                <button
                  onClick={closeModal}
                  className="p-3 hover:bg-red-50 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-90 shadow-sm hover:shadow-md group"
                >
                  <X className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-all duration-300" />
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Image Section */}
              <div className="space-y-4">
                <div className="relative group animate-imageSlide">
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      onError={handleImageError}
                      onClick={openFullScreenImage}
                      className="w-full h-96 object-cover cursor-pointer transition-all duration-500 hover:scale-110 filter hover:brightness-110 hover:contrast-110"
                    />
                    
                    {/* Enhanced Click to zoom indicator */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg transform translate-y-[-10px] group-hover:translate-y-0 transition-all duration-300 animate-bounce">
                        🔍 Click to zoom
                      </div>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-4 group-hover:translate-y-0 bg-black/80 backdrop-blur-lg text-white px-6 py-3 rounded-full text-sm font-medium shadow-xl transition-all duration-500 border border-white/20">
                        <span className="inline-block mr-2 animate-pulse">✨</span>
                        Click for detailed view
                      </div>
                    </div>
                    
                    {/* Floating sparkle effects */}
                    <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-float delay-100"></div>
                    <div className="absolute top-8 right-8 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-float delay-300"></div>
                    <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-float delay-500"></div>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-6">
                <div className="animate-descriptionSlide">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border-l-4 border-blue-500">
                    <p className="text-gray-700 leading-relaxed text-lg font-medium">
                      {selectedProduct.description}
                    </p>
                  </div>
                </div>

                {/* Features - Only show if product has features */}
                {hasFeatures(selectedProduct) && (
                  <div className="animate-sectionSlide" style={{ animationDelay: '0.2s' }}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center group">
                      <span className="w-8 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mr-3 transition-all duration-300 group-hover:w-12"></span>
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Key Features</span>
                      <div className="ml-2 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-xs font-bold">{selectedProduct.features.length}</span>
                      </div>
                    </h3>
                    <div className="space-y-3">
                      {selectedProduct.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-blue-50 hover:to-purple-50 transition-all duration-500 transform hover:scale-102 hover:shadow-md border border-transparent hover:border-blue-200 group cursor-pointer"
                          style={{
                            animationDelay: `${0.3 + index * 0.1}s`,
                            animation: 'slideRight 0.6s ease-out forwards'
                          }}
                        >
                          <div className="relative">
                            <span className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-1.5 flex-shrink-0 shadow-lg"></span>
                            <div className="absolute -top-1 -left-1 w-5 h-5 bg-blue-200 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-300 animate-pulse"></div>
                          </div>
                          <span className="text-gray-700 font-medium leading-relaxed group-hover:text-gray-900 transition-colors duration-300">{feature}</span>
                          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Variants - Only show if product has variants */}
                {hasVariants(selectedProduct) && (
                  <div className="animate-sectionSlide" style={{ animationDelay: '0.4s' }}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center group">
                      <span className="w-8 h-1.5 bg-gradient-to-r from-purple-600 to-pink-400 rounded-full mr-3 transition-all duration-300 group-hover:w-12"></span>
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Available Variants</span>
                      <div className="ml-2 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 text-xs font-bold">{selectedProduct.variants.length}</span>
                      </div>
                    </h3>
                    <div className="space-y-4">
                      {selectedProduct.variants.map((variant, index) => (
                        <div
                          key={index}
                          className="relative border-2 border-transparent bg-gradient-to-br from-white to-purple-50 rounded-xl p-5 hover:border-purple-200 hover:shadow-xl transition-all duration-500 transform hover:scale-102 group cursor-pointer overflow-hidden"
                          style={{
                            animationDelay: `${0.5 + index * 0.15}s`,
                            animation: 'slideUp 0.6s ease-out forwards'
                          }}
                        >
                          {/* Animated background pattern */}
                          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-200/30 to-transparent rounded-full transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-500"></div>
                          
                          <div className="relative z-10">
                            <h4 className="font-bold text-gray-900 mb-3 text-lg flex items-center">
                              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                              {variant.model}
                              <div className="ml-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transform scale-95 group-hover:scale-100 transition-transform duration-300">
                                NEW
                              </div>
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                              {Object.entries(variant).map(([key, value], propIndex) => {
                                if (key === 'model') return null;
                                return (
                                  <div 
                                    key={key} 
                                    className="flex justify-between items-center p-2 bg-white/60 rounded-lg hover:bg-purple-100/80 transition-all duration-300 transform hover:scale-105"
                                    style={{
                                      animationDelay: `${0.6 + index * 0.15 + propIndex * 0.05}s`,
                                      animation: 'slideRight 0.4s ease-out forwards'
                                    }}
                                  >
                                    <span className="capitalize font-medium text-gray-600 flex items-center">
                                      <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                                      {key.replace('_', ' ')}:
                                    </span>
                                    <span className="font-bold text-gray-900 bg-white px-2 py-1 rounded shadow-sm">
                                      {Array.isArray(value) ? value.join(', ') : value}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specifications - Only show if product has specifications */}
                {hasSpecifications(selectedProduct) && (
                  <div className="animate-sectionSlide" style={{ animationDelay: '0.6s' }}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center group">
                      <span className="w-8 h-1.5 bg-gradient-to-r from-green-600 to-emerald-400 rounded-full mr-3 transition-all duration-300 group-hover:w-12"></span>
                      <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Specifications</span>
                      <div className="ml-2 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-xs font-bold">{Object.keys(selectedProduct.specifications).length}</span>
                      </div>
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(selectedProduct.specifications).map(([key, value], index) => (
                        <div
                          key={key}
                          className="relative flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl hover:from-green-50 hover:to-emerald-50 transition-all duration-500 transform hover:scale-102 hover:shadow-md border border-transparent hover:border-green-200 group cursor-pointer overflow-hidden"
                          style={{
                            animationDelay: `${0.7 + index * 0.1}s`,
                            animation: 'slideLeft 0.6s ease-out forwards'
                          }}
                        >
                          {/* Animated background element */}
                          <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-green-200/20 to-transparent transform translate-x-16 group-hover:translate-x-0 transition-transform duration-500"></div>
                          
                          <span className="text-gray-600 font-semibold flex items-center relative z-10">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
                            {key}:
                          </span>
                          <span className="text-gray-900 font-bold bg-white px-3 py-2 rounded-lg shadow-sm transform group-hover:scale-105 transition-all duration-300 relative z-10 border border-green-100">
                            {value}
                          </span>
                          
                          {/* Floating icon */}
                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></div>
                          </div>
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
        <div className="fixed inset-0 z-60 bg-black/95 backdrop-blur-sm animate-fadeIn">
          <div className="flex items-center justify-center min-h-screen p-4">
            {/* Close Button */}
            <button
              onClick={closeFullScreenImage}
              className="absolute top-4 right-4 z-70 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              <X className="w-8 h-8 text-white" />
            </button>

            {/* Instructions */}
            <div className="absolute top-4 left-4 z-70 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
              Hover to zoom • Press ESC to close
            </div>

            {/* Full Screen Image with Zoom */}
            <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                onError={handleImageError}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`w-full h-full object-contain cursor-crosshair transition-transform duration-100 ${
                  showZoom ? 'zoom-image' : ''
                }`}
                style={showZoom ? zoomStyle : {}}
              />
              
              {/* Zoom indicator */}
              {showZoom && (
                <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg">
                  🔍 2.5x Zoom
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* New Enhanced Animations */
        @keyframes headerSlide {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes titleSlide {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes buttonsSlide {
          from {
            opacity: 0;
            transform: translateX(30px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes imageSlide {
          from {
            opacity: 0;
            transform: translateX(-40px) rotateY(-10deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotateY(0deg);
          }
        }

        @keyframes descriptionSlide {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes sectionSlide {
          from {
            opacity: 0;
            transform: translateY(30px) rotateX(5deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Animation Classes */
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-modalSlideUp {
          animation: modalSlideUp 0.4s ease-out;
        }

        .animate-headerSlide {
          animation: headerSlide 0.5s ease-out;
        }

        .animate-titleSlide {
          animation: titleSlide 0.6s ease-out 0.1s both;
        }

        .animate-buttonsSlide {
          animation: buttonsSlide 0.6s ease-out 0.2s both;
        }

        .animate-imageSlide {
          animation: imageSlide 0.8s ease-out 0.3s both;
        }

        .animate-descriptionSlide {
          animation: descriptionSlide 0.6s ease-out 0.4s both;
        }

        .animate-sectionSlide {
          animation: sectionSlide 0.7s ease-out both;
        }

        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Smooth zoom transition */
        .zoom-image {
          transition: transform 0.1s ease-out;
        }

        /* Custom utility classes */
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }

        /* Gradient text support */
        .bg-clip-text {
          -webkit-background-clip: text;
          background-clip: text;
        }

        /* Staggered animation delays */
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }0.1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductShowcase;