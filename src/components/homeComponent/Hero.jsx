import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EnquiryForm from "../../forms/EnquiryForm.jsx";
import FallbackImage from "../../assets/images/heroFallback.png";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
   PARTICLE FIELD – pure CSS-driven dots
───────────────────────────────────────────── */
const Particles = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {[...Array(28)].map((_, i) => (
      <span
        key={i}
        style={{
          position: "absolute",
          width: i % 4 === 0 ? 3 : 2,
          height: i % 4 === 0 ? 3 : 2,
          borderRadius: "50%",
          background: i % 5 === 0 ? "#dc2626" : i % 7 === 0 ? "#2563eb" : "rgba(255,255,255,0.25)",
          left: `${(i * 37 + 7) % 100}%`,
          top: `${(i * 53 + 11) % 100}%`,
          animation: `floatDot ${4 + (i % 5)}s ease-in-out ${(i * 0.3) % 3}s infinite alternate`,
        }}
      />
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   SCAN LINE OVERLAY
───────────────────────────────────────────── */
const ScanLines = () => (
  <div
    className="absolute inset-0 pointer-events-none z-10"
    style={{
      backgroundImage:
        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)",
    }}
  />
);

/* ─────────────────────────────────────────────
   ANIMATED NOISE GRAIN
───────────────────────────────────────────── */
const Grain = () => (
  <div
    className="absolute inset-0 pointer-events-none z-10 opacity-[0.04]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: "180px 180px",
      animation: "grainShift 0.4s steps(1) infinite",
    }}
  />
);

/* ─────────────────────────────────────────────
   RED GLOW ORBS
───────────────────────────────────────────── */
const GlowOrbs = () => (
  <>
    <div
      className="absolute pointer-events-none"
      style={{
        width: 700,
        height: 700,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(220,38,38,0.22) 0%, transparent 70%)",
        top: "-15%",
        left: "-10%",
        filter: "blur(40px)",
        animation: "orbPulse 6s ease-in-out infinite alternate",
      }}
    />
    <div
      className="absolute pointer-events-none"
      style={{
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
        bottom: "0%",
        right: "20%",
        filter: "blur(60px)",
        animation: "orbPulse 8s ease-in-out 2s infinite alternate",
      }}
    />
  </>
);

/* ─────────────────────────────────────────────
   DIAGONAL ACCENT BARS
───────────────────────────────────────────── */
const DiagonalBars = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.07]">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          width: 2,
          height: "200%",
          background: "linear-gradient(to bottom, transparent, #dc2626, transparent)",
          left: `${15 + i * 18}%`,
          top: "-50%",
          transform: "rotate(15deg)",
          animation: `barSlide ${6 + i}s linear ${i * 0.7}s infinite`,
        }}
      />
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   COUNTER ANIMATION
───────────────────────────────────────────── */
const CountUp = ({ to, suffix = "" }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = to / 60;
    const t = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(t); }
      else setVal(Math.floor(start));
    }, 25);
    return () => clearInterval(t);
  }, [to]);
  return <>{val}{suffix}</>;
};

/* ─────────────────────────────────────────────
   HERO COMPONENT
───────────────────────────────────────────── */
const Hero = () => {
  const [heroVideos, setHeroVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchHeroVideos = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5000";
        const response = await fetch(`${apiBase}/api/hero-videos?page=Home`);
        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            const sortedVideos = data.data
              .filter((v) => v.isActive !== false)
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((v) => ({ ...v, id: v._id || v.id }));
            setHeroVideos(sortedVideos);
          } else {
            setHeroVideos([]);
          }
        }
      } catch {
        setHeroVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroVideos();
  }, []);

  const handleVideoEnd = () => {
    if (heroVideos.length > 1) {
      setCurrentVideoIndex((p) => (p + 1) % heroVideos.length);
    } else if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleVideoError = (e) => {
    console.error("Hero video error:", e);
    if (heroVideos.length > 1) handleVideoEnd();
  };

  // Ensure video plays when index changes
  useEffect(() => {
    setIsReady(false); // Reset ready state for new video
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentVideoIndex]);

  const currentVideo = heroVideos[currentVideoIndex];
  const nextVideo = heroVideos.length > 1 ? heroVideos[(currentVideoIndex + 1) % heroVideos.length] : null;

  const statItems = [
    { value: 500, suffix: "+", label: "Destinations" },
    { value: 12, suffix: "K+", label: "Happy Travelers" },
    { value: 15, suffix: "yr", label: "Experience" },
  ];

  const charVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -90 },
    visible: (i) => ({
      opacity: 1, y: 0, rotateX: 0,
      transition: { delay: 0.6 + i * 0.07, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    }),
  };

  const headline1 = "Experience".split("");
  const headline2 = "The".split("");

  return (
    <>
      {/* ── Keyframe injector ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,700;1,900&display=swap');

        @keyframes floatDot {
          from { transform: translateY(0px) scale(1); opacity: 0.5; }
          to   { transform: translateY(-18px) scale(1.4); opacity: 1; }
        }
        @keyframes grainShift {
          0%  { transform: translate(0, 0); }
          25% { transform: translate(-3%, -3%); }
          50% { transform: translate(3%, 1%); }
          75% { transform: translate(-1%, 3%); }
        }
        @keyframes orbPulse {
          from { transform: scale(1) translate(0,0); opacity:0.7; }
          to   { transform: scale(1.12) translate(2%, 2%); opacity:1; }
        }
        @keyframes barSlide {
          from { transform: rotate(15deg) translateY(-100%); }
          to   { transform: rotate(15deg) translateY(50%); }
        }
        @keyframes redLineBlink {
          0%,100% { opacity:1; }
          50%     { opacity:0; }
        }
        @keyframes shimmerBorder {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>

      <div className="w-full relative font-['Barlow',sans-serif]">
        <div
          className="relative w-full overflow-hidden bg-black"
          style={{ minHeight: "calc(100vh - 80px)", height: "calc(100vh - 40px)" }}
        >
          {/* ── Atmospheric layers ── */}
          <GlowOrbs />
          <DiagonalBars />
          <Particles />
          <ScanLines />
          <Grain />

          {/* ── Video ── */}
          <AnimatePresence>
            {currentVideo ? (
              <motion.video
                key={currentVideo.id || currentVideoIndex}
                ref={videoRef}
                src={currentVideo.url}
                autoPlay
                muted
                playsInline
                preload="auto"
                loop={heroVideos.length === 1}
                onEnded={handleVideoEnd}
                onError={handleVideoError}
                onPlaying={() => setIsReady(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: isReady ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute w-full h-full object-cover"
              />
            ) : (
              <motion.img
                key="fallback"
                src={FallbackImage}
                alt="Hero Fallback"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute w-full h-full object-cover"
              />
            )}
          </AnimatePresence>

          {/* Hidden preload for next video */}
          {nextVideo && (
            <video
              key={`preload-${nextVideo.id}`}
              src={nextVideo.url}
              preload="auto"
              muted
              style={{ display: "none" }}
            />
          )}

          {/* ── Multi-stop gradient overlay ── */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(105deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.10) 80%, transparent 100%)",
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-40 z-10"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
            }}
          />

          {/* ── Main content ── */}
          <div className="relative z-20 flex flex-col md:flex-row items-center justify-between h-full px-6 md:px-16 max-w-[1800px] mx-auto gap-8">

            {/* LEFT */}
            <div className="text-white max-w-4xl text-center md:text-left flex-1">

              {/* Kicker */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="flex items-center gap-3 mb-8 justify-center md:justify-start"
              >
                <div className="flex gap-[3px]">
                  {[...Array(3)].map((_, i) => (
                    <span
                      key={i}
                      style={{
                        display: "block",
                        width: i === 1 ? 20 : 8,
                        height: 3,
                        borderRadius: 99,
                        background: i === 1 ? "#2563eb" : "#dc2626",
                        animation: `redLineBlink ${1.2 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
                <span
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.45em",
                    textTransform: "uppercase",
                    color: "#ff4444",
                    textShadow: "0 0 20px rgba(220,38,38,0.8)",
                  }}
                >
                  Elite Travel Experience
                </span>
              </motion.div>

              {/* Headline */}
              <h1
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "clamp(50px, 8vw, 80px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.15em",
                  fontWeight: 900,
                }}
              >
                <div className="overflow-hidden flex justify-center md:justify-start flex-wrap">
                  {headline1.map((ch, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={charVariants}
                      initial="hidden"
                      animate="visible"
                      style={{ display: "inline-block" }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </div>
                <div className="overflow-hidden flex justify-center md:justify-start flex-wrap gap-x-4">
                  {headline2.map((ch, i) => (
                    <motion.span
                      key={i}
                      custom={i + headline1.length}
                      variants={charVariants}
                      initial="hidden"
                      animate="visible"
                      style={{ display: "inline-block" }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                    <motion.span
                      custom={headline1.length + headline2.length + 1}
                      variants={charVariants}
                      initial="hidden"
                      animate="visible"
                      style={{
                        display: "inline-block",
                        fontStyle: "italic",
                        background: "linear-gradient(to bottom, #dc2626, #2563eb)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "0 0 40px rgba(37,99,235,0.3)",
                      }}
                    >
                      Unseen.
                    </motion.span>
                </div>
              </h1>

              {/* Body copy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(14px, 1.5vw, 18px)",
                  color: "rgba(255,255,255,0.65)",
                  maxWidth: 460,
                  lineHeight: 1.7,
                  marginTop: "1.2rem",
                }}
              >
                Bespoke journeys curated for the{" "}
                <span style={{ color: "#fff", fontWeight: 700 }}>modern explorer.</span>{" "}
                Where luxury meets legend — and every mile becomes a memory.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.7 }}
                className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start"
              >
                {/* Primary */}
                <button
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    padding: "14px 36px",
                    borderRadius: 999,
                    background: "linear-gradient(135deg, #dc2626, #000000)",
                    color: "#fff",
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 0 30px rgba(220,38,38,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 0 60px rgba(220,38,38,0.8), inset 0 1px 0 rgba(255,255,255,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 0 30px rgba(220,38,38,0.5), inset 0 1px 0 rgba(255,255,255,0.15)";
                  }}
                  onClick={() => navigate("/packages")}
                >
                  <span style={{ position: "relative", zIndex: 1 }}>Explore Packages</span>
                  {/* Shimmer */}
                  <span
                    style={{
                      position: "absolute",
                      top: 0, left: "-100%",
                      width: "60%", height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      transform: "skewX(-20deg)",
                      animation: "shimmerBorder 2.4s linear infinite",
                    }}
                  />
                </button>

                {/* Ghost */}
                <button
                  style={{
                    padding: "14px 36px",
                    borderRadius: 999,
                    background: "transparent",
                    color: "#fff",
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    border: "1px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(8px)",
                    cursor: "pointer",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                    e.currentTarget.style.transform = "scale(1.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  Our Story
                </button>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.8 }}
                className="mt-12 flex gap-8 justify-center md:justify-start"
              >
                {statItems.map(({ value, suffix, label }, i) => (
                  <div key={i} className="text-center md:text-left">
                    <div
                      style={{
                        fontFamily: "'Bebas Neue', cursive",
                        fontSize: 36,
                        color: "#fff",
                        lineHeight: 1,
                        textShadow: "0 0 20px rgba(220,38,38,0.4)",
                      }}
                    >
                      <CountUp to={value} suffix={suffix} />
                    </div>
                    <div
                      style={{
                        fontFamily: "'Barlow', sans-serif",
                        fontWeight: 400,
                        fontSize: 10,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.4)",
                        marginTop: 2,
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT – form card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden md:block flex-shrink-0 w-full max-w-[300px] lg:max-w-[320px]"
            >
              {/* Animated border */}
              <div
                style={{
                  padding: 2,
                  borderRadius: "2.5rem",
                  background: "linear-gradient(135deg, rgba(220,38,38,0.8), rgba(255,255,255,0.06), rgba(220,38,38,0.5))",
                  backgroundSize: "300% 300%",
                  animation: "shimmerBorder 3s linear infinite",
                }}
              >
                <div
                  style={{
                    background: "rgba(0,0,0,0.55)",
                    backdropFilter: "blur(28px)",
                    WebkitBackdropFilter: "blur(28px)",
                    borderRadius: "calc(2.5rem - 2px)",
                    padding: "0.75rem",
                    boxShadow: "0 0 80px rgba(220,38,38,0.12), 0 40px 80px rgba(0,0,0,0.5)",
                  }}
                >
                  {/* Card header */}
                  <div style={{ marginBottom: "0.5rem", textAlign: "center" }}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background: "rgba(220,38,38,0.12)",
                        border: "1px solid rgba(220,38,38,0.3)",
                        borderRadius: 999,
                        padding: "5px 12px",
                      }}
                    >
                      <span
                        style={{
                          width: 6, height: 6, borderRadius: "50%",
                          background: "#dc2626",
                          boxShadow: "0 0 6px #dc2626",
                          animation: "redLineBlink 1.5s ease-in-out infinite",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'Barlow', sans-serif",
                          fontWeight: 700,
                          fontSize: 10,
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                          color: "#ff6666",
                        }}
                      >
                        Plan Your Journey
                      </span>
                    </div>
                  </div>

                  <EnquiryForm variant="transparent" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Video dots ── */}
          {heroVideos.length > 1 && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
              {heroVideos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideoIndex(index)}
                  style={{
                    height: 4,
                    width: index === currentVideoIndex ? 28 : 8,
                    borderRadius: 999,
                    background: index === currentVideoIndex ? "#dc2626" : "rgba(255,255,255,0.3)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    boxShadow: index === currentVideoIndex ? "0 0 12px rgba(220,38,38,0.8)" : "none",
                  }}
                  aria-label={`Video ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* ── Scroll indicator ── */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
          >
            <div
              style={{
                position: "relative",
                width: 22,
                height: 38,
                border: "2px solid rgba(255,255,255,0.2)",
                borderRadius: 999,
                display: "flex",
                justifyContent: "center",
                padding: 5,
              }}
            >
              {/* Pulse rings */}
              {[...Array(2)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    position: "absolute",
                    inset: -4,
                    borderRadius: 999,
                    border: "1px solid rgba(220,38,38,0.4)",
                    animation: `pulseRing 2s ease-out ${i * 0.7}s infinite`,
                  }}
                />
              ))}
              <div
                style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: "#dc2626",
                  boxShadow: "0 0 8px rgba(220,38,38,0.9)",
                  alignSelf: "flex-start",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 700,
                fontSize: 9,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Scroll
            </span>
          </motion.div>

          {/* ── Bottom animated gradient line ── */}
          <div
            className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden"
            style={{
              height: 4,
              background: "linear-gradient(90deg, #dc2626, #2563eb, #000000, #dc2626)",
              backgroundSize: "300% 100%",
              animation: "shimmerBorder 4s linear infinite",
              boxShadow: "0 0 15px rgba(220,38,38,0.5)",
            }}
          />
        </div>

        {/* ── Mobile form ── */}
        <div className="md:hidden px-4 py-10 bg-black">
          <div
            style={{
              background: "rgba(20,20,20,0.95)",
              border: "1px solid rgba(220,38,38,0.25)",
              borderRadius: "1.75rem",
              padding: "1.75rem",
              marginTop: "-3rem",
              position: "relative",
              zIndex: 30,
              boxShadow: "0 0 60px rgba(220,38,38,0.1)",
            }}
          >
            <EnquiryForm variant="solid" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;