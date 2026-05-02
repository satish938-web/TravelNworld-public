import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import travelAgenciesData from '../data/travelAgenciesData';
import GetAquote from '../forms/GetAQuoteForm'; 
import { API_BASE } from '../utils/api';
import Facelessphoto from '../assets/Facelessphoto.jpg';

const GetAQuote = () => {
  const { destinationId, agencyId } = useParams();
  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgency = async () => {
      setLoading(true);
      // 1. Try static data first
      const staticAgency = travelAgenciesData[destinationId]?.find(
        (a) => a.id === agencyId
      );

      if (staticAgency) {
        setAgency(staticAgency);
        setLoading(false);
      } else {
        // 2. Try API for dynamic agents
        try {
          const res = await axios.get(`${API_BASE}/api/agents/public/${agencyId}`);
          const a = res.data.data;
          if (a) {
            setAgency({
              id: a._id,
              name: a.company || `${a.firstName} ${a.lastName}`,
              title: "Verified Travel Partner",
              image: a.photo || Facelessphoto,
              email: a.email,
              phone: a.phone
            });
          }
        } catch (err) {
          console.error("Agency not found in API either", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAgency();
  }, [destinationId, agencyId]);

  if (loading) {
    return <div className="p-20 text-center text-slate-500 font-bold animate-pulse">Loading agency details...</div>;
  }

  if (!agency) {
    return (
      <div className="p-12 max-w-6xl mx-auto text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-slate-800">Agency Not Found</h2>
        <p className="text-slate-500 mt-2">The travel agency you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-6 animate-fade-in">
      {/* Left Side: Agency Info (30%) */}
      <div className="w-full md:w-1/3 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
        <div className="w-full h-56 rounded-2xl overflow-hidden mb-6 shadow-sm">
           <img
            src={agency.image}
            alt={agency.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = Facelessphoto; }}
          />
        </div>
        <h2 className="text-2xl font-black mb-2 text-slate-900 tracking-tight">{agency.name}</h2>
        <p className="text-red-600 font-bold text-sm uppercase tracking-widest">{agency.title}</p>
        
        <div className="mt-6 space-y-3 pt-6 border-t border-slate-200">
           <div className="flex items-center gap-3 text-slate-600 text-sm">
              <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">📍</span>
              <span>Verified Partner</span>
           </div>
        </div>
      </div>

      {/* Right Side: Form (70%) */}
      <div className="w-full md:w-2/3 bg-white rounded-[2rem] shadow-xl shadow-slate-100 border border-slate-100 overflow-hidden">
        <div className="p-8 bg-slate-900 text-white">
           <h3 className="text-xl font-bold">Request a Quote</h3>
           <p className="text-slate-400 text-sm mt-1">Fill out the form below and {agency.name} will contact you shortly.</p>
        </div>
        <div className="p-8">
           <GetAquote agency={agency} />
        </div>
      </div>
    </div>
  );
};

export default GetAQuote;
