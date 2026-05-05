import React, { useState } from "react";
import toast from "react-hot-toast";
import { API_BASE } from "../utils/api";

const countryCodes = [
  { code: "+91", label: "IND" },
  { code: "+1", label: "USA" },
  { code: "+44", label: "UK" },
  { code: "+61", label: "AUS" },
  { code: "+81", label: "JPN" },
  { code: "+971", label: "UAE" },
  { code: "+49", label: "GER" },
  { code: "+33", label: "FRA" },
  { code: "+39", label: "ITA" },
  { code: "+8 China", label: "CHN" },
  { code: "+7", label: "RUS" },
  { code: "+82", label: "KOR" },
  { code: "+65", label: "SGP" },
  { code: "+60", label: "MYS" },
  { code: "+66", label: "THA" },
  { code: "+880", label: "BGD" },
  { code: "+92", label: "PAK" },
  { code: "+20", label: "EGY" },
  { code: "+27", label: "ZAF" },
  { code: "+234", label: "NGA" },
  { code: "+351", label: "PRT" },
  { code: "+34", label: "ESP" },
  { code: "+41", label: "CHE" },
  { code: "+46", label: "SWE" },
  { code: "+358", label: "FIN" },
  { code: "+47", label: "NOR" },
  { code: "+90", label: "TUR" },
  { code: "+55", label: "BRA" },
  { code: "+52", label: "MEX" },
  { code: "+62", label: "IDN" },
];

/* ── Shared input style factory ── */
const inputClass = (variant) =>
  variant === "transparent"
    ? {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 8,
      color: "#fff",
      padding: "6px 12px",
      fontSize: 13,
      width: "100%",
      outline: "none",
      fontFamily: "'Barlow', sans-serif",
      transition: "border-color 0.2s, background 0.2s",
    }
    : {
      background: "#f9fafb",
      border: "1px solid #e5e7eb",
      borderRadius: 8,
      color: "#111",
      padding: "7px 12px",
      fontSize: 13,
      width: "100%",
      outline: "none",
      fontFamily: "'Barlow', sans-serif",
      transition: "border-color 0.2s",
    };

const EnquiryForm = ({ variant = "transparent" }) => {
  const [formData, setFormData] = useState({
    name: "",
    company_name: "",
    phone: "",
    countryCode: "+91",
    email: "",
    location: "",
    your_requirements: "",
    agree: false,
  });
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 12);
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadToast = toast.loading("Submitting enquiry...");
    try {
      const response = await fetch(`${API_BASE}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("Enquiry submitted successfully!", { id: loadToast });
        setFormData({ name: "", company_name: "", phone: "", countryCode: "+91", email: "", location: "", your_requirements: "", agree: false });
      } else {
        toast.error(result.message || "Something went wrong. Please try again.", { id: loadToast });
      }
    } catch {
      toast.error("Network Error: Unable to connect to the server.", { id: loadToast });
    }
  };

  const isTransparent = variant === "transparent";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');
        .enq-input::placeholder { color: rgba(255,255,255,0.6); }
        .enq-input-solid::placeholder { color: #6b7280; }
        .enq-input:focus { border-color: rgba(220,38,38,0.6) !important; background: rgba(220,38,38,0.06) !important; }
        .enq-input-solid:focus { border-color: #dc2626 !important; background: #fff5f5 !important; }
        .enq-select option { background: #1a1a1a; color: #fff; }
        .enq-submit-btn {
          position: relative; overflow: hidden; cursor: pointer; border: none;
          background: linear-gradient(135deg, #dc2626 0%, #000000 100%);
          color: #fff; border-radius: 8px; padding: 10px 0; width: 100%;
          font-family: 'Barlow', sans-serif; font-weight: 800; font-size: 12px;
          letter-spacing: 0.35em; text-transform: uppercase;
          box-shadow: 0 4px 24px rgba(220,38,38,0.45);
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .enq-submit-btn::after {
          content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: skewX(-20deg); animation: enquiryShimmer 2.2s linear infinite;
        }
        .enq-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4); }
        @keyframes enquiryShimmer { from { left: -100%; } to { left: 160%; } }
        .enq-field-label {
          font-family: 'Barlow', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 2px;
        }
      `}</style>

      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 340 }}>

        {/* Title */}
        <div style={{ marginBottom: 8 }}>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: isTransparent ? "rgba(255,255,255,0.45)" : "#9ca3af",
              marginBottom: 4,
            }}
          >
            Get a free consultation
          </p>
          <h3
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: 24,
              color: isTransparent ? "#fff" : "#111",
              letterSpacing: "0.04em",
              lineHeight: 1,
              marginBottom: 0,
            }}
          >
            Join with us as a member
          </h3>
          <div
            style={{
              width: 30, height: 2,
              background: "linear-gradient(90deg, #dc2626, transparent)",
              borderRadius: 99, marginTop: 8,
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {/* Name */}
          <div>
            <p className="enq-field-label" style={{ color: isTransparent ? "rgba(255,255,255,0.8)" : "#6b7280" }}>Your Name</p>
            <input
              type="text" name="name" placeholder="e.g. Name   "
              value={formData.name} onChange={handleChange} required
              className={isTransparent ? "enq-input" : "enq-input-solid"}
              style={inputClass(variant)}
              onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
            />
          </div>

          {/* Company */}
          <div>
            <p className="enq-field-label" style={{ color: isTransparent ? "rgba(255,255,255,0.8)" : "#6b7280" }}>Company Name</p>
            <input
              type="text" name="company_name" placeholder="Your Agency / Company"
              value={formData.company_name} onChange={handleChange} required
              className={isTransparent ? "enq-input" : "enq-input-solid"}
              style={inputClass(variant)}
            />
          </div>

          {/* Phone */}
          <div>
            <p className="enq-field-label" style={{ color: isTransparent ? "rgba(255,255,255,0.8)" : "#6b7280" }}>Mobile Number</p>
            <div style={{ display: "flex", gap: 6 }}>
              <select
                name="countryCode" value={formData.countryCode} onChange={handleChange}
                className={`enq-select ${isTransparent ? "enq-input" : "enq-input-solid"}`}
                style={{ ...inputClass(variant), width: 66, flexShrink: 0, padding: "5px 6px", cursor: "pointer" }}
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>{c.code}</option>
                ))}
              </select>
              <input
                type="tel" name="phone" placeholder="9876543210"
                value={formData.phone} onChange={handlePhoneChange} required
                inputMode="numeric" maxLength={12}
                className={isTransparent ? "enq-input" : "enq-input-solid"}
                style={{ ...inputClass(variant), flex: 1 }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <p className="enq-field-label" style={{ color: isTransparent ? "rgba(255,255,255,0.8)" : "#6b7280" }}>Email Address</p>
            <input
              type="email" name="email" placeholder="you@example.com"
              value={formData.email} onChange={handleChange} required
              className={isTransparent ? "enq-input" : "enq-input-solid"}
              style={inputClass(variant)}
            />
          </div>

          {/* Destination + Pax row */}
          <div>
            <p className="enq-field-label" style={{ color: isTransparent ? "rgba(255,255,255,0.8)" : "#6b7280" }}>Destination / Location</p>
            <input
              type="text" name="location" placeholder="e.g. Bali, Maldives, Europe..."
              value={formData.location} onChange={handleChange} required
              className={isTransparent ? "enq-input" : "enq-input-solid"}
              style={inputClass(variant)}
            />
          </div>

          {/* Requirements */}
          <div>
            <p className="enq-field-label" style={{ color: isTransparent ? "rgba(255,255,255,0.8)" : "#6b7280" }}>Your Requirements</p>
            <textarea
              name="your_requirements" placeholder="Budget, duration, special requests..."
              value={formData.your_requirements} onChange={handleChange} rows={2}
              className={isTransparent ? "enq-input" : "enq-input-solid"}
              style={{ ...inputClass(variant), resize: "none", padding: "5px 10px", lineHeight: 1.3 }}
            />
          </div>

          {/* Checkbox */}
          <label
            style={{
              display: "flex", alignItems: "flex-start", gap: 8, cursor: "pointer",
              fontFamily: "'Barlow', sans-serif", fontSize: 11,
              color: isTransparent ? "rgba(255,255,255,0.7)" : "#6b7280",
              lineHeight: 1.35,
            }}
          >
            <input
              type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} required
              style={{
                width: 15, height: 15, marginTop: 1, accentColor: "#dc2626", flexShrink: 0,
              }}
            />
            <span>I agree to receive travel updates, offers & communication via email/SMS.</span>
          </label>

          {/* Submit */}
          <button type="submit" className="enq-submit-btn" style={{ marginTop: 0 }}>
            <span style={{ position: "relative", zIndex: 1 }}>✈ Submit Enquiry</span>
          </button>

          {/* Trust badges */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 2 }}>
            {["🔒 Secure", "⚡ Fast Reply", "🌟 Trusted"].map((badge) => (
              <span
                key={badge}
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 11, fontWeight: 600,
                  color: isTransparent ? "rgba(255,255,255,0.35)" : "#9ca3af",
                  letterSpacing: "0.05em",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </form>
    </>
  );
};

export default EnquiryForm;
