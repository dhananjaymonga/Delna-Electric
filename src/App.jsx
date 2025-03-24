import React from 'react';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Products from './Pages/Product';
import Contact from './Pages/Contact';
import FAQ from './components/FAQ.jsx';
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Home />
      <About />
      <Products />
      <Contact />
      <FAQ/>
    </div>
  );
}

export default App;