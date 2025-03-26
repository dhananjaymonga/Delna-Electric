import React from "react";
import { useProduct } from "../context/ProductContext"; // Import context
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { selectedProduct } = useProduct();
  const navigate = useNavigate();

  if (!selectedProduct) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-semibold">No product selected.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-3xl bg-white p-8 rounded-xl shadow-lg">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          className="w-full h-64 object-cover rounded-lg"
        />
        <h2 className="text-3xl font-bold mt-4">{selectedProduct.name}</h2>
        <p className="text-gray-600 mt-2">{selectedProduct.description}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Back to Products
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
