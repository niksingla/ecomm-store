import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
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
  const [showModal, setShowModal] = useState(false);
  const [isIniModalOpen, setIsIniModalOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  const testimonials = [
    {
      id: 1,
      name: "Emma Brown",
      text: "These sneakers are super comfy and stylish!",
      avatar: "https://www.w3schools.com/w3images/avatar2.png",
    },
    {
      id: 2,
      name: "Liam Jones",
      text: "Fast delivery and great quality shoes!",
      avatar: "https://www.w3schools.com/w3images/avatar6.png",
    },
    {
      id: 3,
      name: "Sophia Lee",
      text: "Amazing customer service and super easy to shop!",
      avatar: "https://www.w3schools.com/w3images/avatar5.png",
    },
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

  const mainFeatured = dummyProducts[5];
  // Subsets of Products
  const featuredProducts = dummyProducts.slice(0, 10); // First 10 products

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };
  const slides = [
    {
      headline: `${mainFeatured.name} Just Landed!`,
      sub: `$${mainFeatured.price.toFixed(2)} – Grab It While It Lasts!`,
      bg: mainFeatured.img
    },
    {
      headline: 'Step Up Your Style!',
      sub: 'Up to 50% Off on Premium Footwear – Limited Time Only!',
      bg: "https://images.unsplash.com/photo-1631161307905-534e8dbae9b9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      headline: 'Street-Ready Looks',
      sub: 'Grab Your Limited Edition Kicks Now!',
      bg: "https://images.unsplash.com/photo-1617991696989-148892be4164?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      headline: 'Built for Performance',
      sub: 'Save Big on Running Shoes!',
      bg: "https://images.unsplash.com/photo-1722489291846-0bc130eac071?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
  ];

  const settings_main = {
    dots: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 10000,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,

  };

  const [showLogin, setShowLogin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form Submitted:', formData);
    closeModal();
  };

  const openSignUp = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const recommendedProducts = [
    {
      id: 1,
      name: "AirFlex Running Shoes",
      description: "Lightweight and breathable shoes for everyday runs.",
      image: "https://images.unsplash.com/photo-1499013819532-e4ff41b00669?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 79.99,
    },
    {
      id: 2,
      name: "Urban Classic Sneakers",
      description: "Minimal design with maximum comfort for city life.",
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 89.99,
    },
    {
      id: 3,
      name: "TrailMaster Hiker Boots",
      description: "Durable and rugged for outdoor adventures.",
      image: "https://images.unsplash.com/photo-1600185652960-c9d8869d015c?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 109.99,
    },
    {
      id: 4,
      name: "EcoSlide Sandals",
      description: "Sustainable comfort with eco-friendly materials.",
      image: "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 39.99,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans">
      {/* Viewport Meta Tag */}
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      {/* Exclusive Offer Popup with Image and 50% Discount Highlight */}
      {isIniModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-2xl w-11/12 lg:w-[900px] overflow-hidden flex flex-col lg:flex-row">

            {/* Left side: Image (hidden on mobile) */}
            <div className="w-full lg:w-1/2 hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1588207415599-de82d6e5ae0d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Exclusive Offer"
                className="object-cover w-full h-full rounded-t-lg lg:rounded-l-lg"
              />
            </div>

            {/* Right side: Content */}
            <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl lg:text-3xl font-semibold text-[#0A0908]">Limited Time Offer!</h3>
                <button
                  onClick={() => setIsIniModalOpen(false)}
                  className="text-[#6366F1] hover:text-[#9333EA] transition"
                >
                  <X className="w-6 h-6 text-[#0A0908]" />
                </button>
              </div>

              {/* Highlight 50% Discount in a Card-style Container */}
              <div className="bg-gradient-to-r from-[#6366F1] to-[#9333EA] p-6 rounded-lg shadow-xl mb-6">
                <div className="flex flex-col items-center">
                  <span className="text-4xl lg:text-5xl font-bold text-white">50% OFF</span>
                  <p className="text-lg lg:text-xl text-white mt-2">On Your First Order!</p>
                </div>
              </div>

              {/* Offer Details */}
              <p className="text-base lg:text-lg text-[#0A0908] mb-6">
                Use the code <strong className="text-[#6366F1]">WELCOME10</strong> to save 50% on all products. This offer is valid for a limited time only, so hurry!
              </p>

              {/* Call-to-Action Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => setIsIniModalOpen(false)}
                  className="bg-[#9333EA] text-white py-2 px-8 rounded-full hover:bg-[#6366F1] transition"
                >
                  Grab Your Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Header */}
      <header className="bg-[#FFFFFF] shadow-md p-4 fixed top-8 left-0 w-full z-10 flex flex-col md:flex-row justify-between items-center">
        {/* Top Bar Notice */}
        <div className="bg-[#9333EA] text-white text-center py-2 text-sm fixed top-0 left-0 w-full z-20">
          <p>
            Flash Sale: Up to 50% Off Footwear!{" "}
            <a href="#" className="underline font-semibold">
              Shop Now
            </a>
          </p>
        </div>
        <h1 className="text-2xl font-bold text-[#0A0908] mb-2 md:mb-0 cursor-pointer">Footwear Haven</h1>

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
              className="text-[#0A0908] font-semibold border-b-2 border-[#0A0908] pb-1 transition-all duration-300"
            >
              Home
            </a>
            <a
              href="#contact"
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
              onClick={openSignUp}
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
                <a onClick={openSignUp} href="#" className="text-[#0A0908] font-medium">
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
              <span className="absolute -top-2 -right-2 bg-[#9333EA] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-20 transform ${isWishlistOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out rounded-l-lg`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-[#0A0908]">Your Wishlist</h3>
            <button onClick={() => setIsWishlistOpen(false)} className="text-[#6366F1] hover:text-[#9333EA] transition">
              <X className="text-[#0A0908] w-6 h-6" />
            </button>
          </div>
          {wishlistItems.length === 0 ? (
            <p className="text-[#0A0908] text-lg">Your wishlist is empty.</p>
          ) : (
            <div className="space-y-4">
              {wishlistItems.map((item, index) => (
                <div key={index} className="flex items-center p-3 rounded-lg shadow-md hover:bg-[#F5F5F5] transition-all">
                  <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                  <div className="flex-1">
                    <p className="text-[#0A0908] font-semibold text-lg">{item.name}</p>
                    <p className="text-[#6366F1] text-sm">${item.price.toFixed(2)}</p>
                  </div>
                  <button className="text-[#9333EA] hover:text-[#6366F1] transition">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button className="w-full bg-[#6366F1] text-white py-3 rounded-full mt-4 hover:bg-[#9333EA] transition">
                View Wishlist
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sliding Mini-Cart */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-20 transform ${isCartOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out rounded-l-lg`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-[#0A0908]">Your Cart</h3>
            <button onClick={() => setIsCartOpen(false)} className="text-[#6366F1] hover:text-[#9333EA] transition">
              <X className="text-[#0A0908] w-6 h-6" />
            </button>
          </div>
          {cartItems.length === 0 ? (
            <p className="text-[#0A0908] text-lg">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center p-3 rounded-lg shadow-md hover:bg-[#F5F5F5] transition-all">
                  <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                  <div className="flex-1">
                    <p className="text-[#0A0908] font-semibold text-lg">{item.name}</p>
                    <p className="text-[#6366F1] text-sm">${item.price.toFixed(2)}</p>
                  </div>
                  <button className="text-[#9333EA] hover:text-[#6366F1] transition">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button className="w-full bg-[#6366F1] text-white py-3 rounded-full mt-4 hover:bg-[#9333EA] transition">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>


      {/* SignUp Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold text-center mb-6">
              {showLogin ? "Login" : "Sign Up"}
            </h2>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              X
            </button>

            {!showLogin ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Sign Up
                </button>
              </form>
            ) : (
              <form className="space-y-4">
                <input
                  type="email"
                  name="loginEmail"
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="password"
                  name="loginPassword"
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Login
                </button>
              </form>
            )}

            <p
              className="text-center text-sm text-gray-600 mt-4 cursor-pointer"
              onClick={() => setShowLogin(!showLogin)}
            >
              {showLogin ? "Don't have an account? Sign up" : "Already have an account?"}
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {isHome && (
        <div>
          {/* Promotional Banner */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
                html {
                  scroll-behavior: smooth;
                }
                .hero-section .slick-dots li button:before {
                  color:white;
                  font-size:20px;
                }
                .hero-section .slick-dots {
                  bottom: 10px;
                }
                .hero-section .slick-arrow {
                  color: #fff;
                  width:40px;
                  height:40px;
                  z-index:2;
                }
                .hero-section .slick-prev {
                  left:0;
                }
                .hero-section .slick-next {
                  right:0;
                }
                @media only screen and (max-width: 767px) {
                  .hero-section .slick-prev {
                    display:none!important;
                  }
                  .hero-section .slick-next {
                    top:50px;
                  }
                }
              `
            }}
          />
          <section className="hero-section h-auto w-full pt-28 bg-neutral-950 text-white overflow-hidden relative">
            <div className="absolute w-[180px] z-[2] py-4 bg-gradient-to-r from-[#6366F1] to-[#9333EA] mt-[12px] md:mt-16 shadow-lg transform md:-right-[10px]">
              <p className="text-white text-center text-sm font-semibold tracking-widest transform ">
                Featured
              </p>
            </div>

            <Slider className="w-full" {...settings_main}>
              {slides.map((slide, index) => (
                <div key={index}>
                  <div
                    className="relative bg-cover bg-center h-[600px] flex items-center px-2 md:px-16 lg:px-24"
                    style={{ backgroundImage: `url('${slide.bg}')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
                    <div className="relative z-10 max-w-3xl">
                      <p className="text-sm uppercase tracking-widest text-[#6366F1] mb-3">Limited Offer</p>
                      <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                        {slide.headline}
                      </h2>
                      <p className="text-lg md:text-2xl mb-8 text-gray-300">{slide.sub}</p>
                      <div className="flex gap-3 mb-8 md:justify-start">
                        {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, i) => (
                          <div key={label} className="text-center bg-black bg-opacity-40 rounded-md px-4 py-2">
                            <span className="block text-2xl font-bold">
                              {Object.values(timeLeft)[i]}
                            </span>
                            <span className="text-xs uppercase tracking-wide">{label}</span>
                          </div>
                        ))}
                      </div>
                      <a
                        href="#"
                        className="inline-block bg-[#6366F1] text-white px-8 py-3 rounded-full font-bold uppercase tracking-wide hover:bg-white hover:text-black transition"
                      >
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </section>

          {/* Personalized Product Recommendation */}
          <section className="w-full py-20 px-4 bg-[#FFFFFF]">
            <div className="max-w-7xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-4xl font-bold text-[#0A0908] mb-3">Personalized Recommendations</h2>
                <p className="text-black text-lg">Curated picks based on your style and preferences</p>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {recommendedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-[#F4F3FE] rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300 cursor-pointer"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-[#0A0908] group-hover:text-[#9333EA] transition-colors cursor-pointer">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#4B5563] mt-1">{product.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-[#9333EA] font-bold text-base">${product.price}</span>
                        <button className="text-sm bg-[#6366F1] text-white px-4 py-1 rounded-full hover:bg-[#4F46E5] transition">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="bg-[#F5F5F5] py-20 px-4">
            <div className="max-w-7xl mx-auto text-left">
              <h3 className="text-3xl font-bold text-[#0A0908] mb-14">Explore Categories</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12 justify-items-center">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex flex-col items-center group transition-transform hover:scale-105 cursor-pointer"
                  >
                    <div className="w-32 md:w-44 h-32 md:h-44 rounded-full overflow-hidden border-4 border-[#6366F1] group-hover:border-[#9333EA] transition-all duration-300 shadow-md">
                      <img
                        src={category.img}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="mt-4 text-lg font-semibold text-[#0A0908] group-hover:text-[#9333EA] transition">
                      {category.name}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Best Products Carousel */}
          <section className="px-6 py-16 bg-white">
            <h3 className="text-3xl font-semibold text-[#0A0908] mb-8 text-center">Best Seller</h3>
            <Slider {...settings}>
              {featuredProducts.map((product) => (
                <div key={product.id} className="px-4">
                  <div className="bg-[#F4F3FE] rounded-xl cursor-pointer p-6 relative group hover:scale-105 transition-transform duration-300">
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-all duration-300 transform group-hover:scale-110"
                      />
                    </div>
                    <button
                      onClick={() => addToWishlist(product)}
                      className="absolute top-4 right-4 p-2 bg-white text-gray-600 rounded-full shadow-md transition-colors group-hover:text-[#9333EA] z-10"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.682l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                      </svg>
                    </button>
                    <div className="mt-4 text-center">
                      <h4 className="text-lg font-semibold text-[#0A0908] cursor-pointer transition-all duration-300 group-hover:text-[#9333EA]">{product.name}</h4>
                      <p className="text-[#6366F1] font-medium">${product.price.toFixed(2)}</p>
                      <button
                        onClick={() => addToCart(product)}
                        className="mt-4 w-full bg-[#6366F1] text-white py-2 rounded-lg hover:bg-[#9333EA] transition duration-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </section>


          {/* User Testimonials */}
          <section className="px-6 pt-20 pb-28 bg-[#6366F1]">
            <h3 className="text-4xl font-bold text-white mb-16 text-center relative after:content-[''] after:absolute after:w-16 after:h-1 after:bg-[#6366F1] after:left-1/2 after:transform after:-translate-x-1/2 after:bottom-0">Testimonials</h3>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-[#F4F3FE] rounded-lg shadow-lg p-8 transform transition-all hover:scale-105 hover:shadow-2xl duration-300"
                >
                  <p className="text-[#0A0908] text-2xl italic mb-6">"{testimonial.text}"</p>
                  <div className="flex items-center justify-start">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-[#6366F1]">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <p className="text-left text-[#0A0908] mt-4 font-medium">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="px-6 py-16 bg-white">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Content on the left */}
                <div className="text-[#0A0908] flex flex-col justify-center">
                  <h2 className="text-4xl font-extrabold mb-6 tracking-tight">Get in Touch</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Have questions or need assistance? We're here to help and will respond as soon as possible.
                  </p>
                  <p className="text-lg text-gray-600 mb-6">
                    You can also reach us directly at <strong className="text-[#6366F1] cursor-pointer">+1 (234) 567-890</strong> or email us at <strong className="text-[#6366F1] cursor-pointer">info@footwearhaven.com</strong>.
                  </p>
                  <p className="text-lg text-gray-600">
                    We look forward to connecting with you soon!
                  </p>
                </div>


                {/* Contact form on the right */}
                <div className="bg-white p-10 rounded-lg shadow-xl w-full">
                  <h3 className="text-3xl font-bold mb-6 text-[#0A0908] text-center">Contact Us</h3>
                  <form>
                    <div className="mb-6">
                      <label htmlFor="name" className="block text-lg font-medium text-[#0A0908] mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Your name"
                        className="w-full px-5 py-3 rounded-md border border-[#E5E5E5] text-[#0A0908] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-lg font-medium text-[#0A0908] mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Your email"
                        className="w-full px-5 py-3 rounded-md border border-[#E5E5E5] text-[#0A0908] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-lg font-medium text-[#0A0908] mb-2">Message</label>
                      <textarea
                        id="message"
                        placeholder="Your message"
                        className="w-full px-5 py-3 rounded-md border border-[#E5E5E5] text-[#0A0908] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#6366F1] text-white py-3 rounded-md hover:bg-[#9333EA] transition duration-300 ease-in-out"
                    >
                      Send Message
                    </button>
                  </form>
                </div>

              </div>
            </section>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#0A0908] text-[#FFFFFF] pt-12 pb-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-[#9333EA]">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-[#6366F1] transition duration-300">Home</a></li>
              <li><a href="#" className="hover:text-[#6366F1] transition duration-300">Contact</a></li>
              <li><a href="#" className="hover:text-[#6366F1] transition duration-300">About</a></li>
            </ul>
          </div>

          {/* Helpful Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-[#9333EA]">Helpful Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-[#6366F1] transition duration-300">FAQ</a></li>
              <li><a href="#" className="hover:text-[#6366F1] transition duration-300">Returns</a></li>
              <li><a href="#" className="hover:text-[#6366F1] transition duration-300">Shipping</a></li>
            </ul>
          </div>

          {/* Our Information */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-[#9333EA]">Our Information</h4>
            <ul className="space-y-3">
              <li>123 Footwear Lane, Shoe City, SC 12345</li>
              <li><a href="tel:+1234567890" className="hover:text-[#6366F1] transition duration-300">+1 (234) 567-890</a></li>
              <li><a href="mailto:info@footwearhaven.com" className="hover:text-[#6366F1] transition duration-300">info@footwearhaven.com</a></li>
            </ul>
            <div className="flex space-x-6 mt-6">
              <a href="#" className="hover:text-[#6366F1] transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
              </a>
              <a href="#" className="hover:text-[#6366F1] transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-[#9333EA]">Newsletter</h4>
            <p className="mb-6 text-[#F5F5F5]">Stay updated with our latest offers!</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="p-3 w-full rounded-l-md text-[#0A0908] focus:outline-none placeholder-[#0A0908] transition duration-300"
              />
              <button className="bg-[#6366F1] text-[#FFFFFF] p-3 rounded-r-md hover:bg-[#9333EA] transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#6366F1] pt-4">
          <p className="text-center text-sm text-[#F5F5F5]">© 2025 Footwear Haven. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;