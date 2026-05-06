/**
 * ItineraryDetailPage
 *
 * Full detail view for a single itinerary fetched from the backend by slug.
 * Shared by both domestic and international routes:
 *
 *   /domestic-itinerary/:destinationId/:itineraryId   (itineraryId = slug)
 *   /international-itinerary-detail/:destinationId/:itineraryId
 *
 * Sections shown via tabs:
 *   Overview · Day-wise Plan · Inclusions · Exclusions ·
 *   Terms & Conditions · Cancellation Policy · Payment Mode
 *
 * Back button → navigates to Home ("/") so user never gets stuck in history.
 *
 * API: GET /api/itineraries/:slug   (returns { data: Itinerary })
 */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { getJson, getImageUrl } from "../../utils/api";
import transportData from "../../data/transportData";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheck,
  FaTimes,
  FaShieldAlt,
  FaCreditCard,
  FaTag,
  FaClock,
  FaRupeeSign,
} from "react-icons/fa";

/* ══════════════════════════════════════════════════════════════════════════ */
/*  HELPERS                                                                   */
/* ══════════════════════════════════════════════════════════════════════════ */

/** Convert a URL slug to a readable title ("goa-beach" → "Goa Beach"). */
function slugToTitle(slug = "") {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  SUB-COMPONENTS                                                            */
/* ══════════════════════════════════════════════════════════════════════════ */

/* ── Loading skeleton ───────────────────────────────────────────────────── */
const LoadingSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-pulse">
    <div className="h-6 w-40 bg-gray-200 rounded mb-8" />
    <div className="h-10 w-3/4 bg-gray-200 rounded mb-6" />
    <div className="grid md:grid-cols-5 gap-6 mb-8">
      <div className="md:col-span-3 h-80 bg-gray-200 rounded-2xl" />
      <div className="md:col-span-2 h-80 bg-gray-200 rounded-2xl" />
    </div>
    <div className="flex gap-3 mb-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-10 w-28 bg-gray-200 rounded-lg" />
      ))}
    </div>
    <div className="h-48 bg-gray-200 rounded-2xl" />
  </div>
);

/* ── Tab Button ─────────────────────────────────────────────────────────── */
const TabBtn = ({ tab, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
      active
        ? "bg-premium-gradient text-white shadow-md shadow-red-200"
        : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
    }`}
  >
    <tab.icon className="text-xs" />
    {tab.label}
  </button>
);

/* ── Day Card ───────────────────────────────────────────────────────────── */
const DayCard = ({ day, index }) => (
  <div className="flex gap-4 group">
    {/* Step indicator */}
    <div className="flex flex-col items-center">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
        style={{ background: "linear-gradient(135deg,#991b1b,#ef4444)" }}
      >
        {day.day || index + 1}
      </div>
      <div className="w-0.5 flex-1 bg-red-100 mt-2" />
    </div>
    {/* Content */}
    <div className="pb-6 flex-1">
      <h3 className="font-bold text-gray-800 text-base mb-1">
        {day.title || `Day ${day.day || index + 1}`}
      </h3>
      {day.locationDetail && (
        <p className="text-gray-600 text-sm leading-relaxed">{day.locationDetail}</p>
      )}
      {/* Legacy field support */}
      {!day.locationDetail && day.description && (
        <p className="text-gray-600 text-sm leading-relaxed">{day.description}</p>
      )}
    </div>
  </div>
);

/* ── List Section ───────────────────────────────────────────────────────── */
const ListSection = ({ items, icon: Icon, emptyText, iconColor }) => (
  <ul className="space-y-3">
    {items && items.length > 0 ? (
      items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <Icon className={`mt-0.5 flex-shrink-0 text-base ${iconColor}`} />
          <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
        </li>
      ))
    ) : (
      <li className="text-gray-400 text-sm italic">{emptyText}</li>
    )}
  </ul>
);

/* ── Policy Section ─────────────────────────────────────────────────────── */
const PolicySection = ({ text, emptyText }) => (
  <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
    {text || <span className="italic text-gray-400">{emptyText}</span>}
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                                            */
/* ══════════════════════════════════════════════════════════════════════════ */

const ItineraryDetailPage = () => {
  const { destinationId, itineraryId } = useParams();
  const navigate  = useNavigate();
  const location  = useLocation();

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading]     = useState(true);
  const [notFound, setNotFound]   = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  /* ── Lead Form State ────────────────────────────────────────────────── */
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [submittingLead, setSubmittingLead] = useState(false);
  const [leadInfo, setLeadInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setSubmittingLead(true);
    try {
      const { default: axios } = await import("axios");
      const { default: Swal } = await import("sweetalert2");
      const { API_BASE } = await import("../../utils/api");

      const payload = {
        name: leadInfo.name,
        email: leadInfo.email,
        phone: leadInfo.phone,
        your_requirements: leadInfo.message,
        agentId: itinerary.agentId,
        itineraryId: itinerary._id,
        itineraryTitle: itinerary.title,
        location: itinerary.destination || destinationLabel,
        company_name: "Customer Lead", // Placeholder
        agree: true
      };

      await axios.post(`${API_BASE}/api/enquiries`, payload);
      
      Swal.fire({
        icon: 'success',
        title: 'Enquiry Sent!',
        text: 'The travel agent will contact you shortly.',
        confirmButtonColor: '#dc2626',
        timer: 3000
      });
      
      setShowLeadForm(false);
      setLeadInfo({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to send enquiry. Please try again.");
    } finally {
      setSubmittingLead(false);
    }
  };

  const destinationLabel = slugToTitle(destinationId);

  /**
   * Determine the "Back" URL from the current route path:
   *   /domestic-itinerary/:dest/:slug          → /domestic-itinerary/:dest
   *   /international-itinerary-detail/:dest/:slug → /international-itinerary/:dest
   * Falls back to "/" if neither pattern matches.
   */
  const backUrl = (() => {
    const path = location.pathname;
    if (path.startsWith("/domestic-itinerary")) {
      return `/domestic-itinerary/${destinationId}`;
    }
    if (path.startsWith("/international-itinerary-detail")) {
      return `/international-itinerary/${destinationId}`;
    }
    return "/";
  })();

  /* ── Fetch itinerary by slug ────────────────────────────────────────── */

  // Helper: build a static itinerary object from transportData
  const buildStaticItinerary = (itineraryId) => {
    const allStaticPkgs = transportData.flatMap(agent =>
      (agent.tourPackages || []).map(p => ({ ...p, agentTitle: agent.title }))
    );
    const staticPkg = allStaticPkgs.find(p => p.slug === itineraryId);
    if (!staticPkg) return null;
    return {
      title: staticPkg.destination,
      shortDescription: staticPkg.description,
      priceFrom: parseInt(staticPkg.price?.replace(/\D/g, "") || "0"),
      destinationDetail: `Explore the beautiful destination of ${staticPkg.destination} with ${staticPkg.agentTitle}.`,
      type: "domestic",
      agentTitle: staticPkg.agentTitle,
      dayPlans: [],
      inclusions: ["Guided Sightseeing", "Comfortable Transport"],
      exclusions: ["Personal Expenses", "Entry Tickets"],
      termsConditions: "Subject to availability and weather conditions.",
      paymentMode: "Pay via Bank Transfer or UPI.",
      cancellationPolicy: "Non-refundable within 48 hours of travel."
    };
  };

  useEffect(() => {
    if (!itineraryId) { setNotFound(true); setLoading(false); return; }

    setLoading(true);
    setNotFound(false);

    const tryAgentItineraries = () =>
      getJson(`/api/agent-itineraries/${itineraryId}`)
        .then(res => {
          const doc = res?.data ?? res;
          return (doc && doc.title) ? doc : null;
        })
        .catch(() => null);


    // 1. Try global itineraries first
    getJson(`/api/itineraries/${itineraryId}`)
      .then(async (res) => {
        const doc = res?.data ?? res;
        if (doc && doc.title) {
          setItinerary(doc);
          return;
        }
        // 2. Try agent-itineraries by slug
        const agentDoc = await tryAgentItineraries();
        if (agentDoc && agentDoc.title) {
          setItinerary(agentDoc);
          return;
        }
        // 3. Fallback to static data
        const staticItinerary = buildStaticItinerary(itineraryId);
        if (staticItinerary) {
          setItinerary(staticItinerary);
        } else {
          setNotFound(true);
        }
      })
      .catch(async () => {
        // 2. Try agent-itineraries by slug
        const agentDoc = await tryAgentItineraries();
        if (agentDoc && agentDoc.title) {
          setItinerary(agentDoc);
          return;
        }
        // 3. Fallback to static data
        const staticItinerary = buildStaticItinerary(itineraryId);
        if (staticItinerary) {
          setItinerary(staticItinerary);
        } else {
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  }, [itineraryId]);

  /* ── Tab definitions (only show tabs with content) ──────────────────── */
  const TABS = [
    { id: "overview",      label: "Overview",    icon: FaMapMarkerAlt },
    { id: "itinerary",     label: "Day Plan",     icon: FaCalendarAlt },
    { id: "inclusions",    label: "Inclusions",   icon: FaCheck },
    { id: "exclusions",    label: "Exclusions",   icon: FaTimes },
    { id: "terms",         label: "Terms",        icon: FaShieldAlt },
    { id: "cancellation",  label: "Cancellation", icon: FaShieldAlt },
    { id: "payment",       label: "Payment",      icon: FaCreditCard },
  ];

  /* ── Loading ────────────────────────────────────────────────────────── */
  if (loading) return <LoadingSkeleton />;

  /* ── Not found ──────────────────────────────────────────────────────── */
  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Itinerary Not Found
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            This itinerary doesn't exist or may have been removed.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2.5 bg-premium-gradient text-white font-semibold rounded-xl hover:bg-black transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  /* ── Main render ────────────────────────────────────────────────────── */
  const isInternational = itinerary.type === "international";
  const accentColor     = isInternational ? "#b8690a" : "#1e3799";

  return (
    <div className="min-h-screen bg-gray-50 pb-16">

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <div
        className="relative h-64 sm:h-80 md:h-96 overflow-hidden"
      >
      {/* Cover image — falls back to first gallery image, then gradient */}
        {(() => {
          const heroSrc = itinerary.coverImageUrl || itinerary.gallery?.[0];
          return heroSrc ? (
            <img
              src={getImageUrl(heroSrc)}
              alt={itinerary.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{ background: `linear-gradient(135deg, ${accentColor}, #111)` }}
            />
          );
        })()}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Navigation buttons — Back to itinerary list + Home */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <button
            onClick={() => navigate(backUrl)}
            className="flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-semibold bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg transition"
          >
            <FaArrowLeft className="text-xs" />
            Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-semibold bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg transition"
          >
            🏠 Home
          </button>
        </div>

        {/* Classification badges */}
        {itinerary.classification?.length > 0 && (
          <div className="absolute top-4 right-4 flex flex-wrap gap-1.5 justify-end">
            {itinerary.classification.map((tag) => (
              <span
                key={tag}
                className="bg-premium-gradient text-white text-xs font-bold px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title block at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 pb-5">
          <p className="text-red-300 text-xs font-bold uppercase tracking-widest mb-1">
            {isInternational ? "✈️ International" : "🇮🇳 Domestic"} · {destinationLabel}
          </p>
          <h1 className="text-white text-2xl sm:text-3xl font-extrabold leading-tight line-clamp-2">
            {itinerary.title}
          </h1>
        </div>
      </div>

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Meta bar ──────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-4 mb-8">
          {itinerary.duration && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm">
              <FaClock className="text-red-500 text-xs" />
              {itinerary.duration}
            </div>
          )}
          {!itinerary.asBestQuote && itinerary.priceFrom > 0 && (
            <div className="flex items-center gap-1 text-sm font-bold text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5 shadow-sm">
              <FaRupeeSign className="text-xs" />
              {itinerary.priceFrom.toLocaleString("en-IN")}
              <span className="font-normal text-gray-500 ml-1">/ person</span>
            </div>
          )}
          {itinerary.asBestQuote && (
            <div className="flex items-center gap-1.5 text-sm font-semibold text-orange-600 bg-orange-50 border border-orange-200 rounded-lg px-3 py-1.5 shadow-sm">
              Price on Request
            </div>
          )}
          {itinerary.themes?.length > 0 && itinerary.themes.map((t) => (
            <div key={t} className="flex items-center gap-1.5 text-xs text-purple-700 bg-purple-50 border border-purple-200 rounded-lg px-3 py-1.5">
              <FaTag className="text-xs" />
              {t}
            </div>
          ))}
        </div>

        {/* ── CTA Row ───────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() =>
              navigate(
                `/get-a-quote/${itinerary.type}/${destinationId}/${itinerary._id}`
              )
            }
            className="px-6 py-2.5 bg-premium-gradient text-white font-bold rounded-xl shadow-md shadow-red-200 transition-all text-sm"
          >
            Get a Quote
          </button>
          
          <button 
            onClick={() => setShowLeadForm(true)}
            className="px-6 py-2.5 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-xl transition-all text-sm"
          >
            Enquire Now
          </button>
        </div>

        {/* ── Lead Form Modal ────────────────────────────────────────────── */}
        {showLeadForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-slide-up">
              <div className="bg-premium-gradient p-6 text-white relative">
                <button 
                  onClick={() => setShowLeadForm(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition"
                >
                  <FaTimes />
                </button>
                <h3 className="text-xl font-bold">Enquire Now</h3>
                <p className="text-red-100 text-sm mt-1">Interested in {itinerary.title}?</p>
              </div>

              <form onSubmit={handleEnquirySubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Your Name</label>
                    <input 
                      required
                      type="text" 
                      value={leadInfo.name}
                      onChange={(e) => setLeadInfo({...leadInfo, name: e.target.value})}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      value={leadInfo.phone}
                      onChange={(e) => setLeadInfo({...leadInfo, phone: e.target.value})}
                      placeholder="e.g. 9876543210"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                  <input 
                    required
                    type="email" 
                    value={leadInfo.email}
                    onChange={(e) => setLeadInfo({...leadInfo, email: e.target.value})}
                    placeholder="e.g. john@example.com"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Message / Requirements</label>
                  <textarea 
                    rows="3"
                    value={leadInfo.message}
                    onChange={(e) => setLeadInfo({...leadInfo, message: e.target.value})}
                    placeholder="Tell us about your travel plans..."
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition text-sm resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" required id="agree" className="w-4 h-4 accent-red-600" />
                  <label htmlFor="agree" className="text-xs text-gray-500">I agree to the terms and privacy policy.</label>
                </div>

                <button 
                  type="submit"
                  disabled={submittingLead}
                  className="w-full py-3 bg-premium-gradient text-white font-bold rounded-xl shadow-lg shadow-red-200 hover:shadow-red-300 transform active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submittingLead ? "Submitting..." : "Send Enquiry"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ── Tabs ──────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-6 pb-2 border-b border-gray-200 overflow-x-auto">
          {TABS.map((tab) => (
            <TabBtn
              key={tab.id}
              tab={tab}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>

        {/* ── Tab Content ───────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 min-h-[200px]">

          {/* Overview */}
          {activeTab === "overview" && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">About this Trip</h2>
              {itinerary.destinationDetail ? (
                <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                  {itinerary.destinationDetail}
                </p>
              ) : itinerary.shortDescription ? (
                <p className="text-gray-700 leading-relaxed text-sm">
                  {itinerary.shortDescription}
                </p>
              ) : (
                <p className="text-gray-400 italic text-sm">
                  No description available for this itinerary.
                </p>
              )}

              {/* Gallery */}
              {itinerary.gallery?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                    Gallery
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {itinerary.gallery.map((url, i) => (
                      <img
                        key={i}
                        src={getImageUrl(url)}
                        alt={`Gallery ${i + 1}`}
                        className="w-full h-32 object-cover rounded-xl"
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Day Plan */}
          {activeTab === "itinerary" && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-6">Day-wise Plan</h2>
              {itinerary.dayPlans?.length > 0 ? (
                <div>
                  {itinerary.dayPlans.map((day, idx) => (
                    <DayCard key={idx} day={day} index={idx} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic text-sm">
                  No day-wise plan has been added yet.
                </p>
              )}
            </div>
          )}

          {/* Inclusions */}
          {activeTab === "inclusions" && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Inclusions</h2>
              <ListSection
                items={itinerary.inclusions}
                icon={FaCheck}
                iconColor="text-green-500"
                emptyText="No inclusions specified."
              />
            </div>
          )}

          {/* Exclusions */}
          {activeTab === "exclusions" && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Exclusions</h2>
              <ListSection
                items={itinerary.exclusions}
                icon={FaTimes}
                iconColor="text-red-500"
                emptyText="No exclusions specified."
              />
            </div>
          )}

          {/* Terms & Conditions */}
          {activeTab === "terms" && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Terms &amp; Conditions</h2>
              <PolicySection
                text={itinerary.termsConditions}
                emptyText="No terms and conditions specified."
              />
            </div>
          )}

          {/* Cancellation Policy */}
          {activeTab === "cancellation" && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Cancellation Policy</h2>
              <PolicySection
                text={itinerary.cancellationPolicy}
                emptyText="No cancellation policy specified."
              />
            </div>
          )}

          {/* Payment Mode */}
          {activeTab === "payment" && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Mode</h2>
              <PolicySection
                text={itinerary.paymentMode}
                emptyText="No payment information specified."
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ItineraryDetailPage;
