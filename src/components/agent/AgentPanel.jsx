import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import {
  FileText, Users, BarChart3, TrendingUp,
  Zap, MapPin, MessageSquare, ChevronRight,
  ArrowUpRight, PlusCircle, Activity, Star,
} from "lucide-react";

/* ─────────────────────────────────────────
   Fonts:
   • Plus Jakarta Sans  — modern, geometric sans; body / labels
   • Cormorant Garamond — editorial serif; big numbers & hero title
───────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cormorant+Garamond:wght@500;600;700&display=swap');

  .ap * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }
  .ap-serif { font-family: 'Cormorant Garamond', serif !important; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes barGrow { from { width: 0; } }
  @keyframes softPulse {
    0%,100% { opacity: 1; }
    50%      { opacity: 0.3; }
  }

  .ap-hero  { animation: fadeUp 0.5s ease both; }
  .ap-stats { animation: fadeUp 0.5s 0.12s ease both; }
  .ap-lower { animation: fadeUp 0.5s 0.22s ease both; }

  /* ── Stat cards ── */
  .ap-stat-card {
    background: #fff;
    border: 1px solid #e5e8f0;
    border-radius: 18px;
    padding: 30px 28px 26px;
    text-decoration: none;
    display: block;
    transition: box-shadow 0.25s, border-color 0.25s, transform 0.25s;
  }
  .ap-stat-card:hover {
    box-shadow: 0 10px 36px rgba(0,0,0,0.09);
    border-color: #c8ccda;
    transform: translateY(-3px);
  }
  .ap-stat-card:hover .ap-bar { width: var(--bw) !important; }

  .ap-bar {
    height: 100%; border-radius: 99px; width: 0;
    animation: barGrow 1.1s 0.6s cubic-bezier(.22,1,.36,1) forwards;
    transition: width 0.4s ease;
  }

  /* ── Mgmt links ── */
  .ap-mgmt-link {
    display: flex; align-items: center; gap: 16px;
    padding: 18px 20px; border-radius: 14px;
    border: 1px solid #edf0f7; background: #f9fafb;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .ap-mgmt-link:hover {
    background: #fff; border-color: #d0d4e2;
    transform: translateX(4px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  }
  .ap-mgmt-link:hover .ap-arr { opacity: 1; transform: translateX(0); }
  .ap-arr {
    margin-left: auto; opacity: 0;
    transform: translateX(-6px);
    transition: opacity 0.2s, transform 0.2s;
    color: #bcc2d4; flex-shrink: 0;
  }

  /* ── Buttons ── */
  .ap-cta {
    display: inline-flex; align-items: center; gap: 8px;
    background: #111827; color: #fff;
    padding: 13px 24px; border-radius: 11px;
    font-size: 14px; font-weight: 700;
    font-family: 'Plus Jakarta Sans', sans-serif;
    text-decoration: none; white-space: nowrap; letter-spacing: 0.01em;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .ap-cta:hover {
    background: #1e293b;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(17,24,39,0.25);
  }

  .ap-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    background: #f9fafb; color: #374151;
    padding: 13px 22px; border-radius: 11px;
    font-size: 14px; font-weight: 600;
    font-family: 'Plus Jakarta Sans', sans-serif;
    text-decoration: none; white-space: nowrap;
    border: 1px solid #e2e6f0;
    transition: border-color 0.2s, background 0.2s;
  }
  .ap-ghost:hover { border-color: #c0c6d8; background: #fff; }

  /* ── Live dot ── */
  .ap-dot {
    width: 9px; height: 9px; background: #22c55e;
    border-radius: 50%; display: inline-block;
    animation: softPulse 2.4s ease-in-out infinite;
  }

  /* ── Insight rows ── */
  .ap-insight-row {
    display: flex; align-items: center;
    justify-content: space-between; gap: 12px;
    padding: 18px 0;
    border-bottom: 1px solid #f0f2f9;
  }
  .ap-insight-row:last-of-type { border-bottom: none; }

  /* ── View btn ── */
  .ap-view-btn {
    display: flex; align-items: center; justify-content: center; gap: 7px;
    padding: 13px; border-radius: 11px;
    border: 1px solid #e2e6f0; background: #f9fafb;
    color: #374151; font-size: 14px; font-weight: 600;
    font-family: 'Plus Jakarta Sans', sans-serif;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
  }
  .ap-view-btn:hover {
    background: #111827; border-color: #111827; color: #fff;
  }

  /* ── Section headings ── */
  .ap-section-title {
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
    letter-spacing: -0.02em;
  }
  .ap-section-sub {
    margin: 3px 0 0;
    font-size: 13px;
    color: #94a3b8;
    font-weight: 500;
  }
`;

/* ── Animated counter ── */
const Counter = ({ target, loading }) => {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    if (loading || !target) return;
    const end = Number(target);
    let cur = 0;
    const inc = end / 40;
    const t = setInterval(() => {
      cur = Math.min(cur + inc, end);
      setV(Math.round(cur));
      if (cur >= end) clearInterval(t);
    }, 18);
    return () => clearInterval(t);
  }, [target, loading]);
  return loading ? <span style={{ color: "#d4d8e8" }}>—</span> : <>{v.toLocaleString()}</>;
};

/* ── Main ── */
const AgentPanel = () => {
  const { rawDestinations } = useOutletContext() || {};
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [dbStats, setDbStats] = React.useState({ totalEnquiries: 0, totalItineraries: 0 });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { default: axios } = await import("axios");
        const { API_BASE } = await import("../../utils/api");
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE}/api/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setDbStats(res.data.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  const name = user?.firstName || "Partner";
  const hr = new Date().getHours();
  const greeting = hr < 12 ? "Good Morning" : hr < 17 ? "Good Afternoon" : "Good Evening";
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

  const stats = [
    { label: "Live Itineraries", value: dbStats.totalItineraries, icon: <FileText size={20} />, accent: "#3b6ef6", accentBg: "#eef2ff", link: "Manage-Itianary", sub: "Active packages",    bar: 65, delay: "0.08s" },
    { label: "Active Leads",     value: dbStats.totalEnquiries,   icon: <Zap size={20} />,      accent: "#e03131", accentBg: "#fff5f5", link: "my-leads",        sub: "Ready to convert",  bar: 42, delay: "0.16s" },
    { label: "Total Queries",    value: dbStats.totalEnquiries,   icon: <MessageSquare size={20} />, accent: "#0ca678", accentBg: "#e6fcf5", link: "report",    sub: "Customer interest", bar: 78, delay: "0.24s" },
    { label: "Routes Mapped",    value: dbStats.totalItineraries, icon: <MapPin size={20} />,   accent: "#7048e8", accentBg: "#f3f0ff", link: "reviews",        sub: "Covered locations", bar: 55, delay: "0.32s" },
  ];

  const mgmt = [
    { to: "profile",         label: "Brand Profile",  sub: "Manage your identity",  icon: <Users size={18} />,     color: "#3b6ef6", bg: "#eef2ff" },
    { to: "Manage-Itianary", label: "Itinerary List",  sub: "View & edit packages",  icon: <BarChart3 size={18} />, color: "#0ca678", bg: "#e6fcf5" },
    { to: "my-leads",        label: "Lead Pipeline",   sub: "Track your prospects",  icon: <Activity size={18} />,  color: "#e03131", bg: "#fff5f5" },
    { to: "report",          label: "Analytics",       sub: "Performance overview",  icon: <TrendingUp size={18} />,color: "#7048e8", bg: "#f3f0ff" },
  ];

  return (
    <>
      <style>{STYLES}</style>
      <div className="ap" style={{ display: "flex", flexDirection: "column", gap: 22, paddingBottom: 72 }}>

        {/* ── HERO ── */}
        <section className="ap-hero" style={{
          background: "#fff",
          border: "1px solid #e5e8f0",
          borderRadius: 20,
          padding: "32px 36px",
          display: "flex",
          alignItems: "center",
          gap: 22,
          flexWrap: "wrap",
        }}>
          {/* Avatar */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <img
              src={user?.photo || `https://ui-avatars.com/api/?name=${name}&background=111827&color=fff&bold=true&size=100`}
              alt="avatar"
              style={{ width: 64, height: 64, borderRadius: 16, objectFit: "cover", border: "1.5px solid #e2e6f0", display: "block" }}
            />
            <span style={{ position: "absolute", bottom: -2, right: -2, background: "#fff", borderRadius: "50%", padding: 2, display: "flex" }}>
              <span className="ap-dot" />
            </span>
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 180 }}>
            <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {today}
            </p>
            <h1 className="ap-serif" style={{ margin: "5px 0 0", fontSize: 32, fontWeight: 600, color: "#0f172a", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              {greeting},{" "}
              <span style={{ color: "#e03131" }}>{name}</span>
            </h1>
            <p style={{ margin: "7px 0 0", fontSize: 15, color: "#64748b", lineHeight: 1.6 }}>
              {loading
                ? "Loading your dashboard…"
                : <>You have <strong style={{ color: "#0f172a", fontWeight: 700 }}>{dbStats.totalEnquiries} open leads</strong> awaiting your response.</>
              }
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 10, flexShrink: 0, flexWrap: "wrap" }}>
            <Link to="report" className="ap-ghost"><BarChart3 size={16} /> View Report</Link>
            <Link to="Create-Itinary" className="ap-cta"><PlusCircle size={16} /> New Package</Link>
          </div>
        </section>

        {/* ── STAT CARDS ── */}
        <section className="ap-stats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16 }}>
          {stats.map((s, i) => (
            <Link key={i} to={s.link} className="ap-stat-card" style={{ animationDelay: s.delay }}>
              {/* Icon badge */}
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: s.accentBg, color: s.accent,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
              }}>{s.icon}</div>

              {/* Big number */}
              <div className="ap-serif" style={{ fontSize: 44, fontWeight: 600, color: "#0f172a", lineHeight: 1, letterSpacing: "-0.02em" }}>
                <Counter target={s.value} loading={loading} />
              </div>

              {/* Label */}
              <div style={{ marginTop: 6, fontSize: 15, fontWeight: 700, color: "#1e293b" }}>{s.label}</div>
              <div style={{ marginTop: 3, fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>{s.sub}</div>

              {/* Bar */}
              <div style={{ marginTop: 20, height: 3, background: "#f0f3fa", borderRadius: 99, overflow: "hidden" }}>
                <div className="ap-bar" style={{ background: s.accent, "--bw": `${s.bar}%` }} />
              </div>
            </Link>
          ))}
        </section>

        {/* ── LOWER GRID ── */}
        <div className="ap-lower" style={{ display: "grid", gridTemplateColumns: "1fr 310px", gap: 16 }}>

          {/* Management */}
          <div style={{ background: "#fff", border: "1px solid #e5e8f0", borderRadius: 20, padding: "30px 30px" }}>
            <div style={{ marginBottom: 22 }}>
              <h2 className="ap-section-title">Management</h2>
              <p className="ap-section-sub">Quick access to key sections</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {mgmt.map((item, i) => (
                <Link key={i} to={item.to} className="ap-mgmt-link">
                  <div style={{
                    width: 42, height: 42, borderRadius: 11,
                    background: item.bg, color: item.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>{item.icon}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.sub}
                    </div>
                  </div>
                  <ChevronRight size={16} className="ap-arr" />
                </Link>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div style={{
            background: "#fff", border: "1px solid #e5e8f0",
            borderRadius: 20, padding: "30px 26px",
            display: "flex", flexDirection: "column",
          }}>
            <div style={{ marginBottom: 6 }}>
              <h2 className="ap-section-title">Insights</h2>
              <p className="ap-section-sub">Performance snapshot</p>
            </div>

            {/* Conversion */}
            <div className="ap-insight-row">
              <div>
                <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginBottom: 4, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Conversion Rate
                </div>
                <div className="ap-serif" style={{ fontSize: 30, fontWeight: 600, color: "#0f172a", letterSpacing: "-0.02em", lineHeight: 1 }}>
                  12.5%
                </div>
              </div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                fontSize: 12, fontWeight: 700, color: "#0ca678",
                background: "#e6fcf5", padding: "5px 11px", borderRadius: 7,
              }}>
                <TrendingUp size={13} /> +2.1%
              </div>
            </div>

            {/* Agent Score */}
            <div className="ap-insight-row">
              <div>
                <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginBottom: 4, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Agent Score
                </div>
                <div className="ap-serif" style={{ fontSize: 30, fontWeight: 600, color: "#0f172a", letterSpacing: "-0.02em", lineHeight: 1 }}>
                  A+
                </div>
              </div>
              <div style={{ display: "flex", gap: 3 }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill={i < 4 ? "#f59e0b" : "none"} stroke={i < 4 ? "#f59e0b" : "#d4d8ea"} />
                ))}
              </div>
            </div>

            {/* Ranking */}
            <div className="ap-insight-row">
              <div>
                <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginBottom: 4, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Ranking
                </div>
                <div className="ap-serif" style={{ fontSize: 30, fontWeight: 600, color: "#0f172a", letterSpacing: "-0.02em", lineHeight: 1 }}>
                  Top 10%
                </div>
              </div>
              <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500, textAlign: "right", lineHeight: 1.5, maxWidth: 80 }}>
                Among all agents
              </div>
            </div>

            <Link to="report" className="ap-view-btn" style={{ marginTop: 16 }}>
              Full Report <ArrowUpRight size={15} />
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default AgentPanel;