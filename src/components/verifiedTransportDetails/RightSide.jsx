import React, { useState } from 'react'
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  Share2,
  Star,
  Edit,
  Copy,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import travelItemPropType from '../../propTypes/travelItemPropType.js';

function RightSide({ travelItem }) {
  const [expandMore, setExpandMore] = useState(false);

  // Parse services tags for the categories section
  const serviceTags = travelItem.services
    ? (typeof travelItem.services === 'string'
        ? travelItem.services.split(',').map(s => s.trim()).filter(Boolean)
        : Array.isArray(travelItem.services) ? travelItem.services : [])
    : ["Travel Agent", "Tour Operator"];

  const contactVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const quickActions = [
    { icon: Phone, label: "Request Callback" },
    { icon: Mail, label: "Inquire via Email" },
    { icon: Share2, label: "Share Profile" },
    { icon: Star, label: "Rate Service" },
    { icon: Edit, label: "Suggest Update" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full flex flex-col gap-6"
    >
      {/* Contact Card */}
      <motion.div
        variants={contactVariants}
        className="rounded-3xl shadow-sm border border-slate-200 bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <div className="bg-slate-900 px-6 py-6 text-white">
          <div className="flex items-center gap-2 mb-3">
             <ShieldCheck size={16} className="text-yellow-400" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">Verified Listing</span>
          </div>
          <h3 className="text-xl font-black mb-4">Contact Agent</h3>
          <a
            href={`tel:${travelItem.phone}`}
            className="flex items-center justify-center gap-3 bg-premium-gradient text-white font-black px-8 py-4 rounded-full hover:scale-[1.02] transition-all active:scale-95 shadow-xl shadow-red-600/25 uppercase tracking-widest text-sm border-none"
          >
            <Phone size={18} fill="currentColor" />
            {travelItem.phone}
          </a>
        </div>

        <div className="divide-y divide-slate-100">
          <div className="px-6 py-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Office Location</h4>
            <p className="text-slate-700 font-medium leading-relaxed mb-4 text-sm">
              {travelItem.fullAddress || "Address details on file"}
            </p>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-50 text-slate-900 font-bold rounded-xl transition-colors text-[10px] hover:bg-slate-100 border border-slate-200">
                <MapPin size={14} /> Directions
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-50 text-slate-900 font-bold rounded-xl transition-colors text-[10px] hover:bg-slate-100 border border-slate-200">
                <Copy size={14} /> Copy
              </button>
            </div>
          </div>

          <div className="px-6 py-5">
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-green-500" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Business Status</p>
                <p className="text-sm font-bold text-green-600">Open 24 Hours</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-6">
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-4">Actions</p>
            <div className="grid grid-cols-1 gap-2">
              {quickActions.slice(0, expandMore ? quickActions.length : 3).map((item, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-all text-[11px] border border-transparent hover:border-slate-100"
                >
                  <item.icon size={14} className="text-red-600" />
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => setExpandMore(!expandMore)}
                className="w-full flex items-center justify-center gap-2 py-2 text-red-600 font-black text-[10px] hover:text-red-700 transition-colors mt-2 uppercase tracking-widest"
              >
                {expandMore ? "Show Less" : "Show More"}
                <ChevronRight size={14} className={`transform transition ${expandMore ? "rotate-90" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dynamic Categories Section */}
      <motion.div
        variants={contactVariants}
        className="rounded-3xl shadow-sm border border-slate-200 bg-white p-6"
      >
        <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-widest flex items-center gap-2">
           <div className="w-1.5 h-4 bg-red-600 rounded-full" />
           Specializations
        </h3>
        <div className="flex flex-wrap gap-2">
          {serviceTags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-full border border-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

RightSide.propTypes = {
  travelItem: travelItemPropType.isRequired,
};

export default RightSide;
