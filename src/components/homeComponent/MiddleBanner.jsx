import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { getImageUrl, API_BASE } from "../../utils/api";

const MiddleBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [selectedImg, setSelectedImg] = useState(null);

  // No interval needed for CSS marquee
  
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE}/api/banners?position=middle`)
      .then((res) => {
        if (res.data) {
          setBanners(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching banners:", err);
        // Keep loading true for skeleton if backend is down
      });
  }, []);

  if (loading) {
    return (
      <div style={{ ...styles.wrapper, background: '#f3f4f6', height: 280 }} className="animate-pulse">
        <div style={{ ...styles.marqueeWrapper, opacity: 0.5 }}>
          <div style={{ ...styles.marqueeContent, gap: 20 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ ...styles.marqueeCard, background: '#e5e7eb', width: 340, height: 190, borderRadius: 20 }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!banners.length) return null;

  const loopBanners = [...banners, ...banners, ...banners, ...banners];

  return (
    <div style={styles.wrapper}>
      <div style={styles.bg} />
      <div style={{ ...styles.orb, ...styles.orb1 }} />
      <div style={{ ...styles.orb, ...styles.orb2 }} />
      <div style={{ ...styles.orb, ...styles.orb3 }} />
      <div style={styles.scanlines} />

      {/* Continuous Marquee Carousel */}
      <div style={styles.marqueeWrapper}>
        <div style={styles.marqueeContent}>
          {loopBanners.map((banner, idx) => {
            if (!banner) return null;
            const isVideo = banner.imageUrl?.toLowerCase().endsWith('.mp4') || banner.imageUrl?.toLowerCase().endsWith('.webm');

            return (
              <div
                key={`banner-${banner._id}-${idx}`}
                style={styles.marqueeCard}
                onClick={() => setSelectedImg(banner)}
              >
                {isVideo ? (
                  <video src={getImageUrl(banner.imageUrl)} autoPlay muted loop playsInline style={styles.image} />
                ) : (
                  <img src={getImageUrl(banner.imageUrl)} alt={banner.title} style={styles.image} />
                )}
                <div style={styles.cardGlow} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            style={styles.lightboxOverlay}
          >
            <motion.button 
              style={styles.closeBtn}
              onClick={() => setSelectedImg(null)}
            >
              ✕
            </motion.button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={styles.lightboxContent}
            >
              {selectedImg.imageUrl?.toLowerCase().endsWith('.mp4') || selectedImg.imageUrl?.toLowerCase().endsWith('.webm') ? (
                <video src={getImageUrl(selectedImg.imageUrl)} autoPlay muted loop playsInline style={styles.fullImg} />
              ) : (
                <img src={getImageUrl(selectedImg.imageUrl)} alt="Full View" style={styles.fullImg} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes marqueeMiddle {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
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
    padding: "40px 0",
    margin: "20px 0",
    display: "flex",
    flexDirection: "column",
    gap: "0px",
  },

  bg: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, #dc2626 0%, #000000 100%)",
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
  marqueeWrapper: {
    position: "relative",
    zIndex: 5,
    width: "100%",
    height: "220px",
    overflow: "hidden",
    display: "flex",
  },
  marqueeContent: {
    display: "flex",
    gap: "20px",
    padding: "0 20px",
    width: "max-content",
    animation: "marqueeMiddle 35s linear infinite",
  },
  marqueeCard: {
    position: "relative",
    width: "360px",
    height: "100%",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    flexShrink: 0,
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
  lightboxOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.92)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(10px)",
    padding: "20px",
  },
  lightboxContent: {
    position: "relative",
    maxWidth: "95%",
    maxHeight: "95%",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 0 50px rgba(0,0,0,0.5)",
  },
  fullImg: {
    maxWidth: "100%",
    maxHeight: "90vh",
    objectFit: "contain",
    display: "block",
  },
  closeBtn: {
    position: "absolute",
    top: "30px",
    right: "30px",
    background: "white",
    color: "black",
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: "none",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10000,
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
  },
};

export default MiddleBanner;
