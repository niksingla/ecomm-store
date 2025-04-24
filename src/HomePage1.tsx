import React, { useState, useEffect } from "react";

const HomePage1: React.FC = () => {
  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  // Shopping Cart State
  const [cartCount, setCartCount] = useState(0);

  // Countdown Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Dummy Data for Products and Testimonials
  const featuredProducts = [
    { id: 1, name: "Stylish Jacket", price: 99.99, img: "https://via.placeholder.com/150" },
    { id: 2, name: "Running Shoes", price: 79.99, img: "https://via.placeholder.com/150" },
    { id: 3, name: "Smart Watch", price: 199.99, img: "https://via.placeholder.com/150" },
    { id: 4, name: "Leather Bag", price: 149.99, img: "https://via.placeholder.com/150" },
  ];

  const testimonials = [
    { id: 1, name: "Jane Doe", text: "Amazing quality and fast shipping!" },
    { id: 2, name: "John Smith", text: "Best shopping experience ever!" },
  ];

  const recommendedProducts = [
    { id: 1, name: "Wireless Earbuds", price: 59.99, img: "https://via.placeholder.com/150" },
    { id: 2, name: "Sunglasses", price: 39.99, img: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header with Shopping Cart */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">E-Shop</h1>
        <div className="relative">
          <button className="text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Promotional Banner with Countdown */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 text-center">
        <h2 className="text-3xl font-semibold mb-2">Flash Sale! Up to 50% Off</h2>
        <p className="text-lg mb-4">Hurry, offer ends soon!</p>
        <div className="flex justify-center space-x-4 text-xl">
          <div>
            <span className="block font-bold">{timeLeft.days}</span>
            <span className="text-sm">Days</span>
          </div>
          <div>
            <span className="block font-bold">{timeLeft.hours}</span>
            <span className="text-sm">Hours</span>
          </div>
          <div>
            <span className="block font-bold">{timeLeft.minutes}</span>
            <span className="text-sm">Minutes</span>
          </div>
          <div>
            <span className="block font-bold">{timeLeft.seconds}</span>
            <span className="text-sm">Seconds</span>
          </div>
        </div>
        <button className="mt-4 bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100">
          Shop Now
        </button>
      </section>

      {/* Featured Product Carousel */}
      <section className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Featured Products</h3>
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
          {featuredProducts.map((product) => (
            <div key={product.id} className="min-w-[200px] bg-white rounded-lg shadow-md p-4">
              <img src={product.img} alt={product.name} className="w-full h-32 object-cover rounded-md mb-2" />
              <h4 className="text-lg font-medium text-gray-800">{product.name}</h4>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <button
                onClick={() => setCartCount(cartCount + 1)}
                className="mt-2 w-full bg-indigo-500 text-white py-1 rounded hover:bg-indigo-600"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Personalized Product Recommendations */}
      <section className="p-6 bg-gray-50">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recommended for You</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
              <img src={product.img} alt={product.name} className="w-full h-32 object-cover rounded-md mb-2" />
              <h4 className="text-lg font-medium text-gray-800">{product.name}</h4>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <button
                onClick={() => setCartCount(cartCount + 1)}
                className="mt-2 w-full bg-indigo-500 text-white py-1 rounded hover:bg-indigo-600"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* User Testimonials */}
      <section className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">What Our Customers Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-4">
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
              <p className="mt-2 text-gray-800 font-medium">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup Widget */}
      <section className="p-6 bg-indigo-500 text-white text-center">
        <h3 className="text-xl font-semibold mb-2">Subscribe to Our Newsletter</h3>
        <p className="mb-4">Get the latest updates and exclusive offers!</p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded-l-md text-gray-800 focus:outline-none"
          />
          <button className="bg-indigo-700 p-2 rounded-r-md hover:bg-indigo-800">Subscribe</button>
        </div>
      </section>

      {/* Footer with Quick Links */}
      <footer className="bg-gray-800 text-white p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Shop</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Returns</a></li>
              <li><a href="#" className="hover:underline">Shipping</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <p>Stay connected on social media!</p>
          </div>
        </div>
        <p className="text-center mt-4 text-sm">© 2023 E-Shop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage1;