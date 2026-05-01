import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import transportData from "../../data/transportData";
import Header from "../../components/verifiedTransportDetails/Header";
import RightSide from "../../components/verifiedTransportDetails/RightSide";
import TourPackages from "../../assets/images/tourPackage.jpeg";
import Facelessphoto from "../../assets/Facelessphoto.jpg";
import { getImageUrl } from "../../utils/api";

const CustomerTourPackages = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [travelItem, setTravelItem] = useState(null);
  const [dynamicItineraries, setDynamicItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Maps API agent data to component structure
   * Ensures consistent data transformation across initial load and refresh
   */
  const mapAgentData = (agent) => {
    if (!agent) return null;

    const mappedAgent = {
      id: agent._id,
      title: agent.company || `${agent.firstName} ${agent.lastName}`,
      rating: agent.rating || 4.8,
      reviewsCount: agent.reviewsCount || 0,
      verified: agent.isVerified ?? true,
      location: agent.companyAddress ? `${agent.companyAddress.city}, ${agent.companyAddress.state}` : "Location not specified",
      phone: agent.phone || "N/A",
      email: agent.email || "N/A",
      image: agent.photo || Facelessphoto,
      bannerImage: agent.bannerImage || "",
      tourPackages: [],
    };

    // Parse tourPackages if they exist as a string or array
    if (agent.tourPackages) {
      if (typeof agent.tourPackages === 'string') {
        try {
          const pkgs = JSON.parse(agent.tourPackages);
          if (Array.isArray(pkgs)) mappedAgent.tourPackages = pkgs;
        } catch (e) {
          console.warn("Tour packages string failed to parse:", e);
        }
      } else if (Array.isArray(agent.tourPackages)) {
        mappedAgent.tourPackages = agent.tourPackages;
      }
    }

    return mappedAgent;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiBase = import.meta.env.VITE_API_BASE || "";
        const res = await axios.get(`${apiBase}/api/agents/public/${id}`);
        const agent = res.data.data;

        if (agent) {
          setTravelItem(mapAgentData(agent));
          // Fetch dynamic itineraries
          const itRes = await axios.get(`${apiBase}/api/agent-itineraries?agentId=${agent._id}`);
          setDynamicItineraries(itRes.data.data || []);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("API fetch failed in CustomerTourPackages, checking static fallback...", err);
      }

      // Fallback to static
      const staticItem = transportData.find((item) => item.id === parseInt(id));
      if (staticItem) {
        setTravelItem(staticItem);
        // Try fetching dynamic itineraries by title for static agents
        try {
          const apiBase = import.meta.env.VITE_API_BASE || "";
          const itRes = await axios.get(`${apiBase}/api/agent-itineraries?agentId=${encodeURIComponent(staticItem.title)}`);
          setDynamicItineraries(itRes.data.data || []);
        } catch (itErr) {
          console.warn("Could not fetch dynamic itineraries for static agent:", itErr);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-gray-600 font-medium">Loading packages...</p>
    </div>
  );

  if (!travelItem) return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Travel details not found.</h2>
      <button onClick={() => navigate(-1)} className="text-blue-600 underline">Go Back</button>
    </div>
  );

  // Merge static and dynamic packages
  const allPackages = [
    ...(dynamicItineraries || []),
    ...(travelItem.tourPackages || []).map(p => ({ ...p, isStatic: true }))
  ];

  return (
    <div className="w-full px-4 py-6 bg-[#f8fafc] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <Header travelItem={travelItem} />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* LEFT SIDE: Packages */}
          <div className="w-full lg:w-[75%] flex flex-col gap-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    All Tour Packages by <span className="text-blue-600">{travelItem.title}</span>
                  </h2>
                  <p className="text-slate-500 text-sm mt-1 font-medium">Explore hand-picked travel experiences</p>
                </div>
                <button
                  onClick={() => navigate(`/verified-transport-details/${id}`)}
                  className="px-5 py-2 bg-slate-50 text-slate-600 rounded-full font-bold text-xs hover:bg-slate-100 transition-all flex items-center gap-2 border border-slate-200"
                >
                  ← Back to Details
                </button>
              </div>

              {allPackages.length === 0 ? (
                <div className="py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100">
                  <p className="text-slate-400 font-medium">No tour packages available for this partner yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allPackages.map((pkg, i) => (
                    <div 
                      key={i} 
                      className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 flex flex-col h-full cursor-pointer"
                      onClick={() => pkg.slug && navigate(`/itinerary/${pkg.slug}`)}
                    >
                      <div className="relative h-48 overflow-hidden bg-slate-100">
                        <img
                          src={getImageUrl(pkg.coverImageUrl || TourPackages)}
                          alt={pkg.title || pkg.destination}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                            {pkg.type || "Tour"}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-black text-lg mb-2 text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {pkg.title || `Package for ${pkg.destination}`}
                        </h3>
                        <p className="text-slate-500 text-xs mb-4 line-clamp-2 font-medium leading-relaxed flex-1">
                          {pkg.shortDescription || pkg.description || "An unforgettable journey awaits you."}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                          <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Starting from</span>
                            <span className="text-lg font-black text-slate-900">
                              ₹{pkg.discountedPrice || pkg.priceFrom || pkg.price || "Contact Us"}
                            </span>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full lg:w-[25%] flex flex-col gap-6">
            <div className="sticky top-8">
              <RightSide travelItem={travelItem} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTourPackages;
