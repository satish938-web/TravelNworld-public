import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, Share2, Phone, MapPin, Clock, Award, CheckCircle2, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import CustomerEnquiryForm from "../../forms/CustomerEnquiryFrom";
import travelItemPropType from '../../propTypes/travelItemPropType.js';
import { getImageUrl } from '../../utils/api';

const Header = ({ travelItem }) => {
  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Use the first agent photo as banner, or a high-quality default
  // Use dashboard banner, then first agent photo, then default
  const bannerImage = travelItem.bannerImage 
    ? getImageUrl(travelItem.bannerImage)
    : (travelItem.images && travelItem.images.length > 0 
        ? getImageUrl(travelItem.images[0]) 
        : "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80");

  const handleShare = async () => {
    const shareData = {
      title: travelItem.title,
      text: `Check out this travel spot: ${travelItem.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log("Sharing failed:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      } catch (err) {
        alert("Unable to copy the link.");
      }
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-red-900/5 mb-8"
    >
      {/* 1. Hero Banner Section */}
      <div className="relative h-48 md:h-60 w-full overflow-hidden group">
        <motion.img 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={bannerImage} 
          alt="Company Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Floating Badges on Banner */}
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSaved(!saved)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${saved
                ? "bg-yellow-400 text-slate-900 shadow-lg"
                : "bg-white/20 text-white hover:bg-white/40"
              }`}
          >
            <Bookmark size={18} className={saved ? "fill-current" : ""} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 text-white hover:bg-white/40 backdrop-blur-md transition-all"
          >
            <Share2 size={18} />
          </motion.button>
        </div>
      </div>

      {/* 2. Brand Identity Section (Overlapping) */}
      <div className="px-6 md:px-10 relative">
        <div className="flex flex-col md:flex-row items-end gap-5 -mt-12 md:-mt-16 mb-6">
          {/* Logo Circle */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white flex-shrink-0 z-10"
          >
            <img 
              src={getImageUrl(travelItem.image)} 
              alt="Company Logo" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Title & Key Stats */}
          <div className="flex-1 pb-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 mb-1"
            >
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {travelItem.title}
              </h1>
              {travelItem.verified && (
                <CheckCircle2 className="text-red-600 fill-red-50" size={22} />
              )}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center gap-3 text-slate-500 font-medium"
            >
              <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-900 text-yellow-400 rounded-full text-[11px] font-bold shadow-lg shadow-black/10">
                <Award size={12} />
                <span>{travelItem.rating} Score</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={14} className="text-slate-400" />
                <span className="text-xs md:text-sm">{travelItem.location}</span>
              </div>
            </motion.div>
          </div>

          {/* Quick Contact Capsules */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-2 md:pb-1"
          >
            <a
              href={`tel:${travelItem.phone}`}
              className="px-6 py-3 bg-slate-900 text-white rounded-full font-bold text-sm flex items-center gap-2 hover:bg-red-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
            >
              <Phone size={16} />
              <span>Call Agent</span>
            </a>
          </motion.div>
        </div>

        {/* 3. Navigation & Description */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-4 border-t border-slate-100">
          <nav className="flex flex-wrap gap-1.5">
            {[
              { label: "Overview", href: "#overview", show: true },
              { label: "Packages", href: "#packages", show: true },
              { label: "Gallery", href: "#gallery", show: true },
              { label: "Reviews", href: "#reviews", show: true },
              { label: "Branches", href: "#branches", show: true },
              { label: "Blogs", href: "#blogs", show: true },
              { label: "Testimonials", href: "#testimonials", show: true },
            ].filter(nav => nav.show).map((nav, idx) => (
              <motion.a
                whileHover={{ y: -2, backgroundColor: "#dc2626", color: "#ffffff" }}
                key={idx}
                href={nav.href}
                className="px-4 py-2 rounded-full text-[12px] font-bold transition-all bg-slate-50 text-slate-600 border border-slate-100"
              >
                {nav.label}
              </motion.a>
            ))}
          </nav>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="px-8 py-3 bg-premium-gradient text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-xl shadow-red-200 active:scale-95"
          >
            Enquire Today
          </motion.button>
        </div>
      </div>

      {showModal && (
        <CustomerEnquiryForm
          travelItem={travelItem}
          onClose={() => setShowModal(false)}
        />
      )}
    </motion.header>
  );
};

Header.propTypes = {
  travelItem: travelItemPropType.isRequired,
};

export default Header;
