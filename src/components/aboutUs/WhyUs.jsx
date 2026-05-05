import React from "react";
import { motion } from "framer-motion";

import { 
  FaGlobe, FaRoute, FaUserCheck, FaHeadset, FaGem 
} from "react-icons/fa6";

const bubbles = [
  { label: "Worldwide Services", color: "green", icon: <FaGlobe /> },
  { label: "Customized Tours", color: "gray", icon: <FaRoute /> },
  { label: "Expert Guidance", color: "green", icon: <FaUserCheck /> },
  { label: "24/7 Support", color: "gray", icon: <FaHeadset /> },
  { label: "Affordable Packages", color: "green", icon: <FaGem /> },
];

export default function WhyUs() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden" 
      style={{ background: "linear-gradient(to bottom, #f8fafc, #ffffff)" }}>
      
      {/* ── Background Elements ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft light mesh gradient */}
        <div className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(at 0% 0%, rgba(34,197,94,0.1) 0px, transparent 50%),
              radial-gradient(at 100% 0%, rgba(203,213,225,0.4) 0px, transparent 50%),
              radial-gradient(at 100% 100%, rgba(34,197,94,0.1) 0px, transparent 50%),
              radial-gradient(at 0% 100%, rgba(203,213,225,0.4) 0px, transparent 50%)
            `
          }}
        />
        
        {/* Floating Particles Background */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%", opacity: 0.2 }}
              animate={{
                y: [null, Math.random() * 100 + "%"],
                x: [null, Math.random() * 100 + "%"],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 15 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                position: "absolute",
                width: 4 + Math.random() * 6,
                height: 4 + Math.random() * 6,
                borderRadius: "50%",
                background: i % 2 === 0 ? "#22c55e" : "#cbd5e1",
                filter: "blur(2px)"
              }}
            />
          ))}
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ 
            backgroundImage: `radial-gradient(circle, #64748b 1px, transparent 1px)`,
            backgroundSize: '48px 48px' 
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24 text-center">
        {/* Label */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="w-12 h-px bg-green-500/40" />
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-green-600">Why Choose Us</span>
          <div className="w-12 h-px bg-green-500/40" />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 leading-none"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(44px, 8vw, 96px)',
            color: "#1e293b",
            letterSpacing: "-0.01em"
          }}
        >
          <span className="inline-block text-slate-800">Can't find the tour</span><br/>
          <span className="inline-block bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent italic"
            style={{ paddingBottom: 10 }}>
            you're looking for?
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-slate-500 text-xl font-light mb-20 max-w-xl mx-auto leading-relaxed"
        >
          Just contact us — we craft every journey from scratch, <br className="hidden md:block" /> built entirely around you.
        </motion.p>

        {/* Bubbles */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 relative">
          {bubbles.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 100 }}
              whileHover={{ 
                y: -15, 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="group relative flex flex-col items-center justify-center rounded-[3rem] cursor-pointer shadow-2xl shadow-slate-200/50 bg-white/80 backdrop-blur-md"
              style={{
                width: 170,
                height: 190,
                border: item.color === 'green' ? '2px solid rgba(34,197,94,0.15)' : '2px solid rgba(220,227,236,1)',
              }}
            >
              {/* Animated Floating Effect */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center"
              >
                <div className={`text-3xl mb-4 group-hover:scale-125 transition-all duration-500 ${
                  item.color === 'green' ? 'text-green-600' : 'text-slate-400'
                }`}>
                  {item.icon}
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-center px-6 leading-tight text-slate-700">
                  {item.label}
                </span>
              </motion.div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                style={{ 
                  background: item.color === 'green' 
                    ? 'rgba(34,197,94,0.15)' 
                    : 'rgba(203,213,225,0.2)' 
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-24"
        >
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34,197,94,0.25)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-4 bg-green-600 text-white px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 shadow-xl shadow-green-600/20"
          >
            <span className="relative z-10">Start Your Journey</span>
            <span className="relative z-10 text-xl group-hover:translate-x-2 transition-transform duration-300">↗</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
        section { scroll-margin-top: 100px; }
      `}</style>
    </section>
  );
}