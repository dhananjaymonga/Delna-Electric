import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Layout from "./Pages/Layout.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";

// Pages
import App from "./App.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Blog from "./Pages/BlogPages.jsx";
import Product from "./Pages/Product.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import CalculatorPage from "./Pages/Calculator.jsx";
import DealershipForm from "./Pages/DealerShip.jsx";

// Components Pages
import CableAssit from "./components/CableAssit.jsx";
import FAQPage from "./components/FAQ.jsx";
import PdfDownload from "./components/PdfDowload.jsx";
import Connect from "./components/Connect.jsx";
import Dealership from "./components/Dealership.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,  // 🔥 Layout added
    children: [
      {
        index: true, // default route "/"
        element: <App />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "faq",
        element: <FAQPage />,
      },
      {
        path: "connect",
        element: <Connect />,
      },
      {
        path: "cable-assist",
        element: <CableAssit />,
      },
      {
        path: "cable-calculator",
        element: <CalculatorPage />,
      },
      {
        path: "dealership-form",
        element: <DealershipForm />,
      },
      {
        path: "pdf-download",
        element: <PdfDownload />,
      },
      {
        path: "dealership",
        element: <Dealership />,
      },
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "products/:id",  // 🔥 dynamic route
        element: <ProductDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProductProvider>
    <RouterProvider router={router} />
  </ProductProvider>
);
