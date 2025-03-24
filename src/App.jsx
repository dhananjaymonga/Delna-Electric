import React from 'react';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Products from './Pages/Product';
import Contact from './Pages/Contact';
import FAQ from './components/FAQ.jsx';
import Types from "./components/Types.jsx"
import CableAssit from "./components/CableAssit.jsx"
import Footer from './components/Footer.jsx';
// import { Types } from 'lucide-react';
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Home />
      <About />
      <Products />

      <Contact />
      <Types/>
      {/* <CableAssit/> */}
      <FAQ/>
      <Footer/>

    </div>
  );
}

export default App;