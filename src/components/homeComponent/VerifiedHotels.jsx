import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ItineraryCard from "../../components/ItineraryCard";
import hotels from "../../data/hotels";

const VerifiedHotels = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideKey, setSlideKey] = useState(0);
  
  const scrollRef = useRef(null);
  const rafRef = useRef(null);
  const pauseTimeout = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Mobile auto-slide
  useEffect(() => {
    if (!isMobile || isPaused || !hotels.length) return;
    const iv = setInterval(() => {
      setCurrentIndex(p => (p + 1) % hotels.length);
      setSlideKey(k => k + 1);
    }, 5000);
    return () => clearInterval(iv);
  }, [isMobile, isPaused, hotels.length]);

  // Desktop auto-scroll
  useEffect(() => {
    if (isMobile) return;
    const el = scrollRef.current;
    if (!el) return;

    const step = () => {
      if (!isPaused && !isDragging.current) {
        el.scrollLeft += 1.0; 
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused, isMobile, hotels.length]);

  const pause = () => { setIsPaused(true); clearTimeout(pauseTimeout.current); };
  const resume = (d = 1200) => { pauseTimeout.current = setTimeout(() => setIsPaused(false), d); };

  const onMD = e => { isDragging.current = true; startX.current = e.pageX - scrollRef.current.offsetLeft; scrollLeftRef.current = scrollRef.current.scrollLeft; pause(); };
  const onMU = () => { isDragging.current = false; resume(); };
  const onML = () => { isDragging.current = false; resume(); };
  const onMM = e => { if (!isDragging.current) return; e.preventDefault(); scrollRef.current.scrollLeft = scrollLeftRef.current - (e.pageX - scrollRef.current.offsetLeft - startX.current); };
  const onTS = e => { isDragging.current = true; startX.current = e.touches[0].pageX - scrollRef.current.offsetLeft; scrollLeftRef.current = scrollRef.current.scrollLeft; pause(); };
  const onTM = e => { if (!isDragging.current) return; e.preventDefault(); scrollRef.current.scrollLeft = scrollLeftRef.current - (e.touches[0].pageX - scrollRef.current.offsetLeft - startX.current); };
  const onTE = () => { isDragging.current = false; resume(); };

  const navClick = dir => {
    if (isMobile) {
      setCurrentIndex(p => dir === "next" ? (p + 1) % hotels.length : (p - 1 + hotels.length) % hotels.length);
      setSlideKey(k => k + 1);
      pause(); resume(3000);
    } else {
      const amt = dir === "next" ? 310 : -310; // Card (290) + Gap (20)
      scrollRef.current.scrollBy({ left: amt, behavior: "smooth" });
      pause(); resume();
    }
  };

  return (
    <div className="px-6 py-24 max-w-[1800px] w-full mx-auto relative overflow-hidden">
      {/* Heading */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
        <div className="text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-5 justify-center md:justify-start"
          >
            <span className="w-10 h-[2px] bg-red-600 rounded-full"></span>
            <span className="text-red-600 font-bold uppercase tracking-[0.4em] text-[9px] font-['Poppins']">Verified Stays</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-6 leading-[1.1] font-['Montserrat']"
          >
            Luxury <span className="text-red-600 font-light">Hotels</span> & Resorts
          </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "circOut", delay: 0.3 }}
              className="h-1.5 bg-gradient-to-r from-red-600 to-black rounded-full shadow-lg shadow-red-600/20 origin-left"
            ></motion.div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/all-hotels")}
            className="hidden sm:flex items-center gap-2 px-8 py-4 rounded-full bg-premium-gradient text-white font-black uppercase tracking-widest text-[10px] transition shadow-lg shadow-red-600/20"
          >
            View Collection <span>→</span>
          </button>
          <div className="flex gap-2">
            <button className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition" onClick={() => navClick("prev")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition" onClick={() => navClick("next")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        {isMobile ? (
          <div className="px-4">
            <div key={slideKey}>
              <ItineraryCard {...hotels[currentIndex]}>
                <div className="mt-auto w-full flex flex-col gap-2 p-4 pt-0">
                  <button
                    onClick={() => navigate(`/book-hotel/${hotels[currentIndex].id}`)}
                    className="bg-premium-gradient text-white px-4 py-3 rounded-full w-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-lg shadow-red-600/20 border-none"
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => navigate(`/hotel-details/${hotels[currentIndex].id}`)}
                    className="border border-slate-200 hover:bg-black hover:text-white text-slate-600 px-4 py-3 rounded-full w-full text-[10px] font-black uppercase tracking-widest transition-all duration-300"
                  >
                    View Details
                  </button>
                </div>
              </ItineraryCard>
            </div>
            <div className="flex justify-center gap-2 mt-8">
              {hotels.map((_, i) => (
                <button
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? "w-8 bg-red-600" : "w-2 bg-gray-200"}`}
                  onClick={() => { setCurrentIndex(i); setSlideKey(k => k + 1); pause(); resume(3000); }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-hidden select-none py-10 -my-10"
            style={{ cursor: "grab" }}
            onMouseDown={onMD} onMouseUp={onMU}
            onMouseLeave={onML} onMouseMove={onMM}
            onMouseEnter={pause}
            onTouchStart={onTS} onTouchMove={onTM} onTouchEnd={onTE}
          >
            {[...hotels, ...hotels].map((hotel, idx) => (
              <div
                key={`${hotel.id}-${idx}`}
                className="flex-shrink-0 w-[290px] bg-white rounded-[2rem] shadow-xl overflow-hidden"
              >
                <ItineraryCard {...hotel}>
                  <div className="mt-auto w-full flex flex-col gap-2 p-4 pt-0">
                    <button
                      onClick={() => navigate(`/book-hotel/${hotel.id}`)}
                      className="bg-premium-gradient text-white px-4 py-3 rounded-full w-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-lg shadow-red-600/20 border-none"
                    >
                      Book Now
                    </button>
                    <button
                      onClick={() => navigate(`/hotel-details/${hotel.id}`)}
                      className="border border-slate-200 hover:bg-black hover:text-white text-slate-600 px-4 py-3 rounded-full w-full text-[10px] font-black uppercase tracking-widest transition-all duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </ItineraryCard>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifiedHotels;
