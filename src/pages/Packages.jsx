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
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;
  const navigate = useNavigate();

  const fetchItineraries = useCallback(async () => {
    setLoading(true);
    try {
      const typeParam = activeTab === "all" ? "" : `&type=${activeTab}`;
      const agentParam = agentIdFilter ? `&agentId=${agentIdFilter}` : "";
      
      // Only fetch packages assigned to agents
      const res = await getJson(`/api/agent-itineraries?limit=100${typeParam}${agentParam}`);
      setItineraries(res?.data || []);
    } catch (err) {
      console.error("Error fetching packages:", err);
    } finally {
      setLoading(false);
    }
  }, [activeTab, agentIdFilter]);

  useEffect(() => {
    fetchItineraries();
    setCurrentPage(1); // Reset to page 1 on tab or filter change
  }, [fetchItineraries]);

  const filtered = itineraries.filter(it => 
    it.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    it.destination?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentItineraries = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Refined Corporate Hero Header */}
      <div className="relative pt-44 pb-36 px-6 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(220,38,38,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(37,99,235,0.05),transparent_50%)]" />
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="text-left max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-10 h-px bg-red-600"></span>
                <span className="text-red-600 font-bold uppercase tracking-[0.4em] text-[10px]">World-Class Itineraries</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-8xl font-black text-white tracking-tight leading-[0.9] mb-8"
              >
                Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Collections</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl"
              >
                Explore a hand-picked selection of luxury travel packages designed by verified experts to deliver unforgettable experiences.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl"
            >
              <div className="text-white text-center">
                <p className="text-4xl font-black text-red-600">500+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Verified Packages</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Corporate Toolbar */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-xl z-40 border-b border-slate-200 py-6 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Categories */}
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
            {["all", "domestic", "international"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab 
                    ? "bg-slate-900 text-white shadow-lg" 
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Sleek Search */}
          <div className="relative w-full md:w-96">
            <input 
              type="text"
              placeholder="Search destination or package..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all shadow-sm"
            />
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl aspect-[4/5] animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {currentItineraries.map((it, i) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                  key={it._id}
                  onClick={() => {
                    const routeBase = it.type === "international" ? "international-itinerary-detail" : "domestic-itinerary";
                    const dest = it.destination?.toLowerCase().replace(/\s+/g, "-") || "all";
                    const id = it.slug || it._id;
                    navigate(`/${routeBase}/${dest}/${id}`);
                  }}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 flex flex-col h-full cursor-pointer transition-all duration-300 hover:border-red-200 hover:shadow-xl hover:shadow-slate-200/50"
                >
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img 
                      src={getImageUrl(it.coverImageUrl) || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop"} 
                      alt={it.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop"; }}
                    />
                    
                    <div className="absolute top-4 left-4">
                      <span className="bg-slate-900/90 backdrop-blur text-white text-[9px] font-black px-3 py-1 rounded-md uppercase tracking-widest">
                        {it.type}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div className="bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5 border border-white/20">
                        <HiOutlineClock size={12} className="text-red-600" />
                        <span className="text-[10px] font-bold text-slate-800">{it.duration || 'Flexible'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">{it.destination || 'Global'}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {it.agentId?.company || 'Verified Expert'}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-6 group-hover:text-red-600 transition-colors line-clamp-2">
                      {it.title}
                    </h3>
                    
                    <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
                       <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Starting From</p>
                          <p className="text-xl font-black text-slate-900">
                            {it.priceFrom > 0 ? (
                              <>
                                <span className="text-sm font-bold text-red-600 mr-0.5">₹</span>
                                {it.priceFrom.toLocaleString("en-IN")}
                              </>
                            ) : (
                              "On Request"
                            )}
                          </p>
                       </div>
                       <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                          <HiOutlineChevronRight size={18} />
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="col-span-full flex justify-center items-center gap-3 mt-16">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-xs hover:border-red-600 hover:text-red-600 disabled:opacity-30 transition-all shadow-sm"
                >
                  PREVIOUS
                </button>
                
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${
                        currentPage === i + 1
                          ? "bg-slate-900 text-white shadow-lg"
                          : "bg-white border border-slate-200 text-slate-500 hover:border-red-600 hover:text-red-600"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-xs hover:border-red-600 hover:text-red-600 disabled:opacity-30 transition-all shadow-sm"
                >
                  NEXT
                </button>
              </div>
            )}
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
