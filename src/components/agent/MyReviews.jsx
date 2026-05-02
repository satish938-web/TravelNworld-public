import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE } from '../../utils/api';
import { Star, MessageSquare, User, Calendar, Loader2, Trash2, Edit3, X, Check } from 'lucide-react';
import { HiSearch, HiAdjustments, HiOutlineChatAlt2 } from 'react-icons/hi';

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ rating: 5, comment: "" });
  const [actionLoading, setActionLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    startDate: "",
    endDate: ""
  });

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      const { search, startDate, endDate } = filters;
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const response = await axios.get(`${API_BASE}/api/agents/all/reviews?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data?.success) {
        setReviews(response.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching reviews", err);
      setError("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchReviews();
  }, []); // Only run once on mount

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    
    try {
      setActionLoading(true);
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE}/api/agents/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      alert("Failed to delete review");
    } finally {
      setActionLoading(false);
    }
  };

  const startEdit = (review) => {
    setEditingId(review._id);
    setEditForm({ rating: review.rating, comment: review.comment || review.text });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ rating: 5, comment: "" });
  };

  const handleUpdate = async (id) => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_BASE}/api/agents/reviews/${id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data?.success) {
        setReviews(prev => prev.map(r => r._id === id ? { ...r, ...editForm } : r));
        setEditingId(null);
      }
    } catch (err) {
      alert("Failed to update review");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading && !reviews.length) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
        <p className="text-slate-500 font-bold animate-pulse">Fetching your reviews...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-24 animate-fade-in">
      {/* Refined Header & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-px bg-red-600"></div>
              <span className="text-red-600 font-bold uppercase tracking-[0.4em] text-[10px]">Feedback Engine</span>
            </div>
            <h1 className="text-4xl font-black text-slate-950 tracking-tight">Client <span className="text-red-600">Reviews</span></h1>
            <p className="text-slate-400 font-medium text-sm mt-2">Manage and monitor traveler experiences across all itineraries.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
             <div className="relative group">
                <input
                  type="text"
                  placeholder="Filter by traveler..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="pl-11 pr-4 py-3 bg-slate-50 border border-transparent rounded-2xl text-sm font-medium focus:bg-white focus:border-red-500/20 focus:ring-4 focus:ring-red-500/5 transition-all outline-none min-w-[240px]"
                />
                <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors" size={18} />
             </div>
             <button
               onClick={fetchReviews}
               className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-red-600 transition-all duration-300 shadow-xl shadow-slate-200 active:scale-95"
             >
               <HiAdjustments size={20} />
             </button>
          </div>
        </div>

        <div className="bg-slate-950 p-8 rounded-[2.5rem] flex flex-col justify-center items-center text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[50px] rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
          <p className="text-5xl font-black text-white mb-1">{reviews.length}</p>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Total Insights</p>
        </div>
      </div>

      {/* Date Filters Row */}
      <div className="bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-slate-100 flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Range</span>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 outline-none focus:border-red-600 transition-colors"
          />
          <span className="text-slate-300">to</span>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 outline-none focus:border-red-600 transition-colors"
          />
        </div>
        
        <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

        <button
          onClick={async () => {
            setFilters({ search: "", startDate: "", endDate: "" });
            try {
              setLoading(true);
              const token = localStorage.getItem("token");
              const response = await axios.get(`${API_BASE}/api/agents/all/reviews`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              if (response.data?.success) setReviews(response.data.data || []);
            } catch (err) { console.error(err); } finally { setLoading(false); }
          }}
          className="text-[10px] font-black text-slate-400 hover:text-red-600 uppercase tracking-widest transition-colors"
        >
          Reset Filters
        </button>
      </div>

      {/* Reviews Grid */}
      {reviews.length === 0 ? (
        <div className="bg-white rounded-[3rem] p-24 text-center border border-dashed border-slate-200">
           <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 mx-auto mb-6">
              <HiOutlineChatAlt2 size={40} />
           </div>
           <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">Silent Waters</h3>
           <p className="text-slate-400 font-medium">You haven't received any traveler reviews yet.</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {reviews.map((r) => (
            <div 
              key={r._id} 
              className="group bg-white rounded-[3rem] p-10 border border-slate-100 hover:border-red-100 hover:shadow-2xl hover:shadow-red-600/5 transition-all duration-500 relative"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-red-50 group-hover:text-red-600 transition-all duration-500 overflow-hidden">
                      {r.userAvatar ? (
                        <img src={r.userAvatar} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <User size={32} strokeWidth={1.5} />
                      )}
                    </div>
                    <div className="absolute -top-2 -right-2 bg-white shadow-lg p-1.5 rounded-lg border border-slate-50">
                      <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-black text-slate-900 text-2xl tracking-tight mb-1">{r.userName || 'Guest Traveler'}</h3>
                    <div className="flex items-center gap-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={`${i < (editingId === r._id ? editForm.rating : r.rating) ? "text-yellow-500 fill-yellow-500" : "text-slate-100"}`} 
                        />
                      ))}
                      <span className="text-[10px] font-black text-slate-400 ml-2 uppercase tracking-widest">
                        {editingId === r._id ? `${editForm.rating}/5 Rating` : `${r.rating}.0 Score`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {editingId === r._id ? (
                    <div className="flex gap-2 p-1 bg-slate-50 rounded-2xl">
                       <button 
                         onClick={() => handleUpdate(r._id)}
                         className="p-3 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-200 transition-all"
                       >
                         {actionLoading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                       </button>
                       <button 
                         onClick={cancelEdit}
                         className="p-3 rounded-xl bg-white text-slate-400 hover:text-slate-900 transition-all"
                       >
                         <X size={18} />
                       </button>
                    </div>
                  ) : (
                    <>
                      <div className="px-4 py-2 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-100 flex items-center gap-2">
                        <Calendar size={12} />
                        {r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent'}
                      </div>
                      
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 duration-500">
                        <button 
                          onClick={() => startEdit(r)}
                          className="p-3 rounded-2xl bg-white text-slate-400 hover:text-red-600 border border-slate-100 hover:border-red-200 transition-all"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(r._id)}
                          className="p-3 rounded-2xl bg-white text-slate-400 hover:text-red-600 border border-slate-100 hover:border-red-200 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-10 relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-red-500/10 rounded-full group-hover:bg-red-500/40 transition-all duration-500"></div>
                {editingId === r._id ? (
                  <textarea 
                    value={editForm.comment}
                    onChange={(e) => setEditForm(prev => ({ ...prev, comment: e.target.value }))}
                    className="w-full p-6 rounded-3xl bg-slate-50 border-2 border-transparent focus:border-red-500/20 focus:bg-white transition-all text-slate-700 font-medium min-h-[120px] outline-none"
                    style={{ fontFamily: 'var(--font-inter)' }}
                    placeholder="Refine the feedback comment..."
                  />
                ) : (
                  <p 
                    className="text-slate-500 text-[15px] leading-[1.8] font-medium pl-6 border-l-2 border-red-100"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    "{r.comment || r.text}"
                  </p>
                )}
              </div>
              
              {/* Subtle background icon */}
              <HiOutlineChatAlt2 className="absolute -bottom-8 -right-8 text-slate-50/40 w-48 h-48 -z-0 pointer-events-none" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
