import React from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext"; // Import context
import Navbar from "../components/Navbar";
import Footer from "./Footer";

const products = [
  {
    id: 1,
    name: "Premium Product 1",
    description: "High-quality product with amazing features.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Premium Product 2",
    description: "Innovative solution for modern needs.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Premium Product 3",
    description: "State-of-the-art technology product.",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

const Products = () => {
  const { setSelectedProduct } = useProduct();
  const navigate = useNavigate();

  const handleLearnMore = (product) => {
    setSelectedProduct(product);
    navigate("/product-details"); // Redirect to details page
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Our Products</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-yellow-400 rounded-full p-1">
                    <Star size={16} className="text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <button
                    onClick={() => handleLearnMore(product)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Products;
