import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import Navbar from '../components/Navbar';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();

  const product = products.find(p => String(p.id) === String(id));

  // Similar products logic
  let similarProducts = product
    ? products.filter(p => p.category === product.category && String(p.id) !== String(id))
    : [];

  // If no similar products found, show other products (except the current one)
  if (similarProducts.length === 0) {
    similarProducts = products.filter(p => String(p.id) !== String(id));
  }

  if (!product) {
    return <div className="text-center text-gray-500 text-xl">Product not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-lg">
            <img src={product?.image || 'https://via.placeholder.com/300'} alt={product?.name || 'No Image'} className="h-full w-full object-cover" />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product?.name || 'No Name Available'}</h1>
            <p className="mt-4 text-gray-600">{product?.description || 'No description available.'}</p>

            {/* Features */}
            {product?.features?.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900">Key Features</h2>
                <ul className="mt-4 space-y-2">
                  {product?.features?.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {product?.specifications && Object.keys(product?.specifications).length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900">Specifications</h2>
                <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {Object.entries(product?.specifications || {}).map(([key, value]) => (
                    <div key={key} className="border-t border-gray-200 pt-4">
                      <dt className="font-medium text-gray-500">{key}</dt>
                      <dd className="mt-1 text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Variants */}
            {product?.variants?.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900">Available Variants</h2>
                <div className="mt-4 space-y-4">
                  {product?.variants?.map((variant, index) => (
                    <div key={index} className="rounded-lg bg-gray-50 p-4">
                      <h3 className="font-medium text-gray-900">{variant.name || 'No Variant Name'}</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {variant?.specs?.map((spec, i) => (
                          <span key={i} className="rounded-full bg-white px-3 py-1 text-sm text-gray-700 shadow-sm">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">Similar Products</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {similarProducts.length > 0 ? (
              similarProducts.map((product) => (
                <div
                  key={product.id}
                  className="cursor-pointer group"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={product?.image || 'https://via.placeholder.com/300'}
                      alt={product?.name || 'No Image'}
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">{product?.name || 'No Name'}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product?.category || 'No Category'}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 mt-4">No similar products found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
