import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgimage from "../../assets/images/logo/newImage1.jpg";

const injectStyles = () => {
  if (document.getElementById("hcu-styles")) return;
  const s = document.createElement("style");
  s.id = "hcu-styles";
  s.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

    /* ── Section ── */
    .hcu-section {
      position: relative;
      width: 100%;
      height: 460px;
      overflow: hidden;
      margin-bottom: 48px;
    }

    /* ── Background image ── */
    .hcu-bg {
      position: absolute;
      inset: 0;
      width: 100%; height: 100%;
      object-fit: cover;
      transform: scale(1.06);
      transition: transform 8s cubic-bezier(0.22, 1, 0.36, 1);
      will-change: transform;
    }
    .hcu-section.hcu-visible .hcu-bg {
      transform: scale(1);
    }

    /* ── Overlay layers ── */
    .hcu-overlay {
      position: absolute;
      inset: 0;
    }
    /* Deep gradient left */
    .hcu-overlay-1 {
      background: linear-gradient(
        100deg,
        rgba(5,5,5,0.82) 0%,
        rgba(5,5,5,0.55) 45%,
        rgba(5,5,5,0.15) 100%
      );
    }
    /* Red accent stripe */
    .hcu-overlay-2 {
      background: linear-gradient(
        100deg,
        rgba(185,20,20,0.22) 0%,
        transparent 50%
      );
    }
    /* Bottom vignette */
    .hcu-overlay-3 {
      background: linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%);
    }

    /* ── Decorative vertical line ── */
    .hcu-line {
      position: absolute;
      top: 0; bottom: 0;
      left: 56px;
      width: 1px;
      background: linear-gradient(to bottom, transparent, rgba(220,38,38,0.6), transparent);
      transform: scaleY(0);
      transform-origin: top;
      transition: transform 0.9s 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .hcu-section.hcu-visible .hcu-line { transform: scaleY(1); }

    /* ── Content container ── */
    .hcu-content {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      padding: 0 80px;
    }

    /* ── Inner text block ── */
    .hcu-inner {
      max-width: 420px;
    }

    /* Eyebrow */
    .hcu-eyebrow {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 18px;
      opacity: 0;
      transform: translateY(16px);
      transition: opacity 0.6s 0.2s ease, transform 0.6s 0.2s cubic-bezier(0.22,1,0.36,1);
    }
    .hcu-section.hcu-visible .hcu-eyebrow {
      opacity: 1; transform: translateY(0);
    }
    .hcu-eyebrow-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: #dc2626;
      animation: hcu-blink 2s ease-in-out infinite;
    }
    @keyframes hcu-blink {
      0%,100% { opacity:1; transform:scale(1); }
      50%      { opacity:0.4; transform:scale(0.7); }
    }
    .hcu-eyebrow-text {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 10px; font-weight: 700;
      letter-spacing: 0.38em; text-transform: uppercase;
      color: rgba(255,255,255,0.55);
    }

    /* Heading */
    .hcu-heading {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(34px, 4vw, 52px);
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: -0.02em;
      color: #fff;
      margin: 0 0 10px;
      opacity: 0;
      transform: translateY(22px);
      transition: opacity 0.7s 0.35s ease, transform 0.7s 0.35s cubic-bezier(0.22,1,0.36,1);
    }
    .hcu-section.hcu-visible .hcu-heading {
      opacity: 1; transform: translateY(0);
    }
    .hcu-heading em {
      font-style: italic;
      color: #f87171;
    }

    /* Subtext */
    .hcu-sub {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 14px; font-weight: 400;
      color: rgba(255,255,255,0.48);
      line-height: 1.6;
      margin: 0 0 32px;
      opacity: 0;
      transform: translateY(18px);
      transition: opacity 0.7s 0.5s ease, transform 0.7s 0.5s cubic-bezier(0.22,1,0.36,1);
    }
    .hcu-section.hcu-visible .hcu-sub {
      opacity: 1; transform: translateY(0);
    }

    /* CTA group */
    .hcu-cta-group {
      display: flex;
      align-items: center;
      gap: 16px;
      opacity: 0;
      transform: translateY(18px);
      transition: opacity 0.7s 0.62s ease, transform 0.7s 0.62s cubic-bezier(0.22,1,0.36,1);
    }
    .hcu-section.hcu-visible .hcu-cta-group {
      opacity: 1; transform: translateY(0);
    }

    /* Primary button */
    .hcu-btn-primary {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 12px; font-weight: 800;
      letter-spacing: 0.15em; text-transform: uppercase;
      color: #fff;
      background: linear-gradient(90deg, #dc2626 0%, #000000 100%);
      background-size: 200% auto;
      border: none;
      border-radius: 100px;
      padding: 14px 32px;
      cursor: pointer;
      position: relative; overflow: hidden;
      transition: all 0.4s ease;
      box-shadow: 0 8px 25px rgba(220, 38, 38, 0.3);
    }
    .hcu-btn-primary:hover { 
      background-position: right center;
      transform: scale(1.05) translateY(-2px);
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
    }
    .hcu-btn-primary span { position: relative; z-index: 1; }

    /* Secondary link */
    .hcu-btn-secondary {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 12px; font-weight: 600;
      letter-spacing: 0.08em; text-transform: uppercase;
      color: rgba(255,255,255,0.55);
      background: none; border: none; cursor: pointer;
      display: flex; align-items: center; gap: 6px;
      transition: color 0.3s ease;
    }
    .hcu-btn-secondary:hover { color: #fff; }
    .hcu-btn-secondary .hcu-arr {
      display: inline-block;
      transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
    }
    .hcu-btn-secondary:hover .hcu-arr { transform: translateX(5px); }

    /* ── Floating stat cards ── */
    .hcu-stats {
      position: absolute;
      right: 80px; bottom: 48px;
      display: flex; gap: 12px;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.7s 0.75s ease, transform 0.7s 0.75s cubic-bezier(0.22,1,0.36,1);
    }
    .hcu-section.hcu-visible .hcu-stats { opacity: 1; transform: translateY(0); }

    .hcu-stat {
      background: rgba(255,255,255,0.08);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 14px;
      padding: 14px 20px;
      text-align: center;
      min-width: 90px;
      transition: background 0.3s, transform 0.35s cubic-bezier(0.22,1,0.36,1);
    }
    .hcu-stat:hover {
      background: rgba(255,255,255,0.14);
      transform: translateY(-4px);
    }
    .hcu-stat-num {
      font-family: 'Playfair Display', serif;
      font-size: 22px; font-weight: 900;
      color: #fff; line-height: 1;
      margin-bottom: 4px;
    }
    .hcu-stat-label {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 9px; font-weight: 600;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: rgba(255,255,255,0.42);
    }

    /* ── Decorative corner element ── */
    .hcu-corner {
      position: absolute;
      top: 32px; right: 80px;
      display: flex; align-items: center; gap: 8px;
      opacity: 0;
      transition: opacity 0.6s 0.9s ease;
    }
    .hcu-section.hcu-visible .hcu-corner { opacity: 1; }
    .hcu-corner-dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: #dc2626;
    }
    .hcu-corner-text {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 9px; font-weight: 600;
      letter-spacing: 0.25em; text-transform: uppercase;
      color: rgba(255,255,255,0.3);
    }

    @media (max-width: 640px) {
      .hcu-section { height: auto; min-height: 500px; display: flex; flex-direction: column; }
      .hcu-content { position: relative; padding: 60px 24px; align-items: flex-start; }
      .hcu-inner { max-width: 100%; }
      .hcu-stats { 
        position: relative; 
        right: 0; bottom: 0; 
        margin: 0 auto 40px;
        flex-wrap: wrap;
        justify-content: center;
      }
      .hcu-corner { display: none; }
      .hcu-line { left: 16px; }
    }
  `;
  document.head.appendChild(s);
};

const HomeContactUs = () => {
  const navigate   = useNavigate();
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => { injectStyles(); }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`hcu-section${visible ? " hcu-visible" : ""}`}
    >
      {/* Background */}
      <img src={bgimage} alt="Business discussion" className="hcu-bg" />

      {/* Overlays */}
      <div className="hcu-overlay hcu-overlay-1" />
      <div className="hcu-overlay hcu-overlay-2" />
      <div className="hcu-overlay hcu-overlay-3" />

      {/* Vertical accent line */}
      <div className="hcu-line" />

      {/* Top-right label */}
      <div className="hcu-corner">
        <div className="hcu-corner-dot" />
        <span className="hcu-corner-text">Est. 2020</span>
      </div>

      {/* Main content */}
      <div className="hcu-content">
        <div className="hcu-inner">
          <div className="hcu-eyebrow">
            <div className="hcu-eyebrow-dot" />
            <span className="hcu-eyebrow-text">Partnership Program</span>
          </div>

          <h2 className="hcu-heading">
            Grow Your<br />
            <em>Business</em> with us
          </h2>

          <p className="hcu-sub">
            Join thousands of travel partners in our verified network and unlock new opportunities for growth.
          </p>

          <div className="hcu-cta-group">
            <button
              className="hcu-btn-primary"
              onClick={() => navigate("/contactUs")}
            >
              <span>Contact Us →</span>
            </button>
            <button
              className="hcu-btn-secondary"
              onClick={() => navigate("/about")}
            >
              Learn more <span className="hcu-arr">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating stat cards */}
      <div className="hcu-stats">
        {[
          { num: "10K+", label: "Partners" },
          { num: "98%",  label: "Satisfaction" },
          { num: "50+",  label: "Countries" },
        ].map(({ num, label }) => (
          <div key={label} className="hcu-stat">
            <div className="hcu-stat-num">{num}</div>
            <div className="hcu-stat-label">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeContactUs;