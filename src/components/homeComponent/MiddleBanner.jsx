import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { getImageUrl, API_BASE } from "../../utils/api";

const MiddleBanner = () => {
  const [banners, setBanners] = useState([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffset(prev => prev + 1);
    }, 4000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, []);

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

      {/* Triple Slide Carousel with Controls */}
      <div style={styles.carouselContainer}>
        <button 
          onClick={() => setCurrentOffset(prev => prev - 1)}
          style={{ ...styles.navBtn, left: "30px" }}
          className="nav-btn-hover"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>

        <button 
          onClick={() => setCurrentOffset(prev => prev + 1)}
          style={{ ...styles.navBtn, right: "30px" }}
          className="nav-btn-hover"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>

        <div style={styles.tripleGrid}>
          <AnimatePresence mode="popLayout" initial={false}>
            {(() => {
              // Take 3 banners at a time for desktop
              const b1 = banners[(currentOffset % banners.length + banners.length) % banners.length];
              const b2 = banners[((currentOffset + 1) % banners.length + banners.length) % banners.length];
              const b3 = banners[((currentOffset + 2) % banners.length + banners.length) % banners.length];
              
              let trio = [];
              if (banners.length >= 3) trio = [b1, b2, b3];
              else if (banners.length === 2) trio = [b1, b2];
              else trio = [b1];

              return trio.map((banner, idx) => {
                if (!banner) return null;
                const isVideo = banner.imageUrl?.toLowerCase().endsWith('.mp4') || banner.imageUrl?.toLowerCase().endsWith('.webm');

                return (
                  <motion.div
                    key={`banner-${banner._id}-${idx}`}
                    layout
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    style={styles.tripleBannerCard}
                    onClick={() => setSelectedImg(banner)}
                  >
                    {isVideo ? (
                      <video src={getImageUrl(banner.imageUrl)} autoPlay muted loop playsInline style={styles.image} />
                    ) : (
                      <img src={getImageUrl(banner.imageUrl)} alt={banner.title} style={styles.image} />
                    )}
                    <div style={styles.cardGlow} />
                  </motion.div>
                );
              });
            })()}
          </AnimatePresence>
        </div>

        {/* Progress Bar Indicators */}
        <div style={styles.indicatorWrap}>
          {banners.map((_, i) => (
            <div 
              key={i} 
              style={{
                ...styles.indicatorDot,
                background: (currentOffset % banners.length) === i ? "#dc2626" : "rgba(255,255,255,0.2)",
                width: (currentOffset % banners.length) === i ? "30px" : "8px"
              }}
            />
          ))}
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
        .nav-btn-hover {
          transition: all 0.3s ease;
        }
        .nav-btn-hover:hover {
          background: rgba(220, 38, 38, 0.9) !important;
          transform: translateY(-50%) scale(1.1) !important;
          box-shadow: 0 0 20px rgba(220, 38, 38, 0.5) !important;
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
    padding: "0",
    margin: "20px 0",
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
  carouselContainer: {
    position: "relative",
    zIndex: 5,
    width: "100%",
    margin: "0 auto",
    height: "280px",
    padding: "0",
  },
  navBtn: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "rgba(0,0,0,0.4)",
    border: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 20,
    backdropFilter: "blur(8px)",
  },
  tripleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "0px",
    width: "100%",
    height: "100%",
  },
  tripleBannerCard: {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: "0px",
    overflow: "hidden",
    cursor: "pointer",
    border: "none",
  },
  indicatorWrap: {
    position: "absolute",
    bottom: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "8px",
    zIndex: 10,
  },
  indicatorDot: {
    height: "8px",
    borderRadius: "10px",
    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
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
