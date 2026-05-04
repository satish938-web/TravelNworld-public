import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Facelessphoto from "../assets/Facelessphoto.jpg";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRupeeSign,
  FaStar,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaShare,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
  FaUsers,
  FaClock,
  FaCheck,
  FaTimes,
  FaQuoteLeft,
  FaShieldAlt,
  FaCreditCard,
  FaSuitcase,
  FaNewspaper,
  FaBuilding
} from "react-icons/fa";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE, getImageUrl } from "../utils/api";

import { trendingDestinations } from "../data/agentData";

const AgentDetailPage = () => {
  const { agencyId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [agent, setAgent] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBannerLightbox, setShowBannerLightbox] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);

  // Auto-cycle banner images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffset(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch agent profile with cache buster
        const agentRes = await axios.get(`${API_BASE}/api/agents/public/${agencyId}?t=${new Date().getTime()}`);
        const agent = agentRes.data.data;
        setAgent(agent);

        if (agent?._id) {
          // Fetch agent itineraries using the real agent ObjectId
          const itinerariesRes = await axios.get(`${API_BASE}/api/agent-itineraries?agentId=${agent._id}`);
          setItineraries(itinerariesRes.data.data || []);
        }
      } catch (err) {
        console.error("Error fetching agent data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [agencyId]);

  // Handle sticky contact card
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E69233]"></div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <FaMapMarkerAlt className="text-gray-400 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Agency Not Found</h2>
          <p className="text-gray-600 mb-6">The travel agency you are looking for does not exist.</p>
          <Link 
            to="/" 
            className="bg-[#E69233] text-white px-6 py-3 rounded-lg hover:bg-[#d77e27] transition-colors"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  const tabConfig = [
    { id: "overview", label: "Overview", icon: FaQuoteLeft },
    { id: "packages", label: "Tours & Packages", icon: FaSuitcase },
    { id: "services", label: "Services", icon: FaCheck },
    { id: "branches", label: "Our Branches", icon: FaBuilding },
    { id: "blogs", label: "Travel Blogs", icon: FaNewspaper },
    { id: "testimonials", label: "Testimonials", icon: FaUsers },
  ];

  const allMedia = [...(agent.agentPhotos || []), ...(agent.agentVideos || [])];

  const nextImage = () => {
    if (allMedia.length === 0) return;
    setActiveImageIndex((prev) => (prev + 1) % allMedia.length);
  };

  const prevImage = () => {
    if (allMedia.length === 0) return;
    setActiveImageIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: agent.title,
          text: agent.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Fixed Contact Card for Mobile */}
      {isSticky && (
        <div className="fixed top-20 right-4 z-40 bg-white rounded-xl shadow-lg p-4 border border-gray-200 lg:hidden">
          <div className="flex items-center gap-3">
            <img
              src={getImageUrl(agent.photo)}
              alt={agent.title}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-[#261F43] truncate">{agent.company || `${agent.firstName} ${agent.lastName}`}</div>
              <a 
                href={`tel:${agent.phone}`}
                className="text-[#E69233] text-sm hover:underline flex items-center"
              >
                <FaPhone className="mr-1 text-xs" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Banner Section */}
      <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] bg-slate-900 overflow-hidden">
        {(() => {
          let banners = [];
          if (Array.isArray(agent.bannerImage)) {
            banners = agent.bannerImage;
          } else if (typeof agent.bannerImage === 'string' && agent.bannerImage) {
            if (agent.bannerImage.includes(',') && !agent.bannerImage.includes('X-Amz-Signature')) {
              banners = agent.bannerImage.split(',').map(s => s.trim()).filter(Boolean);
            } else {
              banners = [agent.bannerImage];
            }
          }
          
          if (banners.length === 0) {
            return <div className="w-full h-full bg-gradient-to-r from-slate-800 to-slate-900 opacity-60" />;
          }

          if (banners.length === 1) {
            const media = banners[0];
            const isVideo = media.toLowerCase().endsWith('.mp4') || media.toLowerCase().endsWith('.webm') || media.toLowerCase().endsWith('.ogg');
            return (
              <div className="w-full h-full relative">
                {isVideo ? (
                  <video src={getImageUrl(media)} autoPlay muted loop playsInline className="w-full h-full object-cover opacity-60" />
                ) : (
                  <img src={getImageUrl(media)} alt="Banner" className="w-full h-full object-cover opacity-60" />
                )}
              </div>
            );
          }

          // Premium Mosaic Layout for 2+ images
          return (
            <div className="grid grid-cols-4 grid-rows-2 w-full h-full gap-2 p-2">
              <AnimatePresence mode="popLayout">
                {(() => {
                  // If we have more than 1 image, we cycle them.
                  const displayedBanners = banners.length > 1 
                    ? [0, 1, 2, 3, 4].map(i => banners[(i + currentOffset) % banners.length])
                    : banners.slice(0, 5);

                  return displayedBanners.map((media, idx) => {
                    const isVideo = media.toLowerCase().endsWith('.mp4') || media.toLowerCase().endsWith('.webm') || media.toLowerCase().endsWith('.ogg');
                    return (
                      <motion.div
                        key={`${idx}-${media}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className={`${idx === 0 ? "col-span-2 row-span-2 rounded-l-2xl" : "col-span-1 row-span-1"} 
                          ${idx === 1 && banners.length >= 3 ? "rounded-tr-2xl" : ""} 
                          ${idx === 4 && banners.length >= 5 ? "rounded-br-2xl" : ""}
                          relative overflow-hidden bg-slate-800 shadow-inner`}
                      >
                        {isVideo ? (
                          <video src={getImageUrl(media)} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                        ) : (
                          <img src={getImageUrl(media)} alt={`Banner ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-110" />
                        )}
                        {idx === 4 && banners.length > 5 && (
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer group">
                            <span className="text-white font-black text-xs bg-white/20 px-4 py-2 rounded-full border border-white/30 group-hover:bg-white/40 transition-all uppercase tracking-widest">
                              + {banners.length - 5} More
                            </span>
                          </div>
                        )}
                      </motion.div>
                    );
                  });
                })()}
              </AnimatePresence>
            </div>
          );
        })()}
        
        {/* View All Photos Button */}
        <div className="absolute bottom-6 right-6 z-30">
          <button 
            onClick={() => setShowBannerLightbox(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md text-slate-900 rounded-xl font-bold text-xs shadow-xl hover:bg-white transition-all active:scale-95 border border-slate-200"
          >
            <FaQuoteLeft className="text-[10px] opacity-60" />
            Show all photos
          </button>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
      
        {/* Banner Lightbox Modal */}
        {showBannerLightbox && (
          <div className="fixed inset-0 z-[9999] bg-white overflow-y-auto animate-fadeIn text-slate-900">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-6 py-4 flex justify-between items-center border-b border-gray-200">
              <h3 className="font-bold text-[#261F43] text-lg uppercase tracking-widest">Banner Gallery</h3>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBannerLightbox(false);
                }}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 hover:bg-gray-200 transition-all"
              >
                ✕
              </button>
            </div>
            <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(() => {
                let banners = [];
                if (Array.isArray(agent.bannerImage)) {
                  banners = agent.bannerImage;
                } else if (typeof agent.bannerImage === 'string' && agent.bannerImage) {
                  banners = agent.bannerImage.split(',').map(s => s.trim()).filter(Boolean);
                }
                
                return banners.map((media, idx) => {
                  const isVideo = media.toLowerCase().endsWith('.mp4') || media.toLowerCase().endsWith('.webm') || media.toLowerCase().endsWith('.ogg');
                  return (
                    <div key={idx} className="rounded-2xl overflow-hidden shadow-xl bg-gray-50 border border-gray-100 aspect-video">
                      {isVideo ? (
                        <video src={getImageUrl(media)} controls className="w-full h-full object-cover" />
                      ) : (
                        <img src={getImageUrl(media)} alt={`Banner ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      )}
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        )}
        
        {/* Profile Overlay */}
        <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-end gap-6">
              <div className="relative group">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-[2.5rem] border-4 border-white shadow-2xl overflow-hidden bg-white">
                  <img 
                    src={getImageUrl(agent.photo || Facelessphoto)} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center text-white shadow-lg">
                  <FaCheck size={14} />
                </div>
              </div>
              <div className="flex-1 pb-4 sm:pb-8 text-center sm:text-left">
                <h1 className="text-3xl sm:text-5xl font-black text-white drop-shadow-lg tracking-tight mb-2">
                  {agent.company || `${agent.firstName} ${agent.lastName}`}
                </h1>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 text-white/80 text-sm font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <FaShieldAlt className="text-green-400" /> Verified Partner
                  </span>
                  <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <FaMapMarkerAlt className="text-red-400" /> {agent.companyAddress?.city || agent.state || "India"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Enhanced Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link 
                  to="/" 
                  className="text-[#E69233] hover:text-[#d77e27] transition-colors font-medium"
                >
                  Home
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link 
                  to="/trending-destinations" 
                  className="text-[#E69233] hover:text-[#d77e27] transition-colors font-medium"
                >
                  Trending Destinations
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-600 font-medium truncate">{agent.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                  <div className="flex-1">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#261F43] mb-4 leading-tight">
                      {agent.company || `${agent.firstName} ${agent.lastName}`}
                    </h1>
                    
                    {/* Enhanced Info Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center bg-orange-50 px-4 py-3 rounded-lg border border-orange-100">
                        <FaMapMarkerAlt className="text-[#E69233] mr-3 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-gray-500 font-medium">LOCATION</div>
                          <div className="font-semibold text-[#261F43] text-sm">{agent.companyAddress?.city || agent.state || "India"}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center bg-blue-50 px-4 py-3 rounded-lg border border-blue-100">
                        <FaClock className="text-blue-500 mr-3 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-gray-500 font-medium">EXPERIENCE</div>
                          <div className="font-semibold text-[#261F43] text-sm">Verified Partner</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center bg-green-50 px-4 py-3 rounded-lg border border-green-100">
                        <FaRupeeSign className="text-green-500 mr-3 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-gray-500 font-medium">TRUST SCORE</div>
                          <div className="font-semibold text-[#261F43] text-sm">9.8/10</div>
                        </div>
                      </div>
                    </div>

                    {/* Rating & Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center">
                        <div className="flex items-center mr-4">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-400 text-sm" />
                          ))}
                          <span className="ml-2 text-gray-600 text-sm font-medium">(12 reviews)</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setIsWishlisted(!isWishlisted)}
                          className={`p-2 rounded-lg border transition-all ${
                            isWishlisted 
                              ? 'bg-red-50 border-red-200 text-red-500' 
                              : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                          }`}
                          aria-label="Add to wishlist"
                        >
                          <FaHeart className={isWishlisted ? 'fill-current' : ''} />
                        </button>
                        <button
                          onClick={handleShare}
                          className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors"
                          aria-label="Share"
                        >
                          <FaShare />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Image Gallery */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="relative">
                  <div className="relative h-64 sm:h-96 rounded-xl overflow-hidden mb-6 group bg-slate-100">
                    {allMedia.length > 0 ? (
                      allMedia[activeImageIndex]?.toLowerCase().endsWith('.mp4') ? (
                        <video 
                          src={getImageUrl(allMedia[activeImageIndex])} 
                          className="w-full h-full object-cover" 
                          controls
                        />
                      ) : (
                        <img
                          src={getImageUrl(allMedia[activeImageIndex])}
                          alt={`${agent.company} - Media ${activeImageIndex + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No media available</div>
                    )}
                    
                    {/* Image Navigation */}
                    {allMedia.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-70"
                          aria-label="Previous image"
                        >
                          <FaChevronLeft />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-70"
                          aria-label="Next image"
                        >
                          <FaChevronRight />
                        </button>
                      </>
                    )}
                    
                    {/* Image Counter */}
                    {allMedia.length > 0 && (
                      <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        {activeImageIndex + 1} / {allMedia.length}
                      </div>
                    )}
                  </div>
                  
                  {/* Thumbnail Grid */}
                  <div className="grid grid-cols-4 gap-3">
                    {allMedia.slice(0, showAllImages ? allMedia.length : 4).map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIndex(i)}
                        className={`aspect-square rounded-lg overflow-hidden transition-all bg-slate-200 ${
                          activeImageIndex === i 
                            ? "ring-3 ring-[#E69233] ring-offset-2" 
                            : "hover:opacity-80"
                        }`}
                      >
                        {img.toLowerCase().endsWith('.mp4') ? (
                          <div className="w-full h-full flex items-center justify-center bg-slate-800 text-white text-[10px]">VIDEO</div>
                        ) : (
                          <img
                            src={getImageUrl(img)}
                            className="w-full h-full object-cover"
                            alt={`${agent.company} thumbnail ${i + 1}`}
                          />
                        )}
                      </button>
                    ))}
                    {allMedia.length > 4 && !showAllImages && (
                      <button
                        onClick={() => setShowAllImages(true)}
                        className="aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                      >
                        <div className="text-center">
                          <div className="font-bold">+{allMedia.length - 4}</div>
                          <div className="text-xs">More</div>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Enhanced Tabs */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                {/* Tab Headers */}
                <div className="border-b border-gray-200 px-6">
                  <div className="flex overflow-x-auto scrollbar-hide">
                    {tabConfig.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center py-4 px-4 text-sm font-medium border-b-2 whitespace-nowrap transition-all ${
                            activeTab === tab.id
                              ? "border-[#E69233] text-[#E69233] bg-orange-50"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          <Icon className="mr-2 text-xs" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-4 text-[#261F43] flex items-center">
                          <FaQuoteLeft className="mr-3 text-[#E69233]" />
                          Overview
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">{agent.overview || "No overview provided."}</p>
                      </div>

                      {agent.quickInfo && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-[#E69233] flex items-center">
                            <FaStar className="mr-2" />
                            Quick Information
                          </h3>
                          <p className="text-gray-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                            {agent.quickInfo}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "packages" && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold mb-6 text-[#261F43] flex items-center">
                        <FaSuitcase className="mr-3 text-[#E69233]" />
                        Our Exclusive Tours & Packages
                      </h2>
                      
                      {itineraries.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                          <FaSuitcase className="mx-auto text-gray-300 text-5xl mb-4" />
                          <p className="text-gray-500 font-medium">No special packages available at the moment.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                          {itineraries.map((it) => (
                            <div key={it._id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col h-full">
                              <div className="relative h-40 sm:h-48 overflow-hidden">
                                <img 
                                  src={getImageUrl(it.coverImageUrl || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop")} 
                                  alt={it.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                                  <span className="bg-[#E69233] text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider shadow-lg">
                                    {it.type}
                                  </span>
                                </div>
                              </div>
                              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                                <h3 className="text-base sm:text-lg font-bold text-[#261F43] mb-2 line-clamp-1 group-hover:text-[#E69233] transition-colors">{it.title}</h3>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] sm:text-xs text-gray-500 mb-4">
                                  <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-[#E69233]" /> {it.destination}</span>
                                  <span className="flex items-center gap-1"><FaClock className="text-[#E69233]" /> {it.duration}</span>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                                  <div>
                                    <span className="text-[9px] text-gray-400 block uppercase font-bold tracking-widest">Starts from</span>
                                    <span className="text-lg sm:text-xl font-black text-[#E69233]">₹{it.discountedPrice || it.priceFrom}</span>
                                  </div>
                                  <Link 
                                    to={`/itinerary/${it.slug}`}
                                    className="bg-[#261F43] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-[11px] sm:text-sm font-bold hover:bg-[#E69233] transition-all transform hover:-translate-y-0.5"
                                  >
                                    View Details
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "services" && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold mb-6 text-[#261F43] flex items-center">
                        <FaCheck className="mr-3 text-green-600" />
                        Our Services & Highlights
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(agent.services || "").split(",").map((item, i) => item.trim() && (
                          <div key={i} className="flex items-start bg-green-50 p-4 rounded-xl border border-green-100 shadow-sm">
                            <FaCheck className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                            <span className="text-gray-700 font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "branches" && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold mb-6 text-[#261F43] flex items-center">
                        <FaBuilding className="mr-3 text-blue-600" />
                        Our Office Branches
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Main Office */}
                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
                          <h3 className="font-bold text-blue-800 mb-2">Head Office</h3>
                          <p className="text-gray-700">
                            {agent.companyAddress ? (
                              <>
                                {agent.companyAddress.houseNo} {agent.companyAddress.street},<br />
                                {agent.companyAddress.area}, {agent.companyAddress.city},<br />
                                {agent.companyAddress.state} - {agent.companyAddress.postalCode}
                              </>
                            ) : "N/A"}
                          </p>
                        </div>
                        {/* Branch Offices */}
                        {Array.isArray(agent.branchAddresses) && agent.branchAddresses.length > 0 && agent.branchAddresses.map((branch, i) => (
                          <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-2">Branch {i + 1}</h3>
                            <p className="text-gray-700">
                              {branch.houseNo} {branch.street},<br />
                              {branch.area}, {branch.city},<br />
                              {branch.state} - {branch.postalCode}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "blogs" && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-[#261F43] flex items-center">
                          <FaNewspaper className="mr-3 text-[#E69233]" />
                          Travel Stories
                        </h2>
                      </div>

                      {((agent.blogs && agent.blogs.length > 0)) ? (
                        <div className="relative overflow-hidden bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                          <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap gap-6 py-4">
                            {(() => {
                              let displayBlogs = [];
                              if (agent.blogs && agent.blogs.length > 0) {
                                displayBlogs = agent.blogs.filter(b => b.isPublished !== false);
                              }

                              // Only duplicate if we have very few items to ensure smooth marquee
                              const marqueeItems = displayBlogs.length > 3 ? displayBlogs : [...displayBlogs, ...displayBlogs, ...displayBlogs];

                              return marqueeItems.map((blog, idx) => (
                                <div 
                                  key={idx}
                                  onClick={() => navigate(`/agent-blog/${agencyId}/${idx % displayBlogs.length}`)}
                                  className="w-[300px] flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex hover:shadow-md transition-all duration-300 group cursor-pointer"
                                >
                                  <div className="w-24 h-28 overflow-hidden flex-shrink-0">
                                    <img
                                      src={getImageUrl(blog.image) || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400&auto=format&fit=crop"}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                      alt="Blog"
                                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400&auto=format&fit=crop"; }}
                                    />
                                  </div>
                                  <div className="p-4 flex flex-col justify-center overflow-hidden">
                                    <h3 className="text-xs font-black text-slate-900 mb-1 truncate group-hover:text-red-600 transition-colors">
                                      {blog.title || "Latest Story"}
                                    </h3>
                                    <p className="text-[10px] text-slate-500 font-medium line-clamp-2 mb-2 whitespace-normal leading-relaxed">
                                      {blog.content?.replace(/<[^>]*>/g, '') || "Explore destinations..."}
                                    </p>
                                    <span className="text-[9px] font-bold text-red-600">Read More →</span>
                                  </div>
                                </div>
                              ));
                            })()}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                          <FaNewspaper className="mx-auto text-gray-300 text-5xl mb-4" />
                          <p className="text-gray-500 font-medium">No blog posts available yet.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "testimonials" && (
                    <div className="space-y-8">
                      <h2 className="text-2xl font-bold mb-6 text-[#261F43] flex items-center">
                        <FaUsers className="mr-3 text-blue-500" />
                        Traveler Experiences
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Combined Testimonials and Dashboard Reviews */}
                        {[...(agent.testimonials || []), ...(agent.reviewsList || [])].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)).map((t, i) => (
                          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-50 bg-slate-100 flex-shrink-0">
                                <img 
                                  src={getImageUrl(t.profile || t.image || Facelessphoto)} 
                                  className="w-full h-full object-cover" 
                                  alt={t.name}
                                  onError={(e) => e.target.src = Facelessphoto}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-slate-900 truncate">{t.name || "Happy Traveler"}</h4>
                                <div className="flex items-center gap-2">
                                  <div className="flex text-yellow-400 text-[10px]">
                                    {[...Array(5)].map((_, idx) => (
                                      <FaStar key={idx} className={idx < (t.rating || 5) ? "fill-current" : "text-gray-200"} />
                                    ))}
                                  </div>
                                  <span className="text-[10px] text-slate-400 font-medium">
                                    {t.date ? new Date(t.date).toLocaleDateString() : 'Verified Review'}
                                  </span>
                                </div>
                              </div>
                              <FaQuoteLeft className="text-blue-100" size={24} />
                            </div>
                            
                            <p className="text-slate-600 italic leading-relaxed mb-4 flex-1">
                              "{t.text || t.comment || "Great experience with this agent! Highly recommended for all travelers."}"
                            </p>
                            
                            {t.image && !t.image.includes('avatar') && (
                              <div className="rounded-xl overflow-hidden h-44 w-full mt-auto group/img relative">
                                <img 
                                  src={getImageUrl(t.image)} 
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" 
                                  alt="Travel memory" 
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover/img:bg-transparent transition-all" />
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {(!agent.testimonials?.length && !agent.reviewsList?.length) && (
                          <div className="md:col-span-2 text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-100">
                             <FaUsers className="mx-auto text-slate-200 text-5xl mb-4" />
                             <p className="text-slate-400 font-medium">No traveler experiences shared yet.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === "terms" && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6 text-[#261F43] flex items-center">
                        <FaShieldAlt className="mr-3 text-[#E69233]" />
                        Terms & Conditions
                      </h2>
                      <div className="space-y-4">
                        {agent.terms.map((term, i) => (
                          <div key={i} className="flex items-start bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="bg-[#E69233] text-white rounded-full w-6 h-6 flex items-center justify-center mr-4 flex-shrink-0 text-sm font-bold">
                              {i + 1}
                            </div>
                            <span className="text-gray-700 leading-relaxed">{term}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "cancellation" && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6 text-[#261F43] flex items-center">
                        <FaTimes className="mr-3 text-red-500" />
                        Cancellation Policy
                      </h2>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-800 font-medium">Please read the cancellation terms carefully before booking.</p>
                      </div>
                      <div className="space-y-4">
                        {agent.cancellation.map((policy, i) => (
                          <div key={i} className="flex items-start bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <FaTimes className="text-red-500 mr-4 mt-1 flex-shrink-0" />
                            <span className="text-gray-700 leading-relaxed">{policy}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "paymentModes" && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6 text-[#261F43] flex items-center">
                        <FaCreditCard className="mr-3 text-[#E69233]" />
                        Payment Options
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {agent.paymentModes.map((mode, i) => (
                          <div
                            key={i}
                            className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg text-center border border-gray-200 hover:shadow-md transition-shadow"
                          >
                            <FaCreditCard className="text-[#E69233] text-2xl mx-auto mb-3" />
                            <div className="text-[#261F43] font-semibold">{mode}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Agent Contact Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="text-center mb-6">
                    <img
                      src={getImageUrl(agent.photo)}
                      alt={agent.company}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-4 ring-orange-100"
                    />
                    <h3 className="text-xl font-bold text-[#261F43] mb-1">{agent.company || `${agent.firstName} ${agent.lastName}`}</h3>
                    <p className="text-[#E69233] font-medium">Travel Expert</p>
                  </div>

                  <div className="space-y-4">
                    <a
                      href={`tel:${agent.phone}`}
                      className="flex items-center justify-center bg-[#E69233] text-white p-3 rounded-lg hover:bg-[#d77e27] transition-colors group"
                    >
                      <FaPhone className="mr-3 group-hover:animate-pulse" />
                      <span className="font-medium">Call: {agent.phone}</span>
                    </a>

                    <a
                      href={`mailto:${agent.email}`}
                      className="flex items-center justify-center bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors group"
                    >
                      <FaEnvelope className="mr-3 group-hover:animate-pulse" />
                      <span className="font-medium">Email Us</span>
                    </a>

                    {agent.whatsapp && (
                      <a
                        href={`https://wa.me/${agent.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors group"
                      >
                        <FaWhatsapp className="mr-3 group-hover:animate-pulse" />
                        <span className="font-medium">WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <h4 className="font-bold text-[#261F43] mb-4 text-center">Ready to Book?</h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => alert(`Quote requested for ${agent.company || agent.firstName}`)}
                      className="w-full bg-gradient-to-r from-[#E69233] to-[#d77e27] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                    >
                      Get Free Quote
                    </button>
                    <button
                      onClick={() => navigate("/contact")}
                      className="w-full border-2 border-[#E69233] text-[#E69233] py-3 rounded-lg font-semibold hover:bg-[#E69233] hover:text-white transition-all"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
                  <h4 className="font-bold text-[#261F43] mb-4 text-center">Why Choose Us?</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-blue-700">
                      <FaShieldAlt className="mr-3 text-blue-500" />
                      <span>Secure & Safe Booking</span>
                    </div>
                    <div className="flex items-center text-blue-700">
                      <FaUsers className="mr-3 text-blue-500" />
                      <span>Expert Travel Guidance</span>
                    </div>
                    <div className="flex items-center text-blue-700">
                      <FaStar className="mr-3 text-yellow-500" />
                      <span>5-Star Customer Service</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default AgentDetailPage;
