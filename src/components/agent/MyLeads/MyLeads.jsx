import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "../../../utils/api";
import AdminLeads from "./AdminLeads";

const MyLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("MyLeads: Fetching from", `${API_BASE}/api/enquiries/my-leads`);
    const fetchLeads = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found. Please login again.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${API_BASE}/api/enquiries/my-leads`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log("MyLeads: Received data:", res.data);

        if (res.data.success) {
          const formattedLeads = res.data.data.map(item => ({
            _id: item._id,
            destination: item.itineraryTitle || "General Inquiry",
            timeAgo: new Date(item.createdAt).toLocaleDateString(),
            from: "Direct User",
            dates: { start: "-", end: "-", nights_days: "-" },
            price: 0,
            pax: { adults: 1, children: 0, infants: 0 },
            quality: 5,
            source: "Public Website",
            times_sold: 1,
            seller: { 
              name: item.name || "User", 
              since: item.email, 
              contact: item.phone, 
              whatsapp: item.phone 
            },
            requirements: item.your_requirements || item.description || "No requirements provided."
          }));
          setLeads(formattedLeads);
        } else {
          setError("Failed to load leads from server.");
        }
      } catch (err) {
        console.error("MyLeads: Error:", err);
        setError("Error connecting to server. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl shadow-sm">
        <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-red-600 mb-4"></div>
        <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs">Loading Leads...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 bg-red-50 rounded-2xl border border-red-100 text-red-600">
        <p className="font-bold">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl text-sm font-bold">Retry</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">My Leads</h2>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">Direct inquiries from website</p>
        </div>
        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider">
          Total: {leads.length}
        </div>
      </div>

      <div className="space-y-6">
        {leads.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
             <p className="text-slate-400 font-medium">You haven't received any leads yet.</p>
          </div>
        ) : (
          leads.map((card) => (
            <div key={card._id} className="group transition-all duration-300">
              <AdminLeads data={card} />
              <div className="mt-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm group-hover:border-red-100 group-hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-2 mb-3 text-red-600">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Customer Message / Requirements</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {card.requirements}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyLeads;
