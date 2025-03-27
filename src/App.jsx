import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
// import Product from "./Pages/Product.jsx"
// import Product from "./components/Product.jsx"
import Contact from "./Pages/Contact";
import FAQ from "./components/FAQ.jsx";
import Types from "./components/Types.jsx";
import PopupModal from "./components/PopupModal";
// import Footer from "./components/Footer.jsx";
import Footer from "./Pages/Footer.jsx";
// import Someui from "./components/Someui.jsx"
import Section from "./Pages/Section.jsx";
import  Mission from "./Pages/Mission.jsx"
import Products from "./Pages/Product.jsx";

function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(true); // Refresh par popup dikhega
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* {showPopup && <PopupModal onClose={() => setShowPopup(false)} />} */}
      
      <Navbar />
      <Home />
       <Types />
      <Mission/>
       <Section/>
      <About />
      <Products />
       {/* <Contact /> */}
      <FAQ />
    <Footer/>
    </div>
  );
}

export default App;
