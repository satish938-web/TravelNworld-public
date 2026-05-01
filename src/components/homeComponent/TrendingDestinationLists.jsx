import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getJson, getImageUrl } from "../../utils/api";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineArrowRight, HiOutlineLocationMarker } from "react-icons/hi";

const TrendingDestinationLists = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getJson("/api/destinations/cards?category=trending&limit=100")
      .then((res) => {
        setDestinations(res?.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1506929197484-7bc3116bc30a?q=80&w=2000" 
            alt="trending" 
            className="w-full h-full object-cover opacity-60 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="w-12 h-[2px] bg-red-600 rounded-full" />
            <span className="text-red-600 font-black uppercase tracking-[0.5em] text-xs">Curated Selection</span>
            <span className="w-12 h-[2px] bg-red-600 rounded-full" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4"
          >
            Trending <span className="text-red-600 italic">Collections</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg font-medium"
          >
            Explore the most sought-after destinations across the globe, handpicked for your next unforgettable journey.
          </motion.p>
        </div>
      </div>

      {/* Grid Content */}
      <div className="max-w-[1400px] mx-auto px-6 -mt-32 relative z-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-gray-100 rounded-[2.5rem] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {destinations.map((dest, idx) => (
                <motion.div
                  key={dest._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100 h-full flex flex-col"
                  onClick={() => navigate(`/trending/${dest.slug}`)}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img 
                      src={getImageUrl(dest.coverImageUrl)} 
                      alt={dest.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-6 left-6">
                      <span className="bg-red-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                        Trending
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-2 text-red-500 mb-2">
                        <HiOutlineLocationMarker size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{dest.type}</span>
                      </div>
                      <h3 className="text-white text-3xl font-black leading-none mb-2 group-hover:text-red-500 transition-colors">
                        {dest.name}
                      </h3>
                      <p className="text-gray-300 text-xs line-clamp-2 font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        {dest.shortDescription || "Discover the magic of this breathtaking destination with our exclusive packages."}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6 mt-auto border-t border-gray-50 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Starting from</p>
                      <p className="text-xl font-black text-slate-900">₹{dest.priceFrom?.toLocaleString('en-IN') || "Contact"}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-slate-900 group-hover:bg-red-600 text-white flex items-center justify-center transition-colors">
                      <HiOutlineArrowRight size={20} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && destinations.length === 0 && (
          <div className="py-40 text-center">
            <h2 className="text-3xl font-black text-gray-900 mb-4">No Trending Destinations Found</h2>
            <button 
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-red-600 text-white rounded-full font-bold shadow-lg shadow-red-200"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingDestinationLists;
