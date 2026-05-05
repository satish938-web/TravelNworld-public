import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import travelItemPropType from '../../propTypes/travelItemPropType.js';

function Overview({ travelItem }) {
  if (!travelItem.overview || travelItem.overview.trim() === '') {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <motion.span 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="px-5 py-2 bg-premium-gradient text-white rounded-full text-[10px] font-black uppercase tracking-[0.25em] shadow-lg shadow-red-600/20 border-none"
            >
              Our Journey
            </motion.span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-black text-slate-900 mb-6 leading-tight"
          >
            About <span className="text-red-600">{travelItem.title}</span>
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="prose prose-slate prose-base max-w-none"
          >
            <div 
              className="text-slate-600 leading-relaxed text-sm md:text-base quill-content"
              dangerouslySetInnerHTML={{ __html: travelItem.overview }}
            />
          </motion.div>
        </div>

        {/* Dynamic Sidebar Info Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full md:w-72 flex-shrink-0"
        >
          <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-red-900/10 border border-slate-800 group">
            <motion.div 
              animate={{ 
                rotate: [0, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -top-4 -right-4 text-white/10"
            >
              <Sparkles size={64} />
            </motion.div>
            
            <div className="pt-4 relative z-10">
              <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1">Our Commitment</p>
              <p className="text-xs text-white/80 leading-relaxed">Dedicated to providing the most reliable and premium travel experiences across the country.</p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10 relative z-10">
              <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1">Quick Facts</p>
              <p className="text-xs text-white/60 whitespace-pre-wrap">{travelItem.quickInfo || "Verified registration verified by TravelNWorld."}</p>
            </div>

            {travelItem.services && (
              <div className="mt-6 pt-4 border-t border-white/10 relative z-10">
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-3">Core Services</p>
                <div className="flex flex-wrap gap-2">
                  {(typeof travelItem.services === 'string' 
                    ? travelItem.services.split(',').map(s => s.trim()).filter(Boolean)
                    : Array.isArray(travelItem.services) ? travelItem.services : []
                  ).slice(0, 4).map((s, i) => (
                    <motion.span 
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                      key={i} 
                      className="px-2 py-1 bg-white/10 rounded-md text-[9px] font-bold text-white/80 uppercase border border-white/5 transition-colors cursor-default"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

Overview.propTypes = {
  travelItem: travelItemPropType.isRequired,
};

export default Overview;
