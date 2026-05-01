import React, { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, X, ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { getImageUrl } from "../../utils/api";

const HappyCustomerVideo = ({ videos = [] }) => {
  // Only use uploaded videos, no hardcoded defaults
  const allVideoUrls = (Array.isArray(videos) ? videos : []).filter(Boolean);
  
  const mediaItems = allVideoUrls.map((src, index) => ({ 
    id: index, 
    type: "video", 
    src: getImageUrl(src) + "#t=0.001",
    title: "Guest Story"
  }));

  if (mediaItems.length === 0) return null;

  // Duplicate for seamless loop
  const loopedItems = [...mediaItems, ...mediaItems, ...mediaItems];

  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  // Lock/unlock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "auto";
  }, [activeIndex]);



  // Modal navigation
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? mediaItems.length - 1 : prev - 1
    );
  };

  const handleClose = () => {
    setActiveIndex(null);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-[2px] bg-red-600 rounded-full" />
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Customer Stories</h2>
        </div>
        <button
          onClick={() => setActiveIndex(0)}
          className="group px-7 py-2 bg-slate-900 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center gap-3"
        >
          Explore All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Modern Horizontal Marquee for Videos */}
      <div className="relative group/marquee mt-2 overflow-hidden">
        <div className="flex animate-marquee hover:pause whitespace-nowrap gap-4 py-2">
          {loopedItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="relative w-[140px] sm:w-[220px] aspect-video rounded-xl overflow-hidden shadow-md border border-white cursor-pointer group flex-shrink-0"
              onClick={() => setActiveIndex(index % mediaItems.length)}
            >
              <div className="relative w-full h-full">
                <video
                  src={item.src}
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  onMouseEnter={(e) => e.target.play()}
                  onMouseLeave={(e) => {
                    e.target.pause();
                    e.target.currentTime = 0;
                  }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                   <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform">
                      <Play size={16} fill="white" />
                   </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="text-[8px] font-black text-white uppercase tracking-widest">{item.title}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>



      {activeIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[10000] px-4"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all z-20"
            >
              <X size={20} />
            </button>

            {/* Video */}
            <video
              src={mediaItems[activeIndex].src}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 -translate-y-1/2 left-4 w-12 h-12 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute top-1/2 -translate-y-1/2 right-4 w-12 h-12 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default HappyCustomerVideo;