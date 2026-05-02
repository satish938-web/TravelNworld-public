import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import FallbackImage from "../assets/images/heroFallback.png";

// Country codes for phone input (kept from original file)
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
  { code: "+86", label: "CHN" },
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

const API_BASE = import.meta.env.VITE_API_BASE || "";

/**
 * VideoBackground component – displays a dynamic hero video carousel fetched from the backend.
 * If the backend returns no videos or fails, a static fallback video is shown.
 */
const VideoBackground = ({ children }) => {
  const [videos, setVideos] = useState([]); // [{_id, url, title, order, ...}]
  const [currentIdx, setCurrentIdx] = useState(0);
  const videoRef = useRef(null);

  // ---------------------------------------------------------------------
  // 1️⃣ Load up to 4 active hero videos from the public endpoint
  // ---------------------------------------------------------------------
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/hero-videos?page=Home`);
        if (Array.isArray(data?.data) && data.data.length) {
          const sorted = data.data.sort((a, b) => a.order - b.order);
          setVideos(sorted.slice(0, 10)); // allow more than 4 if returned
        }
      } catch (err) {
        console.error(" Failed to load hero videos:", err);
        // Keep videos empty → fallback video will be used
      }
    };
    fetchVideos();
  }, []);

  // ---------------------------------------------------------------------
  // 2️⃣ When a video ends, go to the next one (loop)
  // ---------------------------------------------------------------------
  const handleEnded = () => {
    if (videos.length) setCurrentIdx((prev) => (prev + 1) % videos.length);
  };

  // ---------------------------------------------------------------------
  // 3️⃣ Reload & play video whenever the index changes
  // ---------------------------------------------------------------------
  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.load();
      vid.play().catch(() => {});
    }
  }, [currentIdx, videos]);

  const currentVideo = videos[currentIdx];

  // ---------------------------------------------------------------------
  // 4️⃣ Form state (unchanged from original file)
  // ---------------------------------------------------------------------
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You may replace this with a real API call later
    alert("Submitted! Your request has been submitted.");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* ------------------- Video (dynamic or fallback) ------------------- */}
      {currentVideo ? (
        <video
          ref={videoRef}
          key={currentVideo._id}
          autoPlay
          muted
          playsInline
          onEnded={handleEnded}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={currentVideo.url} type="video/mp4" />
        </video>
      ) : (
        <img
          src={FallbackImage}
          alt="Hero Fallback"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Dots navigation if we have >1 video */}
      {videos.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {videos.map((_v, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`w-2.5 h-2.5 rounded-full transition ${i === currentIdx ? "bg-white scale-125" : "bg-white/40"}`}
              aria-label={`Switch to video ${i + 1}`}
            />
          ))}
        </div>
      )}
 
      {/* ------------------- Hero content (text + form) ------------------- */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center lg:justify-between h-full px-6 md:px-10 gap-10">
        {/* Left side text */}
        <div className="text-white max-w-lg text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 drop-shadow-lg">Let&apos;s Explore Goa</h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-200 font-medium drop-shadow-md">
            Enjoy the beaches, nightlife, and culture of Goa with our exclusive travel packages.
          </p>
        </div>
 
        {/* Right side form */}
        <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl w-full max-w-sm border border-white/20">
          <h2 className="text-lg font-black mb-4 text-slate-900 uppercase tracking-tight">Tell us your requirements!</h2>
          <div className="grid grid-cols-1 gap-3">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm"
            />
            <input
              type="text"
              name="company_name"
              placeholder="Company Name"
              value={formData.company_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm"
            />
            {/* Phone + Country Code */}
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-red-500 transition-all bg-white">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="px-3 py-2 border-r border-slate-100 text-xs font-bold focus:outline-none bg-slate-50"
              >
                {countryCodes.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 15);
                  setFormData({ ...formData, phone: value });
                }}
                required
                className="flex-1 px-4 py-2 text-sm focus:outline-none"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm"
            />
            <input
              type="text"
              name="location"
              placeholder="Your Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm"
            />
            <textarea
              name="your_requirements"
              placeholder="Your Travel Requirements"
              value={formData.your_requirements}
              onChange={handleChange}
              required
              rows="2"
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm resize-none"
            />
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mt-1 accent-red-600"
                required
              />
              <span className="text-[10px] text-slate-500 font-medium leading-tight">I agree to receive communications via Email/SMS.</span>
            </label>
            <button
              type="submit"
              className="w-full bg-premium-gradient text-white py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl shadow-red-200 active:scale-95"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>

      {/* Any extra children passed to the component */}
      {children}
    </div>
  );
};

export default VideoBackground;
