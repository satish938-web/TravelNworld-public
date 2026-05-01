import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopMostBanner from '../components/homeComponent/TopMostBanner.jsx';
// Import your faceless image here
import FacelessPhoto from '../assets/Facelessphoto.jpg'; 

import { API_BASE } from '../utils/api';

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

const FreeAgents = () => {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const loadPublicAgents = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/agents/public`);
        const data = res.data?.data || res.data || [];
        setAgents(Array.isArray(data) ? data.map(buildAgentCard) : []);
      } catch (error) {
        setFetchError('Unable to load travel partners.');
      } finally {
        setIsLoading(false);
      }
    };
    loadPublicAgents();
  }, []);

  return (
  <div className="px-6 pb-20 bg-[#f8fafc] min-h-screen font-sans text-left"> 
      <TopMostBanner />
      
      <div className="max-w-7xl mx-auto mt-8">
        <div className="mb-8">
          {/* Change: Removed 'text-center' if it was there, ensured default left alignment */}
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight text-left">
            Registered Travel Partners
          </h1>
          <p className="text-slate-500 mt-2 text-left">Connect with verified experts for your next journey.</p>
        </div>

        {/* Change: items-start ensures columns don't stretch vertically in a centered way */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: List */}
          <div className="lg:w-2/3 space-y-6 w-full">
            {isLoading ? (
               // Change: text-left for loading state
              <div className="py-20 text-left">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-slate-500">Finding best partners...</p>
              </div>
            ) : agents.map((agent, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row overflow-hidden w-full">
                {/* Image Section */}
               <div className="md:w-52 h-52 bg-slate-100 flex-shrink-0">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-cover"
                    // If image fails to load, this is a backup
                    onError={(e) => { e.target.src = FacelessPhoto; }}
                  />
                </div>

                {/* Content Section */}
                  <div className="p-6 flex-grow flex flex-col text-left">
                  <div className="flex justify-between items-start">
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-slate-800">{agent.title}</h3>
                      <p className="text-sm font-medium text-blue-600 mb-2">{agent.name}</p>
                    </div>
                    <div className="flex items-center bg-green-50 px-2 py-1 rounded-lg">
                      <span className="text-green-700 font-bold text-sm">4.8</span>
                      <span className="text-green-600 text-xs ml-1">★</span>
                    </div>
                  </div>

                  <div className="space-y-2 mt-1">
                    <p className="text-slate-600 text-sm flex items-center gap-2">
                      <span className="text-slate-400 text-base">📍</span> {agent.fullAddress}
                    </p>
                    <p className="text-slate-500 text-sm flex items-center gap-2">
                      <span className="text-slate-400 text-base">💼</span> {agent.experience || 'Experienced Partner'}
                    </p>
                  </div>

                  {/* Footer / CTA Section */}
                  <div className="mt-auto pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-50">
                    <div className="flex gap-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Contact</span>
                        <span className="text-sm font-mono font-semibold text-slate-700">{agent.displayPhone}</span>
                      </div>
                    </div>
                    
                    <a
                      href={`mailto:${agent.email}`}
                      className="bg-slate-900 hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
                    >
                      Get Best Deal
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column (Sticky Ad) */}
          <div className="lg:w-1/3">
            <div className="sticky top-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl overflow-hidden relative">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">Grow Your Business</h2>
                <p className="text-blue-100 mb-6 text-sm">List your agency here and reach thousands of travelers daily.</p>
                <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors">
                  Advertise Now
                </button>
              </div>
              {/* Decorative Circle */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeAgents;