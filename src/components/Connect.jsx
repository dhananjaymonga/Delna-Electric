import React, { useState, useEffect } from 'react';
import { Home, Smartphone, Users, Award, Download, CheckCircle, Mail } from 'lucide-react';

function Connect() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleHomeClick = () => {
    // This would redirect to "/" in your actual router setup
    window.location.href = '/';
  };

  const handleNotifySubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header with Home Button */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleHomeClick}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors"
          >
            <Home size={20} />
            Back to Home
          </button>
        </div>

        {/* Main Content */}
        <div className="text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Delna Connect App</h1>
            <p className="text-xl text-gray-600 mb-8">
              Earn Loyalty Points and Join Our Community
            </p>
          </div>

          {/* App Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Award className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Loyalty Rewards</h3>
              <p className="text-gray-600">Earn points with every purchase and unlock exclusive benefits</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Community Access</h3>
              <p className="text-gray-600">Connect with other electrical professionals and share insights</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Download className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Easy Ordering</h3>
              <p className="text-gray-600">Browse products, track orders, and manage your account on the go</p>
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="bg-white p-12 rounded-lg shadow-lg mb-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Coming Soon</h2>
              <p className="text-lg text-gray-600 mb-8">
                We're working hard to bring you the best mobile experience for all your electrical needs.
                <br />
                Stay tuned for the official launch!
              </p>
            </div>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors shadow-lg group">
                <div className="flex flex-col items-start">
                  <span className="text-xs opacity-90">Download on the</span>
                  <span className="text-lg font-semibold">App Store</span>
                </div>
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-black font-bold text-lg">🍎</span>
                </div>
              </button>
              
              <button className="flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors shadow-lg group">
                <div className="flex flex-col items-start">
                  <span className="text-xs opacity-90">Get it on</span>
                  <span className="text-lg font-semibold">Google Play</span>
                </div>
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">▶</span>
                </div>
              </button>
            </div>
          </div>

          {/* Notify Me Section */}
          <div className="bg-orange-50 p-8 rounded-lg border border-orange-100">
            {!isSubmitted ? (
              <>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Be the First to Know</h3>
                <p className="text-gray-600 mb-6">
                  Get notified when the Delna Connect app is available for download
                </p>
                <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isLoading 
                        ? 'bg-orange-400 cursor-not-allowed' 
                        : 'bg-orange-500 hover:bg-orange-600 hover:shadow-lg'
                    } text-white`}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      'Notify Me'
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-4">
                  We've received your email and will notify you as soon as the Delna Connect app is available.
                </p>
                <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg inline-flex">
                  <Mail size={16} />
                  <span className="text-sm font-medium">Email notification sent!</span>
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 text-orange-500 hover:text-orange-600 text-sm underline"
                >
                  Subscribe with another email
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connect;