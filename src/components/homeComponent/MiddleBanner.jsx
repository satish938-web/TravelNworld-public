import { useEffect, useState } from "react";
import axios from "axios";
import { getImageUrl, API_BASE } from "../../utils/api";

const MiddleBanner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/banners?position=middle`)
      .then((res) => setBanners(res.data))
      .catch((err) => {
        console.error("Error fetching banners:", err);
        setBanners([]);
      });
  }, []);

  if (!banners.length) return null;

  const loopBanners = [...banners, ...banners, ...banners, ...banners];

  return (
    <div style={styles.wrapper}>
      <div style={styles.bg} />
      <div style={{ ...styles.orb, ...styles.orb1 }} />
      <div style={{ ...styles.orb, ...styles.orb2 }} />
      <div style={{ ...styles.orb, ...styles.orb3 }} />
      <div style={styles.scanlines} />

      {/* Single Marquee Row */}
      <div style={styles.rowWrap}>
        <div className="track track-left">
          {loopBanners.map((banner, i) => (
            <div
              key={`l-${i}`}
              className={`bcard delay-${i % 4}`}
              onClick={() => banner.link && window.open(banner.link, "_blank")}
            >
              {/* Shine sweep */}
              <div style={styles.shine} className="shine" />

              {/* Image */}
              <img src={getImageUrl(banner.imageUrl)} alt={banner.title || "banner"} style={styles.image} />

              {/* Bottom red glow */}
              <div style={styles.cardGlow} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');

        .track {
          display: flex;
          width: max-content;
          gap: 14px;
          padding: 0 16px;
        }
        .track-left  { animation: goLeft 30s linear infinite; }
        .track-left:hover { animation-play-state: paused; }

        @keyframes goLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }

        .bcard {
          position: relative;
          min-width: 400px;
          height: 180px;
          border-radius: 16px;
          flex-shrink: 0;
          cursor: pointer;
          overflow: hidden;
          border: 1px solid rgba(220,38,38,0.25);
          box-shadow:
            0 0 0 1px rgba(220,38,38,0.08),
            0 8px 32px rgba(0,0,0,0.55);
          transition:
            transform 0.45s cubic-bezier(0.34,1.56,0.64,1),
            box-shadow 0.45s ease,
            border-color 0.3s;
          animation: floatUp 5s ease-in-out infinite;
          font-family: 'Outfit', sans-serif;
        }

        @media (max-width: 768px) {
          .bcard {
            min-width: 300px;
            height: 140px;
          }
          .header-line-mob {
            display: none !important;
          }
          .header-wrap-mob {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
        }

        .delay-0 { animation-delay: 0s; }
        .delay-1 { animation-delay: 1.2s; }
        .delay-2 { animation-delay: 2.4s; }
        .delay-3 { animation-delay: 3.6s; }

        @keyframes floatUp {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-7px) rotate(0.3deg); }
        }

        .bcard:hover {
          transform: translateY(-14px) scale(1.05) rotate(-0.4deg) !important;
          border-color: rgba(220,38,38,0.85);
          box-shadow:
            0 0 28px rgba(220,38,38,0.4),
            0 0 55px rgba(220,38,38,0.15),
            0 22px 50px rgba(0,0,0,0.65),
            inset 0 0 18px rgba(220,38,38,0.07);
          z-index: 10;
        }

        .bcard:hover img {
          transform: scale(1.1);
        }

        .bcard:hover .shine {
          transform: translateX(200%) skewX(-15deg);
          transition: transform 0.75s ease;
        }

        .bcard::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 18px;
          border: 2px solid rgba(220,38,38,0);
          transition: border-color 0.3s, box-shadow 0.3s;
          pointer-events: none;
          z-index: 10;
        }
        .bcard:hover::after {
          border-color: rgba(220,38,38,0.65);
          box-shadow: 0 0 18px rgba(220,38,38,0.35);
          animation: pulseBorder 1.3s ease-in-out infinite;
        }

        @keyframes pulseBorder {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.45; }
        }

        @keyframes orbPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1; transform: scale(1.15); }
        }
        @keyframes orbDrift {
          0%, 100% { transform: translate(0,0) scale(1); }
          33%       { transform: translate(30px,-20px) scale(1.1); }
          66%       { transform: translate(-20px,15px) scale(0.95); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 0.03; }
          50%       { opacity: 0.06; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  wrapper: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    padding: "30px 0 36px",
    margin: "40px 0",
    display: "flex",
    flexDirection: "column",
    gap: "0px",
  },

  bg: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, #0a0000 0%, #1a0000 30%, #220000 60%, #0d0000 100%)",
    zIndex: 0,
  },

  orb: {
    position: "absolute",
    borderRadius: "50%",
    pointerEvents: "none",
    filter: "blur(60px)",
    zIndex: 1,
  },
  orb1: {
    width: 320, height: 320,
    top: "-80px", left: "15%",
    background: "radial-gradient(circle, rgba(185,28,28,0.55), transparent 70%)",
    animation: "orbDrift 8s ease-in-out infinite",
  },
  orb2: {
    width: 260, height: 260,
    top: "10px", right: "20%",
    background: "radial-gradient(circle, rgba(220,38,38,0.4), transparent 70%)",
    animation: "orbDrift 11s ease-in-out infinite reverse",
  },
  orb3: {
    width: 200, height: 200,
    bottom: "-40px", left: "50%",
    background: "radial-gradient(circle, rgba(153,27,27,0.35), transparent 70%)",
    animation: "orbPulse 6s ease-in-out infinite",
  },

  scanlines: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px)",
    zIndex: 2,
    pointerEvents: "none",
    animation: "flicker 4s ease-in-out infinite",
  },

  // ── Header ──
  headerWrap: {
    position: "relative",
    zIndex: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px 14px",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
  },
  liveDot: {
    display: "inline-block",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#dc2626",
    boxShadow: "0 0 8px #dc2626, 0 0 16px rgba(220,38,38,0.5)",
    animation: "orbPulse 1.5s ease-in-out infinite",
  },
  liveText: {
    color: "rgba(220,38,38,0.9)",
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "0.22em",
    fontFamily: "'Outfit', monospace",
  },
  headerCenter: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: 1,
    justifyContent: "center",
  },
  headerLine: {
    height: "1px",
    width: "60px",
    background: "linear-gradient(to right, transparent, rgba(220,38,38,0.45))",
  },
  headerTitle: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: 700,
    fontFamily: "'Outfit', sans-serif",
    letterSpacing: "0.03em",
    textShadow: "0 0 20px rgba(220,38,38,0.4)",
    whiteSpace: "nowrap",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
  },
  countBadge: {
    background: "rgba(220,38,38,0.15)",
    border: "0.5px solid rgba(220,38,38,0.4)",
    color: "rgba(255,120,120,0.95)",
    fontSize: "10px",
    fontWeight: 600,
    fontFamily: "'Outfit', sans-serif",
    padding: "4px 10px",
    borderRadius: "20px",
    letterSpacing: "0.05em",
  },

  // ── Row ──
  rowWrap: {
    position: "relative",
    zIndex: 5,
    overflow: "hidden",
    padding: "6px 0",
  },

  // ── Card internals ──
  shine: {
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "60%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent)",
    transform: "translateX(-100%) skewX(-15deg)",
    transition: "transform 0s",
    zIndex: 4,
    pointerEvents: "none",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.55s ease",
  },

  cardGlow: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(180,10,10,0.55) 0%, rgba(100,0,0,0.2) 45%, transparent 100%)",
    pointerEvents: "none",
    zIndex: 1,
  },

  // top badges
  topRow: {
    position: "absolute",
    top: "10px",
    left: "10px",
    right: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    zIndex: 3,
  },
  tagPill: {
    background: "rgba(0,0,0,0.55)",
    border: "0.5px solid rgba(220,38,38,0.45)",
    color: "rgba(255,110,110,0.95)",
    fontSize: "8.5px",
    fontWeight: 600,
    fontFamily: "'Outfit', sans-serif",
    letterSpacing: "1.4px",
    textTransform: "uppercase",
    padding: "3px 8px",
    borderRadius: "20px",
  },
  ratingPill: {
    background: "rgba(0,0,0,0.5)",
    border: "0.5px solid rgba(255,190,50,0.35)",
    color: "rgba(255,210,60,0.95)",
    fontSize: "9px",
    fontWeight: 600,
    fontFamily: "'Outfit', sans-serif",
    padding: "3px 7px",
    borderRadius: "20px",
  },

  // bottom text
  textOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "8px 12px 11px",
    zIndex: 3,
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: 700,
    fontFamily: "'Outfit', sans-serif",
    lineHeight: 1.25,
    textShadow: "0 1px 8px rgba(0,0,0,0.9)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  cardDesc: {
    color: "rgba(255,255,255,0.58)",
    fontSize: "10px",
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 400,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineHeight: 1.3,
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "4px",
  },
  price: {
    color: "rgba(255,160,160,0.95)",
    fontSize: "11px",
    fontWeight: 700,
    fontFamily: "'Outfit', sans-serif",
    textShadow: "0 0 10px rgba(220,38,38,0.5)",
  },
  loc: {
    display: "flex",
    alignItems: "center",
    gap: "3px",
    color: "rgba(255,255,255,0.45)",
    fontSize: "9.5px",
    fontFamily: "'Outfit', sans-serif",
  },
};

export default MiddleBanner;