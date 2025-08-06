import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import CableAssit from "./components/CableAssit.jsx";
import FAQPage from "./components/FAQ.jsx";
import PdfDownload from "./components/PdfDowload.jsx";
import Connect from "./components/Connect.jsx";
import Dealership from "./components/Dealership.jsx";
import Product from "./Pages/Product.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import CalculatorPage from "./Pages/Calculator.jsx";
import DealershipForm from "./Pages/DealerShip.jsx";
import Blog from "./Pages/BlogPages.jsx";

// Define routes with consistent naming (lowercase)
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about", // lowercase for consistency
    element: <About />,
  },
  {
    path: "/contact", // lowercase for consistency
    element: <Contact />,
  },
  {
    path: "/blog", // lowercase for consistency
    element: <Blog />,
  },
  {
    path: "/faq", // simplified from "Faq-Page"
    element: <FAQPage />,
  },
  {
    path: "/connect",
    element: <Connect />,
  },
  {
    path: "/cable-assist", // kebab-case for consistency
    element: <CableAssit />,
  },
  {
    path: "/cable-calculator", // more descriptive name
    element: <CalculatorPage />,
  },
  {
    path: "/dealership-form",
    element: <DealershipForm />,
  },
  {
    path: "/pdf-download", // kebab-case for consistency
    element: <PdfDownload />,
  },
  {
    path: "/dealership",
    element: <Dealership />,
  },
  {
    path: "/products",
    element: <Product />,
  },
 
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProductProvider>
    <RouterProvider router={router} />
  </ProductProvider>
);