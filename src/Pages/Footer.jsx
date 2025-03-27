import React from 'react';

import { Heart, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
          <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-600 animate-pulse"></div>
    <footer className="bg-gray-900 text-white py-12 px-5">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="reveal-on-scroll reveal-delay-100">
          <h3 className="text-xl font-bold mb-4">About Delna</h3>

            <p className="text-muted-foreground mb-6">
              Crafting premium electronic instruments that blend cutting-edge technology with timeless musicality.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 text-foreground/80 hover:bg-primary hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 text-foreground/80 hover:bg-primary hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 text-foreground/80 hover:bg-primary hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 text-foreground/80 hover:bg-primary hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div className="reveal-on-scroll reveal-delay-200">
          <h3 className="text-xl font-bold mb-4">About Delna</h3>
          <ul className="space-y-3">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">Products</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div className="reveal-on-scroll reveal-delay-300">
          <h3 className="text-xl font-bold mb-4">About Delna</h3>
            <ul className="space-y-3">
              <li><Link to="/products/electric-guitars" className="text-muted-foreground hover:text-primary transition-colors">Electric Guitars</Link></li>
              <li><Link to="/products/synthesizers" className="text-muted-foreground hover:text-primary transition-colors">Synthesizers</Link></li>
              <li><Link to="/products/midi-controllers" className="text-muted-foreground hover:text-primary transition-colors">MIDI Controllers</Link></li>
              <li><Link to="/products/drum-machines" className="text-muted-foreground hover:text-primary transition-colors">Drum Machines</Link></li>
              <li><Link to="/products/accessories" className="text-muted-foreground hover:text-primary transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div className="reveal-on-scroll reveal-delay-400">
          <h3 className="text-xl font-bold mb-4">About Delna</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 text-primary" />
                <span className="text-muted-foreground">123 Music Street, Harmony City, HC 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-primary" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-primary" />
                <span className="text-muted-foreground">info@electronic.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">© 2025  Delna. All rights reserved.</p>
     
            <p className="text-muted-foreground text-sm flex items-center">
              Made with <Heart size={14} className="mx-1 text-primary" /> for music lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;