import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Package, ArrowRight, Plane, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import travelItemPropType from '../../propTypes/travelItemPropType.js';
import { getImageUrl } from "../../utils/api";

function VerifyTour({ travelItem, dynamicItineraries = [] }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const scrollRef = useRef(null);

  const handleViewAll = () => {
    navigate(`/packages?agentId=${id}`);
  };

  const hasPackages = (dynamicItineraries && dynamicItineraries.length > 0) || (travelItem.tourPackages && travelItem.tourPackages.length > 0);
  
  // Merge static and dynamic packages for display
  const displayPackages = [
    ...(dynamicItineraries || []),
    ...(travelItem.tourPackages || []).map(p => ({ ...p, isStatic: true }))
  ];

  return (
    <motion.section
      id="packages"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Package className="text-red-600" size={16} />
            <span className="text-red-600 font-black uppercase tracking-widest text-[9px]">Premium Selections</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Our Tour Packages</h2>
        </div>
        
        {hasPackages && (
          <button
            onClick={handleViewAll}
            className="group px-7 py-2.5 bg-slate-900 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center gap-3"
          >
            Explore All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* Packages Content */}
      {!hasPackages ? (
        <div className="bg-slate-50 rounded-3xl border border-slate-100 p-8 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/5">
            <Plane className="text-red-600" size={24} />
          </div>
          <h3 className="text-lg font-black text-slate-900 mb-1">Packages Coming Soon</h3>
          <p className="text-slate-500 max-w-xs mx-auto mb-6 font-medium text-xs">
            We are currently curating some exclusive travel experiences for you.
          </p>
          <button
            onClick={() => {
                const el = document.getElementById('services');
                if(el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-2.5 bg-premium-gradient text-white rounded-full font-bold text-xs hover:bg-black transition-all shadow-lg shadow-red-200"
          >
            View Our Services
          </button>
        </div>
      ) : (
        <motion.div
          ref={scrollRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {displayPackages.slice(0, 3).map((pkg, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group bg-white border border-slate-100 rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-500 cursor-pointer flex flex-col h-full overflow-hidden"
              onClick={() => {
                if (pkg.slug) {
                  navigate(`/itinerary/${pkg.slug}`);
                }
              }}
            >
              <div className="relative mb-3 sm:mb-4 overflow-hidden rounded-xl aspect-video bg-slate-100">
                 <img 
                   src={getImageUrl(pkg.coverImageUrl || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=400&auto=format&fit=crop")} 
                   alt={pkg.title || pkg.destination}
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10" />
                 <div className="absolute bottom-2.5 left-2.5 z-20">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-white text-[8px] sm:text-[9px] font-black uppercase tracking-widest border border-white/20">
                       <MapPin size={10} />
                       <span>{pkg.destination || "Global"}</span>
                    </div>
                 </div>
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="font-black text-base sm:text-lg mb-1.5 sm:mb-2 text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
                  {pkg.title || pkg.destination || "Tour Package"}
                </h3>
                <p className="text-slate-500 font-medium text-[11px] sm:text-xs mb-4 line-clamp-2 leading-relaxed flex-1">
                  {pkg.shortDescription || pkg.description || "An unforgettable journey awaits you."}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest">Starting from</span>
                    <span className="text-base sm:text-lg font-black text-slate-900">₹{pkg.discountedPrice || pkg.priceFrom || pkg.price || "Contact Us"}</span>
                  </div>
                  <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
                     <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}

VerifyTour.propTypes = {
  travelItem: travelItemPropType.isRequired,
};

export default VerifyTour;
