import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Facelessphoto from "../assets/Facelessphoto.jpg";
import transportData from "../data/transportData";
import Header from "./verifiedTransportDetails/Header";
import Gallery from "./verifiedTransportDetails/Gallery";
import VerifyTour from "./verifiedTransportDetails/VerifyTour";
import QuickSection from "./verifiedTransportDetails/QuickSection";
import HappyCustomer from "./verifiedTransportDetails/HappyCustomer";
import VerifiedReview from "./verifiedTransportDetails/VerifiedReview";
import RightSide from "./verifiedTransportDetails/RightSide";
import HappyCustomerVideo from "./verifiedTransportDetails/HappyCustomerVideo";
import Overview from "./verifiedTransportDetails/Overview";
import { useAutoRefreshData } from "../hooks/useAutoRefreshData";
import { getImageUrl } from "../utils/api";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';


const VerifiedTransportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [travelItem, setTravelItem] = useState(null);
  const [reviewsList, setReviewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itineraries, setItineraries] = useState([]);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [saved, setSaved] = useState(false);

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
      reviews: agent.reviews || "", // This is the summary string
      verified: agent.isVerified ?? true,
      location: agent.companyAddress ? `${agent.companyAddress.city}, ${agent.companyAddress.state}` : "Location not specified",
      fullAddress: agent.companyAddress
        ? `${agent.companyAddress.houseNo || ""}, ${agent.companyAddress.street || ""}, ${agent.companyAddress.city || ""}, ${agent.companyAddress.state || ""}`.replace(/^, /, "")
        : "Address not specified",
      phone: agent.phone || "N/A",
      whatsapp: agent.phone || "N/A",
      email: agent.email || "N/A",
      image: agent.photo || Facelessphoto,
      bannerImage: agent.bannerImage || "",
      images: Array.isArray(agent.agentPhotos) ? agent.agentPhotos.filter(url => url && !/\.(mp4|mov|avi|webm|mkv)/i.test(url)) : [],
      videos: Array.isArray(agent.agentPhotos) ? agent.agentPhotos.filter(url => url && /\.(mp4|mov|avi|webm|mkv)/i.test(url)) : [],
      slug: (agent.company || `${agent.firstName}-${agent.lastName}`).toLowerCase().replace(/\s+/g, '-'),
      tags: agent.tags && agent.tags.length > 0 ? agent.tags : ["Verified Partner", "Tour Expert"],
      tourPackages: [],
      overview: agent.overview || "",
      quickInfo: agent.quickInfo || "",
      services: agent.services || "",
      blogs: agent.blogs || [],
      testimonials: agent.testimonials || [],
      reviewsList: agent.reviewsList || [],
      agentVideos: agent.agentVideos || [],
      branchAddresses: Array.isArray(agent.branchAddresses) ? agent.branchAddresses : [],
    };

    // Fallback for old blog data format
    if ((!mappedAgent.blogs || mappedAgent.blogs.length === 0) && agent.blogDescription) {
      mappedAgent.blogs = [{
        title: agent.blogTitle || "Latest Travel Story",
        content: agent.blogDescription || "",
        image: agent.blogImage || "",
        isPublished: agent.isBlogPublished !== false,
        createdAt: agent.createdAt || new Date()
      }];
    }

    // Parse tourPackages if they exist as a string
    if (agent.tourPackages) {
      if (typeof agent.tourPackages === 'string') {
        const trimmed = agent.tourPackages.trim();
        if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
          try {
            const pkgs = JSON.parse(trimmed);
            if (Array.isArray(pkgs)) mappedAgent.tourPackages = pkgs;
          } catch (e) {
            console.warn("Tour packages string looked like JSON but failed to parse:", e);
          }
        } else {
          // It's likely descriptive text, not JSON
          console.debug("Tour packages contains descriptive text, skipping JSON parse.");
        }
      } else if (Array.isArray(agent.tourPackages)) {
        mappedAgent.tourPackages = agent.tourPackages;
      }
    }

    return mappedAgent;
  };

  // Fetch initial agent details
  useEffect(() => {
    const fetchAgentDetails = async () => {
      setLoading(true);
      setError(null);

      // 1. Try Fetching from API first (Single Source of Truth)
      try {
        const apiBase = import.meta.env.VITE_API_BASE || "";
        const res = await axios.get(`${apiBase}/api/agents/public/${id}`);
        const agent = res.data.data;
        const reviews = res.data.reviews || [];

        if (agent) {
          const mappedAgent = mapAgentData(agent);
          setTravelItem(mappedAgent);
          setReviewsList(reviews);
          setLoading(false);
          // Also fetch dynamic itineraries
          fetchDynamicItineraries(agent._id || agent.company || id);
          return;
        }
      } catch (err) {
        console.warn("API fetch failed, checking static fallback...", err);
      }

      // 2. Fallback to static data if API fails or agent not in DB
      const staticItem = transportData.find((item) => item.id === parseInt(id));
      if (staticItem) {
        setTravelItem(staticItem);
        setReviewsList([]);
        // Try fetching dynamic itineraries by title even for static agents
        fetchDynamicItineraries(staticItem.title);
      } else {
        setError("Travel partner details not found.");
      }
      setLoading(false);
    };

    fetchAgentDetails();
  }, [id]);

  const fetchDynamicItineraries = async (agentId) => {
    try {
      const apiBase = import.meta.env.VITE_API_BASE || "";
      const res = await axios.get(`${apiBase}/api/agent-itineraries?agentId=${agentId}`);
      setItineraries(res.data.data || []);
    } catch (err) {
      console.error("Error fetching dynamic itineraries:", err);
    }
  };

  // Auto-refresh hook for syncing with admin edits
  // Updates every 5 seconds to reflect changes made in the admin panel
  useAutoRefreshData(id, {
    refreshInterval: 30000, // Refresh every 30 seconds for optimal server performance
    onDataUpdate: (fullData) => {
      const updatedAgent = fullData.data;
      const updatedReviews = fullData.reviews || [];
      
      if (updatedAgent) {
        const mappedAgent = mapAgentData(updatedAgent);
        setTravelItem((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(mappedAgent)) {
            return mappedAgent;
          }
          return prev;
        });
      }
      
      if (updatedReviews.length > 0) {
        setReviewsList((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(updatedReviews)) {
            return updatedReviews;
          }
          return prev;
        });
      }
    },
    onError: (error) => {
      // Silently handle refresh errors - don't interrupt user experience
      console.debug("Auto-refresh encountered an error (non-critical):", error.message);
    },
  });

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
      <p className="text-gray-600 font-medium">Loading premium profile...</p>
    </div>
  );

  if (error || !travelItem) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
        <p className="text-gray-600 mb-6">{error || "The travel partner profile you're looking for could not be found."}</p>
        <button
          onClick={() => window.history.back()}
          className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-slate-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Thank you ${name}! We'll contact you at ${mobile} shortly.`);
    setName("");
    setMobile("");
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans pb-24 md:pb-0">
      {/* Premium Breadcrumb / Top Bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-16 py-3">
        <div className="max-w-[1440px] mx-auto flex items-center text-[10px] sm:text-xs font-medium text-slate-500 gap-2">
          <span className="hover:text-red-600 cursor-pointer transition-colors" onClick={() => window.history.back()}>Home</span>
          <span className="text-slate-300">/</span>
          <span className="hover:text-red-600 cursor-pointer transition-colors" onClick={() => window.history.back()}>Verified Partners</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold truncate max-w-[150px] sm:max-w-none">{travelItem.title}</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
        {/* MAIN CONTENT SPLIT */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-10 w-full">
          {/* LEFT SIDE - Main Info (70% on Tablet/Laptop) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="w-full md:w-[68%] lg:w-[72%] flex flex-col gap-6 sm:gap-8"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <Header travelItem={travelItem} />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} id="overview" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-500">
              <Overview travelItem={travelItem} />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} id="packages" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-500">
              <VerifyTour travelItem={travelItem} dynamicItineraries={itineraries} />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} id="services" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-500">
              <QuickSection travelItem={travelItem} />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} id="gallery" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-500 overflow-hidden">
              <Gallery travelItem={travelItem} />
            </motion.div>

            {/* Branches Section - Constant for all profiles */}
            <div id="branches" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 hover:shadow-xl hover:border-slate-200 transition-all duration-500 group">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3 group-hover:translate-x-1 transition-transform">
                <span className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600">🏢</span>
                Our Office Branches
              </h3>
              {travelItem.branchAddresses && travelItem.branchAddresses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {travelItem.branchAddresses.map((branch, i) => (
                    <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <h4 className="font-bold text-slate-800 mb-2">Branch {i + 1}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {branch.houseNo} {branch.street}, {branch.area},<br />
                        {branch.city}, {branch.state} - {branch.postalCode}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 p-10 rounded-2xl border border-dashed border-slate-200 text-center">
                  <p className="text-slate-400 text-sm font-medium">No branch offices listed yet. Main office details are available in the sidebar.</p>
                </div>
              )}
            </div>

            {/* Premium Multi-Blog Marquee Section - Now Constant for all profiles */}
            <div id="blogs" className="w-full overflow-hidden bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-500">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-8 h-[2px] bg-red-600 rounded-full" />
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Travel Stories</h2>
                </div>
                {(() => {
                      let displayBlogs = (travelItem.blogs || []).filter(b => b.isPublished !== false);
                      
                      if (displayBlogs.length === 0) {
                        return (
                          <div className="w-full py-10 flex flex-col items-center justify-center text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl mb-3">📰</div>
                            <h4 className="text-slate-900 font-bold text-sm">No stories published yet</h4>
                            <p className="text-slate-400 text-xs mt-1">Check back later for amazing travel updates from {travelItem.title}.</p>
                          </div>
                        );
                      }

                      // Only duplicate if we have very few items to ensure smooth marquee
                      const marqueeItems = displayBlogs.length > 3 ? displayBlogs : [...displayBlogs, ...displayBlogs, ...displayBlogs];

                      return (
                        <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap gap-6 py-4">
                          {marqueeItems.map((blog, idx) => (
                            <motion.div 
                              key={idx}
                              whileHover={{ y: -5 }}
                              onClick={() => navigate(`/agent/${id}/blog/${idx % displayBlogs.length}`)}
                              className="w-[350px] flex-shrink-0 bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden flex hover:shadow-xl transition-all duration-500 group cursor-pointer"
                            >
                              {/* Small Image Side */}
                              <div className="w-28 h-32 overflow-hidden flex-shrink-0">
                                <img
                                  src={getImageUrl(blog.image) || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400&auto=format&fit=crop"}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                  alt="Blog"
                                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400&auto=format&fit=crop"; }}
                                />
                              </div>
                              
                              {/* Content Side */}
                              <div className="p-5 flex flex-col justify-center overflow-hidden">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="w-6 h-6 rounded-lg bg-red-50 text-red-600 flex items-center justify-center text-[10px]">📰</span>
                                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">Story</span>
                                </div>
                                <h3 className="text-sm font-black text-slate-900 mb-2 truncate group-hover:text-red-600 transition-colors">
                                  {blog.title || "Latest Travel Story"}
                                </h3>

                                <span className="text-[9px] font-bold text-red-600 flex items-center gap-1">
                                  Read Full Story →
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      );
                    })()}
              </div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} id="reviews" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-500">
              <VerifiedReview travelItem={travelItem} reviewsList={reviewsList} />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} id="testimonials" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-500">
              {((travelItem.testimonials && travelItem.testimonials.length > 0) || (travelItem.agentVideos && travelItem.agentVideos.length > 0)) ? (
                <>
                  <HappyCustomer testimonials={travelItem.testimonials} />
                  <div className="mt-6">
                    <HappyCustomerVideo videos={travelItem.agentVideos} />
                  </div>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">💬</div>
                  <h3 className="text-slate-900 font-bold">Client Testimonials</h3>
                  <p className="text-slate-400 text-xs mt-2">No testimonials have been added for this agent yet. Check back soon for client feedback.</p>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - Sidebar Info (30% on Tablet/Laptop) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full md:w-[32%] lg:w-[28%]"
          >
            <div className="md:sticky md:top-24 flex flex-col gap-6 sm:gap-8 z-10">
              <RightSide travelItem={travelItem} />

              {/* Quick Links / Page Navigation */}
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hidden md:block">
                  <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-widest">Quick Navigation</h3>
                  <div className="flex flex-col gap-2">
                    <a href="#branches" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-red-600 font-bold transition-all border border-transparent hover:border-slate-100 group">
                      <span className="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-red-50 group-hover:text-red-600 text-slate-400 flex items-center justify-center transition-all">🏢</span>
                      Office Branches
                    </a>

                    <a href="#blogs" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-red-600 font-bold transition-all border border-transparent hover:border-slate-100 group">
                      <span className="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-red-50 group-hover:text-red-600 text-slate-400 flex items-center justify-center transition-all">📰</span>
                      Latest Stories
                    </a>

                    <a href="#testimonials" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-red-600 font-bold transition-all border border-transparent hover:border-slate-100 group">
                      <span className="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-red-50 group-hover:text-red-600 text-slate-400 flex items-center justify-center transition-all">💬</span>
                      Testimonials
                    </a>
                  </div>
                </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Floating Action Bar for Mobile - Hidden on md screens and up */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 px-6 py-4 z-[1000] flex gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <a href={`tel:${travelItem.phone}`} className="flex-1 bg-slate-900 text-white font-bold py-3 rounded-xl shadow-lg shadow-slate-200 active:scale-95 transition-all text-sm text-center flex items-center justify-center">
          Call Agent
        </a>
        <a href={`https://wa.me/${travelItem.phone?.replace(/\D/g, "")}`} className="flex-1 bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-100 active:scale-95 transition-all text-sm text-center flex items-center justify-center">
          WhatsApp
        </a>
      </div>
    </div>
  );
};

export default VerifiedTransportDetails;
