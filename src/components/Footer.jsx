// src/components/Footer.jsx

import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const Footer = () => {
  const [email, setEmail] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: 'warning',
        title: 'Email Required',
        text: 'Please enter your email address.',
      });
      return;
    }

    if (!validateEmail(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Subscription Successful!',
      text: 'You are now subscribed to TravelInworld. ',
      timer: 2500,
      showConfirmButton: false,
    });

    setEmail('');
  };
  return (
    <footer className="bg-gradient-to-br from-red-700 via-red-950 to-black text-white px-6 py-20 relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm relative z-10">
        
        {/* Brand Column */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black tracking-tighter uppercase italic">
            Travel<span className="text-red-500">N</span>World
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Crafting luxury travel experiences for the discerning explorer. 
            Join our elite community and discover the world's most secret escapes.
          </p>
          <div className="flex space-x-5 text-xl">
            <a href="http://facebook.com/profile.php?id=61551720045200" target="_blank" rel="noreferrer">
              <FaFacebookF className="hover:text-red-500 transition-all cursor-pointer transform hover:-translate-y-1" />
            </a>
            <a href="https://instagram.com/triptohoneymoon_official" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-red-500 transition-all cursor-pointer transform hover:-translate-y-1" />
            </a>
            <a href="https://youtube.com/@trip2honeymoon_official?si=AJEgM_rEtIDQa0Hk" target="_blank" rel="noreferrer">
              <FaYoutube className="hover:text-red-500 transition-all cursor-pointer transform hover:-translate-y-1" />
            </a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div>
          <h3 className="text-red-500 font-black uppercase tracking-widest text-[10px] mb-6">Explore</h3>
          <ul className="space-y-4 font-medium">
            <li><Link to="/" className="hover:text-red-500 transition-colors">Home</Link></li>
            <li><Link to="/trending" className="hover:text-red-500 transition-colors">Trending Destinations</Link></li>
            <li><Link to="/packages" className="hover:text-red-500 transition-colors">Premium Packages</Link></li>
            <li><Link to="/domestic" className="hover:text-red-500 transition-colors">Domestic Tours</Link></li>
            <li><Link to="/international" className="hover:text-red-500 transition-colors">International Escapes</Link></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h3 className="text-red-500 font-black uppercase tracking-widest text-[10px] mb-6">Company</h3>
          <ul className="space-y-4 font-medium">
            <li><Link to="/aboutUs" className="hover:text-red-500 transition-colors">Our Story</Link></li>
            <li><Link to="/contactUs" className="hover:text-red-500 transition-colors">Contact Support</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-red-500 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/Terms-to-use" className="hover:text-red-500 transition-colors">Terms of Use</Link></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="space-y-6">
          <h3 className="text-red-500 font-black uppercase tracking-widest text-[10px] mb-6">Join Our Elite List</h3>
          
          {/* Login | Sign Up links */}
          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest">
            <Link to="/b2blogin" className="hover:text-red-500 transition">Login</Link>
            <span className="w-1 h-1 bg-red-600 rounded-full"></span>
            <Link to="/b2bSignup" className="hover:text-red-500 transition">Sign Up</Link>
          </div>

          <form onSubmit={handleSubscribe} className="space-y-4">
            <div className="relative group">
              <input
                type="email"
                placeholder="Elite Member Email"
                className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-full text-white focus:outline-none focus:border-red-600 transition-all group-hover:border-white/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-red-600 hover:bg-white hover:text-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl shadow-red-600/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7-7 7M3 12h18" /></svg>
              </button>
            </div>
            <p className="text-[10px] text-gray-500 leading-relaxed font-bold uppercase tracking-wider">
              Weekly curated deals for elite members only.
            </p>
          </form>           
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto border-t border-white/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
        <p>© {new Date().getFullYear()} TravelNWorld. Designed for Legends.</p>
        <p className="flex items-center gap-2">
          Made with <span className="text-red-600 animate-pulse text-xs">❤</span> for travelers.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
