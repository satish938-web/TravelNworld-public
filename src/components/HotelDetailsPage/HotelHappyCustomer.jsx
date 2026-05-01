import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import hotelItemPropType from '../../propTypes/hotelItemPropType.js';
const PIXELS_PER_SECOND = 60;
const PAUSE_DURATION = 1000;
const CARD_WIDTH = 320;
const CARD_GAP = 16;
const REPS = 3;

const HotelHappyCustomer = ({ hotelItem }) => {
  const scrollRef = useRef(null);
  const pauseTimeout = useRef(null);
  const rafRef = useRef(null);
  const isPausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);

  const combinedData = hotelItem?.happyCustomers || [];

  const marqueeData = [];
  for (let i = 0; i < REPS; i++) marqueeData.push(...combinedData);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || combinedData.length === 0) return;

    const imgs = container.querySelectorAll("img");
    const notLoaded = Array.from(imgs).filter((img) => !img.complete);

    const waitForImages = () =>
      new Promise((resolve) => {
        if (notLoaded.length === 0) return resolve();
        let loaded = 0;
        notLoaded.forEach((img) =>
          img.addEventListener(
            "load",
            () => {
              loaded += 1;
              if (loaded === notLoaded.length) resolve();
            },
            { once: true }
          )
        );
        setTimeout(resolve, 500); // Fallback
      });

    let singleWidth = 0;

    const startLoop = async () => {
      await waitForImages();
      singleWidth = container.scrollWidth / REPS || 1;
      let last = performance.now();

      const step = (now) => {
        const dt = now - last;
        last = now;

        if (!isPausedRef.current) {
          const distance = (PIXELS_PER_SECOND * dt) / 1000;
          container.scrollLeft += distance;
          if (container.scrollLeft >= singleWidth) {
            container.scrollLeft -= singleWidth;
          }
        }

        rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);
    };

    startLoop();

    const handleResize = () => {
      singleWidth = container.scrollWidth / REPS || 1;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [combinedData]);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const amount =
      direction === "next" ? CARD_WIDTH + CARD_GAP : -(CARD_WIDTH + CARD_GAP);
    setIsPaused(true);
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => setIsPaused(false), PAUSE_DURATION);
  };

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const deltaX = touchEndX.current - touchStartX.current;
    if (Math.abs(deltaX) > 50) handleScroll(deltaX < 0 ? "next" : "prev");
  };

  const openModal = (index) => {
    setModalIndex(index % combinedData.length);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalIndex(null);
    document.body.style.overflow = "auto";
  };

  const nextModal = () => {
    setModalIndex((prev) => (prev + 1) % combinedData.length);
  };

  const prevModal = () => {
    setModalIndex(
      (prev) => (prev - 1 + combinedData.length) % combinedData.length
    );
  };

  if (!combinedData.length) return null;

  return (
    <div className="relative w-full py-6">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">
        Happy Customers at {hotelItem?.name}
      </h2>

      <div
        ref={scrollRef}
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex gap-4 items-stretch"
          style={{ width: "max-content" }}
        >
          {marqueeData.map((item, index) => (
            <div
              key={index}
              onClick={() => openModal(index)}
              className="cursor-pointer min-w-[280px] sm:min-w-[320px] max-w-[90vw] sm:max-w-[320px] bg-white border border-gray-300 rounded-lg shadow-md flex-shrink-0 flex flex-col overflow-hidden hover:scale-[1.02] transition-transform"
            >
              <div className="w-full h-40 sm:h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={item.profile}
                    alt={item.name}
                    loading="lazy"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <span className="font-bold text-gray-900 text-sm sm:text-base">
                    {item.name}
                  </span>
                </div>
                <p className="text-sm text-gray-800 mb-2 line-clamp-2 sm:line-clamp-3">
                  {item.text}{" "}
                  <span className="text-blue-600 cursor-pointer font-semibold">
                    ...More
                  </span>
                </p>
                <p className="text-xs font-medium text-gray-600">
                  {item.time} • {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow buttons - hidden on mobile */}
      <button
        onClick={() => handleScroll("prev")}
        className="hidden sm:flex absolute top-1/2 -translate-y-1/2 left-2 bg-white border rounded-full shadow-md p-2 hover:bg-gray-100 z-10"
        aria-label="Previous"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => handleScroll("next")}
        className="hidden sm:flex absolute top-1/2 -translate-y-1/2 right-2 bg-white border rounded-full shadow-md p-2 hover:bg-gray-100 z-10"
        aria-label="Next"
      >
        <ChevronRight size={20} />
      </button>

      {/* Modal */}
      {modalIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
          <div className="relative bg-white rounded-lg w-full max-w-lg p-4 sm:p-6 shadow-lg max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"
            >
              <X size={20} className="text-red-600" />
            </button>
            <div className="w-full h-44 sm:h-56 rounded-md overflow-hidden mb-4">
              <img
                src={combinedData[modalIndex].image}
                alt={combinedData[modalIndex].name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src={combinedData[modalIndex].profile}
                alt={combinedData[modalIndex].name}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div>
                <h2 className="text-base sm:text-lg font-bold">
                  {combinedData[modalIndex].name}
                </h2>
                <p className="text-xs font-medium text-gray-600">
                  {combinedData[modalIndex].time} • {combinedData[modalIndex].date}
                </p>
              </div>
            </div>
            <p className="text-gray-800 font-medium mb-4">
              {combinedData[modalIndex].text}
            </p>
            <div className="flex justify-between">
              <button
                onClick={prevModal}
                className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center gap-1 font-semibold text-sm"
              >
                <ChevronLeft size={18} /> Prev
              </button>
              <button
                onClick={nextModal}
                className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center gap-1 font-semibold text-sm"
              >
                Next <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
HotelHappyCustomer.propTypes = {
  hotelItem: hotelItemPropType.isRequired,
};
export default HotelHappyCustomer;
