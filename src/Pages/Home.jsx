import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-16">
      <div className="relative h-[80vh] bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Welcome to <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Delna</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mb-8">
              Experience innovation and excellence in everything we do. Discover our world-class products and services.
            </p>
            <button
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/about')}
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;