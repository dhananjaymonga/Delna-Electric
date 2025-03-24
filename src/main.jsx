import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Product from "./components/Product.jsx";
import CableAssit from "./components/CableAssit.jsx"
import FAQPage from "./components/FAQ.jsx";
import PdfDownload from "./components/PdfDowload.jsx";
import Connect from "./components/Connect.jsx";
import Dealership from "./components/DealerShip.jsx";


// Define routes properly
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Contact",
    element: <Contact />,
  },
  {
    path: "/Faq-Page",
    element: <FAQPage />,
  },
  {
    path: "/Connect",
    element: <Connect />,
  },
  {
    path: "/CableAssit",
    element: <CableAssit />,
  },
  {
    path: "/pdfdowload",
    element: <PdfDownload />,
  },
  {
    path: "/DealerShip",
    element: <Dealership />,
  },
  {
    path: "/products",
    element: <Product />,
  },
]);

// Only one createRoot() call
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
