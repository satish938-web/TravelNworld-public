import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineArrowRight, HiOutlineMap } from "react-icons/hi";
import DestinationCard from "../components/DestinationCard";
import domesticDestinations from "../data/domesticDestinationData";
import { getJson, getImageUrl } from "../utils/api";

const DomesticDestinationsList = () => {
  const [showAll, setShowAll] = useState(false);
  const [apiDestinations, setApiDestinations] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getJson("/api/destinations/type/domestic")
      .then((items) => {
        const mapped = items.data.map((dest) => ({
          title: dest.name,
          description: dest.shortDescription || "",
          image: dest.coverImageUrl,
          slug: dest.slug,
        }));
        setApiDestinations(mapped);
      })
      .catch(() => setApiDestinations(null));
  }, []);

  const source =
    apiDestinations && apiDestinations.length > 0
      ? apiDestinations
      : domesticDestinations;
      
  const visibleDestinations = showAll ? source : source.slice(0, 12);

  const handleCardClick = (title) => {
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/domestic-itinerary/${slug}`);
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Premium Hero Section */}
      <div className="relative pt-44 pb-32 px-6 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(220,38,38,0.1),transparent_50%)]" />
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="w-10 h-px bg-red-600"></span>
            <span className="text-red-600 font-bold uppercase tracking-[0.4em] text-[10px]">Incredible India</span>
            <span className="w-10 h-px bg-red-600"></span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-white tracking-tight leading-none mb-8"
          >
            Domestic <span className="text-red-600 italic">Destinations</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto"
          >
            Explore the diverse landscapes, vibrant cultures, and hidden gems across the length and breadth of India.
          </motion.p>
        </div>
      </div>

      {/* Grid Area */}
      <div className="max-w-[1400px] mx-auto px-6 py-24">
        {source.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 text-center">
            <HiOutlineMap className="text-slate-200 text-8xl mb-6" />
            <h3 className="text-2xl font-bold text-slate-400 uppercase tracking-widest">No Destinations Found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {visibleDestinations.map((place, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 4) * 0.1 }}
                onClick={() => handleCardClick(place.title)}
                className="group cursor-pointer"
              >
                <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-white transition-all duration-500 hover:shadow-red-600/10 hover:border-red-200">
                  <img 
                    src={getImageUrl(place.image) || "https://images.unsplash.com/photo-1524492707947-55a576878130?q=80&w=800&auto=format&fit=crop"} 
                    alt={place.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=800&auto=format&fit=crop"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-black text-white mb-2 group-hover:text-red-500 transition-colors uppercase tracking-tighter">
                      {place.title}
                    </h3>
                    <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Explore Packages
                    </p>
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-red-600 transition-all duration-300">
                      <HiOutlineArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!showAll && source.length > 12 && (
          <div className="text-center mt-20">
            <button
              onClick={() => setShowAll(true)}
              className="px-12 py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-red-600 transition-all duration-300 shadow-2xl shadow-slate-200"
            >
              View All Destinations
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DomesticDestinationsList;
