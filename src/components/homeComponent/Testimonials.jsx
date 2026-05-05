import React, { useState, useEffect, useRef } from "react";
import { Star, PlayCircle, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import axios from "axios";
import { API_BASE } from "../../utils/api";

/* ── Animated floating particles ── */
const Particles = () => {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 6,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(220,38,38,0.25)",
            animation: `particleFloat ${p.duration}s ${p.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
};

/* ── Background orbs ── */
const Orbs = () => (
  <>
    <div style={{
      position: "absolute", top: "5%", left: "-8%",
      width: 500, height: 500, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(220,38,38,0.1) 0%, transparent 70%)",
      filter: "blur(50px)", pointerEvents: "none",
      animation: "orbDrift 10s ease-in-out infinite alternate",
    }} />
    <div style={{
      position: "absolute", bottom: "0%", right: "-8%",
      width: 600, height: 600, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(220,38,38,0.07) 0%, transparent 70%)",
      filter: "blur(70px)", pointerEvents: "none",
      animation: "orbDrift 14s ease-in-out 3s infinite alternate",
    }} />
    <div style={{
      position: "absolute", top: "50%", left: "50%",
      transform: "translate(-50%,-50%)",
      width: 800, height: 300, borderRadius: "50%",
      background: "radial-gradient(ellipse, rgba(220,38,38,0.04) 0%, transparent 70%)",
      filter: "blur(60px)", pointerEvents: "none",
      animation: "orbDrift 18s ease-in-out 1s infinite alternate",
    }} />
  </>
);

/* ── Grid background ── */
const GridBg = () => (
  <div style={{
    position: "absolute", inset: 0, pointerEvents: "none",
    backgroundImage: `
      linear-gradient(rgba(220,38,38,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(220,38,38,0.04) 1px, transparent 1px)
    `,
    backgroundSize: "52px 52px",
  }} />
);

/* ── Animated stat counter ── */
const AnimatedStat = ({ num, label, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 120 }}
      whileHover={{ scale: 1.06, boxShadow: "0 8px 32px rgba(220,38,38,0.18)" }}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        background: "#fff",
        border: "1px solid rgba(220,38,38,0.15)",
        borderRadius: 999, padding: "14px 28px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        cursor: "default",
        transition: "box-shadow 0.3s",
      }}
    >
      <span style={{
        fontFamily: "'Bebas Neue', cursive",
        fontSize: 28, color: "#dc2626", lineHeight: 1,
        letterSpacing: "0.04em",
      }}>{num}</span>
      <span style={{
        fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 10,
        letterSpacing: "0.3em", textTransform: "uppercase", color: "#9ca3af",
      }}>{label}</span>
    </motion.div>
  );
};

/* ── Testimonial card ── */
const TestimonialCard = ({ image, name, role, text, stars = 5, type, videoUrl, location, index = 0 }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 1, y: 0 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: 360, flexShrink: 0,
        margin: "0 16px",
        zIndex: hovered ? 10 : 1,
        background: hovered
          ? "linear-gradient(145deg, #0a0a0a 0%, #1c0505 60%, #0f0f0f 100%)"
          : "#ffffff",
        borderRadius: "28px",
        padding: "32px",
        boxShadow: hovered
          ? "0 40px 100px rgba(220,38,38,0.3), 0 0 0 1px rgba(220,38,38,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
          : "0 4px 30px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-14px) scale(1.03)" : "translateY(0) scale(1)",
        transition: "all 0.45s cubic-bezier(0.34,1.56,0.64,1)",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: hovered ? 4 : 0,
        background: "linear-gradient(90deg, #7f1d1d, #dc2626, #ff6b6b, #dc2626, #7f1d1d)",
        backgroundSize: "200% 100%",
        borderRadius: "28px 28px 0 0",
        transition: "height 0.35s ease",
        animation: hovered ? "shimmer 2.5s linear infinite" : "none",
      }} />

      {/* Corner glow */}
      {hovered && (
        <div style={{
          position: "absolute", bottom: -30, right: -30,
          width: 160, height: 160, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(220,38,38,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
      )}

      {/* Large decorative quote */}
      <div style={{
        position: "absolute", top: -8, right: 14,
        fontFamily: "Georgia, serif",
        fontSize: 160, lineHeight: 1,
        color: hovered ? "rgba(220,38,38,0.14)" : "rgba(220,38,38,0.05)",
        userSelect: "none", pointerEvents: "none",
        transition: "color 0.4s",
      }}>"</div>

      {/* Stars + video */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 4 }}>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 200 }}
            >
              <Star
                size={14}
                fill={i < stars ? "#dc2626" : (hovered ? "rgba(255,255,255,0.12)" : "#e5e7eb")}
                color="transparent"
              />
            </motion.div>
          ))}
        </div>
        {type === "video" && (
          <a href={videoUrl} target="_blank" rel="noreferrer"
            style={{
              background: "linear-gradient(135deg, #dc2626, #7f1d1d)",
              color: "#fff", width: 38, height: 38, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(220,38,38,0.4)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <PlayCircle size={18} />
          </a>
        )}
      </div>

      {/* Quote icon */}
      <div style={{
        width: 38, height: 38,
        background: hovered ? "rgba(220,38,38,0.2)" : "rgba(220,38,38,0.07)",
        border: hovered ? "1px solid rgba(220,38,38,0.35)" : "1px solid rgba(220,38,38,0.12)",
        borderRadius: 12,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 16,
        transition: "all 0.3s",
      }}>
        <Quote size={16} color="#dc2626" />
      </div>

      {/* Review text */}
      <p style={{
        fontFamily: "'Barlow', sans-serif", fontWeight: 300,
        fontSize: 14, fontStyle: "italic",
        lineHeight: 1.85, minHeight: 95, marginBottom: 26,
        color: hovered ? "rgba(255,255,255,0.72)" : "#6b7280",
        transition: "color 0.4s",
      }}>
        "{text}"
      </p>

      {/* Divider */}
      <div style={{
        height: 1,
        background: hovered
          ? "linear-gradient(90deg, transparent, rgba(220,38,38,0.3), transparent)"
          : "linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent)",
        marginBottom: 20,
        transition: "background 0.4s",
      }} />

      {/* Avatar + name */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ position: "relative" }}>
          <img
            src={image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400"}
            alt={name}
            style={{
              width: 50, height: 50, borderRadius: "50%", objectFit: "cover",
              border: hovered ? "2px solid #dc2626" : "2px solid rgba(220,38,38,0.2)",
              transition: "border 0.4s",
            }}
          />
          {hovered && (
            <div style={{
              position: "absolute", inset: -3, borderRadius: "50%",
              border: "1px solid rgba(220,38,38,0.3)",
              animation: "ringPulse 1.5s ease-out infinite",
            }} />
          )}
        </div>
        <div>
          <h3 style={{
            fontFamily: "'Bebas Neue', cursive", fontSize: 17,
            letterSpacing: "0.1em",
            color: hovered ? "#ffffff" : "#0a0a0a",
            transition: "color 0.4s", margin: 0,
          }}>{name}</h3>
          <p style={{
            fontFamily: "'Barlow', sans-serif", fontWeight: 700,
            fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase",
            color: hovered ? "rgba(220,38,38,0.85)" : "#9ca3af",
            transition: "color 0.4s", margin: "3px 0 0",
          }}>{role}</p>
          {location && (
            <p style={{
              fontFamily: "'Barlow', sans-serif", fontSize: 10,
              color: hovered ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)",
              margin: "2px 0 0", transition: "color 0.4s",
            }}>📍 {location}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideKey, setSlideKey] = useState(0);

  const scrollRef1 = useRef(null);
  const rafRef1 = useRef(null);
  const pauseTimeout = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);
  const activeRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/testimonials`);
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
    if (!el1) return;
    const step = () => {
      if (!isPaused && !isDragging.current) {
        if (el1) {
          el1.scrollLeft += 0.7;
          if (el1.scrollLeft >= el1.scrollWidth / 2) el1.scrollLeft = 0;
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
      setCurrentIndex(p => dir === "next"
        ? (p + 1) % testimonials.length
        : (p - 1 + testimonials.length) % testimonials.length);
      setSlideKey(k => k + 1);
      pause(); resume(3000);
    } else {
      const amt = dir === "next" ? 400 : -400;
      scrollRef1.current?.scrollBy({ left: amt, behavior: "smooth" });
      pause(); resume();
    }
  };

  if (loading || testimonials.length === 0) return null;

  return (
    <section style={{
      width: "100%", padding: "80px 0 110px",
      background: "linear-gradient(180deg, #fafafa 0%, #f3f3f3 50%, #fafafa 100%)",
      overflow: "hidden", position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,700;1,300&display=swap');

        @keyframes orbDrift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(4%, 5%) scale(1.12); }
        }
        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes particleFloat {
          from { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          to   { transform: translateY(-30px) rotate(180deg); opacity: 0.8; }
        }
        @keyframes ringPulse {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes headingReveal {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.4); }
          50%       { box-shadow: 0 0 0 6px rgba(220,38,38,0); }
        }

        .nav-btn {
          width: 48px; height: 48px; border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.1);
          display: flex; align-items: center; justify-content: center;
          color: #9ca3af; background: white; cursor: pointer;
          transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }
        .nav-btn:hover {
          background: #0a0a0a; color: white;
          border-color: #0a0a0a;
          transform: scale(1.12);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .nav-btn:active { transform: scale(0.96); }

        .scroll-row { display: flex; overflow-x: hidden; cursor: grab; padding: 24px 0; }
        .scroll-row:active { cursor: grabbing; }
      `}</style>

      <GridBg />
      <Orbs />
      <Particles />

      {/* ── Section header ── */}
      <div
        ref={headerRef}
        style={{ maxWidth: 1600, margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 2, marginBottom: 72 }}
      >
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 32,
        }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
            style={{ textAlign: "center" }}
          >
            {/* Label badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                marginBottom: 16,
              }}
            >
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "rgba(220,38,38,0.08)",
                border: "1px solid rgba(220,38,38,0.2)",
                borderRadius: 999, padding: "6px 16px",
                animation: "badgePulse 2.5s ease-in-out infinite",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#dc2626" }} />
                <span style={{
                  fontFamily: "'Barlow', sans-serif", fontWeight: 700,
                  fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#dc2626",
                }}>Testimonials</span>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "clamp(52px, 7vw, 88px)",
                lineHeight: 0.92, margin: 0, letterSpacing: "0.01em",
              }}
            >
              <span style={{ color: "#0a0a0a" }}>What Our </span>
              <br />
              <span style={{
                color: "#dc2626", fontStyle: "italic",
                textShadow: "0 0 60px rgba(220,38,38,0.2)",
              }}>Travelers Say</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              style={{
                fontFamily: "'Barlow', sans-serif", fontWeight: 300,
                fontSize: 15, color: "#9ca3af", marginTop: 14, maxWidth: 600,
                lineHeight: 1.7, margin: "14px auto 0",
              }}
            >
              Real stories from real travelers — experiences that inspire the next adventure.
            </motion.p>
          </motion.div>

          {/* Center: nav buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 100 }}
            style={{ display: "flex", gap: 12, alignItems: "center" }}
          >
            <button className="nav-btn" onClick={() => navClick("prev")} aria-label="Previous">
              <ChevronLeft size={20} />
            </button>
            <button className="nav-btn" onClick={() => navClick("next")} aria-label="Next">
              <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── Mobile: single card slider ── */}
      {isMobile ? (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 20px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={slideKey}
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.96 }}
              transition={{ duration: 0.45, type: "spring", stiffness: 100 }}
            >
              <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <TestimonialCard
                  {...testimonials[currentIndex]}
                  text={testimonials[currentIndex].content}
                  index={0}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 28 }}>
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => { setCurrentIndex(i); setSlideKey(k => k + 1); pause(); resume(3000); }}
                animate={{ width: i === currentIndex ? 28 : 8 }}
                transition={{ duration: 0.3 }}
                style={{
                  height: 4, borderRadius: 99,
                  background: i === currentIndex ? "#dc2626" : "#e5e7eb",
                  border: "none", cursor: "pointer", padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        /* ── Desktop: single infinite scroll row ── */
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Main Row — scrolls right */}
          <div
            ref={scrollRef1}
            className="scroll-row"
            onMouseDown={e => onMD(e, scrollRef1)}
            onMouseUp={onMU}
            onMouseLeave={onML}
            onMouseMove={onMM}
            onMouseEnter={pause}
          >
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={i} {...t} text={t.content} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* ── Bottom stats ── */}
      <div style={{
        maxWidth: 1600, margin: "72px auto 0", padding: "0 2rem",
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 16, position: "relative", zIndex: 2, flexWrap: "wrap",
      }}>
        <AnimatedStat num="4.9★" label="Average Rating" delay={0} />
        <AnimatedStat num="12K+" label="Happy Travelers" delay={0.12} />
        <AnimatedStat num="98%" label="Would Recommend" delay={0.24} />
      </div>
    </section>
  );
};

export default Testimonials;