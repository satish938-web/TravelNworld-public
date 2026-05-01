import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Facelessphoto from "../../assets/Facelessphoto.jpg";
import { getImageUrl } from '../../utils/api';
import TopMostBanner from './TopMostBanner';

const TransportersList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_BASE || "";
        const res = await axios.get(`${apiBase}/api/agents/verified`);

        const mapped = res.data.map((agent) => ({
          id: agent._id,
          slug: (agent.company || `${agent.firstName}-${agent.lastName}`).toLowerCase().replace(/\s+/g, '-'),
          image: agent.photo || Facelessphoto,
          title: agent.company || `${agent.firstName} ${agent.lastName}`,
          name: agent.company || `${agent.firstName} ${agent.lastName}`,
          fullAddress: agent.companyAddress
            ? `${agent.companyAddress.city}, ${agent.companyAddress.state}`
            : "Location hidden",
          experience: "Experienced Partner",
          displayPhone: agent.phone,
          email: agent.email || "",
          website: "#",
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
    <div className="px-6 pb-20 bg-[#f0f2f8] min-h-screen font-sans text-left">
      <TopMostBanner />

      <div className="max-w-7xl mx-auto mt-8">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 text-sm font-medium flex items-center gap-1 mb-4"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Registered Travel Partners
          </h1>
          <p className="text-slate-500 mt-2">
            Connect with verified experts for your next journey.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left Column — Cards */}
          <div className="lg:w-2/3 space-y-5 w-full">
            {isLoading ? (
              <div className="py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
                <p className="text-slate-500">Finding best partners...</p>
              </div>
            ) : data.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-10 text-slate-400 text-sm">
                No transporters found.
              </div>
            ) : (
              data.map((agent, index) => (
                <div
                  key={agent.id || index}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row overflow-hidden w-full"
                >
                  {/* Avatar */}
                  <div className="md:w-48 md:h-auto h-48 bg-slate-100 flex-shrink-0">
                    <img
                      src={getImageUrl(agent.image)}
                      alt={agent.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = Facelessphoto; }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col text-left">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">{agent.title}</h3>
                        <p className="text-sm font-medium text-blue-600 mb-2">{agent.name}</p>
                      </div>
                      <div className="flex items-center bg-green-50 px-2 py-1 rounded-lg flex-shrink-0 ml-2">
                        <span className="text-green-700 font-bold text-sm">4.8</span>
                        <span className="text-green-600 text-xs ml-1">★</span>
                      </div>
                    </div>

                    <div className="space-y-2 mt-1">
                      <p className="text-slate-600 text-sm flex items-center gap-2">
                        <span className="text-base">📍</span>
                        {agent.fullAddress}
                      </p>
                      <p className="text-slate-500 text-sm flex items-center gap-2">
                        <span className="text-base">💼</span>
                        {agent.experience}
                      </p>
                    </div>

                    {/* Footer CTA */}
                    <div className="mt-auto pt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                          Contact
                        </span>
                        <span className="text-sm font-mono font-semibold text-slate-700">
                          {agent.displayPhone}
                        </span>
                      </div>
                      <button
                        onClick={() => navigate(`/agent/${agent.slug || agent.id}`)}
                        className="bg-slate-900 hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
                      >
                        View Profile & Deals
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Column — Sticky Ad */}
          <div className="lg:w-1/3 w-full">
            <div className="sticky top-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl overflow-hidden relative">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">Grow Your Business</h2>
                <p className="text-blue-100 mb-6 text-sm leading-relaxed">
                  List your agency here and reach thousands of travelers daily.
                </p>
                <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors">
                  Advertise Now
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TransportersList;