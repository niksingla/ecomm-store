import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

const HomePage2: React.FC = () => {
  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  // Cart State
  const [cartItems, setCartItems] = useState<{ id: number; name: string; price: number; img: string }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  // Dummy Footwear Data
  const featuredProducts = [
    { id: 1, name: "Sneaker Pro", price: 99.99, img: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb" },
    { id: 2, name: "Running Flex", price: 79.99, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
    { id: 3, name: "Casual Loafers", price: 59.99, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
    { id: 4, name: "High-Top Boots", price: 129.99, img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa" },
  ];

  const recommendedProducts = [
    { id: 1, name: "Leather Sandals", price: 49.99, img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a" },
    { id: 2, name: "Sports Shoes", price: 89.99, img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5" },
  ];

  const testimonials = [
    { id: 1, name: "Emma Brown", text: "These sneakers are super comfy and stylish!" },
    { id: 2, name: "Liam Jones", text: "Fast delivery and great quality shoes!" },
  ];

  // Add to Cart Handler
  const addToCart = (product: { id: number; name: string; price: number; img: string }) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans">
      {/* Viewport Meta Tag */}
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      {/* Sticky Header */}
      <header className="bg-[#FFFFFF] shadow-md p-4 fixed top-0 left-0 w-full z-10 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#0A0908]">Footwear Haven</h1>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-[#6366F1] hover:text-[#9333EA] font-medium">Home</a>
          <a href="#" className="text-[#6366F1] hover:text-[#9333EA] font-medium">Shop</a>
          <a href="#" className="text-[#6366F1] hover:text-[#9333EA] font-medium">About</a>
          <a href="#" className="text-[#6366F1] hover:text-[#9333EA] font-medium">Contact</a>
        </nav>
        <div className="relative">
          <button onClick={() => setIsCartOpen(true)} className="text-[#6366F1] hover:text-[#9333EA]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#C2E812] text-[#0A0908] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Sliding Mini-Cart */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-[#F5F5F5] shadow-lg z-20 transform ${isCartOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[#0A0908]">Your Cart</h3>
            <button onClick={() => setIsCartOpen(false)} className="text-[#6366F1] hover:text-[#9333EA]">Close</button>
          </div>
          {cartItems.length === 0 ? (
            <p className="text-[#0A0908]">Your cart is empty.</p>
          ) : (
            <div>
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center mb-4">
                  <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                  <div>
                    <p className="text-[#0A0908] font-medium">{item.name}</p>
                    <p className="text-[#0A0908]">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
              <button className="w-full bg-[#6366F1] text-[#FFFFFF] py-2 rounded hover:bg-[#9333EA]">Checkout</button>
            </div>
          )}
        </div>
      </div>

      {/* Promotional Banner */}
      <section className="pt-20 bg-gradient-to-r from-[#6366F1] to-[#9333EA] text-[#FFFFFF] p-8 text-center h-96 flex flex-col justify-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Step Up Your Style!</h2>
        <p className="text-lg md:text-xl mb-6">Up to 50% Off on Premium Footwear – Limited Time Only!</p>
        <div className="flex justify-center space-x-4 text-xl md:text-2xl">
          <div><span className="block font-bold">{timeLeft.days}</span><span className="text-sm">Days</span></div>
          <div><span className="block font-bold">{timeLeft.hours}</span><span className="text-sm">Hours</span></div>
          <div><span className="block font-bold">{timeLeft.minutes}</span><span className="text-sm">Minutes</span></div>
          <div><span className="block font-bold">{timeLeft.seconds}</span><span className="text-sm">Seconds</span></div>
        </div>
        <a href="#" className="mt-6 inline-block bg-[#C2E812] text-[#0A0908] px-8 py-3 rounded-full font-semibold hover:bg-[#FFFFFF]">Shop Now</a>
      </section>

      {/* Featured Product Carousel */}
      <section className="p-6 bg-[#F5F5F5]">
        <h3 className="text-2xl font-semibold text-[#0A0908] mb-4">Top Footwear Picks</h3>
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
          {featuredProducts.map((product) => (
            <div key={product.id} className="min-w-[200px] bg-[#FFFFFF] rounded-lg shadow-md p-4">
              <img src={product.img} alt={product.name} className="w-full h-32 object-cover rounded-md mb-2" />
              <h4 className="text-lg font-medium text-[#0A0908]">{product.name}</h4>
              <p className="text-[#0A0908]">${product.price.toFixed(2)}</p>
              <button onClick={() => addToCart(product)} className="mt-2 w-full bg-[#6366F1] text-[#FFFFFF] py-1 rounded hover:bg-[#9333EA]">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Personalized Product Recommendations */}
      <section className="p-6">
        <h3 className="text-2xl font-semibold text-[#0A0908] mb-4">Just for You</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendedProducts.map((product) => (
            <div key={product.id} className="bg-[#FFFFFF] rounded-lg shadow-md p-4">
              <img src={product.img} alt={product.name} className="w-full h-32 object-cover rounded-md mb-2" />
              <h4 className="text-lg font-medium text-[#0A0908]">{product.name}</h4>
              <p className="text-[#0A0908]">${product.price.toFixed(2)}</p>
              <button onClick={() => addToCart(product)} className="mt-2 w-full bg-[#6366F1] text-[#FFFFFF] py-1 rounded hover:bg-[#9333EA]">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* User Testimonials */}
      <section className="p-6 bg-[#F5F5F5]">
        <h3 className="text-2xl font-semibold text-[#0A0908] mb-4">Customer Reviews</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-[#FFFFFF] rounded-lg shadow-md p-4">
              <p className="text-[#0A0908] italic">"{testimonial.text}"</p>
              <p className="mt-2 text-[#0A0908] font-medium">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="p-6 bg-[#6366F1] text-[#FFFFFF] text-center">
        <h3 className="text-xl font-semibold mb-2">Stay in Step with Us</h3>
        <p className="mb-4">Subscribe for exclusive footwear deals!</p>
        <div className="flex justify-center">
          <input type="email" placeholder="Enter your email" className="p-2 rounded-l-md text-[#0A0908] focus:outline-none" />
          <button className="bg-[#9333EA] p-2 rounded-r-md hover:bg-[#C2E812] text-[#FFFFFF] hover:text-[#0A0908]">Subscribe</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0908] text-[#FFFFFF] p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#6366F1]">Home</a></li>
              <li><a href="#" className="hover:text-[#6366F1]">Shop</a></li>
              <li><a href="#" className="hover:text-[#6366F1]">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#6366F1]">FAQ</a></li>
              <li><a href="#" className="hover:text-[#6366F1]">Returns</a></li>
              <li><a href="#" className="hover:text-[#6366F1]">Shipping</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <p>Stay connected on social media!</p>
          </div>
        </div>
        <p className="text-center mt-4 text-sm">© 2023 Footwear Haven. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage2;