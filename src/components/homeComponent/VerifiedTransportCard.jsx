import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Facelessphoto from "../../assets/Facelessphoto.jpg";
import { getImageUrl, API_BASE } from "../../utils/api";
import { motion } from "framer-motion";

const PAUSE_DURATION = 1200;

const injectStyles = () => {
  if (document.getElementById("vtc-rb-styles")) return;
  const s = document.createElement("style");
  s.id = "vtc-rb-styles";
  s.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&family=Inter:wght@400;500;600&display=swap');

    .vtc-scroll::-webkit-scrollbar { display: none; }
    .vtc-scroll { -ms-overflow-style: none; scrollbar-width: none; }

    /* ─────────────────── Keyframes ─────────────────── */
    @keyframes vtc-blink {
      0%,100% { opacity:1 } 50% { opacity:0.3 }
    }
    @keyframes vtc-shimmer {
      0%   { transform: translateX(-120%) skewX(-15deg); }
      100% { transform: translateX(320%)  skewX(-15deg); }
    }
    @keyframes vtc-badge-pop {
      0%   { transform: scale(0.6) rotate(-8deg); opacity: 0; }
      60%  { transform: scale(1.12) rotate(2deg); opacity: 1; }
      100% { transform: scale(1) rotate(0deg);   opacity: 1; }
    }
    @keyframes vtc-glow-pulse {
      0%,100% { box-shadow: 0 0 8px rgba(220,38,38,0.4); }
      50%      { box-shadow: 0 0 20px rgba(220,38,38,0.9), 0 0 40px rgba(30,30,180,0.35); }
    }
    @keyframes vtc-border-run {
      0%   { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }
    @keyframes vtc-float-up {
      0%,100% { transform: translateY(0px); }
      50%      { transform: translateY(-5px); }
    }
    @keyframes vtc-scan {
      0%   { top: 0%; opacity: .6; }
      100% { top: 100%; opacity: 0; }
    }
    @keyframes vtc-stars-in {
      from { opacity:0; transform:translateY(12px) scale(.85); }
      to   { opacity:1; transform:translateY(0)    scale(1); }
    }

    /* ─────────────────── Card shell ─────────────────── */
    .vtc-card {
      background: #fff;
      border-radius: 24px;
      overflow: hidden;
      position: relative;
      display: inline-block;
      vertical-align: top;
      width: 278px;
      margin-right: 20px;
      flex-shrink: 0;
      /* Animated rainbow border on hover via outline trick + pseudo */
      border: 1.5px solid rgba(0,0,0,0.07);
      transition:
        transform   0.55s cubic-bezier(0.22,1,0.36,1),
        box-shadow  0.55s cubic-bezier(0.22,1,0.36,1),
        border-color 0.4s ease;
      box-shadow: 0 4px 24px rgba(0,0,0,0.07);
      cursor: pointer;
    }
    .vtc-card:hover {
      transform: translateY(-14px) scale(1.02);
      border-color: rgba(220,38,38,0.45);
      box-shadow:
        0 30px 60px rgba(220,38,38,0.18),
        0 10px 24px rgba(10,10,80,0.14),
        0 0 0 1px rgba(220,38,38,0.12);
      animation: vtc-glow-pulse 2s ease-in-out infinite;
    }

    /* Shimmer sweep on hover */
    .vtc-card::after {
      content: '';
      position: absolute;
      top: 0; left: 0;
      width: 40%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none;
      z-index: 10;
    }
    .vtc-card:hover::after {
      opacity: 1;
      animation: vtc-shimmer 0.75s ease forwards;
    }

    /* ─────────────────── Image wrapper ─────────────────── */
    .vtc-img-wrap {
      position: relative;
      width: 100%;
      height: 215px;
      overflow: hidden;
    }

    /* ─────────────────── Photo ─────────────────── */
    .vtc-img {
      width: 100%; height: 100%;
      object-fit: cover; display: block;
      transition: transform 0.8s cubic-bezier(0.22,1,0.36,1),
                  filter 0.6s ease;
    }
    .vtc-card:hover .vtc-img {
      transform: scale(1.09);
      filter: brightness(0.82) saturate(1.1);
    }

    /* ─────────────────── Gradient flood (hover) ─────────────────── */
    .vtc-flood {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        rgba(0,0,0,0.92)      0%,
        rgba(10,8,70,0.78)    30%,
        rgba(140,0,0,0.50)    58%,
        transparent           100%
      );
      opacity: 0;
      transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1);
      pointer-events: none;
      z-index: 2;
    }
    .vtc-card:hover .vtc-flood { opacity: 1; }

    /* Scan line animation inside image on hover */
    .vtc-scan-line {
      position: absolute;
      left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(220,38,38,0.7), rgba(80,80,255,0.5), transparent);
      top: 0;
      opacity: 0;
      z-index: 3;
      pointer-events: none;
    }
    .vtc-card:hover .vtc-scan-line {
      animation: vtc-scan 1.1s ease-in-out forwards;
    }

    /* Glowing border line at image bottom */
    .vtc-glow-line {
      position: absolute;
      bottom: 0; left: 5%; right: 5%;
      height: 1.5px;
      background: linear-gradient(90deg,
        transparent,
        rgba(220,38,38,0.9),
        rgba(100,100,255,0.7),
        rgba(0,0,0,0.8),
        transparent
      );
      opacity: 0;
      transition: opacity 0.4s ease 0.12s;
      z-index: 4; pointer-events: none;
      box-shadow: 0 0 8px rgba(220,38,38,0.6);
    }
    .vtc-card:hover .vtc-glow-line { opacity: 1; }

    /* ─────────────────── Stars + label inside image ─────────────────── */
    .vtc-img-info {
      position: absolute;
      bottom: 14px; left: 16px; right: 16px;
      z-index: 5;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.38s ease 0.1s, transform 0.38s ease 0.1s;
      pointer-events: none;
    }
    .vtc-card:hover .vtc-img-info {
      opacity: 1;
      transform: translateY(0);
    }

    /* ─────────────────── Verified badge ─────────────────── */
    .vtc-verified {
      position: absolute; top: 14px; left: 14px; z-index: 6;
      background: #dc2626;
      border-radius: 8px; padding: 5px 12px;
      display: flex; align-items: center; gap: 5px;
      font-family: 'Outfit', sans-serif;
      font-size: 9px; font-weight: 900;
      color: #fff; letter-spacing: 1.5px; text-transform: uppercase;
      box-shadow: 0 4px 14px rgba(220,38,38,0.45);
      animation: vtc-badge-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
    }
    .vtc-card:hover .vtc-verified {
      animation: vtc-float-up 2.5s ease-in-out infinite;
    }

    /* ─────────────────── Card body ─────────────────── */
    .vtc-body {
      padding: 16px 17px 18px;
      background: #fff;
      position: relative;
      z-index: 1;
    }

    /* ─────────────────── CTA button ─────────────────── */
    .vtc-cta {
      width: 100%; border: none; border-radius: 100px;
      font-family: 'Outfit', sans-serif;
      font-weight: 800; font-size: 13px; letter-spacing: 1.5px;
      cursor: pointer;
      background: linear-gradient(90deg, #dc2626 0%, #000000 100%);
      background-size: 200% auto;
      color: #fff; padding: 13px 0;
      transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      text-transform: uppercase;
      box-shadow: 0 4px 15px rgba(220, 38, 38, 0.25);
      display: block;
      position: relative;
      overflow: hidden;
    }
    .vtc-cta:hover {
      background-position: right center;
      transform: scale(1.02) translateY(-1px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);
    }

    /* ─────────────────── View all ─────────────────── */
    .vtc-viewall {
      font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 800;
      letter-spacing: 2px; text-transform: uppercase;
      color: #fff; 
      background: linear-gradient(90deg, #dc2626 0%, #000000 100%);
      border: none; border-radius: 100px;
      padding: 12px 30px; cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex; align-items: center; gap: 8px;
      box-shadow: 0 4px 15px rgba(220, 38, 38, 0.25);
    }
    .vtc-viewall:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
      filter: brightness(1.1);
    }

    /* ─────────────────── Nav buttons ─────────────────── */
    .vtc-nav-btn {
      width: 44px; height: 44px; border-radius: 50%;
      border: 1.5px solid rgba(0,0,0,0.1); background: #fff;
      display: flex; align-items: center; justify-content: center;
      color: #666; cursor: pointer;
      transition: background .25s, color .25s, border-color .25s, transform .25s, box-shadow .25s;
    }
    .vtc-nav-btn:hover {
      background: #dc2626; color: #fff; border-color: #dc2626;
      transform: scale(1.12);
      box-shadow: 0 6px 18px rgba(220,38,38,0.35);
    }
    .vtc-nav-btn:active { transform: scale(0.96); }

    .vtc-live-dot { animation: vtc-blink 1.6s ease-in-out infinite; }

    /* ─────────────────── Mobile card ─────────────────── */
    .vtc-card-mobile {
      display: block !important;
      width: 100% !important;
      margin-right: 0 !important;
    }
  `;
  document.head.appendChild(s);
};

/* ── Stars ── */
const Stars = ({ rating }) => (
  <div style={{ display:"flex", gap:3 }}>
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="12" height="12" viewBox="0 0 20 20"
        fill={i < Math.floor(rating) ? "#ff4444" : "rgba(255,255,255,0.28)"}>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ))}
  </div>
);

/* ── Card ── */
const Card = ({ item, mobile, slideKey, navigate }) => (
  <motion.div
    key={mobile ? slideKey : undefined}
    className={`vtc-card${mobile ? " vtc-card-mobile" : ""}`}
    initial={mobile ? { opacity:0, x:40 } : false}
    animate={mobile ? { opacity:1, x:0 } : false}
    transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
    onClick={() => navigate(`/agent/${item.slug || item.id}`)}
  >
    {/* ── Image zone ── */}
    <div className="vtc-img-wrap">

      {/* Verified badge */}
      <div className="vtc-verified">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        Verified
      </div>

      <img
        src={getImageUrl(item.image)}
        alt={item.title}
        className="vtc-img"
        onError={e => { e.currentTarget.src = item.fallback || ""; }}
      />

      {/* Gradient flood — hover only */}
      <div className="vtc-flood" aria-hidden />
      {/* Scan line — hover only */}
      <div className="vtc-scan-line" aria-hidden />
      {/* Glow line — hover only */}
      <div className="vtc-glow-line" aria-hidden />

      {/* Stars + label — inside image, hover only */}
      <div className="vtc-img-info">
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
          <Stars rating={item.rating} />
          <span style={{
            fontFamily:"'Inter',sans-serif", fontSize:11,
            color:"rgba(255,255,255,0.68)", fontWeight:500,
          }}>
            {item.rating?.toFixed(1)} · {item.reviews} reviews
          </span>
        </div>
        <p style={{
          fontFamily:"'Inter',sans-serif", fontSize:10,
          color:"rgba(255,255,255,0.46)", fontWeight:400,
          margin:0, letterSpacing:".04em",
        }}>
          Certified luxury travel partner
        </p>
      </div>
    </div>

    {/* ── Card body — clean, no overlap ── */}
    <div className="vtc-body">
      <h3 style={{
        fontFamily:"'Outfit',sans-serif", fontSize:17,
        fontWeight:800, color:"#000",
        margin:"0 0 5px", lineHeight:1.2,
        whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
      }}>
        {item.title}
      </h3>

      {item.location && (
        <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:13 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="#dc2626" aria-hidden>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span style={{
            fontFamily:"'Inter',sans-serif", fontSize:12,
            color:"rgba(0,0,0,0.45)", fontWeight:500,
            whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
          }}>
            {item.location}
          </span>
        </div>
      )}

      <button
        className="vtc-cta"
        onClick={e => { e.stopPropagation(); navigate(`/agent/${item.slug || item.id}`); }}
      >
        View Profile
      </button>
    </div>
  </motion.div>
);

/* ── Empty ── */
const Empty = () => (
  <div style={{
    background:"rgba(220,38,38,0.04)", border:"1px dashed rgba(220,38,38,0.2)",
    borderRadius:12, padding:"46px 24px", textAlign:"center",
    fontFamily:"'Outfit',sans-serif", color:"rgba(0,0,0,0.35)", fontSize:14, letterSpacing:1,
  }}>
    No verified partners available yet.
  </div>
);

/* ══════════════════════════════════════════════ */
const VerifiedTransportCard = () => {
  const [data, setData]                 = useState([]);
  const scrollRef                       = useRef(null);
  const rafRef                          = useRef(null);
  const pauseTimeout                    = useRef(null);
  const [isPaused, setIsPaused]         = useState(false);
  const [isMobile, setIsMobile]         = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideKey, setSlideKey]         = useState(0);
  const isDragging                      = useRef(false);
  const startX                          = useRef(0);
  const scrollLeftRef                   = useRef(0);
  const navigate                        = useNavigate();

  useEffect(() => { injectStyles(); }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/agents/verified`);
        setData((res.data.data || []).map(a => ({
          id:       a._id,
          slug:     (a.company || `${a.firstName}-${a.lastName}`).toLowerCase().replace(/\s+/g,"-"),
          image:    a.photo || Facelessphoto,
          fallback: Facelessphoto,
          title:    a.company || `${a.firstName} ${a.lastName}`,
          location: a.companyAddress
            ? `${a.companyAddress.city}, ${a.companyAddress.state}`
            : "",
          rating: 4.5, reviews: 0,
        })));
      } catch { setData([]); }
    })();
  }, []);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  /* Mobile auto-slide */
  useEffect(() => {
    if (!isMobile || isPaused || !data.length) return;
    const iv = setInterval(() => {
      setCurrentIndex(p => (p+1) % data.length);
      setSlideKey(k => k+1);
    }, 4000);
    return () => clearInterval(iv);
  }, [isMobile, isPaused, data.length]);

  /* Desktop RAF scroll */
  useEffect(() => {
    if (isMobile) return;
    const el = scrollRef.current; if (!el) return;
    const step = () => {
      if (!isPaused && !isDragging.current) {
        el.scrollLeft += 1.0;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused, isMobile, data.length]);

  const pause  = ()                    => { setIsPaused(true); clearTimeout(pauseTimeout.current); };
  const resume = (d = PAUSE_DURATION)  => { pauseTimeout.current = setTimeout(() => setIsPaused(false), d); };

  const onMD = e => { isDragging.current=true; startX.current=e.pageX-scrollRef.current.offsetLeft; scrollLeftRef.current=scrollRef.current.scrollLeft; pause(); };
  const onMU = () => { isDragging.current=false; resume(); };
  const onML = () => { isDragging.current=false; resume(); };
  const onMM = e => { if(!isDragging.current) return; e.preventDefault(); scrollRef.current.scrollLeft=scrollLeftRef.current-(e.pageX-scrollRef.current.offsetLeft-startX.current); };
  const onTS = e => { isDragging.current=true; startX.current=e.touches[0].pageX-scrollRef.current.offsetLeft; scrollLeftRef.current=scrollRef.current.scrollLeft; pause(); };
  const onTM = e => { if(!isDragging.current) return; e.preventDefault(); scrollRef.current.scrollLeft=scrollLeftRef.current-(e.touches[0].pageX-scrollRef.current.offsetLeft-startX.current); };
  const onTE = () => { isDragging.current=false; resume(); };

  const navClick = dir => {
    if (isMobile) {
      setCurrentIndex(p => dir==="next" ? (p+1)%data.length : (p-1+data.length)%data.length);
      setSlideKey(k=>k+1); pause(); resume(3000);
    } else {
      scrollRef.current.scrollBy({ left: dir==="next" ? 298 : -298, behavior:"smooth" });
      pause(); resume();
    }
  };

  return (
    <div style={{ width:"100%", padding:"96px 0", background:"#fff", position:"relative", overflow:"hidden" }}>

      {/* Subtle grid */}
      <div aria-hidden style={{
        position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:`linear-gradient(rgba(220,38,38,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(220,38,38,.03) 1px,transparent 1px)`,
        backgroundSize:"56px 56px",
      }} />

      <div style={{ maxWidth: 1800, margin: "0 auto", padding: "0 clamp(32px, 7vw, 100px)", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <div style={{
          display:"flex", flexWrap:"wrap",
          justifyContent:"space-between", alignItems:"flex-end",
          marginBottom:52, gap:20,
        }}>
          <div>
            <motion.div
              initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }}
              style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}
            >
              <span style={{ width:36, height:2, background:"#dc2626", borderRadius:99, display:"inline-block" }} />
              <span style={{
                fontFamily:"'Outfit',sans-serif", fontWeight:900,
                fontSize:9, letterSpacing:".4em", textTransform:"uppercase", color:"#dc2626",
              }}>Global Network</span>
            </motion.div>

            <motion.h2
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              style={{
                fontFamily:"'Outfit',sans-serif", fontWeight:900,
                fontSize:"clamp(34px,5vw,52px)",
                color:"#000", lineHeight:1.05,
                letterSpacing:"-.02em", margin:"0 0 14px",
              }}
            >
              Verified{" "}
              <span style={{ color:"#dc2626", fontWeight:300, fontStyle:"italic" }}>Travel Partners</span>
            </motion.h2>

            <motion.div
              initial={{ scaleX:0 }} whileInView={{ scaleX:1 }}
              viewport={{ once:true }}
              transition={{ duration:.95, ease:"circOut", delay:.3 }}
              style={{
                height:3, width:220,
                background:"linear-gradient(90deg,#dc2626,#1a1a4e,#000)",
                borderRadius:99, transformOrigin:"left",
                boxShadow:"0 0 14px rgba(220,38,38,.4)",
              }}
            />
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <button className="vtc-viewall" onClick={() => navigate("/verified-transporters-list")}>
              Explore Network <span aria-hidden>→</span>
            </button>
            <div style={{ display:"flex", gap:8 }}>
              {["prev","next"].map(dir => (
                <button key={dir} className="vtc-nav-btn" onClick={() => navClick(dir)} aria-label={dir}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {dir==="prev"
                      ? <path d="M15 19l-7-7 7-7"/>
                      : <path d="M9 5l7 7-7 7"/>}
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Cards ── */}
        {isMobile ? (
          <div style={{ padding:"0 4px" }}>
            {data.length === 0 ? <Empty /> : (
              <Card key={slideKey} item={data[currentIndex]} mobile slideKey={slideKey} navigate={navigate} />
            )}
            {data.length > 0 && (
              <div style={{ display:"flex", justifyContent:"center", gap:6, marginTop:20 }}>
                {data.map((_,i) => (
                  <button key={i} aria-label={`Slide ${i+1}`}
                    onClick={() => { setCurrentIndex(i); setSlideKey(k=>k+1); pause(); resume(3000); }}
                    style={{
                      height:5, borderRadius:99, border:"none", cursor:"pointer", padding:0,
                      width: i===currentIndex ? 28 : 7,
                      background: i===currentIndex ? "#dc2626" : "rgba(0,0,0,0.15)",
                      transition:"all .3s ease",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ) : data.length === 0 ? <Empty /> : (
          <div
            ref={scrollRef}
            className="vtc-scroll"
            style={{ overflow:"hidden", whiteSpace:"nowrap", padding:"14px 0 18px", cursor:"grab", userSelect:"none" }}
            onMouseDown={onMD} onMouseUp={onMU} onMouseLeave={onML}
            onMouseMove={onMM} onMouseEnter={pause}
            onTouchStart={onTS} onTouchMove={onTM} onTouchEnd={onTE}
          >
            {[...data,...data].map((item,i) => (
              <Card key={i} item={item} mobile={false} navigate={navigate} />
            ))}
          </div>
        )}

        {/* Live dot */}
        {data.length > 0 && !isMobile && (
          <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:26, opacity:.32 }}>
            <div className="vtc-live-dot" style={{ width:8, height:8, borderRadius:"50%", background:"#dc2626" }} />
            <span style={{
              fontFamily:"'Outfit',sans-serif", fontSize:9, fontWeight:900,
              textTransform:"uppercase", letterSpacing:".3em", color:"#555",
            }}>
              {data.length} Verified Partners Active
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifiedTransportCard;