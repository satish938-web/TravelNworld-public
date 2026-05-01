import React, { useState } from "react";
import PropTypes from 'prop-types';
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
 
import { getImageUrl } from "../utils/api";
 
function VideoGallery({ isOpen, setIsOpen, travelItem }) {
  const dynamicVideos = Array.isArray(travelItem?.videos) 
    ? travelItem.videos.map((src, index) => ({ id: index, src }))
    : [];

  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!isOpen && selectedIndex === null && dynamicVideos.length === 0) return null;
 
  const showNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % dynamicVideos.length);
  };
 
  const showPrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev === 0 ? dynamicVideos.length - 1 : prev - 1
    );
  };
 
  return (
    <>
      {/* ▶️ Preview Video */}
      {dynamicVideos.length > 0 && (
        <div
          className="w-[200px] h-[150px] border rounded-md overflow-hidden shadow-sm cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <video
            src={getImageUrl(dynamicVideos[0].src)}
            className="w-full h-full object-cover"
            muted
            loop
            autoPlay
            playsInline
          />
        </div>
      )}
 
      <AnimatePresence>
        {isOpen && selectedIndex === null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center px-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl p-6 w-full max-w-6xl relative shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors z-[10000]"
            >
              <X size={20} />
            </button>
 
            <h2 className="text-2xl font-bold mb-6 text-center text-slate-900">
              Video Gallery
            </h2>
 
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {dynamicVideos.map(({ id, src }, index) => (
                 <div
                  key={id}
                  className="aspect-video rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-all group relative bg-black"
                  onClick={() => setSelectedIndex(index)} 
                >
                  <video
                    src={getImageUrl(src)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <ChevronRight size={24} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
 
      {/* 🔍 Fullscreen Video Popup */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[10001] flex items-center justify-center px-4"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Background blur */}
          <div className="absolute inset-0 backdrop-blur-md bg-black/90"></div>
 
          {/* Popup Card */}
          <div 
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl shadow-2xl flex items-center justify-center z-[10002] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors z-[10003]"
            >
              <X size={24} />
            </button>
 
            {/* Video */}
            <video
              src={getImageUrl(dynamicVideos[selectedIndex].src)}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />

            {/* Navigation Buttons */}
            <button
              onClick={showPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-all z-[10003]"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={showNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-all z-[10003]"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

VideoGallery.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}; 
export default VideoGallery;