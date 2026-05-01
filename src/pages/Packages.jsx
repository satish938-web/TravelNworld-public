/**
 * Packages (Explore All)
 * 
 * Central hub for exploring all available itineraries across the platform.
 * Merges both Admin (Global) and Agent packages.
 * Premium Red Luxury Design.
 */

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getJson, getImageUrl } from "../utils/api";
import { motion, AnimatePresence } from "framer-motion";
import { HiSearch, HiOutlineMap, HiOutlineChevronRight, HiOutlineClock } from "react-icons/hi";

const Packages = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const agentIdFilter = searchParams.get("agentId");
  const navigate = useNavigate();

  const fetchItineraries = useCallback(async () => {
    setLoading(true);
    try {
      const typeParam = activeTab === "all" ? "" : `&type=${activeTab}`;
      const agentParam = agentIdFilter ? `&agentId=${agentIdFilter}` : "";
      
      // Fetch from both Admin and Agent collections
      const [res1, res2] = await Promise.all([
        getJson(`/api/itineraries?limit=100${typeParam}`),
        getJson(`/api/agent-itineraries?limit=100${typeParam}${agentParam}`)
      ]);
      
      const merged = [
        ...(res1?.data || []),
        ...(res2?.data || [])
      ];
      
      setItineraries(merged);
    } catch (err) {
      console.error("Error fetching packages:", err);
    } finally {
      setLoading(false);
    }
  }, [activeTab, agentIdFilter]);

  useEffect(() => {
    fetchItineraries();
  }, [fetchItineraries]);

  const filtered = itineraries.filter(it => 
    it.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    it.destination?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Hero Header */}
      <div className="relative pt-40 pb-32 px-6 overflow-hidden bg-black">
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
          {/* Kicker */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <span className="w-12 h-[2px] bg-red-600 rounded-full" />
            <span className="text-red-600 font-black uppercase tracking-[0.6em] text-[10px]">Infinite Exploration</span>
            <span className="w-12 h-[2px] bg-red-600 rounded-full" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-6 leading-none"
          >
            Curated <span className="text-red-600 italic font-medium">Collections</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-medium tracking-wide leading-relaxed"
          >
            From snow-capped peaks to tropical beaches, explore our comprehensive range 
            of luxury itineraries crafted by world-class travel experts.
          </motion.p>
        </div>
      </div>

      {/* Toolbar - Sticky Glass UI */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-xl z-40 border-b border-gray-100 py-6">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Category Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-full shadow-inner">
            {["all", "domestic", "international"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeTab === tab 
                    ? "bg-premium-gradient text-white shadow-xl shadow-red-200" 
                    : "text-gray-400 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Premium Search Bar */}
          <div className="relative w-full lg:w-[450px] group">
            <HiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Where do you want to go?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-8 py-4 bg-gray-50 border border-transparent rounded-full text-sm font-medium focus:ring-0 focus:border-red-600/30 focus:bg-white transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Main Grid Area */}
      <div className="max-w-[1400px] mx-auto px-6 py-20 min-h-[600px]">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-[2.5rem] aspect-[4/5] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            <AnimatePresence mode="popLayout">
              {filtered.map((it, i) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
                  key={it._id}
                  onClick={() => {
                    const routeBase = it.type === "international" ? "international-itinerary-detail" : "domestic-itinerary";
                    const dest = it.destination?.toLowerCase().replace(/\s+/g, "-") || "all";
                    const id = it.slug || it._id;
                    navigate(`/${routeBase}/${dest}/${id}`);
                  }}
                  className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-50 flex flex-col h-full cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-red-600/10"
                >
                  {/* Image Area */}
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={getImageUrl(it.coverImageUrl)} 
                      alt={it.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    
                    {/* Duration Badge */}
                    <div className="absolute bottom-6 right-6 flex items-center gap-1.5 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/10">
                      <HiOutlineClock size={14} className="text-red-400" />
                      {it.duration}
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="bg-premium-gradient text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-red-600/30">
                        {it.type}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="h-[3px] w-6 bg-red-600 rounded-full mb-4 group-hover:w-10 transition-all duration-300 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                    <h3 className="text-2xl font-black text-slate-900 leading-tight mb-4 group-hover:text-red-600 transition-colors line-clamp-2 uppercase tracking-tight">
                      {it.title}
                    </h3>
                    
                    {it.priceFrom > 0 && (
                      <div className="mt-auto pt-6 border-t border-gray-50 flex items-baseline justify-between">
                         <div>
                            <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">Explore for</p>
                            <p className="text-2xl font-black text-slate-900">
                              <span className="text-sm font-bold text-red-600 mr-0.5">₹</span>
                              {it.priceFrom.toLocaleString("en-IN")}
                            </p>
                         </div>
                         <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                            <HiOutlineChevronRight size={20} />
                         </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-40 text-center"
          >
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8">
              <HiOutlineMap className="text-red-600 text-4xl" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">No Packages Found</h2>
            <p className="text-gray-400 max-w-sm mb-10 font-medium">
              We couldn't find any packages matching your search. Try adjusting your filters or destination.
            </p>
            <button
              onClick={() => { setActiveTab("all"); setSearchQuery(""); }}
              className="px-10 py-4 bg-premium-gradient text-white font-black uppercase tracking-widest text-xs rounded-full shadow-2xl shadow-red-200"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Packages;
