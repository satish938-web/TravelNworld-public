import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Img1 from "../../assets/images/aboutUsHome/image1_rect.png";

/* ─────────────────────────────────────────────
   CountUp – animates a number when scrolled into view
───────────────────────────────────────────── */
const CountUp = ({ to, suffix = "" }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const target = Number(to);
    const duration = 1400; // ms
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setVal(target);
    };

    requestAnimationFrame(tick);
  }, [inView, to]);

  return <span ref={ref}>{val}{suffix}</span>;
};

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const HomeAboutUs = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const stats = [
    { num: 12, suffix: "K+", label: "Elite Members" },
    { num: 80, suffix: "+",  label: "Destinations"  },
    { num: 9,  suffix: "+",  label: "Years Leading" },
  ];

  /* Shared fade-up variant factory */
  const fadeUp = (delay = 0) => ({
    hidden:  { opacity: 0, y: 32 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
    },
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,600;0,700;0,900;1,700&display=swap');

        .hau-section *,
        .hau-section *::before,
        .hau-section *::after { box-sizing: border-box; }

        @keyframes shimmerBar { to { background-position: 200% center; } }
        @keyframes pingPulse  { 0%,100% { transform: scale(1); opacity:1; } 60% { transform: scale(2); opacity:0; } }

        /* ── Image stack ── */
        .hau-simple-img-main {
          width: 100%;
          aspect-ratio: 2 / 3;
          object-fit: cover;
          display: block;
          border-radius: 999px;
        }

        /* ── Stat item ── */
        .hau-stat-num {
          font-family: 'Bebas Neue', cursive;
          font-size: clamp(40px, 4.5vw, 56px);
          line-height: 1;
          letter-spacing: .02em;
          color: #0a0a0a;
          transition: color .25s;
          cursor: default;
        }
        .hau-stat-num:hover { color: #dc2626; }

        /* ── CTA button ── */
        .hau-cta {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          background: linear-gradient(135deg, #dc2626 0%, #000000 100%);
          color: #fff;
          font-family: 'Barlow', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: .35em;
          text-transform: uppercase;
          padding: 20px 48px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          box-shadow: 0 14px 44px rgba(220,38,38,.28);
          transition: transform .3s cubic-bezier(.34,1.56,.64,1),
                      box-shadow .3s ease;
          position: relative;
          overflow: hidden;
        }
        .hau-cta::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 30%, rgba(37,99,235,.15), rgba(255,255,255,.12), transparent 70%);
          background-size: 200% auto;
          animation: shimmerBar 2.8s linear infinite;
          pointer-events: none;
        }
        .hau-cta:hover {
          transform: translateY(-3px) scale(1.025);
          box-shadow: 0 22px 56px rgba(220,38,38,.42);
        }
        .hau-cta-icon {
          width: 32px; height: 32px;
          background: rgba(255,255,255,.18);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform .3s;
        }
        .hau-cta:hover .hau-cta-icon { transform: translateX(4px); }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hau-layout { flex-direction: column !important; }
          .hau-img-col { width: 100% !important; max-width: 100%; }
          .hau-content { min-width: unset !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="hau-section"
        style={{
          fontFamily: "'Barlow', sans-serif",
          padding: "80px 0 90px",
          background: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
          <div
            className="hau-layout"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(48px, 9vw, 120px)",
            }}
          >

            {/* ══════════════════════════════════════
                LEFT – Simple Image
            ══════════════════════════════════════ */}
            <motion.div
              className="hau-img-col"
              style={{
                position: "relative",
                flexShrink: 0,
                width: "clamp(260px, 35vw, 480px)",
                overflow: "hidden",
                display: "block",
                background: "#ffffff",
                borderRadius: "999px",
              }}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: .8, ease: "easeOut" }}
            >
              <img
                src={Img1}
                alt="A luxury travel destination"
                className="hau-simple-img-main"
                style={{ width: "100%", display: "block" }}
              />
            </motion.div>


            {/* ══════════════════════════════════════
                RIGHT – Content
            ══════════════════════════════════════ */}
            <div className="hau-content" style={{ flex: 1, minWidth: 280 }}>

              {/* Tag pill */}
              <motion.div
                variants={fadeUp(0.1)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                style={{ display: "inline-flex", marginBottom: 28 }}
              >
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "linear-gradient(135deg, #dc2626, #2563eb)",
                  color: "#fff",
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 700, fontSize: 12,
                  letterSpacing: ".34em", textTransform: "uppercase",
                  padding: "10px 24px",
                  borderRadius: 999,
                  boxShadow: "0 8px 28px rgba(220,38,38,.32)",
                }}>
                  <span aria-hidden style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: "#fff",
                    display: "inline-block",
                    animation: "pingPulse 1.7s ease-in-out infinite",
                  }} />
                  Our Legacy
                </span>
              </motion.div>

              {/* Heading */}
              <motion.div
                variants={fadeUp(0.1)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <h2 style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "clamp(42px, 5vw, 64px)",
                  lineHeight: .94,
                  color: "#0a0a0a",
                  letterSpacing: ".01em",
                  margin: "0 0 10px",
                }}>
                  About{" "}
                  <em style={{
                    color: "#dc2626",
                    fontStyle: "italic",
                    textShadow: "0 0 40px rgba(220,38,38,.18)",
                  }}>
                    Travel N World
                  </em>
                </h2>
                <div aria-hidden style={{
                  height: 3,
                  background: "linear-gradient(90deg, #dc2626, #2563eb, rgba(220,38,38,.15))",
                  borderRadius: 99,
                  marginBottom: 28,
                  boxShadow: "0 0 14px rgba(220,38,38,.4)",
                }} />
              </motion.div>

              {/* Body copy */}
              <motion.p
                variants={fadeUp(0.32)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(15px, 1.3vw, 17px)",
                  color: "#6b7280",
                  lineHeight: 1.82,
                  maxWidth: 620,
                  margin: "0 0 44px",
                }}
              >
                At{" "}
                <strong style={{ fontWeight: 900, color: "#0a0a0a" }}>TravelnWorld</strong>,
                we don&apos;t just book trips — we{" "}
                <span style={{
                  fontWeight: 700,
                  background: "linear-gradient(90deg, #dc2626, #ff6060)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  craft extraordinary journeys
                </span>
                . From intimate secret escapes to grand expeditions, our master planners
                attend to every detail with precision and genuine passion.
              </motion.p>

              {/* Stats row */}
              <motion.div
                variants={fadeUp(0.42)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                style={{
                  display: "flex",
                  gap: "clamp(24px, 5vw, 52px)",
                  flexWrap: "wrap",
                  marginBottom: 48,
                }}
              >
                {stats.map(({ num, suffix, label }) => (
                  <div key={label} style={{ position: "relative", paddingLeft: 16 }}>
                    {/* Accent bar */}
                    <div aria-hidden style={{
                      position: "absolute", left: 0, top: "12%", bottom: "12%",
                      width: 3, borderRadius: 99,
                      background: "linear-gradient(to bottom, #dc2626, #2563eb, rgba(220,38,38,.1))",
                    }} />
                    <p className="hau-stat-num">
                      <CountUp to={num} suffix={suffix} />
                    </p>
                    <p style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontWeight: 700, fontSize: 12,
                      letterSpacing: ".28em", textTransform: "uppercase",
                      color: "#9ca3af", margin: "4px 0 0",
                    }}>
                      {label}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                variants={fadeUp(0.52)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <button
                  className="hau-cta"
                  onClick={() => navigate("/aboutUs")}
                  aria-label="Learn more about Travel N World"
                  style={{ fontSize: "14px", padding: "20px 48px" }}
                >
                  Explore Our Story
                  <span className="hau-cta-icon" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4"
                        stroke="white" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default HomeAboutUs;
