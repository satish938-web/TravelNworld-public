import React, { useState, useEffect, useRef } from "react";
import { Star, PlayCircle, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import axios from "axios";

/* ── Floating background orbs ── */
const Orbs = () => (
  <>
    <div style={{
      position: "absolute", top: "10%", left: "-5%",
      width: 400, height: 400, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)",
      filter: "blur(40px)", pointerEvents: "none",
      animation: "orbDrift 8s ease-in-out infinite alternate",
    }} />
    <div style={{
      position: "absolute", bottom: "5%", right: "-5%",
      width: 500, height: 500, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)",
      filter: "blur(60px)", pointerEvents: "none",
      animation: "orbDrift 11s ease-in-out 2s infinite alternate",
    }} />
  </>
);

const GridBg = () => (
  <div style={{
    position: "absolute", inset: 0, pointerEvents: "none",
    backgroundImage: `
      linear-gradient(rgba(220,38,38,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(220,38,38,0.035) 1px, transparent 1px)
    `,
    backgroundSize: "50px 50px",
  }} />
);

const TestimonialCard = ({ image, name, role, text, stars = 5, type, videoUrl, location }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: 360,
        flexShrink: 0,
        margin: "0 12px",
        background: hovered ? "linear-gradient(145deg, #0f0f0f 0%, #1a0505 100%)" : "#fff",
        borderRadius: "28px",
        padding: "32px",
        boxShadow: hovered
          ? "0 30px 80px rgba(220,38,38,0.2), 0 0 0 1px rgba(220,38,38,0.25)"
          : "0 8px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      <div style={{
        position: "absolute", top: -10, right: 16,
        fontFamily: "'Bebas Neue', cursive",
        fontSize: 140, lineHeight: 1,
        color: hovered ? "rgba(220,38,38,0.12)" : "rgba(220,38,38,0.06)",
        userSelect: "none", pointerEvents: "none",
      }}>"</div>

      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: hovered ? 3 : 0,
        background: "linear-gradient(90deg, #dc2626, #ff6666)",
        borderRadius: "28px 28px 0 0",
        transition: "all 0.3s ease",
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 3 }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < stars ? "#dc2626" : (hovered ? "rgba(255,255,255,0.15)" : "#e5e7eb")} color="transparent" />
          ))}
        </div>
        {type === "video" && (
          <a href={videoUrl} target="_blank" rel="noreferrer" style={{
            background: "linear-gradient(135deg, #dc2626, #7f1d1d)",
            color: "#fff", width: 36, height: 36, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <PlayCircle size={18} />
          </a>
        )}
      </div>

      <div style={{
        width: 36, height: 36,
        background: hovered ? "rgba(220,38,38,0.15)" : "rgba(220,38,38,0.08)",
        borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16,
      }}>
        <Quote size={16} color="#dc2626" />
      </div>

      <p style={{
        fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: 14,
        fontStyle: "italic", lineHeight: 1.8, minHeight: 90, marginBottom: 28,
        color: hovered ? "rgba(255,255,255,0.75)" : "#6b7280",
      }}>
        "{text}"
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <img
          src={image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400"}
          alt={name}
          style={{
            width: 48, height: 48, borderRadius: "50%", objectFit: "cover",
            border: hovered ? "2px solid rgba(220,38,38,0.6)" : "2px solid rgba(220,38,38,0.15)",
          }}
        />
        <div>
          <h3 style={{
            fontFamily: "'Bebas Neue', cursive", fontSize: 17, letterSpacing: "0.08em",
            color: hovered ? "#fff" : "#0a0a0a",
          }}>{name}</h3>
          <p style={{
            fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 9,
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: hovered ? "rgba(220,38,38,0.8)" : "#9ca3af",
          }}>{role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideKey, setSlideKey] = useState(0);

  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const rafRef1 = useRef(null);
  const pauseTimeout = useRef(null);
  
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);
  const activeRef = useRef(null);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5000";
        const res = await axios.get(`${apiBase}/api/testimonials`);
        if (res.data.success) {
          const pub = res.data.data.filter(t => !t.visibility || t.visibility === "Public");
          setTestimonials(pub);
        }
      } catch { /* silent */ }
      finally { setLoading(false); }
    };
    fetch_();
  }, []);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    if (!isMobile || isPaused || !testimonials.length) return;
    const iv = setInterval(() => {
      setCurrentIndex(p => (p + 1) % testimonials.length);
      setSlideKey(k => k + 1);
    }, 5000);
    return () => clearInterval(iv);
  }, [isMobile, isPaused, testimonials.length]);

  useEffect(() => {
    if (isMobile) return;
    const el1 = scrollRef1.current;
    const el2 = scrollRef2.current;
    if (!el1) return;

    const step = () => {
      if (!isPaused && !isDragging.current) {
        if (el1) {
          el1.scrollLeft += 0.8;
          if (el1.scrollLeft >= el1.scrollWidth / 2) el1.scrollLeft = 0;
        }
        if (el2) {
          el2.scrollLeft -= 0.8;
          if (el2.scrollLeft <= 0) el2.scrollLeft = el2.scrollWidth / 2;
        }
      }
      rafRef1.current = requestAnimationFrame(step);
    };
    rafRef1.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef1.current);
  }, [isPaused, isMobile, testimonials.length]);

  const pause = () => { setIsPaused(true); clearTimeout(pauseTimeout.current); };
  const resume = (d = 1200) => { pauseTimeout.current = setTimeout(() => setIsPaused(false), d); };

  const onMD = (e, ref) => { 
    activeRef.current = ref.current;
    isDragging.current = true; 
    startX.current = e.pageX - activeRef.current.offsetLeft; 
    scrollLeftRef.current = activeRef.current.scrollLeft; 
    pause(); 
  };
  const onMU = () => { isDragging.current = false; resume(); };
  const onML = () => { isDragging.current = false; resume(); };
  const onMM = e => { 
    if (!isDragging.current || !activeRef.current) return; 
    e.preventDefault(); 
    activeRef.current.scrollLeft = scrollLeftRef.current - (e.pageX - activeRef.current.offsetLeft - startX.current); 
  };

  const navClick = dir => {
    if (isMobile) {
      setCurrentIndex(p => dir === "next" ? (p + 1) % testimonials.length : (p - 1 + testimonials.length) % testimonials.length);
      setSlideKey(k => k + 1);
      pause(); resume(3000);
    } else {
      const amt = dir === "next" ? 384 : -384; // Card (360) + Margin (12*2)
      if (scrollRef1.current) scrollRef1.current.scrollBy({ left: amt, behavior: "smooth" });
      if (scrollRef2.current) scrollRef2.current.scrollBy({ left: -amt, behavior: "smooth" });
      pause(); resume();
    }
  };

  if (loading || testimonials.length === 0) return null;

  return (
    <section style={{
      width: "100%", padding: "110px 0 100px", background: "#f9f9f9",
      overflow: "hidden", position: "relative",
    }}>
      <style>{`
        @keyframes orbDrift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(3%, 4%) scale(1.1); }
        }
        .nav-btn {
          width: 44px; height: 44px; border-radius: 50%;
          border: 1px solid #e5e7eb; display: flex;
          align-items: center; justify-content: center;
          color: #9ca3af; transition: all 0.3s;
          background: white; cursor: pointer;
        }
        .nav-btn:hover { background: black; color: white; border-color: black; }
      `}</style>
      <GridBg />
      <Orbs />

      <div style={{ maxWidth: 1600, margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>
        {/* Header with Buttons */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: "center", marginBottom: 64, gap: 24 }}>
          <div style={{ textAlign: isMobile ? "center" : "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: isMobile ? "center" : "flex-start", marginBottom: 12 }}>
              <span style={{ height: 3, width: 24, borderRadius: 99, background: "#dc2626" }} />
              <span style={{
                fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 10,
                letterSpacing: "0.45em", textTransform: "uppercase", color: "#dc2626",
              }}>Testimonials</span>
            </div>
            <h2 style={{
              fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(48px, 6vw, 80px)",
              lineHeight: 0.95, color: "#0a0a0a", letterSpacing: "0.01em", margin: 0
            }}>
              What Our <span style={{ color: "#dc2626", fontStyle: "italic" }}>Travelers Say</span>
            </h2>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
             <button className="nav-btn" onClick={() => navClick("prev")}>
               <ChevronLeft size={20} />
             </button>
             <button className="nav-btn" onClick={() => navClick("next")}>
               <ChevronRight size={20} />
             </button>
          </div>
        </div>
      </div>

      {isMobile ? (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 20px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={slideKey}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <TestimonialCard {...testimonials[currentIndex]} text={testimonials[currentIndex].content} />
              </div>
            </motion.div>
          </AnimatePresence>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrentIndex(i); setSlideKey(k => k + 1); pause(); resume(3000); }}
                style={{
                  width: i === currentIndex ? 24 : 8, height: 4, borderRadius: 99,
                  background: i === currentIndex ? "#dc2626" : "#e5e7eb", border: "none",
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            ref={scrollRef1}
            style={{ display: "flex", overflowX: "hidden", cursor: "grab", padding: "20px 0" }}
            onMouseDown={e => onMD(e, scrollRef1)}
            onMouseUp={onMU} onMouseLeave={onML} onMouseMove={onMM}
            onMouseEnter={pause}
          >
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={i} {...t} text={t.content} />
            ))}
          </div>
          {testimonials.length > 2 && (
            <div
              ref={scrollRef2}
              style={{ display: "flex", overflowX: "hidden", cursor: "grab", padding: "20px 0" }}
              onMouseDown={e => onMD(e, scrollRef2)}
              onMouseUp={onMU} onMouseLeave={onML} onMouseMove={onMM}
              onMouseEnter={pause}
            >
              {[...testimonials, ...testimonials, ...testimonials].reverse().map((t, i) => (
                <TestimonialCard key={i} {...t} text={t.content} />
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{
        maxWidth: 1600, margin: "64px auto 0", padding: "0 2rem",
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 20, position: "relative", zIndex: 1, flexWrap: "wrap",
      }}>
        {[
          { num: "4.9", label: "Average Rating" },
          { num: "12K+", label: "Happy Travelers" },
          { num: "98%", label: "Would Recommend" },
        ].map(({ num, label }, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12, background: "#fff",
            border: "1px solid rgba(220,38,38,0.12)", borderRadius: 999,
            padding: "12px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}>
            <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 26, color: "#dc2626", lineHeight: 1 }}>{num}</span>
            <span style={{
              fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 10,
              letterSpacing: "0.25em", textTransform: "uppercase", color: "#9ca3af",
            }}>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;