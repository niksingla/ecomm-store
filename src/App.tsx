import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { X } from "lucide-react";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

// Define 10 Dummy Footwear Products
const dummyProducts = [
  { id: 1, name: "PeakPulse Sneakers", price: 89.99, category: "Sneakers", img: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb" },
  { id: 2, name: "SwiftRun Trainers", price: 79.99, category: "Running Shoes", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
  { id: 3, name: "RuggedPeak Boots", price: 129.99, category: "Boots", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa" },
  { id: 4, name: "EasyGlide Loafers", price: 59.99, category: "Casual", img: "https://images.unsplash.com/photo-1616663308968-58162d332720?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 5, name: "FlexFlow Sneakers", price: 99.99, category: "Sneakers", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a" },
  { id: 6, name: "DashPro Runners", price: 109.99, category: "Running Shoes", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5" },
  { id: 7, name: "TrailTrek Boots", price: 149.99, category: "Boots", img: "https://images.unsplash.com/photo-1616663308968-58162d332720?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 8, name: "ChillStep Slip-Ons", price: 69.99, category: "Casual", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
  { id: 9, name: "UrbanEdge Sneakers", price: 94.99, category: "Sneakers", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa" },
  { id: 10, name: "PaceLite Trainers", price: 84.99, category: "Running Shoes", img: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb" },
];


const HomePage: React.FC = () => {
  // Countdown Timer State

  const [isHome, setIsHome] = useState(true);
  const [isShop, setIsShop] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  const testimonials = [
    { id: 1, name: "Emma Brown", text: "These sneakers are super comfy and stylish!" },
    { id: 2, name: "Liam Jones", text: "Fast delivery and great quality shoes!" },
  ];

  // Cart State
  const [cartItems, setCartItems] = useState<{ id: number; name: string; price: number; img: string; category: string }[]>([]);
  // Wishlist State
  const [wishlistItems, setWishlistItems] = useState<{ id: number; name: string; price: number; img: string; category: string }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

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

  // Categories Data
  const categories = [
    { id: 1, name: "Sneakers", img: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb" },
    { id: 2, name: "Running Shoes", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
    { id: 3, name: "Boots", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa" },
    { id: 4, name: "Casual", img: "https://images.unsplash.com/photo-1616663308968-58162d332720?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];

  // Add to Cart Handler
  const addToCart = (product: { id: number; name: string; price: number; img: string; category: string }) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true); // Open mini-cart on add
  };

  // Add to Wishlist Handler
  const addToWishlist = (product: { id: number; name: string; price: number; img: string; category: string }) => {
    setWishlistItems((prev) => [...prev, product]);
    setIsWishlistOpen(true); // Optional: trigger a wishlist popup or sidebar
  };

  // Subsets of Products
  const featuredProducts = dummyProducts.slice(0, 10); // First 10 products

  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };
  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans">
      {/* Viewport Meta Tag */}
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />      
      </Helmet>
      

      {/* Sticky Header */}
      <header className="bg-[#FFFFFF] shadow-md p-4 fixed top-8 left-0 w-full z-10 flex flex-col md:flex-row justify-between items-center">
        {/* Top Bar Notice */}
        <div className="bg-[#C2E812] text-[#0A0908] text-center py-2 text-sm fixed top-0 left-0 w-full z-20">
          <p>
            Flash Sale: Up to 50% Off Footwear!{" "}
            <a href="#" className="underline font-semibold hover:text-[#6366F1]">
              Shop Now
            </a>
          </p>
        </div>
        <h1 className="text-2xl font-bold text-[#0A0908] mb-2 md:mb-0">Footwear Haven</h1>
        
        <>
          

          {/* Search Bar for Desktop */}
          <div className="hidden md:flex w-full max-w-md border border-gray-300 gap-2 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search Products"
              className="flex-grow px-4 py-2 text-sm text-gray-700 focus:outline-none"
            />
            <select className="px-3 py-2 text-sm text-gray-700 cursor-pointer focus:outline-none">
              <option>All categories</option>
              <option>Sneakers</option>
              <option>Running Shoes</option>
              <option>Boots</option>
              <option>Casual</option>
            </select>
            <button className="px-4 py-2 text-gray-500 border-l border-gray-300 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </button>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white w-11/12 max-w-md p-4 rounded-lg shadow-lg">
                <div className="flex justify-between mb-4">
                  <h2 className="text-lg font-semibold">Search</h2>
                  <button
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => setShowModal(false)}
                  >
                    ✕
                  </button>
                </div>
                <div className="flex w-full border border-gray-300 gap-2 rounded-md overflow-hidden">
                  <input
                    type="text"
                    placeholder="Search Products"
                    className="flex-grow px-4 py-2 text-sm text-gray-700 focus:outline-none"
                  />
                  <select className="px-3 py-2 text-sm text-gray-700 cursor-pointer focus:outline-none">
                    <option>All categories</option>
                    <option>Sneakers</option>
                    <option>Running Shoes</option>
                    <option>Boots</option>
                    <option>Casual</option>
                  </select>
                  <button className="px-4 py-2 text-gray-500 border-l border-gray-300 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </>

        <>
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 bg-white px-6 py-3">
            <a
              href="#"
              className={`text-[#0A0908] font-semibold pb-1 transition-all duration-300 ${isHome ? 'border-b-2 border-[#0A0908]' : ''}`}
            >
              Home
            </a>
            <a
              href="#"
              className="text-[#0A0908] hover:border-b-2 hover:border-[#0A0908] font-medium transition-all duration-300"
            >
              Contact
            </a>
            <a
              href="#"
              className="text-[#0A0908] hover:border-b-2 hover:border-[#0A0908] font-medium transition-all duration-300"
            >
              About
            </a>
            <a
              href="#"
              className="text-[#0A0908] hover:border-b-2 hover:border-[#0A0908] font-medium transition-all duration-300"
            >
              Sign Up
            </a>
          </nav>

          

          {/* Mobile Slide-in Nav */}
          {menuOpen && (
            <div className={`fixed inset-0 bg-black bg-opacity-40 z-50 transform ${menuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}>
              <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col space-y-4 z-50 transition-transform duration-300">
                <div className="flex justify-end">
                  <button onClick={() => setMenuOpen(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-800"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <a href="#" className="text-[#0A0908] font-semibold">
                  Home
                </a>
                <a href="#" className="text-[#0A0908] font-medium">
                  Contact
                </a>
                <a href="#" className="text-[#0A0908] font-medium">
                  About
                </a>
                <a href="#" className="text-[#0A0908] font-medium">
                  Sign Up
                </a>
              </div>
            </div>
          )}
        </>

        <div className="flex space-x-4">
          {/* Mobile Search Icon */}
          <div className="flex md:hidden">
            <button
              className="text-gray-500"
              onClick={() => setShowModal(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </button>
          </div>
          <button onClick={() => setIsWishlistOpen(true)} className="text-[#0A0908] hover:text-[#9333EA]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button onClick={() => setIsCartOpen(true)} className="text-[#0A0908] hover:text-[#9333EA] relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#C2E812] text-[#0A0908] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
          {/* Hamburger Icon (Mobile) */}
          <div className="flex md:hidden justify-end bg-white">
            <button onClick={() => setMenuOpen(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Sliding Wishlist */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-[#F5F5F5] shadow-lg z-20 transform ${isWishlistOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[#0A0908]">Your Wishlist</h3>
            <button onClick={() => setIsWishlistOpen(false)} className="text-[#6366F1] hover:text-[#9333EA]">
              <X className="text-[#0A0908] w-5 h-5" />
            </button>
          </div>
          {wishlistItems.length === 0 ? (
            <p className="text-[#0A0908]">Your wishlist is empty.</p>
          ) : (
            <div>
              {wishlistItems.map((item, index) => (
                <div key={index} className="flex items-center mb-4">
                  <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                  <div>
                    <p className="text-[#0A0908] font-medium">{item.name}</p>
                    <p className="text-[#0A0908]">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
              <button className="w-full bg-[#6366F1] text-[#FFFFFF] py-2 rounded hover:bg-[#9333EA]">View Wishlist</button>
            </div>
          )}
        </div>
      </div>


      {/* Sliding Mini-Cart */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-[#F5F5F5] shadow-lg z-20 transform ${isCartOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[#0A0908]">Your Cart</h3>
            <button onClick={() => setIsCartOpen(false)} className="text-[#6366F1] hover:text-[#9333EA]">
              <X className="text-[#0A0908] w-5 h-5" />
            </button>
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
      
      {/* Mail Content */}
      {isHome && (
        <div>
          {/* Promotional Banner */}
          <section
            className="pt-28 bg-cover bg-center h-[500px] flex items-center justify-center text-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1739444929408-a1f782b8e3ee?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
          >
            <div className="bg-black bg-opacity-50 p-8 rounded-lg text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Step Up Your Style!</h2>
              <p className="text-lg md:text-xl mb-6">Up to 50% Off on Premium Footwear – Limited Time Only!</p>
              <div className="flex justify-center space-x-4 text-xl md:text-2xl">
                <div><span className="block font-bold">{timeLeft.days}</span><span className="text-sm">Days</span></div>
                <div><span className="block font-bold">{timeLeft.hours}</span><span className="text-sm">Hours</span></div>
                <div><span className="block font-bold">{timeLeft.minutes}</span><span className="text-sm">Minutes</span></div>
                <div><span className="block font-bold">{timeLeft.seconds}</span><span className="text-sm">Seconds</span></div>
              </div>
              <a href="#" className="mt-6 inline-block bg-[#C2E812] text-[#0A0908] px-8 py-3 rounded-full font-semibold hover:bg-[#FFFFFF]">Shop Now</a>
            </div>
          </section>

          {/* Categories Section */}
          <section className="p-6 bg-[#F5F5F5]">
            <h3 className="text-2xl font-semibold text-[#0A0908] mb-4 text-center">Explore Our Categories</h3>
            <div className="flex flex-wrap gap-[50px] justify-center cursor-pointer">
              {categories.map((category) => (
                <div key={category.id} className="text-center flex flex-col items-center">
                  <img src={category.img} alt={category.name} className="w-48 h-48 object-cover rounded-full mb-2" />
                  <h4 className="text-lg font-medium text-[#0A0908]">{category.name}</h4>                  
                </div>
              ))}
            </div>
          </section>

          {/* Featured Product Carousel */}
          <section className="px-6 py-16">
            <h3 className="text-2xl font-semibold text-[#0A0908] mb-4 text-center">Top Footwear Picks</h3>
            <Slider {...settings}>
              {featuredProducts.map((product) => (
                <div key={product.id} className="px-2">
                  <div className="bg-white rounded-lg shadow-md p-4 relative">
                    <img src={product.img} alt={product.name} className="w-full h-32 object-cover rounded-md mb-2" />
                    <button
                      onClick={() => addToWishlist(product)}
                      className="absolute -top-[40px] right-0 p-2 text-gray-400 hover:text-red-500 bg-white z-10"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.682l-7.682-7.682a4.5 4.5 0 010-6.364z"/>
                      </svg>
                    </button>
                    <h4 className="text-lg font-medium text-[#0A0908] cursor-pointer">{product.name}</h4>
                    <p className="text-[#0A0908]">${product.price.toFixed(2)}</p>
                    <button onClick={() => addToCart(product)} className="mt-2 w-full bg-[#C2E812] text-black hover:text-white py-1 rounded hover:bg-black">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </Slider>
          </section>
        

          {/* User Testimonials */}
          <section className="px-6 py-16 bg-[#F5F5F5]">
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

        </div>
      )}

      {isShop && (
        <div>
          Shop Page
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#0A0908] text-[#FFFFFF] p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#6366F1]">Home</a></li>
              <li><a href="#" className="hover:text-[#6366F1]">Contact</a></li>
              <li><a href="#" className="hover:text-[#6366F1]">About</a></li>
            </ul>
          </div>

          {/* Helpful Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Helpful Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#6366F1]">FAQ</a></li>
              <li><a href="#" className="hover:text-[#6366F1]">Returns</a></li>
              <li><a href="#" className="hover:text-[#6366F1]">Shipping</a></li>
            </ul>
          </div>

          {/* Our Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Information</h4>
            <ul className="space-y-2">
              <li>123 Footwear Lane, Shoe City, SC 12345</li>
              <li><a href="tel:+1234567890" className="hover:text-[#6366F1]">+1 (234) 567-890</a></li>
              <li><a href="mailto:info@footwearhaven.com" className="hover:text-[#6366F1]">info@footwearhaven.com</a></li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-[#FFFFFF] hover:text-[#6366F1]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
              </a>
              <a href="#" className="text-[#FFFFFF] hover:text-[#6366F1]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="mb-4">Stay updated with our latest offers!</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="p-2 w-full rounded-l-md text-[#0A0908] focus:outline-none"
              />
              <button className="bg-[#6366F1] text-[#FFFFFF] p-2 rounded-r-md hover:bg-[#9333EA]">Subscribe</button>
            </div>
          </div>
        </div>
        <p className="text-center mt-6 pt-4 border-t border-white text-sm">© 2025 Footwear Haven. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;