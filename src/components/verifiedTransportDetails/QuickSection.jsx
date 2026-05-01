import { BusFront, Hotel, Plane, TrainFront, CheckCircle2, Briefcase, Zap } from 'lucide-react'
import { motion } from 'framer-motion';
import React from 'react'
import travelItemPropType from '../../propTypes/travelItemPropType.js';

/**
 * Parses the dynamic tags from the 'services' field
 */
const parseServices = (servicesText) => {
  if (!servicesText || typeof servicesText !== 'string') return [];
  
  const services = servicesText
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  if (services.length === 0) return [];

  return services.map((label, idx) => {
    const lowerLabel = label.toLowerCase();
    const styles = [
      "bg-blue-50 text-blue-600 border-blue-100",
      "bg-purple-50 text-purple-600 border-purple-100",
      "bg-green-50 text-green-600 border-green-100",
      "bg-orange-50 text-orange-600 border-orange-100",
      "bg-indigo-50 text-indigo-600 border-indigo-100",
      "bg-rose-50 text-rose-600 border-rose-100"
    ];
    
    let icon = Briefcase;
    if (lowerLabel.includes('flight')) icon = Plane;
    else if (lowerLabel.includes('hotel')) icon = Hotel;
    else if (lowerLabel.includes('bus')) icon = BusFront;
    else if (lowerLabel.includes('train')) icon = TrainFront;
    
    return { label, icon, style: styles[idx % styles.length] };
  });
};

function QuickSection({ travelItem }) {
  // Use 'services' as the single source for "Services & Highlights"
  const displayTags = parseServices(travelItem.services);

  if (displayTags.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <div className="flex items-center gap-2 mb-8">
        <Zap className="text-blue-600" size={16} />
        <span className="text-blue-600 font-black uppercase tracking-widest text-[9px]">Our Expertise</span>
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-6 tracking-tight">Services & Highlights</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {displayTags.map((tag, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex flex-col gap-2 p-4 rounded-2xl border transition-all hover:shadow-lg hover:shadow-blue-500/5 ${tag.style}`}
                >
                    <tag.icon size={18} />
                    <span className="font-bold text-[11px] leading-tight">{tag.label}</span>
                </motion.div>
              ))}
          </div>
        </div>

      </div>
    </motion.section>
  );
}

QuickSection.propTypes = {
  travelItem: travelItemPropType.isRequired
};

export default QuickSection;