import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getImageUrl, API_BASE, normalizeHtmlContent } from "../../utils/api";
import { motion } from "framer-motion";
import { Share2, Printer, ChevronLeft, Calendar, User } from "lucide-react";

const AgentBlogDetail = () => {
  const { id, blogIndex } = useParams();
  const navigate = useNavigate();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/agents/public/${id}?t=${new Date().getTime()}`);
        setAgent(res.data.data);
      } catch (err) {
        console.error("Error fetching agent blog", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchAgent();
  }, [id]);

  // Handle blogs array
  const blogsArray = agent?.blogs || [];
  const blog = (blogsArray.length > 0) 
    ? blogsArray[parseInt(blogIndex)] 
    : null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title || "Travel Story",
        text: "Check out this amazing travel story!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Debug: log blog data
  useEffect(() => {
    if (blog) {
      console.log("Blog loaded:", blog);
    }
  }, [blog]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!agent || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Blog not found</h2>
        <p className="text-slate-500 mb-4">Agent: {agent?._id}, BlogIndex: {blogIndex}, BlogsArray length: {agent?.blogs?.length || 0}</p>
        <button onClick={() => navigate(-1)} className="text-red-600 font-bold hover:underline">← Go Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Top Header Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-red-600 font-bold transition-colors text-sm"
          >
            <ChevronLeft size={20} /> Back to Profile
          </button>
          <div className="flex items-center gap-4">
            <button onClick={handleShare} className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-all">
              <Share2 size={20} />
            </button>
            <button onClick={() => window.print()} className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-all">
              <Printer size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[300px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          <img
            src={getImageUrl(blog?.image) || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format&fit=crop"}
            alt={blog?.title || "Travel Story"}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format&fit=crop"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-10 left-10 right-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="px-4 py-1.5 bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                Travel Story
              </div>
              <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-widest">
                <Calendar size={14} className="text-red-500" /> 
                {new Date(blog?.createdAt || new Date()).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight"
            >
              {blog?.title || "Travel Story"}
            </motion.h1>
          </div>
        </motion.div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-4xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100"
          >
            {blog?.content ? (
              <div 
                className="quill-content text-slate-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: normalizeHtmlContent(blog.content) }}
              />
            ) : (
              <div className="py-16 text-center">
                <p className="text-slate-400 font-medium mb-4">No content available for this story yet.</p>
                <p className="text-slate-300 text-sm">Blog structure: {JSON.stringify({ title: blog?.title, hasContent: !!blog?.content, hasImage: !!blog?.image }, null, 2)}</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Sidebar / Info */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 text-center">
            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-red-600">
              <User size={32} />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-1">{agent.company || "Verified Agent"}</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">Story Author</p>
            <button 
              onClick={() => navigate(`/agent/${agent._id}`)}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
            >
              View Agent Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentBlogDetail;
