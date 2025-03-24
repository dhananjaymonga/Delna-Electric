import React from 'react';
import { ArrowLeft } from 'lucide-react';

function ProductDetail({ product, setCurrentPage }) {
  if (!product) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <button
        onClick={() => setCurrentPage('products')}
        className="flex items-center text-orange-500 hover:text-orange-600 mb-8"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Products
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3">Features</h2>
              <ul className="list-disc list-inside space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">{feature}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3">Technical Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key}>
                    <span className="font-medium text-gray-700">{key}: </span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 border-t">
          <h2 className="text-xl font-bold mb-4">Product Video</h2>
          <div className="relative pb-[56.25%] h-0">
            <iframe
              src={product.video}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;