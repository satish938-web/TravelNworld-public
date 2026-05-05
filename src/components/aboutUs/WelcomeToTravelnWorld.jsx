import React, { useEffect, useRef, useState } from "react";
import img1 from "../../assets/images/logo/aboutUsHero/welcome1.jpg";
import img2 from "../../assets/images/logo/aboutUsHero/welcome2.jpg";
import img3 from "../../assets/images/logo/aboutUsHero/welcome3.png";
import img4 from "../../assets/images/logo/aboutUsHero/welcome4.png";
import img5 from "../../assets/images/logo/aboutUsHero/welcome5.png";

const cards = [
  { img: img1, text: "Zero Rupees\nDown Payment", icon: "💰", tag: "Best Deal" },
  { img: img2, text: "No Cost EMI",               icon: "📅", tag: "Popular" },
  { img: img3, text: "Zero Rupees\nInterest",      icon: "📊", tag: "Exclusive" },
  { img: img4, text: "6 Months\nEasy EMI",         icon: "🗓", tag: "Flexible" },
  { img: img5, text: "Zero Processing\nFee",       icon: "✅", tag: "Free" },
];

const stats = [
  { num: "12K+", label: "Elite Members" },
  { num: "80+",  label: "Destinations"  },
  { num: "9+",   label: "Years Leading" },
];

/* ── Animated counter ── */
function useCounter(target, duration = 1800, start = false) {
  const [value, setValue] = useState(target);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target.replace(/\D/g, ""), 10);
    if (!num) return;
    let raf;
    const startTime = performance.now();
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(ease * num) + target.replace(/[0-9]/g, ""));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

function StatItem({ num, label, animate }) {
  const val = useCounter(num, 1600, animate);
  return (
    <div
      style={{ position: "relative", paddingLeft: 16, marginBottom: 24 }}
      className="stat-item"
    >
      {/* Accent bar */}
      <div aria-hidden style={{
        position: "absolute", left: 0, top: "12%", bottom: "12%",
        width: 3, borderRadius: 99,
        background: "linear-gradient(to bottom, #dc2626, #2563eb, rgba(220,38,38,.1))",
      }} />
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif", fontSize: 46,
        color: "#0a0a0a", lineHeight: 1,
        letterSpacing: ".02em",
      }}>{val}</div>
      <div style={{
        fontSize: 11, color: "#9ca3af",
        fontFamily: "'Barlow', sans-serif",
        fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "0.25em", marginTop: 4,
      }}>{label}</div>
    </div>
  );
}

/* ── SVG World Visual ── */
function WorldSVG() {
  // Center at 300,300 inside a 600×600 viewBox
  // Largest ring r=240 → edge at 300±240 = 60..540 → 60px margin on every side ✓
  const cx = 300, cy = 300;
  const rings = [55, 100, 150, 200, 240];

  // Two 180° arcs → perfectly closed circle for animateMotion
  const circlePath = (r) =>
    `M ${cx},${cy - r} a${r},${r} 0 1,1 0,${2 * r} a${r},${r} 0 1,1 0,${-2 * r}`;

  // 30 destinations spread across 5 rings for a maximum impact global network
  const destinations = [
    // r=55  (3 dots)
    { label: "Rome",        pathId: "orb55",  dur: "9s",  begin: "0s"      },
    { label: "Dubai",       pathId: "orb55",  dur: "9s",  begin: "-3s"     },
    { label: "Venice",      pathId: "orb55",  dur: "9s",  begin: "-6s"     },
    // r=100 (5 dots)
    { label: "Paris",       pathId: "orb100", dur: "13s", begin: "0s"      },
    { label: "Bangkok",     pathId: "orb100", dur: "13s", begin: "-2.6s"   },
    { label: "Cairo",       pathId: "orb100", dur: "13s", begin: "-5.2s"   },
    { label: "Prague",      pathId: "orb100", dur: "13s", begin: "-7.8s"   },
    { label: "Athens",      pathId: "orb100", dur: "13s", begin: "-10.4s"  },
    // r=150 (6 dots)
    { label: "London",      pathId: "orb150", dur: "18s", begin: "0s"      },
    { label: "Singapore",   pathId: "orb150", dur: "18s", begin: "-3s"     },
    { label: "Istanbul",    pathId: "orb150", dur: "18s", begin: "-6s"     },
    { label: "Santorini",   pathId: "orb150", dur: "18s", begin: "-9s"     },
    { label: "Amsterdam",   pathId: "orb150", dur: "18s", begin: "-12s"    },
    { label: "Vienna",      pathId: "orb150", dur: "18s", begin: "-15s"    },
    // r=200 (8 dots)
    { label: "New York",    pathId: "orb200", dur: "24s", begin: "0s"      },
    { label: "Tokyo",       pathId: "orb200", dur: "24s", begin: "-3s"     },
    { label: "Barcelona",   pathId: "orb200", dur: "24s", begin: "-6s"     },
    { label: "Bali",        pathId: "orb200", dur: "24s", begin: "-9s"     },
    { label: "Swiss Alps",  pathId: "orb200", dur: "24s", begin: "-12s"    },
    { label: "Hong Kong",   pathId: "orb200", dur: "24s", begin: "-15s"    },
    { label: "Los Angeles", pathId: "orb200", dur: "24s", begin: "-18s"    },
    { label: "Seoul",       pathId: "orb200", dur: "24s", begin: "-21s"    },
    // r=240 (8 dots)
    { label: "Sydney",      pathId: "orb240", dur: "30s", begin: "0s"      },
    { label: "Maldives",    pathId: "orb240", dur: "30s", begin: "-3.75s"  },
    { label: "New Zealand", pathId: "orb240", dur: "30s", begin: "-7.5s"   },
    { label: "Canada",      pathId: "orb240", dur: "30s", begin: "-11.25s" },
    { label: "Iceland",     pathId: "orb240", dur: "30s", begin: "-15s"    },
    { label: "Cape Town",   pathId: "orb240", dur: "30s", begin: "-18.75s" },
    { label: "Bora Bora",   pathId: "orb240", dur: "30s", begin: "-22.5s"  },
    { label: "Rio De Jan.", pathId: "orb240", dur: "30s", begin: "-26.25s" },
  ];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <svg
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff1f1" />
            <stop offset="100%" stopColor="#f8f9fb" />
          </radialGradient>
          <radialGradient id="planeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
          </radialGradient>
          <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Closed circular orbit paths used by animateMotion */}
          <path id="orb55"  d={circlePath(55)}  fill="none" />
          <path id="orb100" d={circlePath(100)} fill="none" />
          <path id="orb150" d={circlePath(150)} fill="none" />
          <path id="orb200" d={circlePath(200)} fill="none" />
          <path id="orb240" d={circlePath(240)} fill="none" />
        </defs>

        {/* Background */}
        <rect x="0" y="0" width="600" height="600" rx="20" fill="url(#bgGrad)" />

        {/* Concentric rings */}
        {rings.map((r, i) => (
          <circle
            key={i} cx={cx} cy={cy} r={r}
            fill="none" stroke="#dc2626"
            strokeWidth={i === 0 ? 1.5 : 0.8}
            strokeOpacity={0.18 - i * 0.02}
            style={{ animation: `ringPulse 4s ease-in-out ${i * 0.7}s infinite` }}
          />
        ))}

        {/* Glow behind plane */}
        <circle cx={cx} cy={cy} r="80" fill="url(#planeGlow)" />

        {/* Plane icon */}
        <g style={{ animation: "planeFly 8s ease-in-out infinite", transformOrigin: `${cx}px ${cy}px` }}>
          <path
            d={`M${cx} ${cy - 22} L${cx + 18} ${cy - 4} L${cx} ${cy - 8} L${cx - 18} ${cy - 4} Z
                M${cx - 4} ${cy - 8} L${cx - 2} ${cy + 14} L${cx} ${cy + 9} L${cx + 2} ${cy + 14} L${cx + 4} ${cy - 8} Z
                M${cx - 11} ${cy - 2} L${cx - 15} ${cy + 6} L${cx} ${cy + 2} L${cx + 15} ${cy + 6} L${cx + 11} ${cy - 2} Z`}
            fill="#dc2626" opacity="0.6"
          />
        </g>

        {/* Destination dots — animateMotion is first child, moves the whole <g> */}
        {destinations.map((d, i) => (
          <g key={i}>
            <animateMotion dur={d.dur} begin={d.begin} repeatCount="indefinite">
              <mpath href={`#${d.pathId}`} />
            </animateMotion>

            {/* Ripple */}
            <circle fill="#dc2626" opacity="0">
              <animate attributeName="r"       values="4;18"   dur="2.5s" begin={`${i * 0.22}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.22;0" dur="2.5s" begin={`${i * 0.22}s`} repeatCount="indefinite" />
            </circle>

            {/* Main dot */}
            <circle r="4.5" fill="#dc2626" opacity="0.92" filter="url(#glow)" />

            {/* Label */}
            <text
              y="-12" textAnchor="middle"
              fontSize="9" fontFamily="'DM Sans', sans-serif"
              fontWeight="700" fill="#dc2626" opacity="0.88"
              letterSpacing="0.04em"
            >
              {d.label}
            </text>
          </g>
        ))}

        {/* EST. 2010 badge */}
        <rect x="16" y="16" width="82" height="26" rx="13" fill="#fff" stroke="#fecaca" strokeWidth="1" />
        <text x="57" y="33" textAnchor="middle" fontSize="9" fontWeight="700"
          fontFamily="'DM Sans',sans-serif" fill="#dc2626" letterSpacing="0.12em">
          EST. 2010
        </text>

        {/* 120+ Destinations badge */}
        <rect x="342" y="558" width="186" height="26" rx="13" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
        <text x="435" y="575" textAnchor="middle" fontSize="9" fontWeight="700"
          fontFamily="'DM Sans',sans-serif" fill="#6b7280" letterSpacing="0.1em">
          120+ DESTINATIONS
        </text>
      </svg>
    </div>
  );
}


/* ── Main Component ── */
const WelcomeToTravelnWorld = () => {
  const statsRef = useRef(null);
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setAnimateStats(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const allCards = [...cards, ...cards, ...cards];

  return (
    <section style={{ background: "#fff", paddingTop: 96, overflow: "hidden", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;600;700&display=swap');

        @keyframes ringPulse   { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes planeFly    { 0%,100%{transform:translate(-8px,-8px) rotate(-5deg) scale(1)} 50%{transform:translate(8px,8px) rotate(5deg) scale(1.08)} }
        @keyframes lineGrow    { from{transform:scaleX(0);transform-origin:left} to{transform:scaleX(1)} }
        @keyframes scrollTrack { from{transform:translateX(0)} to{transform:translateX(-33.33%)} }

        .stat-item:last-child { border-right: none !important; }

        .cards-scroll-track {
          display: flex;
          gap: 22px;
          animation: scrollTrack 28s linear infinite;
          width: max-content;
        }
        .cards-scroll-track:hover { animation-play-state: paused; }

        @media (max-width: 900px) {
          .welcome-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>

      {/* ── WELCOME BLOCK ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px 96px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
          className="welcome-grid"
        >
          {/* Left — text + stats */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              fontSize: 11, fontWeight: 600, letterSpacing: "0.28em",
              textTransform: "uppercase", color: "#dc2626", marginBottom: 18,
            }}>
              <span style={{ width: 28, height: 2, background: "#dc2626", borderRadius: 2, display: "inline-block" }} />
              Our Story
            </div>

            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(42px, 5.5vw, 76px)",
              lineHeight: 0.95, color: "#111", marginBottom: 24,
              position: "relative",
            }}>
              Welcome to{" "}
              <span style={{ color: "#dc2626", position: "relative", display: "inline-block" }}>
                Travel N World
                <span style={{
                  position: "absolute", bottom: -4, left: 0, right: 0,
                  height: 3, background: "linear-gradient(90deg,#dc2626,#fca5a5)",
                  borderRadius: 2, animation: "lineGrow 1s 0.5s ease both",
                  display: "block",
                }} />
              </span>
            </h2>

            <p style={{ color: "#6b7280", fontSize: 16, lineHeight: 1.9, fontWeight: 300, marginBottom: 16 }}>
              TravelnWorld Pvt Ltd is built on a strong foundation aiming to provide exceptional
              customer satisfaction and unforgettable holiday experiences. Whether it's a
              once-in-a-lifetime vacation or a corporate retreat, we ensure you get exactly
              what you want — in the shortest time.
            </p>
            <p style={{ color: "#6b7280", fontSize: 16, lineHeight: 1.9, fontWeight: 300, marginBottom: 40 }}>
              With years of expertise in destination management, we handle customer needs
              seamlessly — from holiday bookings, tours, excursions, business trips,
              hotel arrangements, and much more.
            </p>

            {/* Stats */}
            <div ref={statsRef} style={{
              display: "grid", gridTemplateColumns: "repeat(4,1fr)",
              borderTop: "1px solid #f0f0f0", paddingTop: 32,
            }}>
              {stats.map((s, i) => (
                <StatItem key={i} {...s} animate={animateStats} />
              ))}
            </div>
          </div>

          {/* Right — SVG Visual
              aspectRatio 1/1 keeps it square so the 600×600 viewBox never clips */}
          <div
            style={{
              position: "relative",
              aspectRatio: "1 / 1",
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid #f0f0f0",
              boxShadow: "0 20px 60px rgba(220,38,38,0.06), 0 4px 20px rgba(0,0,0,0.04)",
              transition: "box-shadow 0.4s, transform 0.4s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 30px 80px rgba(220,38,38,0.12), 0 8px 30px rgba(0,0,0,0.06)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 20px 60px rgba(220,38,38,0.06), 0 4px 20px rgba(0,0,0,0.04)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <WorldSVG />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeToTravelnWorld;