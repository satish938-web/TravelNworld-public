import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Facelessphoto from "../../assets/Facelessphoto.jpg";
import { getImageUrl, API_BASE } from '../../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineArrowLeft, HiOutlineLocationMarker, HiOutlineBriefcase, HiOutlinePhone, HiOutlineChevronRight, HiStar } from 'react-icons/hi';

const TransportersList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/agents/verified`);
        const agentsArray = res.data.data || [];

        const mapped = agentsArray.map((agent) => ({
          id: agent._id,
          slug: (agent.company || `${agent.firstName}-${agent.lastName}`).toLowerCase().replace(/\s+/g, '-'),
          image: agent.photo || Facelessphoto,
          title: agent.company || `${agent.firstName} ${agent.lastName}`,
          name: agent.company || `${agent.firstName} ${agent.lastName}`,
          fullAddress: agent.companyAddress
            ? `${agent.companyAddress.city}, ${agent.companyAddress.state}`
            : "Location hidden",
          experience: agent.experience || "Experienced Partner",
          displayPhone: agent.phone,
          email: agent.email || "",
          rating: agent.rating || 4.8,
        }));

        setData(mapped);
      } catch (err) {
        console.error("Error fetching transporters", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* ── Premium Hero ── */}
      <div className="relative pt-32 pb-24 px-6 bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(220,38,38,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-white/60 hover:text-red-500 transition-colors mb-12 text-sm font-bold uppercase tracking-widest"
          >
            <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </motion.button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-10 h-[2px] bg-red-600" />
                <span className="text-red-600 font-black uppercase tracking-[0.5em] text-[10px]">Verified Network</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 uppercase"
              >
                Global <span className="text-red-600 italic font-medium">Partners</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-base md:text-lg max-w-xl leading-relaxed"
              >
                Connect with our elite network of verified travel experts and logistics providers worldwide.
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-center gap-6"
            >
              <div className="text-center border-r border-white/10 pr-6">
                <div className="text-3xl font-black text-white">{data.length}+</div>
                <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-1">Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-red-600">100%</div>
                <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-1">Verified</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* List Section */}
          <div className="lg:w-2/3 w-full space-y-8">
            {isLoading ? (
              <div className="grid gap-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-64 bg-gray-100 rounded-3xl animate-pulse" />
                ))}
              </div>
            ) : (
              <AnimatePresence>
                {data.map((agent, i) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col md:flex-row h-auto md:h-64 transition-all duration-300"
                  >
                    {/* Image Area */}
                    <div className="md:w-64 h-64 md:h-auto overflow-hidden relative">
                      <img
                        src={getImageUrl(agent.image)}
                        alt={agent.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => { e.target.src = Facelessphoto; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                      <div className="absolute top-6 left-6 md:hidden">
                         <span className="bg-red-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Verified</span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-red-600 transition-colors uppercase tracking-tight">
                              {agent.title}
                            </h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                              {agent.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-full">
                            <HiStar className="text-red-600" />
                            <span className="text-red-700 font-black text-xs">{agent.rating}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                          <div className="flex items-center gap-3 text-gray-500 text-sm">
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-red-600">
                              <HiOutlineLocationMarker size={16} />
                            </div>
                            <span className="font-medium truncate">{agent.fullAddress}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-500 text-sm">
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-red-600">
                              <HiOutlineBriefcase size={16} />
                            </div>
                            <span className="font-medium">{agent.experience}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-50">
                        <div className="flex items-center gap-3">
                          <HiOutlinePhone className="text-gray-400" />
                          <span className="text-sm font-mono font-bold text-slate-700">{agent.displayPhone}</span>
                        </div>
                        <button
                          onClick={() => navigate(`/agent/${agent.slug || agent.id}`)}
                          className="flex items-center gap-3 bg-premium-gradient text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/30 active:scale-95 shadow-xl shadow-red-600/10"
                        >
                          View Details
                          <HiOutlineChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Sidebar Area */}
          <div className="lg:w-1/3 w-full sticky top-32">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative bg-black rounded-[2.5rem] p-10 overflow-hidden text-white"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 blur-[60px] rounded-full" />
              <div className="relative z-10">
                <div className="w-12 h-1 bg-red-600 mb-8 rounded-full" />
                <h2 className="text-4xl font-black tracking-tighter mb-4 leading-none uppercase">
                  Expand Your <br />
                  <span className="text-red-600 italic font-medium">Business</span>
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-10 font-medium">
                  Join our elite network of travel partners and showcase your services to thousands of travelers worldwide.
                </p>
                <button className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-500 shadow-xl">
                  Advertise Now
                </button>
              </div>
            </motion.div>

            {/* Support Card */}
            <div className="mt-8 p-8 border border-gray-100 rounded-[2.5rem] bg-white">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">Need Assistance?</h4>
              <p className="text-xs text-gray-500 mb-6 font-medium">Our support team is available 24/7 for our partners.</p>
              <a href="tel:+919865366127" className="text-red-600 font-black tracking-tighter text-2xl hover:tracking-normal transition-all duration-300">
                +91 9865366127
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TransportersList;
