import React, { useState } from "react";
import { ChevronRight, ChevronLeft, X } from "lucide-react";

import img1 from "../assets/images/imageGallery/img1.png";
import img2 from "../assets/images/imageGallery/img2.png";
import img3 from "../assets/images/imageGallery/img3.png";
import img4 from "../assets/images/imageGallery/img4.png";
import img5 from "../assets/images/imageGallery/img1.png";
import img6 from "../assets/images/imageGallery/img2.png";
import img7 from "../assets/images/imageGallery/img3.png";
import img8 from "../assets/images/imageGallery/img4.png";
import { getImageUrl } from "../utils/api";

function ImageGallery({ isOpen, setIsOpen, travelItem, initialIndex = null }) {
  const images = Array.isArray(travelItem?.images) ? travelItem.images : [];
    
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  // Update selectedIndex if initialIndex changes
  React.useEffect(() => {
    if (initialIndex !== null) {
      setSelectedIndex(initialIndex);
    }
  }, [initialIndex]);

  if (!isOpen && selectedIndex === null && images.length === 0) return null;

  const showNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center px-4"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 w-full max-w-6xl relative shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors z-[10000]"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center text-slate-900">Gallery</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img, index) => (
                <div 
                  key={index}
                  className="aspect-video rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-all group relative"
                  onClick={() => setSelectedIndex(index)}
                >
                  <img
                    src={getImageUrl(img)}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[10001] flex items-center justify-center px-4"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Background blur */}
          <div className="absolute inset-0 backdrop-blur-md bg-black/80"></div>

          {/* Popup Card */}
          <div 
            className="relative w-full max-w-4xl aspect-[4/3] sm:aspect-video bg-black rounded-2xl shadow-2xl flex items-center justify-center z-[10002] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors z-[10003]"
            >
              <X size={24} />
            </button>

            {/* Image */}
            <img
              src={getImageUrl(images[selectedIndex])}
              alt={`Preview ${selectedIndex + 1}`}
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

export default ImageGallery;
