// import React from "react";
// import { createContext, useContext, useState } from "react";

// const ProductContext = createContext();

// export const ProductProvider = ({ children }) => {
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   return (
//     <ProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export const useProduct = () => {
//   return useContext(ProductContext);
// };
import React, { createContext, useContext,useState } from 'react';
import { products, categories } from '../Data/products.json';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  return (
    <ProductContext.Provider value={{ products, categories }}>
      {children}
      </ProductContext.Provider>  );
};