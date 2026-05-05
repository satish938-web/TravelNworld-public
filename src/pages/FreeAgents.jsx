import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import TopMostBanner from '../components/homeComponent/TopMostBanner.jsx';
// Import your faceless image here
import FacelessPhoto from '../assets/Facelessphoto.jpg'; 

import { API_BASE } from '../utils/api';
import { usePageHero } from '../hooks/usePageHero';

const maskPhone = (phone) => {
  if (!phone || phone === 'Not provided') return 'Not provided';
  const cleaned = phone.toString().replace(/\D/g, ''); // Remove non-digits
  if (cleaned.length < 4) return phone; 
  return "X".repeat(cleaned.length - 4) + cleaned.slice(-4);
};

const buildAgentCard = (agent) => {
  const address = agent.companyAddress || {};
  const fullAddress = [
    address.houseNo || address.house,
    address.street,
    address.area,
    address.city,
    address.state,
  ].filter(Boolean).join(', ');

  return {
    ...agent,
    title: agent.company || `${agent.firstName || ''} ${agent.lastName || ''}`.trim() || 'Travel Partner',
    name: `${agent.firstName || ''} ${agent.lastName || ''}`.trim() || 'Agent',
    displayPhone: maskPhone(agent.phone),
    // If agent.photo is null, undefined, or empty string, use FacelessPhoto
    image: agent.photo && agent.photo !== "" ? agent.photo : FacelessPhoto,
    fullAddress: fullAddress || 'Location hidden',
  };
};

const ITEMS_PER_PAGE = 2;

const FreeAgents = () => {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const { mediaUrl, isVideo } = usePageHero('Agents');
  const FALLBACK = "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=1932&auto=format&fit=crop";
  const displayUrl = mediaUrl || FALLBACK;

  useEffect(() => {
    const loadPublicAgents = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/agents/public`);
        const data = res.data?.data || res.data || [];
        const mappedAgents = Array.isArray(data) ? data.map(buildAgentCard) : [];
        setAgents(mappedAgents);
        setFilteredAgents(mappedAgents);
      } catch (error) {
        setFetchError('Unable to load travel partners.');
      } finally {
        setIsLoading(false);
      }
    };
    loadPublicAgents();
  }, []);

  useEffect(() => {
    const results = agents.filter(agent =>
      agent.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.fullAddress?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAgents(results);
    setCurrentPage(1);
  }, [searchTerm, agents]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAgents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentAgents = filteredAgents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="pb-20 bg-[#f9fafb] min-h-screen font-sans text-left" style={{ fontFamily: 'var(--font-inter)' }}>
      <TopMostBanner />
      
      <div className="relative w-full h-[50vh] min-h-[400px] bg-slate-900 flex items-center justify-center overflow-hidden mb-16">
        <div className="absolute inset-0 z-0">
          <img 
            src={displayUrl}
            alt="Agents" 
            className="w-full h-full object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              Verified Network
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 font-['Montserrat']">
              Global Travel <br/>
              <span className="text-slate-400 font-light">Partners.</span>
            </h1>
            <p className="text-slate-300 text-lg font-light leading-relaxed max-w-xl">
              Connect with our elite network of registered travel experts. Every partner is thoroughly vetted to ensure unparalleled service and exclusive access for your journeys.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">

          <div className="w-full md:w-80">
            <div className="relative">
              <input
                type="text"
                placeholder="Search partner..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all text-sm shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          <div className="lg:w-2/3 w-full">
            {isLoading ? (
              <div className="py-24 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 border-4 border-slate-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-400 font-medium">Loading verified partners...</p>
              </div>
            ) : currentAgents.length > 0 ? (
              <div className="space-y-6">
                {currentAgents.map((agent, index) => {
                  const slug = (agent.company || agent.title || `${agent.firstName}-${agent.lastName}`)
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '');
                  const targetId = slug || agent._id || agent.id;

                  return (
                    <div 
                      key={index}
                      className="bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row overflow-hidden transition-all duration-300 block"
                    >
                      <div className="sm:w-44 sm:h-44 h-52 bg-slate-50 flex-shrink-0 relative">
                        <img
                          src={agent.image}
                          alt={agent.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = FacelessPhoto; }}
                        />
                      <div className="absolute top-2 right-2">
                        <div className="bg-white/90 backdrop-blur px-2 py-0.5 rounded shadow-sm flex items-center border border-slate-100">
                          <span className="text-yellow-500 text-[10px] mr-1">★</span>
                          <span className="text-slate-700 font-bold text-[10px]">4.8</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 leading-tight">
                            {agent.title}
                          </h3>
                          <p className="text-sm text-slate-500 font-medium mt-0.5">{agent.name}</p>
                        </div>
                        {agent.isVerified ? (
                          <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 border border-green-100">
                            <span className="w-1 h-1 bg-green-600 rounded-full"></span>
                            VERIFIED
                          </span>
                        ) : (
                          <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 border border-blue-100">
                            <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                            REGISTERED
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 mb-5 mt-2">
                        <p className="text-slate-600 text-xs flex items-center gap-2">
                          <span className="text-slate-400">📍</span>
                          <span className="line-clamp-1">{agent.fullAddress}</span>
                        </p>
                        <p className="text-slate-600 text-xs flex items-center gap-2">
                          <span className="text-slate-400">💼</span>
                          {agent.experience || 'Experienced Partner'}
                        </p>
                      </div>

                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Contact Agent</span>
                          <span className="text-sm font-bold text-slate-700">{agent.displayPhone}</span>
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.location.href = `mailto:${agent.email}`;
                          }}
                          className="bg-slate-900 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-bold text-xs transition-all shadow-sm flex items-center gap-2"
                        >
                          Send Inquiry
                        </button>
                      </div>
                    </div>
                    </div>
                    );
                  })}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-red-600 hover:border-red-200 disabled:opacity-30 transition-all"
                    >
                      ←
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                          currentPage === i + 1
                            ? "bg-slate-900 text-white shadow-lg"
                            : "bg-white border border-slate-200 text-slate-600 hover:border-red-200"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-red-600 hover:border-red-200 disabled:opacity-30 transition-all"
                    >
                      →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-400 font-medium">No results found for your search.</p>
                <button onClick={() => setSearchTerm("")} className="mt-4 text-red-600 font-bold hover:underline text-sm">Clear Filters</button>
              </div>
            )}
          </div>

          <div className="lg:w-1/3 w-full">
            <div className="sticky top-8 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Grow Your Agency</h2>
              <p className="text-slate-500 mb-6 text-sm leading-relaxed">Join India's fastest growing travel network and get connected with verified leads daily.</p>
              
              <ul className="space-y-3 mb-8">
                {['Verified Business Badge', 'Reach 10k+ Travelers', 'Premium Dashboard'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <span className="text-green-500 font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>

              <button className="w-full bg-slate-900 hover:bg-red-600 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg text-sm">
                Register as Partner
              </button>
              
              <p className="text-center text-[10px] text-slate-400 mt-4 font-medium uppercase tracking-widest">Powered by Travel N World</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeAgents;
