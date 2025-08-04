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
import DealershipForm from "./Pages/DealerShip.jsx";
import Products from "./Pages/Product.jsx";
import TestimonialSlider from "./Pages/TestimonialSlider.jsx";
function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(true);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Sida turant upar
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* {showPopup && <PopupModal onClose={() => setShowPopup(false)} />} */}
      
      <Navbar />
      <Home />
      {/* <DealershipForm/> */}
      <Types />
      <Mission/>
      <Section/>
      <About />
      <Products />
      <TestimonialSlider/>
      {/* <Contact /> */}
      <FAQ />
      <Footer/>
    </div>
  );
}

export default App;
