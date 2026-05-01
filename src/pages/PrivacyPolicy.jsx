import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "../utils/api";

const PrivacyPolicy = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/policies`, {
          params: { type: 'privacy', category: 'General', destination: 'General' }
        });
        if (res.data.success) {
          setContent(res.data.data.content);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching privacy policy:", error);
        setLoading(false);
      }
    };
    fetchPolicy();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500 mb-4"></div>
        <p className="font-medium italic">Securing your privacy...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Privacy <span className="text-orange-600">Policy</span>
          </h1>
          <div className="h-1.5 w-24 bg-orange-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 text-sm font-bold uppercase tracking-widest">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 p-8 md:p-12 mb-12 border border-gray-100">
          {content ? (
            <div 
              className="prose prose-lg max-w-none prose-orange leading-relaxed text-gray-700 policy-content-body"
              dangerouslySetInnerHTML={{ __html: content }} 
            />
          ) : (
            <div className="text-center py-20">
              <div className="text-orange-100 mb-6">
                <i className="fas fa-shield-alt text-6xl"></i>
              </div>
              <p className="text-gray-400 italic text-lg">Our privacy policy is being updated. Please check back shortly.</p>
            </div>
          )}
        </div>

        {/* Contact Footer */}
        <div className="bg-orange-600 rounded-3xl p-10 text-center text-white shadow-xl shadow-orange-200">
          <h2 className="text-2xl font-bold mb-4">Questions about your data?</h2>
          <p className="text-orange-100 mb-8 max-w-md mx-auto">We're committed to protecting your information. Reach out to our privacy team anytime.</p>
          <a 
            href="mailto:info@travelnworld.com"
            className="inline-block bg-white text-orange-600 px-8 py-3 rounded-xl font-black hover:scale-105 transition-transform shadow-lg"
          >
            Contact Privacy Team
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

 
