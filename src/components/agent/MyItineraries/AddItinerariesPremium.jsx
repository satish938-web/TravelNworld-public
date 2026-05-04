import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  HiOutlineViewBoards, HiOutlineGlobe, HiOutlineLocationMarker,
  HiOutlineCalendar, HiOutlineTag, HiOutlinePhotograph, HiOutlineMap,
  HiOutlinePlus, HiOutlineDocumentText, HiOutlineCreditCard,
  HiOutlineShieldCheck, HiOutlineCheckCircle, HiOutlineBan,
  HiOutlineOfficeBuilding, HiOutlineCurrencyRupee, HiOutlineEye,
  HiOutlineTrash, HiChevronDown, HiChevronUp, HiUsers,
} from "react-icons/hi";
import MediaUploader from "../MyAccount/MediaUploader";
import { getS3Path } from "../../../utils/pathUtils";
import { API_BASE } from "../../../utils/api";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

/* ─── Constants ─────────────────────────────────────────────────────────── */
const DURATION_OPTIONS = [
  "1 Night / 2 Days", "2 Nights / 3 Days", "3 Nights / 4 Days",
  "4 Nights / 5 Days", "5 Nights / 6 Days", "6 Nights / 7 Days",
  "7 Nights / 8 Days", "10 Nights / 11 Days", "14 Nights / 15 Days",
];
const THEMES = [
  "Family", "Honeymoon", "Adventures", "Solo", "Wildlife", "Beach",
  "Pilgrimage", "Hill Station", "Heritage Tour", "Ayurveda Tour",
  "Cultural Tour", "Luxury Tour", "Budget Tour", "Family Tour",
  "Bachelor Tour", "Women Group", "Special Interest",
];
const CLASSIFICATIONS = ["Trending", "Exclusive", "Weekend", "Top Selling"];
const TYPE_OPTIONS    = ["Flexible", "Fixed", "Group", "Customizable"];
const VISIBILITY_OPTIONS = ["Public", "Private", "Draft"];
const DEFAULT_CANCELLATION = "";

/* ─── Global Styles ──────────────────────────────────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

    .ai-premium-container *, .ai-premium-container *::before, .ai-premium-container *::after {
      font-family: 'Poppins', sans-serif;
      box-sizing: border-box;
    }

    .ai-fade-in { animation: aiFadeUp .35s ease both; }

    @keyframes aiFadeUp {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: none; }
    }

    .ai-input {
      width: 100%;
      padding: 10px 14px;
      border-radius: 10px;
      border: 1.5px solid #e5e7eb;
      background: #fafafa;
      font-size: 14px;
      font-weight: 500;
      color: #111827;
      outline: none;
      transition: border-color .15s, box-shadow .15s;
    }
    .ai-input::placeholder { color: #9ca3af; font-weight: 400; }
    .ai-input:focus {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239,68,68,.12);
    }

    .ai-section {
      background: white;
      border-radius: 20px;
      border: 1px solid #e5e7eb;
      box-shadow: 0 1px 4px rgba(0,0,0,.04);
      overflow: hidden;
      transition: box-shadow .2s;
    }
    .ai-section:hover { box-shadow: 0 4px 20px rgba(0,0,0,.07); }

    .ai-section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 28px;
      border-bottom: 1px solid #f3f4f6;
      background: #fafafa;
    }

    .ai-day-card { animation: aiFadeUp .25s ease both; }

    .ai-progress-bar {
      height: 4px;
      border-radius: 999px;
      background: rgba(255,255,255,.15);
      overflow: hidden;
    }
    .ai-progress-fill {
      height: 100%;
      border-radius: 999px;
      background: linear-gradient(90deg, #fca5a5, #f87171);
      transition: width .5s ease;
    }
  `}</style>
);

const FieldLabel = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-1.5 mb-2">
    {Icon && <Icon style={{ color: "#9ca3af", fontSize: 14 }} />}
    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9ca3af", margin: 0 }}>
      {children}
    </p>
  </div>
);

const Alert = ({ type, msg, onClose }) => {
  const s = type === "error"
    ? { bg: "#fff1f2", border: "#fecdd3", color: "#be123c" }
    : { bg: "#f0fdf4", border: "#bbf7d0", color: "#15803d" };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, fontSize: 13, fontWeight: 500, marginBottom: 16, background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
      <span>{type === "error" ? "⚠" : "✓"}</span>
      <span style={{ flex: 1 }}>{msg}</span>
      {onClose && <button onClick={onClose} style={{ opacity: 0.5, fontSize: 18, lineHeight: 1, background: "none", border: "none", cursor: "pointer", color: "inherit" }}>×</button>}
    </div>
  );
};

const PillToggle = ({ options, value, onChange }) => (
  <div style={{ display: "flex", gap: 6, padding: 4, borderRadius: 12, background: "#f3f4f6", width: "fit-content" }}>
    {options.map(opt => (
      <button
        key={opt} type="button"
        onClick={() => onChange(opt)}
        style={{
          padding: "7px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600,
          border: "none", cursor: "pointer", transition: "all .15s",
          background: value === opt ? "#dc2626" : "transparent",
          color:      value === opt ? "white" : "#9ca3af",
          boxShadow:  value === opt ? "0 4px 12px rgba(220, 38, 38, 0.2)" : "none",
        }}
      >
        {opt}
      </button>
    ))}
  </div>
);

const RedCheck = ({ label, checked, onChange }) => (
  <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", userSelect: "none" }}>
    <span
      onClick={onChange}
      style={{
        width: 18, height: 18, borderRadius: 5, border: `2px solid ${checked ? "#ef4444" : "#d1d5db"}`,
        background: checked ? "#ef4444" : "white", display: "flex", alignItems: "center",
        justifyContent: "center", flexShrink: 0, transition: "all .15s",
      }}
    >
      {checked && (
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
    <span style={{ fontSize: 13, fontWeight: 500, color: checked ? "#dc2626" : "#374151", textTransform: "capitalize" }}>
      {label}
    </span>
  </label>
);

const Section = ({ icon: Icon, title, step, children, collapsible = false }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="ai-section">
      <div
        className="ai-section-header"
        style={{ cursor: collapsible ? "pointer" : "default" }}
        onClick={() => collapsible && setOpen(o => !o)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {step && (
            <span style={{
              width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0,
              background: "linear-gradient(135deg,#991b1b,#ef4444)", color: "white",
            }}>
              {step}
            </span>
          )}
          {Icon && <Icon style={{ color: "#6b7280", fontSize: 18 }} />}
          <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#111827" }}>{title}</h2>
        </div>
        {collapsible && (
          <span style={{ color: "#9ca3af", fontSize: 18 }}>
            {open ? <HiChevronUp /> : <HiChevronDown />}
          </span>
        )}
      </div>
      {(!collapsible || open) && (
        <div style={{ padding: "24px 28px" }}>{children}</div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, color }) => (
  <div style={{ background: "white", borderRadius: 16, border: "1px solid #f3f4f6", padding: "16px 20px", boxShadow: "0 1px 4px rgba(0,0,0,.04)" }}>
    <p style={{ margin: "0 0 4px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color }}>{label}</p>
    <p style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#111827" }}>{value}</p>
  </div>
);

const AddItinerariesPremium = ({ onSubmit, initialData = null, isModal = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const context = useOutletContext() || {};
  const { refreshItineraries } = context;
  const [isEditMode, setIsEditMode] = useState(Boolean(initialData?.slug || id));

  const [domesticDestinations,       setDomesticDestinations]       = useState([]);
  const [internationalDestinations,  setInternationalDestinations]  = useState([]);
  const [destinationsLoading,        setDestinationsLoading]        = useState(false);
  const [destinationsError,          setDestinationsError]          = useState("");

  const [title,              setTitle]              = useState(initialData?.title || "");
  const [travelType,         setTravelType]         = useState(initialData?.type ? (initialData.type === "domestic" ? "Domestic" : "International") : "Domestic");
  const [destination,        setDestination]        = useState(initialData?.destination || "");
  const [duration,           setDuration]           = useState(initialData?.duration || "");
  const [themes,             setThemes]             = useState(initialData?.themes || []);
  const [classification,     setClassification]     = useState(initialData?.classification || []);
  const [packageType,        setPackageType]        = useState(initialData?.packageType || "Flexible");
  const [visibility,         setVisibility]         = useState(initialData?.visibility || "Public");
  const [destinationDetail,  setDestinationDetail]  = useState(initialData?.destinationDetail || "");
  const [mediaUrls,          setMediaUrls]          = useState(initialData?.gallery || []);
  const [days,               setDays]               = useState((initialData?.dayPlans || []).map((d, i) => ({ id: Date.now() + i, ...d })));
  const [dayForm,            setDayForm]            = useState({ title: "", day: (initialData?.dayPlans?.length || 0) + 1, locationDetail: "" });
  const [inclusions,         setInclusions]         = useState(Array.isArray(initialData?.inclusions) ? initialData.inclusions.join(", ") : (initialData?.inclusions || ""));
  const [exclusions,         setExclusions]         = useState(Array.isArray(initialData?.exclusions) ? initialData.exclusions.join(", ") : (initialData?.exclusions || ""));
  const [asPerCategory,      setAsPerCategory]      = useState(initialData?.asPerCategory || false);
  const [asBestQuote,        setAsBestQuote]        = useState(initialData?.asBestQuote || false);
  const [standardPrice,      setStandardPrice]      = useState(initialData?.priceFrom || "");
  const [discountedPrice,    setDiscountedPrice]    = useState(initialData?.discountedPrice || "");
  const [termsConditions,    setTermsConditions]    = useState(initialData?.termsConditions || "");
  const [paymentMode,        setPaymentMode]        = useState(initialData?.paymentMode || "");
  const [cancellationPolicy, setCancellationPolicy] = useState(initialData?.cancellationPolicy || DEFAULT_CANCELLATION);

  const [agentName, setAgentName] = useState("agent");
  const [agentId, setAgentId] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError,   setSubmitError]   = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const [activePolicyTab, setActivePolicyTab] = useState("Inclusions");

  const getAuthToken = useCallback(() => {
    return localStorage.getItem("token");
  }, []);

  const fetchProfile = useCallback(async () => {
    try {
      const token = getAuthToken();
      if (!token) return;
      const res = await axios.get(`${API_BASE}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.user) {
        const u = res.data.user;
        setAgentName(u.company || `${u.firstName} ${u.lastName}` || "agent");
        setAgentId(u._id || u.id || "");
      }
    } catch (err) {
      console.error("Error fetching profile", err);
    }
  }, [getAuthToken]);

  const fetchDestinations = useCallback(async () => {
    try {
      setDestinationsLoading(true);
      const token = getAuthToken();
      const headers = { Authorization: `Bearer ${token}` };
      const [domRes, intRes] = await Promise.all([
        axios.get(`${API_BASE}/api/destinations/type/domestic`,      { headers }),
        axios.get(`${API_BASE}/api/destinations/type/international`, { headers }),
      ]);
      setDomesticDestinations(domRes.data.data      || []);
      setInternationalDestinations(intRes.data.data || []);
    } catch (err) {
      setDestinationsError("Could not load destinations.");
    } finally {
      setDestinationsLoading(false);
    }
  }, [getAuthToken]);

  const fetchItineraryForEdit = useCallback(async () => {
    if (!id) return;
    try {
      const token = getAuthToken();
      const res = await axios.get(`${API_BASE}/api/agent-itineraries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data.data;
      if (data) {
        setTitle(data.title || "");
        setTravelType(data.type === "domestic" ? "Domestic" : "International");
        setDestination(data.destination || "");
        setDuration(data.duration || "");
        setThemes(data.themes || []);
        setClassification(data.classification || []);
        setPackageType(data.packageType || "Flexible");
        setVisibility(data.visibility || "Public");
        setDestinationDetail(data.destinationDetail || "");
        setMediaUrls(data.gallery || []);
        setDays((data.dayPlans || []).map((d, i) => ({ id: Date.now() + i, ...d })));
        setInclusions(Array.isArray(data.inclusions) ? data.inclusions.join(", ") : (data.inclusions || ""));
        setExclusions(Array.isArray(data.exclusions) ? data.exclusions.join(", ") : (data.exclusions || ""));
        setAsPerCategory(data.asPerCategory || false);
        setAsBestQuote(data.asBestQuote || false);
        setStandardPrice(data.priceFrom || "");
        setDiscountedPrice(data.discountedPrice || "");
        setTermsConditions(data.termsConditions || "");
        setPaymentMode(data.paymentMode || "");
        setCancellationPolicy(data.cancellationPolicy || DEFAULT_CANCELLATION);
        setIsEditMode(true);
      }
    } catch (err) {
      console.error("Error fetching itinerary for edit", err);
      setSubmitError("Failed to load itinerary for editing.");
    }
  }, [id, getAuthToken]);

  useEffect(() => {
    fetchProfile();
    fetchDestinations();
    if (id) fetchItineraryForEdit();
  }, [fetchProfile, fetchDestinations, fetchItineraryForEdit, id]);

  const handleTravelTypeChange = (type) => {
    setTravelType(type);
    setDestination("");
  };

  const toggle = (setter, arr, val) =>
    setter(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);

  const handleAddDay = () => {
    if (!dayForm.title.trim()) return;
    setDays(prev => [...prev, { id: Date.now(), ...dayForm }]);
    setDayForm(prev => ({ title: "", day: prev.day + 1, locationDetail: "" }));
  };

  const handleDeleteDay = (id) => setDays(prev => prev.filter(d => d.id !== id));

  const handleSubmit = async () => {
    if (!title.trim())  { setSubmitError("Itinerary title is required.");  return; }
    if (!destination)   { setSubmitError("Please select a destination."); return; }
    if (!duration)      { setSubmitError("Please select a duration.");    return; }

    const token = getAuthToken();
    if (!token) { setSubmitError("Please log in."); return; }

    const payload = {
      title:             title.trim(),
      travelType,
      destination,
      duration,
      themes,
      classification,
      packageType,
      visibility,
      destinationDetail,
      mediaUrls,
      days: days.map(({ id: _id, ...rest }) => rest),
      inclusions,
      exclusions,
      asPerCategory,
      asBestQuote,
      standardPrice:    asBestQuote ? 0 : Number(standardPrice)    || 0,
      discountedPrice:  asBestQuote ? 0 : Number(discountedPrice)  || 0,
      termsConditions,
      paymentMode,
      cancellationPolicy,
      agentId: agentId || undefined,
    };

    try {
      setSubmitLoading(true);
      setSubmitError("");

      let response;
      if (isEditMode) {
        const idOrSlug = id || initialData?._id || initialData?.id || initialData?.slug;
        const editEndpoint = `${API_BASE}/api/agent-itineraries/${idOrSlug}`;
        response = await axios.put(editEndpoint, payload, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        setSubmitSuccess("Itinerary updated successfully!");
      } else {
        const createEndpoint = `${API_BASE}/api/agent-itineraries`;
        response = await axios.post(createEndpoint, payload, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        setSubmitSuccess("Itinerary created successfully! It is now live.");
        // Reset form
        setTitle(""); setDestination(""); setDuration(""); setThemes([]);
        setClassification([]); setPackageType("Flexible"); setVisibility("Public");
        setDestinationDetail(""); setMediaUrls([]); setDays([]);
        setDayForm({ title: "", day: 1, locationDetail: "" });
        setInclusions(""); setExclusions(""); setAsPerCategory(false);
        setAsBestQuote(false); setStandardPrice(""); setDiscountedPrice("");
        setTermsConditions(""); setPaymentMode(""); setCancellationPolicy(DEFAULT_CANCELLATION);
      }

      if (onSubmit) onSubmit(response.data.data);
      if (refreshItineraries) refreshItineraries();
      setTimeout(() => setSubmitSuccess(""), 4000);
    } catch (err) {
      setSubmitError(err.response?.data?.message || (isEditMode ? "Failed to update itinerary." : "Failed to create itinerary."));
    } finally {
      setSubmitLoading(false);
    }
  };

  const activeDestinations = travelType === "Domestic" ? domesticDestinations : internationalDestinations;
  const completedSections = [!!title && !!destination && !!duration, !!destinationDetail, days.length > 0, !!inclusions, asBestQuote || !!standardPrice].filter(Boolean).length;

  return (
    <div className="ai-premium-container">
      <GlobalStyle />
      <div className="ai-fade-in" style={{ minHeight: isModal ? "auto" : "100vh", background: isModal ? "transparent" : "#f4f4f5", paddingBottom: 40 }}>
        <div style={{ maxWidth: 896, margin: "0 auto", padding: "40px 16px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 16 }}>
            <StatCard label="Domestic" value={domesticDestinations.length} color="#2563eb" />
            <StatCard label="International" value={internationalDestinations.length} color="#d97706" />
            <StatCard label="Days Planned" value={days.length} color="#16a34a" />
            <StatCard label="Sections Done" value={completedSections} color="#dc2626" />
          </div>

          {submitError && <Alert type="error" msg={submitError} onClose={() => setSubmitError("")} />}
          {submitSuccess && <Alert type="success" msg={submitSuccess} />}

          <Section icon={HiOutlineViewBoards} title="Core Details" step="1">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <FieldLabel icon={HiOutlineViewBoards}>Itinerary Title *</FieldLabel>
                <input type="text" className="ai-input" placeholder="e.g. Enchanting Goa Escape" value={title} onChange={e => setTitle(e.target.value)} />
              </div>

              <div>
                <FieldLabel icon={HiOutlineGlobe}>Travel Type</FieldLabel>
                <PillToggle options={["Domestic", "International"]} value={travelType} onChange={handleTravelTypeChange} />
              </div>
              <div>
                <FieldLabel icon={HiOutlineLocationMarker}>Destination *</FieldLabel>
                <select className="ai-input" value={destination} onChange={e => setDestination(e.target.value)}>
                  <option value="">— Select —</option>
                  {activeDestinations.map(d => <option key={d._id} value={d.name}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <FieldLabel icon={HiOutlineCalendar}>Duration *</FieldLabel>
                <select className="ai-input" value={duration} onChange={e => setDuration(e.target.value)}>
                  <option value="">— Select —</option>
                  {DURATION_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
          </Section>

          <Section icon={HiOutlineDocumentText} title="Destination Details" step="2" collapsible>
            <textarea className="ai-input" rows={5} placeholder="Describe the destination..." value={destinationDetail} onChange={e => setDestinationDetail(e.target.value)} />
          </Section>

          <Section icon={HiOutlinePhotograph} title="Media" step="3" collapsible>
            {!destination ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderRadius: 12, background: "#fff7ed", border: "1px solid #fde68a", color: "#92400e", fontSize: 13 }}>
                <span>ℹ️</span> Select a destination first to enable media upload.
              </div>
            ) : (
              <MediaUploader
                label="Package Cover & Gallery"
                existingUrls={mediaUrls}
                onChange={(urls) => setMediaUrls(urls)}
                maxFiles={15}
                folder={getS3Path.itinerary(agentName, title)}
              />
            )}
          </Section>

          <Section icon={HiOutlineMap} title="Day-wise Plan" step="4">
            {days.map(d => (
              <div key={d.id} className="ai-day-card" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: 16, borderRadius: 14, background: "#fff5f5", border: "1px solid #fecaca", marginBottom: 10 }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ width: 30, height: 30, borderRadius: 8, background: "#dc2626", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>{d.day}</span>
                  <div><p style={{ margin: 0, fontWeight: "bold", color: "#991b1b" }}>{d.title}</p><p style={{ margin: 0, fontSize: 12, color: "#666" }}>{d.locationDetail}</p></div>
                </div>
                <button onClick={() => handleDeleteDay(d.id)} style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}><HiOutlineTrash size={18} /></button>
              </div>
            ))}
            <div style={{ padding: 20, borderRadius: 14, border: "1.5px dashed #e5e7eb", background: "#fafafa" }}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, marginBottom: 14 }}>
                <input type="text" className="ai-input" placeholder="Day Title" value={dayForm.title} onChange={e => setDayForm(p => ({ ...p, title: e.target.value }))} />
                <input type="number" className="ai-input" value={dayForm.day} onChange={e => setDayForm(p => ({ ...p, day: Number(e.target.value) }))} />
              </div>
              <textarea className="ai-input" rows={3} placeholder="Activities..." value={dayForm.locationDetail} onChange={e => setDayForm(p => ({ ...p, locationDetail: e.target.value }))} />
              <button onClick={handleAddDay} style={{ marginTop: 12, padding: "10px 24px", background: "#dc2626", color: "white", border: "none", borderRadius: 10, fontWeight: 600, cursor: "pointer" }}>Add Day Plan</button>
            </div>
          </Section>

          <Section icon={HiOutlineCurrencyRupee} title="Pricing" step="5">
            <RedCheck label="Price as per best quote" checked={asBestQuote} onChange={() => setAsBestQuote(p => !p)} />
            {!asBestQuote && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 15 }}>
                <div>
                  <FieldLabel icon={HiOutlineCurrencyRupee}>Standard Price (₹)</FieldLabel>
                  <input type="number" className="ai-input" placeholder="0.00" value={standardPrice} onChange={e => setStandardPrice(e.target.value)} />
                  <p style={{ fontSize: 10, color: "#9ca3af", marginTop: 4 }}>Original price before discount.</p>
                </div>
                <div>
                  <FieldLabel icon={HiOutlineTag}>Discounted Price (₹)</FieldLabel>
                  <input type="number" className="ai-input" placeholder="0.00" value={discountedPrice} onChange={e => setDiscountedPrice(e.target.value)} />
                  <p style={{ fontSize: 10, color: "#9ca3af", marginTop: 4 }}>Final price for the customer.</p>
                </div>
              </div>
            )}
          </Section>

          <Section icon={HiOutlineDocumentText} title="Inclusions & Exclusions" step="6">
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <button
                type="button"
                onClick={() => setActivePolicyTab("Inclusions")}
                style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12,
                  fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all .2s",
                  background: activePolicyTab === "Inclusions" ? "#dc2626" : "white",
                  color: activePolicyTab === "Inclusions" ? "white" : "#64748b",
                  border: `1.5px solid ${activePolicyTab === "Inclusions" ? "#dc2626" : "#e2e8f0"}`,
                  boxShadow: activePolicyTab === "Inclusions" ? "0 4px 12px rgba(220, 38, 38, 0.2)" : "none"
                }}
              >
                <HiOutlineCheckCircle size={18} /> Inclusions
              </button>
              <button
                type="button"
                onClick={() => setActivePolicyTab("Exclusions")}
                style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12,
                  fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all .2s",
                  background: activePolicyTab === "Exclusions" ? "#dc2626" : "white",
                  color: activePolicyTab === "Exclusions" ? "white" : "#64748b",
                  border: `1.5px solid ${activePolicyTab === "Exclusions" ? "#dc2626" : "#e2e8f0"}`,
                  boxShadow: activePolicyTab === "Exclusions" ? "0 4px 12px rgba(220, 38, 38, 0.2)" : "none"
                }}
              >
                <HiOutlineBan size={18} /> Exclusions
              </button>
            </div>

            <div className="ai-fade-in" key={activePolicyTab}>
              <FieldLabel icon={activePolicyTab === "Inclusions" ? HiOutlineCheckCircle : HiOutlineBan}>
                {activePolicyTab} Details
              </FieldLabel>
              <textarea
                className="ai-input"
                rows={6}
                placeholder={`Enter ${activePolicyTab.toLowerCase()} separated by commas or new lines...`}
                value={activePolicyTab === "Inclusions" ? inclusions : exclusions}
                onChange={e => activePolicyTab === "Inclusions" ? setInclusions(e.target.value) : setExclusions(e.target.value)}
              />
            </div>
          </Section>

          <Section icon={HiOutlineShieldCheck} title="Policies & Terms" step="7" collapsible>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <FieldLabel icon={HiOutlineDocumentText}>Terms & Conditions</FieldLabel>
                <textarea className="ai-input" rows={4} placeholder="Enter terms and conditions..." value={termsConditions} onChange={e => setTermsConditions(e.target.value)} />
              </div>
              <div>
                <FieldLabel icon={HiOutlineCreditCard}>Payment Mode</FieldLabel>
                <textarea className="ai-input" rows={3} placeholder="Enter payment instructions..." value={paymentMode} onChange={e => setPaymentMode(e.target.value)} />
              </div>
              <div>
                <FieldLabel icon={HiOutlineBan}>Cancellation Policy</FieldLabel>
                <textarea className="ai-input" rows={5} placeholder="Enter cancellation policy..." value={cancellationPolicy} onChange={e => setCancellationPolicy(e.target.value)} />
              </div>
            </div>
          </Section>

          <button
            onClick={handleSubmit}
            disabled={submitLoading}
            style={{ 
              padding: "18px", 
              background: "linear-gradient(135deg, #dc2626, #991b1b)", 
              color: "white", 
              border: "none", 
              borderRadius: 15, 
              fontSize: 16, 
              fontWeight: 800, 
              cursor: "pointer", 
              boxShadow: "0 10px 25px rgba(220, 38, 38, 0.3)",
              transition: "transform 0.2s"
            }}
            onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseOut={e => e.currentTarget.style.transform = "none"}
          >
            {submitLoading ? (isEditMode ? "Updating Itinerary..." : "Publishing Itinerary...") : (isEditMode ? "Update Itinerary Now" : "Publish Itinerary Now")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItinerariesPremium;
