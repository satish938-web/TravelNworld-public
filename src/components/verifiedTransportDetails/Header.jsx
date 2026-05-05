import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, Share2, Phone, MapPin, Clock, Award, CheckCircle2, MessageSquare, Grid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CustomerEnquiryForm from "../../forms/CustomerEnquiryFrom";
import travelItemPropType from '../../propTypes/travelItemPropType.js';
import { getImageUrl } from '../../utils/api';

const Header = ({ travelItem }) => {
  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBannerLightbox, setShowBannerLightbox] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);

  // Auto-cycle banner images
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffset(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
      <div className="relative h-64 md:h-80 w-full overflow-hidden group bg-slate-900">
        {(() => {
          let banners = [];
          if (Array.isArray(travelItem.bannerImage)) {
            banners = travelItem.bannerImage;
          } else if (typeof travelItem.bannerImage === 'string' && travelItem.bannerImage) {
            // Check for comma-separated legacy data
            if (travelItem.bannerImage.includes(',') && !travelItem.bannerImage.includes('X-Amz-Signature')) {
              banners = travelItem.bannerImage.split(',').map(s => s.trim()).filter(Boolean);
            } else {
              banners = [travelItem.bannerImage];
            }
          }

          if (banners.length === 0) {
            return (
              <div className="w-full h-full bg-gradient-to-r from-slate-800 to-slate-900 opacity-60" />
            );
          }

          if (banners.length === 1) {
            const media = banners[0];
            const isVideo = media.toLowerCase().endsWith('.mp4') || media.toLowerCase().endsWith('.webm') || media.toLowerCase().endsWith('.ogg');
            return (
              <div className="w-full h-full relative">
                {isVideo ? (
                  <video src={getImageUrl(media)} autoPlay muted loop playsInline className="w-full h-full object-cover opacity-60" />
                ) : (
                  <img src={getImageUrl(media)} alt="Company Banner" className="w-full h-full object-cover opacity-60" />
                )}
              </div>
            );
          }

          // Premium Mosaic Layout for 2+ images
          return (
            <div className="grid grid-cols-4 grid-rows-2 w-full h-full gap-2 p-2">
              <AnimatePresence mode="popLayout">
                {(() => {
                  // If we have more than 5 images, we cycle them. 
                  // If we have exactly 5 or fewer, we just show them static or cycle if desired.
                  // If we have more than 1 image, we cycle them.
                  const displayedBanners = banners.length > 1 
                    ? [0, 1, 2, 3, 4].map(i => banners[(i + currentOffset) % banners.length])
                    : banners.slice(0, 5);

                  return displayedBanners.map((media, idx) => {
                    const isVideo = media.toLowerCase().endsWith('.mp4') || media.toLowerCase().endsWith('.webm') || media.toLowerCase().endsWith('.ogg');
                    return (
                      <motion.div
                        key={`${idx}-${media}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className={`${idx === 0 ? "col-span-2 row-span-2 rounded-l-2xl" : "col-span-1 row-span-1"} 
                          ${idx === 1 && banners.length >= 3 ? "rounded-tr-2xl" : ""} 
                          ${idx === 4 && banners.length >= 5 ? "rounded-br-2xl" : ""}
                          relative overflow-hidden bg-slate-800 shadow-inner`}
                      >
                        {isVideo ? (
                          <video src={getImageUrl(media)} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                        ) : (
                          <img src={getImageUrl(media)} alt={`Banner ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-110" />
                        )}
                        {idx === 4 && banners.length > 5 && (
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer group">
                            <span className="text-white font-black text-xs bg-white/20 px-4 py-2 rounded-full border border-white/30 group-hover:bg-white/40 transition-all uppercase tracking-widest">
                              + {banners.length - 5} More
                            </span>
                          </div>
                        )}
                      </motion.div>
                    );
                  });
                })()}
              </AnimatePresence>
            </div>
          );
        })()}
        
        {/* View All Photos Button */}
        <div className="absolute bottom-6 right-6 z-30">
          <button 
            onClick={() => setShowBannerLightbox(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md text-slate-900 rounded-xl font-bold text-xs shadow-xl hover:bg-white transition-all active:scale-95 border border-slate-200"
          >
            <Grid className="text-[12px] opacity-70" size={14} />
            Show all photos
          </button>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      
      {/* Banner Lightbox Modal */}
      {showBannerLightbox && (
        <div className="fixed inset-0 z-[9999] bg-white overflow-y-auto animate-fadeIn">
          <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-6 py-4 flex justify-between items-center border-b border-slate-100">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">All Banner Photos</h3>
            <button 
              onClick={() => setShowBannerLightbox(false)}
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 hover:bg-slate-200 transition-all"
            >
              ✕
            </button>
          </div>
          <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {(() => {
              let banners = [];
              if (Array.isArray(travelItem.bannerImage)) {
                banners = travelItem.bannerImage;
              } else if (typeof travelItem.bannerImage === 'string' && travelItem.bannerImage) {
                banners = travelItem.bannerImage.split(',').map(s => s.trim()).filter(Boolean);
              }
              
              return banners.map((media, idx) => {
                const isVideo = media.toLowerCase().endsWith('.mp4') || media.toLowerCase().endsWith('.webm') || media.toLowerCase().endsWith('.ogg');
                return (
                  <div key={idx} className="rounded-2xl overflow-hidden shadow-lg bg-slate-50 border border-slate-100 aspect-video">
                    {isVideo ? (
                      <video src={getImageUrl(media)} controls className="w-full h-full object-cover" />
                    ) : (
                      <img src={getImageUrl(media)} alt={`Banner ${idx + 1}`} className="w-full h-full object-cover" />
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}
        
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
        <div className="flex flex-col md:flex-row items-center md:items-end gap-5 -mt-12 md:-mt-16 mb-6 text-center md:text-left">
          {/* Logo Circle */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white flex-shrink-0 z-10 mx-auto md:mx-0"
          >
            <img 
              src={getImageUrl(travelItem.image)} 
              alt="Company Logo" 
              className="w-full h-full object-cover"
            />
          </motion.div>
 
          {/* Title & Key Stats */}
          <div className="flex-1 pb-1 w-full">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center md:justify-start gap-2 mb-1"
            >
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {travelItem.title}
              </h1>
              {travelItem.verified && (
                <CheckCircle2 className="text-red-600 fill-red-50 flex-shrink-0" size={22} />
              )}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-slate-500 font-medium"
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
            className="flex gap-2 md:pb-1 w-full md:w-auto"
          >
            <a
              href={`tel:${travelItem.phone}`}
              className="flex-1 md:flex-none px-6 py-3 bg-slate-900 text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
            >
              <Phone size={16} />
              <span>Call Agent</span>
            </a>
          </motion.div>
        </div>
 
        {/* 3. Navigation & Description */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 py-4 border-t border-slate-100">
          <nav className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide -mx-2 px-2">
            {[
              { label: "Overview", href: "#overview", show: true },
              { label: "Packages", href: "#packages", show: true },
              { label: "Services", href: "#services", show: true },
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
                className="px-4 py-2 rounded-full text-[11px] font-bold transition-all bg-slate-50 text-slate-600 border border-slate-100 whitespace-nowrap"
              >
                {nav.label}
              </motion.a>
            ))}
          </nav>
 
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="w-full md:w-auto px-8 py-3 bg-premium-gradient text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-xl shadow-red-200 active:scale-95"
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
