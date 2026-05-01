import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TourPackages from "../../assets/images/hotel.jpg";
import hotelItemPropType from '../../propTypes/hotelItemPropType.js';
const HotelTourPackages = ({ hotelItem }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleViewAll = () => {
    navigate(`/hotels/${hotelItem?.id}/packages`);
  };

  if (!hotelItem?.tourPackages?.length) {
    return null;
  }

  const duplicatedPackages = [
    ...hotelItem.tourPackages,
    ...hotelItem.tourPackages,
  ];

  // Continuous marquee effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const speed = 0.8; // scrolling speed

    const step = () => {
      if (!isPaused && !isDragging.current) {
        scrollContainer.scrollLeft += speed;

        // Reset at halfway point for infinite loop
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused]);

  // Mouse events
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    setIsPaused(true);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setIsPaused(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Touch events
  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    setIsPaused(false);
  };

  return (
    <section id="packages" className="mb-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg sm:text-xl">Tour Packages</h2>
        <button
          onClick={handleViewAll}
          className="text-blue-600 text-sm sm:text-md font-medium underline"
        >
          View All
        </button>
      </div>

      {/* Marquee Scroll Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll no-scrollbar gap-4 cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}        // Pause on hover
        onMouseLeave={() => {
          isDragging.current = false;
          setIsPaused(false);                         // Resume on leave
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {duplicatedPackages.map((pkg, i) => (
          <div
            key={i}
            className="border rounded-md shadow-md overflow-hidden flex-shrink-0 flex flex-col h-80 min-w-card-md sm:min-w-card-lg bg-white"
          >
            {/* Image */}
            <div className="h-1/2 w-full">
              <img
                src={TourPackages}
                alt={`Package for ${pkg.destination}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Package Details */}
            <div className="h-1/2 p-3 sm:p-4 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm sm:text-base mb-1">
                  Packages For {pkg.destination}
                </h3>
                <p className="text-gray-700 text-xs sm:text-sm font-medium mb-2">
                  {pkg.description}
                </p>
                <p className="font-bold text-sm">{pkg.price} onwards</p>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <button className="text-blue-600 text-sm font-semibold underline w-fit">
                  View Details
                </button>
                <button className="border border-blue-600 text-blue-600 text-sm font-semibold py-1 rounded hover:bg-blue-50 w-full">
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
HotelTourPackages.propTypes = {
  hotelItem: hotelItemPropType.isRequired,
};
export default HotelTourPackages;
