/**
 * Packages (Explore All)
 * Redesigned — Professional Luxury Red Theme
 */

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getJson, getImageUrl } from "../utils/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiSearch, HiOutlineMap, HiOutlineChevronRight,
  HiOutlineClock, HiOutlineGlobe, HiOutlineSparkles,
} from "react-icons/hi";
import { usePageHero } from "../hooks/usePageHero";

/* ─────────────────────────────── helpers ─────────────────────────────── */
const FALLBACK = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop";
const ITEMS_PER_PAGE = 8;

/* ─────────────────────────────── skeleton ────────────────────────────── */
const CardSkeleton = () => (
  <div className="pkg-card-skeleton">
    <div className="pkg-sk-img" />
    <div className="pkg-sk-body">
      <div className="pkg-sk-line w-1/2" />
      <div className="pkg-sk-line w-3/4" style={{ height: 20, marginTop: 8 }} />
      <div className="pkg-sk-line w-full" style={{ marginTop: 24 }} />
    </div>
  </div>
);

/* ─────────────────────────────── main ───────────────────────────────── */
const Packages = () => {
  const [searchParams]  = useSearchParams();
  const typeFilter      = searchParams.get("type"); // "domestic" or "international"
  const agentIdFilter   = searchParams.get("agentId");

  const [activeTab, setActiveTab]       = useState(typeFilter || "all");
  const [itineraries, setItineraries]   = useState([]);
  const [loading, setLoading]           = useState(true);
  const [searchQuery, setSearchQuery]   = useState("");
  const [currentPage, setCurrentPage]   = useState(1);
  const [hoveredId, setHoveredId]       = useState(null);

  const navigate        = useNavigate();
  const { mediaUrl, isVideo } = usePageHero("Packages");
  const displayUrl = mediaUrl || FALLBACK;

  /* fetch */
  const fetchItineraries = useCallback(async () => {
    setLoading(true);
    try {
      const typeParam  = activeTab === "all" ? "" : `&type=${activeTab}`;
      const agentParam = agentIdFilter ? `&agentId=${agentIdFilter}` : "";
      const res = await getJson(`/api/agent-itineraries?limit=100${typeParam}${agentParam}`);
      if (res?.data) {
        setItineraries(res.data);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching packages:", err);
      // Keep loading as true to show skeletons if backend is unreachable
    }
  }, [activeTab, agentIdFilter]);

  useEffect(() => { 
    if (typeFilter && typeFilter !== activeTab) {
      setActiveTab(typeFilter);
    }
  }, [typeFilter, activeTab]);

  useEffect(() => { fetchItineraries(); setCurrentPage(1); }, [fetchItineraries]);

  const filtered = itineraries.filter(it =>
    it.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    it.destination?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages         = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentItineraries = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCardClick = (it) => {
    const base = it.type === "international" ? "international-itinerary-detail" : "domestic-itinerary";
    const dest = it.destination?.toLowerCase().replace(/\s+/g, "-") || "all";
    navigate(`/${base}/${dest}/${it.slug || it._id}`);
  };

  return (
    <div className="pkg-root">

      {/* ───────────── STYLES ───────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

        /* ── Root & tokens ── */
        .pkg-root {
          min-height: 100vh;
          background: #fdfdfd;
          font-family: 'Poppins', sans-serif;
          --red:     #dc2626;
          --red-d:   #991b1b;
          --red-l:   #fee2e2;
          --rose:    #e11d48;
          --slate:   #64748b;
          --slate-d: #0f172a;
          --border:  #f1f1f1;
          --card-bg: #ffffff;
        }

        /* ── Hero ── */
        .pkg-hero {
          position: relative;
          width: 100%;
          height: 58vh;
          min-height: 460px;
          background: #0f172a;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .pkg-hero-media {
          position: absolute; inset: 0; z-index: 0;
        }
        .pkg-hero-media img,
        .pkg-hero-media video {
          width: 100%; height: 100%; object-fit: cover; opacity: 0.25;
        }
        .pkg-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(120deg, rgba(15,23,42,0.95) 0%, rgba(220,38,38,0.25) 60%, transparent 100%);
        }
        .pkg-hero-fade {
          position: absolute; inset-x: 0; bottom: 0; height: 140px;
          background: linear-gradient(to top, #fdfdfd, transparent);
        }

        /* Animated grid lines on hero */
        .pkg-hero-grid {
          position: absolute; inset: 0; z-index: 0; overflow: hidden; opacity: 0.06;
        }
        .pkg-hero-grid::before,
        .pkg-hero-grid::after {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(220,38,38,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220,38,38,0.6) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .pkg-hero-grid::after {
          background-size: 300px 300px;
          opacity: 0.4;
        }

        .pkg-hero-inner {
          position: relative; z-index: 10;
          max-width: 1400px; margin: 0 auto; padding: 0 48px;
          width: 100%;
        }

        .pkg-hero-eyebrow {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 20px;
        }
        .pkg-hero-eyebrow span {
          font-size: 10px; font-weight: 800;
          letter-spacing: 0.45em; text-transform: uppercase;
          color: #fca5a5;
        }
        .pkg-hero-eyebrow-line {
          width: 40px; height: 1.5px;
          background: linear-gradient(90deg, #ef4444, transparent);
        }

        .pkg-hero-h1 {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(40px, 6vw, 80px);
          font-weight: 900;
          color: #fff;
          line-height: 0.95;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
        }
        .pkg-hero-accent {
          background: linear-gradient(135deg, #ef4444, #fca5a5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .pkg-hero-sub {
          color: #94a3b8;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.7;
          max-width: 520px;
        }

        /* Hero stat chips */
        .pkg-hero-chips {
          display: flex; gap: 12px; margin-top: 32px; flex-wrap: wrap;
        }
        .pkg-hero-chip {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          border-radius: 100px;
          padding: 8px 18px;
          font-size: 10px; font-weight: 700; color: #f1f5f9;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .pkg-hero-chip-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--red);
        }

        /* ── Toolbar ── */
        .pkg-toolbar {
          position: sticky; top: 0; z-index: 40;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 1px 24px rgba(220,38,38,0.04);
        }
        .pkg-toolbar-inner {
          max-width: 1400px; margin: 0 auto; padding: 0 48px;
          height: 72px;
          display: flex; align-items: center; justify-content: space-between; gap: 24px;
        }

        /* Tab group */
        .pkg-tabs {
          display: flex; gap: 2px;
          background: #f1f5f9; border-radius: 12px; padding: 4px;
        }
        .pkg-tab {
          padding: 8px 20px;
          border-radius: 9px;
          border: none; background: none;
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.25s ease;
          color: #94a3b8;
        }
        .pkg-tab.active {
          background: var(--slate-d);
          color: #fff;
          box-shadow: 0 2px 12px rgba(15,23,42,0.18);
        }
        .pkg-tab:not(.active):hover { color: var(--slate-d); }

        /* Result count */
        .pkg-result-count {
          font-size: 12px; font-weight: 600; color: #94a3b8;
          white-space: nowrap;
        }
        .pkg-result-count strong { color: var(--red); }

        /* Search */
        .pkg-search-wrap {
          position: relative; width: 320px; flex-shrink: 0;
        }
        .pkg-search {
          width: 100%;
          padding: 10px 16px 10px 42px;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          background: #fff;
          font-size: 13px; font-weight: 500;
          color: var(--slate-d);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: 'Poppins', sans-serif;
        }
        .pkg-search::placeholder { color: #cbd5e1; }
        .pkg-search:focus {
          border-color: var(--red);
          box-shadow: 0 0 0 3px rgba(220,38,38,0.10);
        }
        .pkg-search-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: #94a3b8; pointer-events: none;
        }

        /* ── Grid ── */
        .pkg-grid-wrap {
          max-width: 1400px; margin: 0 auto; padding: 56px 48px 80px;
        }
        .pkg-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 28px;
        }

        /* ── Card ── */
        .pkg-card {
          background: var(--card-bg);
          border-radius: 20px;
          overflow: hidden;
          border: 1.5px solid var(--border);
          display: flex; flex-direction: column;
          cursor: pointer;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          position: relative;
        }
        .pkg-card:hover {
          border-color: #fecaca;
          box-shadow:
            0 0 0 1px #fee2e2,
            0 20px 60px rgba(220,38,38,0.08),
            0 4px 16px rgba(0,0,0,0.04);
          transform: translateY(-4px);
        }

        /* Card shimmer on hover */
        .pkg-card::after {
          content: '';
          position: absolute; inset: 0; z-index: 2;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0s;
          pointer-events: none;
        }
        .pkg-card:hover::after {
          transform: translateX(100%);
          transition: transform 0.5s ease;
        }

        /* Image area */
        .pkg-card-img-wrap {
          position: relative; height: 220px; overflow: hidden;
          background: #f1f5f9;
        }
        .pkg-card-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.7s ease;
        }
        .pkg-card:hover .pkg-card-img { transform: scale(1.06); }

        /* Image gradient overlay */
        .pkg-card-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(15,23,42,0.55) 0%, transparent 55%);
        }

        /* Type badge */
        .pkg-type-badge {
          position: absolute; top: 14px; left: 14px; z-index: 3;
          padding: 5px 12px; border-radius: 8px;
          background: rgba(15,23,42,0.85); backdrop-filter: blur(8px);
          color: #fff; font-size: 9px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.12em;
          border: 1px solid rgba(255,255,255,0.10);
        }
        .pkg-type-badge.international { background: var(--red); }

        /* Duration chip */
        .pkg-dur-chip {
          position: absolute; bottom: 14px; left: 14px; z-index: 3;
          display: flex; align-items: center; gap: 5px;
          background: rgba(255,255,255,0.92); backdrop-filter: blur(8px);
          border-radius: 8px; padding: 5px 10px;
          font-size: 10px; font-weight: 700; color: var(--red-d);
        }

        /* Card body */
        .pkg-card-body {
          padding: 20px 22px 22px;
          display: flex; flex-direction: column; flex: 1;
        }
        .pkg-card-meta {
          display: flex; align-items: center; gap: 6px;
          margin-bottom: 10px;
        }
        .pkg-card-dest {
          font-size: 10px; font-weight: 800; color: var(--red);
          text-transform: uppercase; letter-spacing: 0.12em;
        }
        .pkg-card-sep {
          width: 3px; height: 3px; border-radius: 50%; background: #cbd5e1;
        }
        .pkg-card-agent {
          font-size: 10px; font-weight: 600; color: #94a3b8;
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .pkg-card-title {
          font-family: 'Poppins', sans-serif;
          font-size: 17px; font-weight: 700; color: var(--slate-d);
          line-height: 1.35; margin-bottom: 0;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
          transition: color 0.2s;
        }
        .pkg-card:hover .pkg-card-title { color: var(--red); }

        /* Card footer */
        .pkg-card-footer {
          margin-top: auto; padding-top: 18px;
          border-top: 1px solid #f1f5f9;
          display: flex; align-items: center; justify-content: space-between;
        }
        .pkg-price-label {
          font-size: 9px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.12em; color: #94a3b8; margin-bottom: 3px;
        }
        .pkg-price {
          font-family: 'Poppins', sans-serif;
          font-size: 20px; font-weight: 800; color: var(--slate-d);
          display: flex; align-items: baseline; gap: 2px;
        }
        .pkg-price-sym { font-size: 13px; color: var(--red); font-weight: 700; }
        .pkg-price-on-req { font-size: 14px; color: #94a3b8; font-weight: 600; }
        .pkg-cta-btn {
          width: 40px; height: 40px; border-radius: 12px;
          background: #f1f5f9; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #94a3b8;
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }
        .pkg-card:hover .pkg-cta-btn {
          background: var(--red);
          color: #fff;
          transform: translateX(2px);
        }

        /* ── Skeleton ── */
        .pkg-card-skeleton {
          background: var(--card-bg);
          border-radius: 20px;
          overflow: hidden;
          border: 1.5px solid var(--border);
        }
        .pkg-sk-img {
          height: 220px;
          background: linear-gradient(90deg, #f1f5f9 25%, #e8eef8 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: pkgShimmer 1.4s ease infinite;
        }
        .pkg-sk-body { padding: 20px 22px; }
        .pkg-sk-line {
          height: 12px; border-radius: 6px; margin-bottom: 10px;
          background: linear-gradient(90deg, #f1f5f9 25%, #e8eef8 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: pkgShimmer 1.4s ease infinite;
        }
        .pkg-sk-line.w-1\/2 { width: 50%; }
        .pkg-sk-line.w-3\/4 { width: 75%; }
        .pkg-sk-line.w-full  { width: 100%; }

        @keyframes pkgShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Pagination ── */
        .pkg-pagination {
          display: flex; align-items: center; justify-content: center;
          gap: 8px; margin-top: 64px; flex-wrap: wrap;
        }
        .pkg-page-btn {
          height: 40px; min-width: 40px; padding: 0 14px;
          border-radius: 10px; border: 1.5px solid var(--border);
          background: #fff; cursor: pointer;
          font-size: 12px; font-weight: 700; color: #64748b;
          transition: all 0.2s;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Poppins', sans-serif;
        }
        .pkg-page-btn:hover:not(:disabled) { border-color: var(--red); color: var(--red); }
        .pkg-page-btn.active { background: var(--slate-d); color: #fff; border-color: var(--slate-d); box-shadow: 0 4px 14px rgba(15,23,42,0.18); }
        .pkg-page-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .pkg-page-sep { color: #94a3b8; font-size: 16px; padding: 0 4px; }

        /* ── Empty state ── */
        .pkg-empty {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; padding: 120px 24px; text-align: center;
        }
        .pkg-empty-icon {
          width: 88px; height: 88px; border-radius: 24px;
          background: linear-gradient(135deg, #fff1f2, #fee2e2);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 28px;
          box-shadow: 0 8px 32px rgba(220,38,38,0.12);
        }
        .pkg-empty-title {
          font-family: 'Poppins', sans-serif;
          font-size: 28px; font-weight: 800; color: var(--slate-d);
          margin-bottom: 12px; letter-spacing: -0.02em;
        }
        .pkg-empty-sub {
          color: #94a3b8; font-size: 15px; line-height: 1.6;
          max-width: 360px; margin-bottom: 32px;
        }
        .pkg-reset-btn {
          padding: 14px 32px; border-radius: 14px;
          background: linear-gradient(135deg, var(--red), var(--rose));
          color: #fff; font-size: 11px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.14em;
          border: none; cursor: pointer;
          box-shadow: 0 8px 24px rgba(220,38,38,0.2);
          transition: transform 0.2s, box-shadow 0.2s;
          font-family: 'Poppins', sans-serif;
        }
        .pkg-reset-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(37,99,235,0.35); }

        /* Section header above grid */
        .pkg-section-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          margin-bottom: 36px;
        }
        .pkg-section-title {
          font-family: 'Poppins', sans-serif;
          font-size: 28px; font-weight: 800; color: var(--slate-d);
          letter-spacing: -0.02em;
        }
        .pkg-section-title span { color: var(--red); }
        .pkg-section-sub {
          font-size: 13px; color: #94a3b8; font-weight: 500; margin-top: 4px;
        }

        @media (max-width: 768px) {
          .pkg-toolbar-inner { flex-wrap: wrap; height: auto; padding: 14px 20px; gap: 12px; }
          .pkg-search-wrap { width: 100%; }
          .pkg-grid-wrap { padding: 32px 20px 60px; }
          .pkg-hero-inner { padding: 0 24px; }
          .pkg-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ═══════════════ HERO ═══════════════ */}
      <div className="pkg-hero">
        <div className="pkg-hero-grid" />
        <div className="pkg-hero-media">
          {isVideo
            ? <video src={displayUrl} autoPlay loop muted playsInline />
            : <img src={displayUrl} alt="Packages" />}
        </div>
        <div className="pkg-hero-overlay" />
        <div className="pkg-hero-fade" />

        <div className="pkg-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pkg-hero-eyebrow">
              <div className="pkg-hero-eyebrow-line" />
              <span>Curated Exclusivity</span>
            </div>

            <h1 className="pkg-hero-h1">
              Signature <br />
              <span className="pkg-hero-accent">Collections.</span>
            </h1>

            <p className="pkg-hero-sub">
              Meticulously curated travel experiences — from private island escapes
              to high-altitude retreats — designed for those who demand the finest.
            </p>

            <div className="pkg-hero-chips">
              {[
                { dot: "#60a5fa", text: "120+ Destinations" },
                { dot: "#a78bfa", text: "Domestic & International" },
                { dot: "#34d399", text: "Expert-Curated Itineraries" },
              ].map((c) => (
                <div key={c.text} className="pkg-hero-chip">
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, display: "inline-block" }} />
                  {c.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════ TOOLBAR ═══════════════ */}
      <div className="pkg-toolbar">
        <div className="pkg-toolbar-inner">
          {/* Tabs */}
          <div className="pkg-tabs">
            {["all", "domestic", "international"].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                className={`pkg-tab${activeTab === tab ? " active" : ""}`}
              >
                {tab === "all" ? "All Packages" : tab === "domestic" ? "Domestic" : "International"}
              </button>
            ))}
          </div>

          {/* Result count */}
          {!loading && (
            <span className="pkg-result-count">
              <strong>{filtered.length}</strong> packages found
            </span>
          )}

          {/* Search */}
          <div className="pkg-search-wrap">
            <HiSearch className="pkg-search-icon" size={17} />
            <input
              className="pkg-search"
              type="text"
              placeholder="Search destination or package…"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>
      </div>

      {/* ═══════════════ MAIN GRID ═══════════════ */}
      <div className="pkg-grid-wrap">

        {/* Section header */}
        {!loading && filtered.length > 0 && (
          <motion.div
            className="pkg-section-header"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className="pkg-section-title">
                {activeTab === "all" ? "All " : activeTab === "domestic" ? "Domestic " : "International "}
                <span>Packages</span>
              </div>
              <div className="pkg-section-sub">
                Page {currentPage} of {totalPages} · {filtered.length} itineraries
              </div>
            </div>
          </motion.div>
        )}

        {/* Cards */}
        {loading ? (
          <div className="pkg-grid">
            {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="pkg-grid">
            <AnimatePresence mode="popLayout">
              {currentItineraries.map((it, i) => (
                <motion.div
                  layout
                  key={it._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.38, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="pkg-card"
                  onClick={() => handleCardClick(it)}
                  onMouseEnter={() => setHoveredId(it._id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Image */}
                  <div className="pkg-card-img-wrap">
                    <img
                      className="pkg-card-img"
                      src={getImageUrl(it.coverImageUrl) || FALLBACK}
                      alt={it.title}
                      onError={(e) => { e.target.src = FALLBACK; }}
                    />
                    <div className="pkg-card-img-overlay" />
                    <span className={`pkg-type-badge${it.type === "international" ? " international" : ""}`}>
                      {it.type}
                    </span>
                    {(it.duration) && (
                      <div className="pkg-dur-chip">
                        <HiOutlineClock size={11} style={{ color: "#2563eb" }} />
                        {it.duration}
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="pkg-card-body">
                    <div className="pkg-card-meta">
                      <span className="pkg-card-dest">{it.destination || "Global"}</span>
                      <span className="pkg-card-sep" />
                      <span className="pkg-card-agent">{it.agentId?.company || "Verified Expert"}</span>
                    </div>
                    <h3 className="pkg-card-title">{it.title}</h3>

                    <div className="pkg-card-footer">
                      <div>
                        <div className="pkg-price-label">Starting From</div>
                        <div className="pkg-price">
                          {it.priceFrom > 0 ? (
                            <>
                              <span className="pkg-price-sym">₹</span>
                              {it.priceFrom.toLocaleString("en-IN")}
                            </>
                          ) : (
                            <span className="pkg-price-on-req">On Request</span>
                          )}
                        </div>
                      </div>
                      <button className="pkg-cta-btn" aria-label="View details">
                        <HiOutlineChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* ── Pagination ── */}
        {!loading && totalPages > 1 && (
          <div className="pkg-pagination">
            <button
              className="pkg-page-btn"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push("…");
                acc.push(p);
                return acc;
              }, [])
              .map((item, i) =>
                item === "…" ? (
                  <span key={`sep-${i}`} className="pkg-page-sep">…</span>
                ) : (
                  <button
                    key={item}
                    className={`pkg-page-btn${currentPage === item ? " active" : ""}`}
                    onClick={() => setCurrentPage(item)}
                  >
                    {item}
                  </button>
                )
              )}

            <button
              className="pkg-page-btn"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && filtered.length === 0 && (
          <motion.div
            className="pkg-empty"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="pkg-empty-icon">
              <HiOutlineGlobe size={36} style={{ color: "#2563eb" }} />
            </div>
            <div className="pkg-empty-title">No Packages Found</div>
            <p className="pkg-empty-sub">
              We couldn't find any packages matching your search.
              Try adjusting your filters or destination.
            </p>
            <button
              className="pkg-reset-btn"
              onClick={() => { setActiveTab("all"); setSearchQuery(""); setCurrentPage(1); }}
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Packages;