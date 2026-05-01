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
      <div className="relative z-10 flex items-center justify-between h-full px-10">
        {/* Left side text */}
        <div className="text-white max-w-lg">
          <h1 className="text-5xl font-bold mb-4">Let&apos;s Explore Goa</h1>
          <p className="text-lg text-gray-200">
            Enjoy the beaches, nightlife, and culture of Goa with our exclusive travel packages.
          </p>
        </div>

        {/* Right side form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-[25%] max-w-md">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Tell us what you&apos;re looking for!</h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-2 py-1 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="company_name"
              placeholder="Company Name"
              value={formData.company_name}
              onChange={handleChange}
              required
              className="w-full px-2 py-1 border border-gray-300 rounded"
            />
            {/* Phone + Country Code */}
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="px-2 py-1 border-r border-gray-300 text-sm focus:outline-none bg-white"
              >
                {countryCodes.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.code} {item.label}
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
                className="flex-1 px-2 py-1 text-sm focus:outline-none"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-2 py-1 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-2 py-1 border border-gray-300 rounded"
            />
            <textarea
              name="your_requirements"
              placeholder="Your Requirements"
              value={formData.your_requirements}
              onChange={handleChange}
              required
              className="w-full px-2 py-1 border border-gray-300 rounded"
            />
            <label className="flex items-center">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mr-2"
                required
              />
              I agree to get all Email/SMS from you.
            </label>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition"
            >
              Submit
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
