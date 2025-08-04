// import React, { useState, useEffect } from 'react';
// import { ArrowLeft, X, Star, ZoomIn, Share2 } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import Footer from './Footer';

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

//   const showHeaderFooter = location.pathname === "/products";
//   console.log("Current Path:", location.pathname);

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
//     e.target.style.display = 'none'; // Hide broken images instead of showing placeholder
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
//         // Fallback to copying URL to clipboard
//         await navigator.clipboard.writeText(window.location.href);
//         // You could add a toast notification here
//         alert('Product link copied to clipboard!');
//       }
//     } catch (error) {
//       console.error('Error sharing:', error);
//       // Fallback to copying URL
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
//       {/* Header */}
//       {showHeaderFooter && <Navbar />}

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
//                   <img
//                     src={product.image.startsWith('/') ? product.image : `/${product.image}`}
//                     alt={product.name}
//                     onError={handleImageError}
//                     className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-125"
//                   />
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
      
//       {showHeaderFooter && <Footer />}

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
//               {/* Image Section with Amazon/Flipkart Style Zoom */}
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
        
//         /* Zoom lens effect */
//         .zoom-lens {
//           position: absolute;
//           border: 2px solid #3b82f6;
//           cursor: none;
//           pointer-events: none;
//         }
        
//         /* Smooth zoom transition */
//         .zoom-image {
//           transition: transform 0.1s ease-out;
//         }
        
//         /* Hide scrollbar for zoom container */
//         .zoom-container::-webkit-scrollbar {
//           display: none;
//         }
        
//         .zoom-container {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductShowcase;
import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, Star, ZoomIn, Share2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from './Footer';

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

  const showHeaderFooter = location.pathname === "/products";
  console.log("Current Path:", location.pathname);

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
    e.target.style.display = 'none'; // Hide broken images instead of showing placeholder
  };

  // Image load handler for lazy loading fallback
  const handleImageLoad = (e) => {
    e.target.style.opacity = '1';
    e.target.classList.add('loaded');
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
        // Fallback to copying URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        // You could add a toast notification here
        alert('Product link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback to copying URL
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Product link copied to clipboard!');
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError);
      }
    }
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
      {/* Header */}
      {showHeaderFooter && <Navbar />}

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
                  <>
                    {/* Loading placeholder */}
                    <div className="w-full h-48 bg-gray-200 animate-pulse rounded-t-xl absolute inset-0 flex items-center justify-center">
                      <div className="text-gray-400 text-sm">Loading...</div>
                    </div>
                    
                    {/* Lazy loaded image */}
                    <img
                      src={product.image.startsWith('/') ? product.image : `/${product.image}`}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                      className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-125 opacity-0 lazy-image"
                      style={{ transition: 'opacity 0.3s ease-in-out' }}
                    />
                  </>
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
      
      {showHeaderFooter && <Footer />}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-modalSlideUp">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                <p className="text-blue-600 font-medium">{selectedProduct.category}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleShare(selectedProduct)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
                  title="Share this product"
                >
                  <Share2 className="w-6 h-6 text-gray-400 hover:text-blue-600 transition-colors duration-200" />
                </button>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Image Section with Amazon/Flipkart Style Zoom */}
              <div className="space-y-4">
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-xl bg-gray-100">
                    {/* Loading placeholder for modal image */}
                    <div className="w-full h-96 bg-gray-200 animate-pulse rounded-xl absolute inset-0 flex items-center justify-center">
                      <div className="text-gray-400">Loading image...</div>
                    </div>
                    
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      loading="eager"
                      decoding="async"
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                      onClick={openFullScreenImage}
                      className="w-full h-96 object-cover cursor-pointer transition-all duration-300 hover:scale-105 opacity-0 lazy-image"
                      style={{ transition: 'opacity 0.3s ease-in-out' }}
                    />
                    
                    {/* Click to zoom indicator */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                        🔍 Click to zoom
                      </div>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                        Click for detailed view
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-6">
                <div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Features */}
                {selectedProduct.features && selectedProduct.features.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-6 h-1 bg-blue-600 rounded-full mr-3"></span>
                      Key Features
                    </h3>
                    <div className="space-y-3">
                      {selectedProduct.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                          style={{
                            animationDelay: `${index * 100}ms`,
                            animation: 'slideRight 0.5s ease-out forwards'
                          }}
                        >
                          <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specifications */}
                {selectedProduct.specifications && Object.keys(selectedProduct.specifications).length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-6 h-1 bg-green-600 rounded-full mr-3"></span>
                      Specifications
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(selectedProduct.specifications).map(([key, value], index) => (
                        <div
                          key={key}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors duration-200"
                          style={{
                            animationDelay: `${index * 100}ms`,
                            animation: 'slideLeft 0.5s ease-out forwards'
                          }}
                        >
                          <span className="text-gray-600 font-medium">{key}:</span>
                          <span className="text-gray-900 font-semibold">{value}</span>
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
              {/* Loading placeholder for fullscreen image */}
              <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">
                <div className="text-gray-400">Loading high-res image...</div>
              </div>
              
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                loading="eager"
                decoding="async"
                onError={handleImageError}
                onLoad={handleImageLoad}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`w-full h-full object-contain cursor-crosshair transition-all duration-100 opacity-0 lazy-image ${
                  showZoom ? 'zoom-image' : ''
                }`}
                style={showZoom ? { ...zoomStyle, opacity: '1' } : { opacity: '0', transition: 'opacity 0.3s ease-in-out' }}
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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-modalSlideUp {
          animation: modalSlideUp 0.4s ease-out;
        }
        
        /* Lazy loading styles */
        .lazy-image {
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }
        
        .lazy-image.loaded {
          opacity: 1;
        }
        
        /* Zoom lens effect */
        .zoom-lens {
          position: absolute;
          border: 2px solid #3b82f6;
          cursor: none;
          pointer-events: none;
        }
        
        /* Smooth zoom transition */
        .zoom-image {
          transition: transform 0.1s ease-out;
        }
        
        /* Hide scrollbar for zoom container */
        .zoom-container::-webkit-scrollbar {
          display: none;
        }
        
        .zoom-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Placeholder shimmer effect */
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .animate-pulse {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default ProductShowcase;