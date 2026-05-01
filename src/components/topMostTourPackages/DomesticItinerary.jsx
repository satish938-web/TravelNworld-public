/**
 * DomesticItinerary
 *
 * Lists all domestic itineraries for a specific destination.
 * Premium Red Luxury Design.
 */

import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { getJson, getImageUrl } from "../../utils/api";
import { HiOutlineLocationMarker, HiOutlineClock, HiOutlineChevronRight } from "react-icons/hi";

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function slugToTitle(slug) {
  return (slug || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ─── Skeleton Card ──────────────────────────────────────────────────────── */
const SkeletonCard = ({ i }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.05 }}
    className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100"
  >
    <div className="h-64 bg-gray-100 animate-pulse" />
    <div className="p-6 space-y-4">
      <div className="h-2 w-12 bg-gray-100 rounded-full animate-pulse" />
      <div className="h-8 w-3/4 bg-gray-100 rounded-lg animate-pulse" />
      <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
      <div className="flex gap-2 pt-4">
        <div className="h-12 flex-1 bg-gray-100 rounded-xl animate-pulse" />
        <div className="h-12 flex-1 bg-gray-100 rounded-xl animate-pulse" />
      </div>
    </div>
  </motion.div>
);

/* ─── Itinerary Card ─────────────────────────────────────────────────────── */
const ItineraryCard = ({ itinerary, destinationId, index }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const imgSrc = itinerary.coverImageUrl || itinerary.gallery?.[0];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/domestic-itinerary/${destinationId}/${itinerary.slug || itinerary._id}`)}
      className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col h-full cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-red-600/10"
    >
      {/* Image Area */}
      <div className="relative h-64 overflow-hidden">
        {imgSrc ? (
          <img
            src={getImageUrl(imgSrc)}
            alt={itinerary.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center text-6xl">
            🏔️
          </div>
        )}
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Floating Badges */}
        <div className="absolute top-6 left-6 flex flex-wrap gap-2">
          {itinerary.classification?.map((tag) => (
            <span key={tag} className="bg-premium-gradient text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-red-600/30">
              {tag}
            </span>
          ))}
        </div>

        {itinerary.duration && (
          <div className="absolute bottom-6 right-6 flex items-center gap-1.5 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/10">
            <HiOutlineClock size={14} className="text-red-400" />
            {itinerary.duration}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-8 flex flex-col">
        {/* Red accent line */}
        <motion.div 
          animate={{ width: isHovered ? 48 : 24 }}
          className="h-[3px] bg-red-600 rounded-full mb-4 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
        />

        <h3 className="text-2xl font-black text-slate-900 leading-[1.1] mb-3 group-hover:text-red-600 transition-colors duration-300 line-clamp-2 uppercase tracking-tight">
          {itinerary.title}
        </h3>

        <p className="text-gray-400 text-xs font-medium leading-relaxed mb-6 line-clamp-2">
          {itinerary.shortDescription || "Discover the magic of India with our premium handpicked domestic travel packages."}
        </p>

        {/* Price & Action */}
        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
          <div>
            {!itinerary.asBestQuote && itinerary.priceFrom > 0 ? (
              <>
                <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">Starting from</p>
                <p className="text-2xl font-black text-slate-900 flex items-baseline">
                  <span className="text-sm font-bold text-red-600 mr-0.5">₹</span>
                  {itinerary.priceFrom.toLocaleString("en-IN")}
                </p>
              </>
            ) : (
              <p className="text-xs font-black text-orange-600 uppercase tracking-widest">Price on Request</p>
            )}
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 rounded-full bg-slate-900 group-hover:bg-red-600 text-white flex items-center justify-center transition-colors duration-300 shadow-xl shadow-slate-900/10 group-hover:shadow-red-600/20"
          >
            <HiOutlineChevronRight size={22} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main Component ─────────────────────────────────────────────────────── */
const DomesticItinerary = () => {
  const { destinationId } = useParams();
  const navigate = useNavigate();

  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const destinationName = slugToTitle(destinationId);

  useEffect(() => {
    if (!destinationId) return;
    setLoading(true);
    setError("");

    const fetchAll = async () => {
      try {
        const [res1, res2] = await Promise.all([
          getJson(`/api/itineraries?type=domestic&destination=${encodeURIComponent(destinationId)}`),
          getJson(`/api/agent-itineraries?type=domestic&destination=${encodeURIComponent(destinationId)}`)
        ]);

        const merged = [...(res1?.data || []), ...(res2?.data || [])];
        setItineraries(merged);
      } catch (err) {
        console.error("Failed to load domestic itineraries:", err);
        setError("Unable to load itineraries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [destinationId]);

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Hero Header */}
      <div className="relative pt-32 pb-24 px-6 overflow-hidden bg-black">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
          {/* Animated Orbs */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-red-600/20 blur-[120px] rounded-full"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Back button */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-[-60px] left-0 flex items-center gap-2 text-white/50 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] transition-colors"
          >
            ← Back to Home
          </button>

          {/* Kicker */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <span className="w-12 h-[2px] bg-red-600 rounded-full" />
            <span className="text-red-600 font-black uppercase tracking-[0.6em] text-[10px]">Incredible India</span>
            <span className="w-12 h-[2px] bg-red-600 rounded-full" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-6 leading-none"
          >
            {destinationName} <span className="text-red-600 italic">Packages</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-medium tracking-wide"
          >
            Discover the vibrant culture and breathtaking landscapes of {destinationName} with our premium selection 
            of handpicked domestic tour packages.
          </motion.p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1400px] mx-auto px-6 -mt-16 relative z-20 pb-32">
        {/* Filter/Status Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-white p-6 rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-50">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">
              {loading ? "Discovering..." : `${itineraries.length} Experiences Available`}
            </span>
          </div>
          <div className="flex gap-3">
             <span className="px-4 py-2 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-gray-100">
               All Categories
             </span>
             <span className="px-4 py-2 bg-premium-gradient text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-red-200">
               Best Sellers
             </span>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-3xl text-center font-bold mb-12">
            {error}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} i={i} />)
            ) : (
              itineraries.map((it, i) => (
                <ItineraryCard key={it._id} itinerary={it} destinationId={destinationId} index={i} />
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {!loading && !error && itineraries.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-40 text-center"
          >
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8">
              <span className="text-4xl">🏔️</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">No Packages Yet</h2>
            <p className="text-gray-400 max-w-sm mb-10 font-medium">
              We haven't listed any domestic packages for {destinationName} yet. 
              Check back soon or explore our other top destinations.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-10 py-4 bg-premium-gradient text-white font-black uppercase tracking-widest text-xs rounded-full shadow-2xl shadow-red-200 hover:scale-105 transition-transform"
            >
              Explore Destinations
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DomesticItinerary;
