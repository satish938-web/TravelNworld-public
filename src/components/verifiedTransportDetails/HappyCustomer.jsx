import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getImageUrl } from "../../utils/api";

const PIXELS_PER_SECOND = 40;
const REPS = 3;

const HappyCustomer = ({ testimonials }) => {
  const [data, setData] = useState([]);
  const scrollRef = useRef(null);
  const rafRef = useRef(null);
  const isPausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);

  useEffect(() => {
    if (Array.isArray(testimonials) && testimonials.length > 0) {
      // Show all testimonials that have at least some text or a name
      const filtered = testimonials.filter(t => t && (t.text || t.name));
      setData(filtered);
    } else {
      setData([]);
    }
  }, [testimonials]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || data.length === 0) return;

    let last = performance.now();
    const step = (now) => {
      const dt = now - last;
      last = now;

      if (!isPausedRef.current) {
        const distance = (PIXELS_PER_SECOND * dt) / 1000;
        container.scrollLeft += distance;
        
        // Use a safe width check
        const totalWidth = container.scrollWidth;
        const singleWidth = totalWidth / REPS;
        
        if (container.scrollLeft >= singleWidth) {
          container.scrollLeft -= singleWidth;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [data]);

  const openModal = (index) => {
    setModalIndex(index % data.length);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalIndex(null);
    document.body.style.overflow = "auto";
  };

  if (data.length === 0) return null;

  const marqueeData = [];
  for (let i = 0; i < REPS; i++) marqueeData.push(...data);

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Star className="text-yellow-400 fill-yellow-400" size={14} />
            <span className="text-slate-500 font-black uppercase tracking-widest text-[9px]">Client Stories</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Happy Travelers</h2>
        </div>
        <div className="hidden md:flex gap-2">
           <button onClick={() => { if(scrollRef.current) scrollRef.current.scrollBy({left: -300, behavior: 'smooth'}) }} className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-all">
              <ChevronLeft size={18} />
           </button>
           <button onClick={() => { if(scrollRef.current) scrollRef.current.scrollBy({left: 300, behavior: 'smooth'}) }} className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-all">
              <ChevronRight size={18} />
           </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex gap-4 py-3" style={{ width: "max-content" }}>
          {marqueeData.map((item, index) => (
            <motion.div
              key={index}
              onClick={() => openModal(index)}
              className="group cursor-pointer w-[280px] bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex-shrink-0 flex flex-col transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0">
                  <img
                    src={getImageUrl(item.profile) || `https://ui-avatars.com/api/?name=${item.name}&background=random`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-black text-slate-900 text-sm leading-tight mb-0.5">{item.name}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.date || "Recent trip"}</p>
                </div>
                <Quote className="text-blue-50" size={24} />
              </div>
              
              <p className="text-slate-600 font-medium leading-relaxed text-xs mb-4 line-clamp-3">
                "{item.text}"
              </p>
              
              {item.image && (
                <div className="w-full h-32 rounded-xl overflow-hidden mb-4 border border-slate-100 flex-shrink-0">
                  <img src={getImageUrl(item.image)} alt="Trip Memory" className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
                </div>
              )}
              
              <div className="mt-auto flex items-center gap-0.5">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {modalIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl flex items-center justify-center z-[10000] px-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={closeModal} className="absolute top-4 right-4 w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center transition-all">
                <X size={18} className="text-slate-600" />
              </button>

              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-50 shadow-md flex-shrink-0">
                  <img
                    src={getImageUrl(data[modalIndex].profile) || `https://ui-avatars.com/api/?name=${data[modalIndex].name}&background=random`}
                    alt={data[modalIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-0.5">{data[modalIndex].name}</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                       {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}
                    </div>
                    <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">• {data[modalIndex].date}</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <Quote className="absolute -top-4 -left-4 text-blue-50 w-12 h-12 -z-10" />
                <p className="text-slate-700 text-lg font-medium leading-relaxed italic">
                  "{data[modalIndex].text}"
                </p>
              </div>
              
              <div className="mt-8 flex justify-center">
                 <button onClick={closeModal} className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold text-xs hover:bg-black transition-all shadow-xl">
                    Back to Profile
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HappyCustomer;
