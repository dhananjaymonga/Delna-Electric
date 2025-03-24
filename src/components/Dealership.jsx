import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Dealership({ setCurrentPage }) {
    const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    experience: '',
    message: ''
  });

  // Handle form input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the corresponding field dynamically
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your interest! We will contact you soon.');

    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      city: '',
      experience: '',
      message: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Apply for Dealership</h1>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="grid gap-6">
          {/** Generate inputs dynamically */}
          {['name', 'email', 'phone', 'city', 'experience', 'message'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                {field.replace('_', ' ')}
              </label>
              {field === 'message' ? (
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  rows={4}
                  required
                ></textarea>
              ) : (
                <input
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : field === 'experience' ? 'number' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Submit Application
          </button>
        </form>
      </div>

      <button
          onClick={() => navigate("/")}
        className="mt-8 text-orange-500 hover:text-orange-600"
      >
        ← Back to Home
      </button>
    </div>
  );
}

export default Dealership;
