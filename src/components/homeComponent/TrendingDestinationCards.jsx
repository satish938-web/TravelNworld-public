/**
 * TrendingDestinationCards
 * Route: /trending/:destinationId
 */

import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { getJson, getImageUrl } from "../../utils/api";

function slugToTitle(slug) {
  return (slug || "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ── Skeleton ── */
const SkeletonCard = ({ i }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.06 }}
    style={{
      background: "#fff",
      borderRadius: 24,
      overflow: "hidden",
      boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
    }}
  >
    <div style={{
      height: 220,
      background: "linear-gradient(90deg, #f3f4f6 25%, #e9eaec 50%, #f3f4f6 75%)",
      backgroundSize: "400% 100%",
      animation: "skeletonShimmer 1.5s ease-in-out infinite",
    }} />
    <div style={{ padding: 20 }}>
      {[70, 100, 55].map((w, j) => (
        <div key={j} style={{
          height: j === 0 ? 16 : 12,
          width: `${w}%`,
          background: "linear-gradient(90deg, #f3f4f6 25%, #e9eaec 50%, #f3f4f6 75%)",
          backgroundSize: "400% 100%",
          animation: "skeletonShimmer 1.5s ease-in-out infinite",
          borderRadius: 8,
          marginBottom: 10,
        }} />
      ))}
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        {[1, 2].map(k => (
          <div key={k} style={{
            flex: 1, height: 40, borderRadius: 12,
            background: "linear-gradient(90deg, #f3f4f6 25%, #e9eaec 50%, #f3f4f6 75%)",
            backgroundSize: "400% 100%",
            animation: "skeletonShimmer 1.5s ease-in-out infinite",
          }} />
        ))}
      </div>
    </div>
  </motion.div>
);

/* ── Itinerary Card ── */
const ItineraryCard = ({ itinerary, destinationId, index }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const imgSrc = itinerary.coverImageUrl || itinerary.gallery?.[0];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(
        itinerary.type === "international"
          ? `/international-itinerary-detail/${destinationId}/${itinerary.slug || itinerary._id}`
          : `/domestic-itinerary/${destinationId}/${itinerary.slug || itinerary._id}`
      )}
      style={{
        background: "#fff",
        borderRadius: 24,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: hovered
          ? "0 24px 64px rgba(220,38,38,0.18), 0 0 0 1.5px rgba(220,38,38,0.2)"
          : "0 4px 24px rgba(0,0,0,0.07)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.38s cubic-bezier(0.34,1.56,0.64,1)",
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 220, overflow: "hidden", flexShrink: 0 }}>
        {imgSrc ? (
          <img
            src={getImageUrl(imgSrc)}
            alt={itinerary.title}
            loading="lazy"
            style={{
              width: "100%", height: "100%",
              objectFit: "cover",
              transform: hovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.6s ease",
            }}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(135deg, #fef2f2, #fee2e2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 48,
          }}>🗺️</div>
        )}

        {/* Gradient overlay on hover */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(127,29,29,0.65) 0%, transparent 55%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s",
          pointerEvents: "none",
        }} />

        {/* Classification badges */}
        {itinerary.classification?.length > 0 && (
          <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
            {itinerary.classification.map((tag) => (
              <span key={tag} style={{
                background: "linear-gradient(135deg, #dc2626, #7f1d1d)",
                color: "#fff",
                fontSize: 10,
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "4px 10px",
                borderRadius: 999,
                boxShadow: "0 4px 12px rgba(220,38,38,0.4)",
              }}>{tag}</span>
            ))}
          </div>
        )}

        {/* Duration badge */}
        {itinerary.duration && (
          <div style={{
            position: "absolute", bottom: 12, right: 12,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(8px)",
            color: "#fff",
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 14,
            letterSpacing: "0.12em",
            padding: "4px 12px",
            borderRadius: 999,
          }}>
            {itinerary.duration}
          </div>
        )}

        {/* Trending flame indicator */}
        <div style={{
          position: "absolute", top: 12, right: 12,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(220,38,38,0.3)",
          color: "#fff",
          fontSize: 11,
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          padding: "4px 10px",
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}>
          🔥 Trending
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px 20px 18px", display: "flex", flexDirection: "column" }}>
        {/* Red accent line */}
        <div style={{
          height: 2, width: hovered ? 40 : 20,
          background: "linear-gradient(90deg, #dc2626, #ff6666)",
          borderRadius: 99,
          marginBottom: 12,
          transition: "width 0.4s ease",
          boxShadow: hovered ? "0 0 10px rgba(220,38,38,0.5)" : "none",
        }} />

        <h3 style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 20,
          letterSpacing: "0.04em",
          color: hovered ? "#dc2626" : "#0a0a0a",
          lineHeight: 1.15,
          marginBottom: 8,
          transition: "color 0.3s",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>{itinerary.title}</h3>

        {itinerary.shortDescription && (
          <p style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: 13,
            color: "#9ca3af",
            lineHeight: 1.65,
            flex: 1,
            marginBottom: 12,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>{itinerary.shortDescription}</p>
        )}

        {/* Price */}
        <div style={{ marginBottom: 14 }}>
          {!itinerary.asBestQuote && itinerary.priceFrom > 0 ? (
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 300, fontSize: 11,
                color: "#9ca3af",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}>Starting</span>
              <span style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 22,
                color: "#dc2626",
                letterSpacing: "0.04em",
                textShadow: hovered ? "0 0 20px rgba(220,38,38,0.4)" : "none",
                transition: "text-shadow 0.3s",
              }}>₹{itinerary.priceFrom.toLocaleString("en-IN")}</span>
            </div>
          ) : itinerary.asBestQuote ? (
            <span style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 700, fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#f97316",
            }}>Price on Request</span>
          ) : null}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
          <button
            onClick={(e) => {
                e.stopPropagation();
                navigate(`/get-a-quote/trending/${destinationId}/${itinerary._id}`);
            }}
            style={{
              flex: 1,
              background: "linear-gradient(135deg, #dc2626, #7f1d1d)",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "11px 8px",
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(220,38,38,0.3)",
              transition: "all 0.25s",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(220,38,38,0.5)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(220,38,38,0.3)";
            }}
          >
            Get a Quote
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(
                itinerary.type === "international"
                  ? `/international-itinerary-detail/${destinationId}/${itinerary.slug || itinerary._id}`
                  : `/domestic-itinerary/${destinationId}/${itinerary.slug || itinerary._id}`
              );
            }}
            style={{
              flex: 1,
              background: "transparent",
              color: "#dc2626",
              border: "1.5px solid rgba(220,38,38,0.4)",
              borderRadius: 12,
              padding: "11px 8px",
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.25s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#dc2626";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "#dc2626";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#dc2626";
              e.currentTarget.style.borderColor = "rgba(220,38,38,0.4)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Main ── */
const TrendingDestinationCards = () => {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const destinationName = slugToTitle(destinationId);

  useEffect(() => {
    if (!destinationId) return;
    setLoading(true); setError("");
    
    const fetchAll = async () => {
      try {
        const [res1, res2] = await Promise.all([
          getJson(`/api/itineraries?destination=${encodeURIComponent(destinationId)}`),
          getJson(`/api/agent-itineraries?destination=${encodeURIComponent(destinationId)}`)
        ]);
        
        const merged = [
          ...(res1?.data || []),
          ...(res2?.data || [])
        ];
        
        setItineraries(merged);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Unable to load itineraries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAll();
  }, [destinationId]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,700;0,900;1,400&display=swap');
        @keyframes skeletonShimmer {
          0%   { background-position: -400% 0; }
          100% { background-position: 400% 0; }
        }
        @keyframes headerFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        @keyframes orbPulse {
          from { transform: scale(1); opacity: 0.7; }
          to   { transform: scale(1.15); opacity: 1; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes flameWobble {
          0%,100% { transform: scaleY(1) rotate(-2deg); }
          50%     { transform: scaleY(1.08) rotate(2deg); }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f4f4f5", fontFamily: "'Barlow', sans-serif" }}>

        {/* ── HERO HEADER ── */}
        <div style={{
          position: "relative",
          padding: "72px 24px 64px",
          textAlign: "center",
          overflow: "hidden",
          background: "linear-gradient(135deg, #0a0000 0%, #450a0a 40%, #7f1d1d 75%, #b91c1c 100%)",
        }}>
          {/* Grid overlay */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />

          {/* Glow orbs */}
          {[
            { top: "-20%", right: "-5%", size: 400, delay: "0s" },
            { bottom: "-20%", left: "5%", size: 300, delay: "1.5s" },
          ].map((o, i) => (
            <div key={i} style={{
              position: "absolute",
              width: o.size, height: o.size,
              top: o.top, bottom: o.bottom,
              left: o.left, right: o.right,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(220,38,38,0.25) 0%, transparent 70%)",
              filter: "blur(40px)",
              pointerEvents: "none",
              animation: `orbPulse 6s ease-in-out ${o.delay} infinite alternate`,
            }} />
          ))}

          {/* Spinning dashed ring */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 300, height: 300,
            borderRadius: "50%",
            border: "1px dashed rgba(220,38,38,0.2)",
            animation: "spinSlow 20s linear infinite",
            pointerEvents: "none",
          }} />

          {/* Back button */}
          <button
            onClick={() => navigate("/")}
            style={{
              position: "absolute", top: 20, left: 20,
              display: "flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              color: "rgba(255,200,200,0.85)",
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              padding: "8px 16px",
              borderRadius: 999,
              cursor: "pointer",
              transition: "all 0.25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(220,38,38,0.2)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,200,200,0.85)"; }}
          >
            ← Back
          </button>

          {/* Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(220,38,38,0.2)",
              border: "1px solid rgba(220,38,38,0.35)",
              borderRadius: 999,
              padding: "6px 18px",
              marginBottom: 20,
            }}
          >
            <span style={{ animation: "flameWobble 1.2s ease-in-out infinite", display: "inline-block" }}>🔥</span>
            <span style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 700, fontSize: 10,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#fca5a5",
            }}>Trending Now</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(52px, 9vw, 110px)",
              lineHeight: 0.9,
              color: "#fff",
              letterSpacing: "0.02em",
              marginBottom: 16,
              textShadow: "0 0 80px rgba(220,38,38,0.3)",
            }}
          >
            {destinationName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300, fontSize: 15,
              color: "rgba(252,165,165,0.7)",
              letterSpacing: "0.05em",
            }}
          >
            Trending itineraries curated for this destination
          </motion.p>

          {/* Bottom shimmer bar */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: 2,
            background: "linear-gradient(90deg, transparent, #dc2626, #ff6666, #dc2626, transparent)",
            backgroundSize: "200% auto",
            animation: "shimmer 3s linear infinite",
          }} />
        </div>

        {/* ── CONTENT ── */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px 80px" }}>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{
                  marginBottom: 32,
                  padding: "16px 24px",
                  background: "#fef2f2",
                  border: "1px solid rgba(220,38,38,0.25)",
                  borderRadius: 16,
                  color: "#dc2626",
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  textAlign: "center",
                }}
              >{error}</motion.div>
            )}
          </AnimatePresence>

          {/* Loading */}
          {loading && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 24,
            }}>
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} i={i} />)}
            </div>
          )}

          {/* Results */}
          {!loading && !error && itineraries.length > 0 && (
            <>
              {/* Count pill */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  marginBottom: 28,
                }}
              >
                <div style={{
                  background: "#fff",
                  border: "1px solid rgba(220,38,38,0.15)",
                  borderRadius: 999,
                  padding: "8px 18px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <span style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: 22, color: "#dc2626",
                  }}>{itineraries.length}</span>
                  <span style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 700, fontSize: 10,
                    letterSpacing: "0.25em", textTransform: "uppercase",
                    color: "#9ca3af",
                  }}>
                    {itineraries.length === 1 ? "Itinerary" : "Itineraries"} Found
                  </span>
                </div>
              </motion.div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(268px, 1fr))",
                gap: 24,
              }}>
                {itineraries.map((it, i) => (
                  <ItineraryCard
                    key={it._id}
                    itinerary={it}
                    destinationId={destinationId}
                    index={i}
                  />
                ))}
              </div>
            </>
          )}

          {/* Empty state */}
          {!loading && !error && itineraries.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                padding: "100px 24px",
                textAlign: "center",
              }}
            >
              {/* Decorative circle */}
              <div style={{
                width: 120, height: 120,
                background: "linear-gradient(135deg, #fef2f2, #fee2e2)",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 52,
                marginBottom: 28,
                boxShadow: "0 12px 40px rgba(220,38,38,0.1)",
              }}>🗺️</div>

              <h2 style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 38, color: "#0a0a0a",
                letterSpacing: "0.04em", marginBottom: 12,
              }}>
                No Trending Itineraries Yet
              </h2>
              <p style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 300, fontSize: 15,
                color: "#9ca3af", maxWidth: 400,
                lineHeight: 1.7, marginBottom: 32,
              }}>
                There are no trending itineraries for{" "}
                <strong style={{ color: "#0a0a0a", fontWeight: 700 }}>{destinationName}</strong>{" "}
                at the moment. Check back soon or explore all destinations.
              </p>
              <button
                onClick={() => navigate("/")}
                style={{
                  background: "linear-gradient(135deg, #dc2626, #7f1d1d)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 999,
                  padding: "14px 36px",
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  boxShadow: "0 8px 32px rgba(220,38,38,0.35)",
                  transition: "all 0.3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.04)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(220,38,38,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(220,38,38,0.35)"; }}
              >
                Back to Home
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default TrendingDestinationCards;