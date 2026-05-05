import React from "react";
import { motion } from "framer-motion";
import {
  FaPlaneDeparture, FaLaptopCode, FaUsers,
  FaRegClock, FaShieldAlt, FaBlog,
  FaMapMarkedAlt, FaPaintBrush, FaBullhorn,
} from "react-icons/fa";

const services = [
  {
    icon: FaPlaneDeparture,
    title: "B2B Travel Packages",
    description: "We collaborate with ticketing agents and transport providers to offer seamless travel solutions — flights, stays, and logistics for corporate or group travel.",
    accent: "red",
  },
  {
    icon: FaUsers,
    title: "Digital Travel Services",
    description: "From zero-interest EMI options to digital booking tools, we simplify bulk travel management and empower our B2B clients with flexible financial solutions.",
    accent: "gray",
  },
  {
    icon: FaRegClock,
    title: "24/7 Partner Support",
    description: "Get round-the-clock assistance with bookings, updates, or technical queries — ensuring zero downtime during critical B2B operations.",
    accent: "red",
  },
  {
    icon: FaLaptopCode,
    title: "Website Development",
    description: "We build responsive, high-converting websites tailored for travel businesses. From design to deployment — fast, polished, and SEO-optimized.",
    accent: "gray",
  },
  {
    icon: FaShieldAlt,
    title: "Secure & Reliable Systems",
    description: "Safety is non-negotiable. Our systems ensure insured travel, secure transactions, and real-time support — so your customers trust your brand.",
    accent: "red",
  },
  {
    icon: FaBlog,
    title: "Industry Insights & Blogs",
    description: "Curated blogs on travel trends, digital transformation, and B2B growth strategies — keeping our partners always ahead of the curve.",
    accent: "gray",
  },
  {
    icon: FaBullhorn,
    title: "Social Media Management",
    description: "We handle your brand's presence across all major platforms — content creation, scheduling, and analytics to boost visibility and engagement.",
    accent: "red",
  },
  {
    icon: FaPaintBrush,
    title: "Logo & Brand Design",
    description: "Establish a strong visual identity with custom logo and branding packages — built specifically for travel startups and agencies.",
    accent: "gray",
  },
  {
    icon: FaMapMarkedAlt,
    title: "Complete Branding Suite",
    description: "We craft your travel brand's identity end-to-end — custom logos, consistent visual language, and professional social media management.",
    accent: "red",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
};

export default function AboutOurServices() {
  return (
    <section className="bg-gray-50 py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-12 h-px bg-red-500" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-red-500">What We Offer</span>
            <div className="w-12 h-px bg-red-500" />
          </div>
          <h2
            className="text-gray-900 mb-4"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(40px, 6vw, 72px)',
            }}
          >
            Travel N World{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #ef4444, #991b1b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              At Your Service
            </span>
          </h2>
          <p className="text-gray-400 text-lg font-light max-w-xl mx-auto">
            A full-stack travel partner — from itineraries to digital identity.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isRed = service.accent === "red";

            return (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={cardVariants}
                className="group relative bg-white border border-gray-200 rounded-2xl p-7 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-default"
                style={{ borderColor: '#e5e7eb' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = isRed ? 'rgba(220,38,38,0.3)' : '#d1d5db';
                  e.currentTarget.style.boxShadow = isRed
                    ? '0 20px 40px rgba(220,38,38,0.08)'
                    : '0 20px 40px rgba(0,0,0,0.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: isRed
                      ? 'linear-gradient(90deg, #dc2626, transparent)'
                      : 'linear-gradient(90deg, #9ca3af, transparent)',
                  }}
                />

                {/* Subtle glow */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ background: isRed ? '#fecaca' : '#f3f4f6' }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:rotate-12"
                  style={{
                    background: isRed ? '#fef2f2' : '#f9fafb',
                    border: `1px solid ${isRed ? '#fecaca' : '#e5e7eb'}`,
                  }}
                >
                  <IconComponent
                    style={{
                      fontSize: '20px',
                      color: isRed ? '#dc2626' : '#6b7280',
                    }}
                  />
                </div>

                <h3 className="text-gray-900 text-base font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-[1.8] font-light">{service.description}</p>

                {/* Bottom bar */}
                <div
                  className="mt-5 w-8 h-[2px] rounded-full transition-all duration-300 group-hover:w-16"
                  style={{ background: isRed ? '#dc2626' : '#d1d5db' }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}