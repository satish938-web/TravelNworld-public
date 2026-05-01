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
  const [policies, setPolicies] = useState({
    terms: "",
    payment: "",
    cancellation: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPolicies = async () => {
      try {
        const [termsRes, paymentRes, cancellationRes] = await Promise.all([
          axios.get(`${API_BASE}/api/policies`, { params: { type: 'terms', category: 'General', destination: 'General' } }),
          axios.get(`${API_BASE}/api/policies`, { params: { type: 'payment', category: 'General', destination: 'General' } }),
          axios.get(`${API_BASE}/api/policies`, { params: { type: 'cancellation', category: 'General', destination: 'General' } })
        ]);

        setPolicies({
          terms: termsRes.data.data?.content || "",
          payment: paymentRes.data.data?.content || "",
          cancellation: cancellationRes.data.data?.content || ""
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching policies:", error);
        setLoading(false);
      }
    };
    fetchAllPolicies();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500 mb-4"></div>
        <p className="font-medium italic">Preparing documents...</p>
      </div>
    );
  }

  const hasContent = policies.terms || policies.payment || policies.cancellation;

  return (
    <div className="min-h-screen bg-gray-50/50 py-16 px-4 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tighter">
            Terms <span className="text-orange-600">&</span> Conditions
          </h1>
          <div className="h-2 w-32 bg-orange-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.3em]">Official Guidelines & Policies</p>
        </div>

        {hasContent ? (
          <>
            <PolicySection 
              title="General Terms of Use" 
              content={policies.terms} 
              icon={<i className="fas fa-file-contract text-xl"></i>} 
            />
            <PolicySection 
              title="Payment & Booking Mode" 
              content={policies.payment} 
              icon={<i className="fas fa-credit-card text-xl"></i>} 
            />
            <PolicySection 
              title="Cancellation & Refund Policy" 
              content={policies.cancellation} 
              icon={<i className="fas fa-undo-alt text-xl"></i>} 
            />
          </>
        ) : (
          <div className="bg-white rounded-[3rem] p-20 text-center shadow-xl border border-dashed border-gray-200">
            <div className="text-gray-200 mb-6 italic">
              <i className="fas fa-folder-open text-7xl"></i>
            </div>
            <p className="text-gray-400 text-xl font-medium">Terms and policies are currently under review. Please check back later.</p>
          </div>
        )}

        {/* Support Section */}
        <div className="mt-12 text-center py-10 border-t border-gray-200">
          <p className="text-gray-500 mb-4 font-medium italic">Have any questions about our terms?</p>
          <a 
            href="/contactUs" 
            className="text-orange-600 font-black hover:text-orange-700 transition-colors uppercase tracking-widest text-sm"
          >
            Reach Out to Support →
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

