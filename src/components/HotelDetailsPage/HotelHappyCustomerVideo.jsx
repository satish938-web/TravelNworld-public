import React, { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import hotelItemPropType from '../../propTypes/hotelItemPropType.js';
const HotelHappyCustomerVideo = ({ hotelItem }) => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const mediaItems = hotelItem?.videos || [];
  const loopedItems = [...mediaItems, ...mediaItems];

  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "auto";
  }, [activeIndex]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 1.2;
    let animationFrameId;

    const step = () => {
      if (!isPaused) {
        scrollContainer.scrollLeft += scrollSpeed;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);


  const handleScrollRight = () => {
    const container = scrollRef.current;
    if (!container) return;
    const newScroll = container.scrollLeft + 320;
    container.scrollLeft =
      newScroll >= container.scrollWidth / 2
        ? newScroll - container.scrollWidth / 2
        : newScroll;
  };

  const handleScrollLeft = () => {
    const container = scrollRef.current;
    if (!container) return;
    const newScroll = container.scrollLeft - 320;
    container.scrollLeft =
      newScroll < 0 ? container.scrollWidth / 2 + newScroll : newScroll;
  };

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

  if (!mediaItems.length) return null;

  return (
    <div className="relative w-full py-6">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">
        Happy Customers at {hotelItem?.name}
      </h2>

      {/* Marquee */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {loopedItems.map((item, index) => (
          <div
            key={index}
            className="min-w-[280px] sm:min-w-[300px] max-w-[320px] bg-white border rounded-lg shadow-sm overflow-hidden flex-shrink-0 cursor-pointer"
            onClick={() => setActiveIndex(index % mediaItems.length)}
          >
            {item.type === "youtube" ? (
              <div className="relative w-full h-56 sm:h-60">
                <img
                  src={item.src}
                  alt="YouTube thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25">
                  <div className="bg-red-600 text-white rounded-full p-3">
                    ▶
                  </div>
                </div>
              </div>
            ) : (
              <video
                src={item.src}
                muted
                className="w-full h-56 sm:h-60 object-cover"
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => {
                  e.target.pause();
                  e.target.currentTime = 0;
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Scroll Buttons */}
      <button
        onClick={handleScrollLeft}
        className="hidden sm:flex absolute top-1/2 -translate-y-1/2 left-2 bg-white border rounded-full shadow-md p-2 hover:bg-gray-100"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={handleScrollRight}
        className="hidden sm:flex absolute top-1/2 -translate-y-1/2 right-2 bg-white border rounded-full shadow-md p-2 hover:bg-gray-100"
      >
        <ChevronRight size={20} />
      </button>

      {/* Modal */}
      {activeIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 bg-white text-red-600 rounded-full p-2 shadow hover:bg-gray-200 z-10"
            >
              <X size={20} />
            </button>

            {/* Player */}
            {mediaItems[activeIndex].type === "youtube" ? (
              <iframe
                src={mediaItems[activeIndex].link.replace("watch?v=", "embed/")}
                title="YouTube video"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <iframe
                src={mediaItems[activeIndex].link.replace("watch?v=", "embed/")}
                title="Custom video"
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            )}

            {/* Navigation */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 -translate-y-1/2 left-2 bg-white text-black rounded-full p-2 shadow hover:bg-gray-200"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 -translate-y-1/2 right-2 bg-white text-black rounded-full p-2 shadow hover:bg-gray-200"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
HotelHappyCustomerVideo.propTypes = {
  hotelItem: hotelItemPropType.isRequired,
};

export default HotelHappyCustomerVideo;
