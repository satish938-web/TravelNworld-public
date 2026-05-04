import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo/logo.png';
import PlanMyTripForm from '../forms/PlanMyTripForm';

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [showTripForm, setShowTripForm] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-red-600 font-bold text-[17px] relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-red-600 after:rounded-full'
      : `font-medium text-[17px] transition-all duration-300 hover:text-red-600 ${isScrolled ? "text-gray-700" : "text-gray-800"}`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] no-print ${
      isScrolled ? "bg-white/90 backdrop-blur-lg shadow-xl py-0" : "bg-white py-0"
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <a href="/" onClick={() => setOpen(false)} className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-16" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center justify-center flex-1 ml-10">
            <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            <NavLink to="/aboutUs" className={navLinkClass}>About us</NavLink>
            <NavLink to="/agents" className={navLinkClass}>Agents</NavLink>
            <NavLink to="/packages" className={navLinkClass}>Packages</NavLink>
            <NavLink to="/destination" className={navLinkClass}>Destination</NavLink>
            <NavLink to="/b2blogin" className={navLinkClass}>B2B login</NavLink>
            <NavLink to="/blogs" className={navLinkClass}>Blogs</NavLink>
            <NavLink to="/contactUs" className={navLinkClass}>ContactUs</NavLink>
          </div>

          <div className="hidden md:flex items-center">
            <button
              onClick={() => setShowTripForm(true)}
              className="px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest bg-premium-gradient text-white shadow-xl shadow-red-600/20 transform hover:-translate-y-1 active:scale-95 transition-all duration-300"
            >
              Plan My Trip
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="text-gray-900 hover:text-red-600 focus:outline-none"
            >
              {open ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white px-4 pt-4 pb-6 shadow flex flex-col space-y-4 transition-all duration-300 ease-in-out">
          <NavLink to="/" end onClick={() => setOpen(false)} className={navLinkClass}>Home</NavLink>
          <NavLink to="/aboutUs" onClick={() => setOpen(false)} className={navLinkClass}>About us</NavLink>
          <NavLink to="/agents" onClick={() => setOpen(false)} className={navLinkClass}>Agents</NavLink>
          <NavLink to="/packages" onClick={() => setOpen(false)} className={navLinkClass}>Packages</NavLink>
          <NavLink to="/destination" onClick={() => setOpen(false)} className={navLinkClass}>Destination</NavLink>
          <NavLink to="/b2blogin" onClick={() => setOpen(false)} className={navLinkClass}>B2B login</NavLink>
          <NavLink to="/blogs" onClick={() => setOpen(false)} className={navLinkClass}>Blogs</NavLink>
          <NavLink to="/contactUs" onClick={() => setOpen(false)} className={navLinkClass}>ContactUs</NavLink>

          <div className="pt-4 border-t">
            <button
              onClick={() => {
                setShowTripForm(true);
                setOpen(false);
              }}
              className="w-full bg-premium-gradient text-white px-4 py-3 rounded-full text-sm font-black uppercase tracking-widest hover:bg-black transition"
            >
              Plan My Trip
            </button>
          </div>
        </div>
      )}

      {/* Modal Popup for Plan My Trip Form */}
      {showTripForm && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowTripForm(false)} // closes when clicking outside form
        >
          <div
            className="bg-white p-6 rounded-md w-full max-w-lg shadow-lg relative"
            onClick={e => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <button
              onClick={() => setShowTripForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
              aria-label="Close Plan My Trip Form"
            >
              &times;
            </button>
            <PlanMyTripForm onClose={() => setShowTripForm(false)}  />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
