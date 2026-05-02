import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "../utils/api";

const PolicySection = ({ title, content, icon }) => {
  if (!content) return null;
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 md:p-10 mb-10 border border-gray-100 transition-all hover:shadow-2xl hover:shadow-orange-100/50 group">
      <div className="flex items-center gap-4 mb-6 border-b border-gray-50 pb-4">
        <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
          {icon}
        </div>
        <h2 className="text-2xl font-black text-gray-800 tracking-tight">{title}</h2>
      </div>
      <div 
        className="prose prose-lg max-w-none prose-orange leading-relaxed text-gray-600 policy-content-body"
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </div>
  );
};

const TermsAndConditions = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/policies`, {
          params: { type: 'terms', category: 'General', destination: 'General' }
        });
        if (res.data.success) {
          setContent(res.data.data.content);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching terms:", error);
        setLoading(false);
      }
    };
    fetchTerms();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500 mb-4"></div>
        <p className="font-medium italic">Loading terms of use...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-16 px-4 flex justify-center font-sans">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-50 rounded-3xl text-orange-600 mb-6 shadow-sm">
            <i className="fas fa-file-contract text-3xl"></i>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tighter">
            Terms of <span className="text-orange-600">Use</span>
          </h1>
          <div className="h-1.5 w-24 bg-orange-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-xs font-black uppercase tracking-[0.4em]">Official Site Guidelines</p>
        </div>

        {content ? (
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/40 p-8 md:p-16 mb-12 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-orange-400"></div>
            <div 
              className="prose prose-lg max-w-none prose-orange leading-relaxed text-gray-700 policy-content-body"
              dangerouslySetInnerHTML={{ __html: content }} 
            />
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-20 text-center shadow-xl border border-dashed border-gray-200">
            <div className="text-gray-200 mb-6 italic">
              <i className="fas fa-folder-open text-7xl"></i>
            </div>
            <p className="text-gray-400 text-xl font-medium">Terms of use are currently under review. Please check back later.</p>
          </div>
        )}

        {/* Support Section */}
        <div className="mt-12 text-center py-10 border-t border-gray-200">
          <p className="text-gray-500 mb-6 font-medium italic">Have any questions about these terms?</p>
          <a 
            href="/contactUs" 
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-600 transition-all shadow-xl active:scale-95"
          >
            Contact Support Team
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

