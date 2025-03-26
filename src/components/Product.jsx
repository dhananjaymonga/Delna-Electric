// import React, { useState, useEffect } from "react";
// import { Search, ChevronRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useProduct } from "../context/ProductContext";

// const categories = [
//   "House Wires",
//   "Light",
//   "Solar Cables",
//   "Control Cables",
//   "Power Cables",
//   "Pumps"
// ];

// function Products() {
//   const navigate = useNavigate();
//   const { setSelectedProduct } = useProduct();
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const fileName = selectedCategory === "all" ? "products" : selectedCategory.toLowerCase();
//         const response = await fetch(`/Data/${fileName}.json`);
//         const data = await response.json();

//         const productsArray = Array.isArray(data) ? data : data.product_range || [];

//         setProducts(productsArray);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setProducts([]); // Ensure products remains an array
//       }
//     };

//     fetchProducts();
//   }, [selectedCategory]);

//   const filteredProducts = products.filter((product) => {
//     const matchesSearch =
//       (product.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
//       (product.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false);

//     return matchesSearch;
//   });
//   return (
//     <div>
//       <button onClick={() => navigate("/")} className="mt-8 text-orange-500 hover:text-orange-600">
//         ← Back to Home
//       </button>

//       <div className="max-w-7xl mx-auto p-8">
// {console.log(products)}
//         <div className="mb-8">
//           <div className="relative mb-6">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full p-4 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//             />
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>

//           <div className="flex gap-4 overflow-x-auto pb-4">
//           <button onClick={() => setSelectedCategory("Light")}>{selectedCategory}</button>

//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-4 py-2 rounded-full whitespace-nowrap ${
//                   selectedCategory === category ? "bg-orange-500 text-white" : "bg-white text-gray-700 hover:bg-orange-100"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredProducts.map((product) => (
//             <div
//               key={product.id}
//               onClick={() => {
//                 setSelectedProduct(product); // Save Product in Context
//                 navigate("/product-detail");
//               }}
//               className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
//             >
//               <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-2">{product.name}</h3>
//                 <p className="text-gray-600 mb-4">{product.description}</p>
//                 <div className="flex items-center text-orange-500">
//                   <span>View Details</span>
//                   <ChevronRight size={20} />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Products;
