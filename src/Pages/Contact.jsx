// import React from 'react';
// import { Mail, Phone, MapPin } from 'lucide-react';

// const Contact = () => {
//   return (
//     <div className="min-h-screen pt-16 bg-gradient-to-br from-purple-50 to-blue-50">
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <div className="grid md:grid-cols-2 gap-12">
//           <div>
//             <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
//             <p className="text-gray-600 mb-8">
//               Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
//             </p>
//             <div className="space-y-6">
//               <div className="flex items-center space-x-4">
//                 <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
//                   <Phone className="text-purple-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold">Phone</h3>
//                   <p className="text-gray-600">+1 (555) 123-4567</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
//                   <Mail className="text-purple-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold">Email</h3>
//                   <p className="text-gray-600">contact@example.com</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
//                   <MapPin className="text-purple-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold">Address</h3>
//                   <p className="text-gray-600">123 Business Street, Suite 100, City, State 12345</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div>
//             <form className="bg-white rounded-lg shadow-lg p-8">
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                     placeholder="Your name"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                   <input
//                     type="email"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                     placeholder="your@email.com"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
//                   <textarea
//                     rows={4}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                     placeholder="Your message"
//                   ></textarea>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-300"
//                 >
//                   Send Message
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;
import Navbar from '../components/Navbar';
import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPageClone = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Navbar/>
    <div className="min-h-screen bg-white p-4">
      <div className="container mx-auto grid md:grid-cols-2 gap-8  mt-22">
        {/* Contact Information Section */}
        <div className="space-y-6 mt-10">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Get in Touch</h1>
            <p className="text-gray-600 mt-2">Have questions or feedback? We'd love to hear from you.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
              <Mail className="text-blue-500 w-6 h-6" />
              <div>
                <p className="font-semibold text-gray-700">Email Us</p>
                <p className="text-gray-600 text-sm">Our support team will get back to you within 24 hours</p>
                <p className="text-gray-600 text-sm">info@electronic.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
              <Phone className="text-green-500 w-6 h-6" />
              <div>
                <p className="font-semibold text-gray-700">Call Us</p>
                <p className="text-gray-600 text-sm">Available Monday to Friday, 9am to 6pm EST</p>
                <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
              <MapPin className="text-red-500 w-6 h-6" />
              <div>
                <p className="font-semibold text-gray-700">Visit Us</p>
                <p className="text-gray-600 text-sm">123 Music Street, Harmony City, NC 10001</p>
                <a href="#" className="text-blue-500 text-sm">Get Directions</a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="How can we help you?"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us more about your inquiry"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Additional Section */}
      <div className="text-center mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Have More Questions?</h3>
        <p className="text-gray-600 mt-2">Check out our frequently asked questions for quick answers to common inquiries.</p>
        <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
          View FAQ
        </button>
      </div>

      {/* Business Hours */}
      <div className="text-center mt-8 bg-gray-50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-800">Business Hours</h4>
        <div className="mt-4 space-y-2">
          <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
          <p className="text-gray-600">Sunday: Closed</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactPageClone;