import React, { useState, useRef, useEffect } from "react";
import { getJson, getImageUrl } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";

const CARD_WIDTH = 290;
const CARD_GAP = 20;



const SkeletonCard = () => (
  <div className="flex-shrink-0 w-[290px] flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 animate-pulse">
    <div className="w-full h-48 bg-gray-200" />
    <div className="p-5 flex flex-grow flex-col gap-3">
      <div className="h-6 bg-gray-200 rounded-lg w-3/4" />
      <div className="h-4 bg-gray-100 rounded-lg w-full" />
      <div className="h-4 bg-gray-100 rounded-lg w-5/6" />
      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="h-3 bg-gray-100 rounded-lg w-20" />
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
      </div>
    </div>
  </div>
);

const DestinationCard = ({
  id,
  title,
  description,
  price,
  images,
  onHoverStart,
  onHoverEnd,
}) => {
  const navigate = useNavigate();

  const handleKnowMore = () => {
    navigate(`/trending/${id}`);
  };

  return (
    <motion.div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={handleKnowMore}
      whileHover={{ y: -12 }}
      className="group cursor-pointer flex-shrink-0 w-[290px] flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-xl transition-all duration-500 border border-gray-100/50 hover:shadow-2xl hover:shadow-red-600/10"
    >
      <div className="w-full h-48 relative overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={images.length > 1}
          speed={1000}
          effect="fade"
          className="w-full h-full"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={getImageUrl(img || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop")}
                alt=""
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-premium-gradient text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
            Trending
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>          
          <h2 className="text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-red-600 transition-colors font-['Montserrat'] tracking-tight">
            {title}
          </h2>
          <p className="text-[15px] text-gray-600 line-clamp-2 leading-relaxed font-['Inter']">
            {description || "Discover the magic of this breathtaking destination with our exclusive tour packages."}
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Explore Now</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleKnowMore();
            }}
            className="w-10 h-10 bg-black group-hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-500 transform group-hover:translate-x-1"
          >
            <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7-7 7M3 12h18" /></svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};


const TrendingDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
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
    setLoading(true);
    getJson("/api/destinations/cards?category=trending&limit=100")
      .then((response) => {
        if (response?.data && Array.isArray(response.data)) {
          const formattedData = response.data.map(dest => ({
            id: dest.slug,
            title: dest.name,
            description: dest.shortDescription || "",
            images: dest.coverImageUrl ? [dest.coverImageUrl] : []
          }));
          setDestinations(formattedData);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("Trending Fetch Error:", err);
        // Note: We don't set loading(false) here so skeletons persist if backend is down
      });
  }, []);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Mobile auto-slide
  useEffect(() => {
    if (!isMobile || isPaused || !destinations.length) return;
    const iv = setInterval(() => {
      setCurrentIndex(p => (p + 1) % destinations.length);
      setSlideKey(k => k + 1);
    }, 4000);
    return () => clearInterval(iv);
  }, [isMobile, isPaused, destinations.length]);

  // Desktop auto-scroll
  useEffect(() => {
    if (isMobile) return;
    const el = scrollRef.current;
    if (!el) return;

    const step = () => {
      if (!isPaused && !isDragging.current) {
        el.scrollLeft += 1.2;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused, isMobile, destinations.length]);

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
      setCurrentIndex(p => dir === "next" ? (p + 1) % destinations.length : (p - 1 + destinations.length) % destinations.length);
      setSlideKey(k => k + 1);
      pause(); resume(3000);
    } else {
      const amt = dir === "next" ? 310 : -310; // Card (290) + Gap (20)
      scrollRef.current.scrollBy({ left: amt, behavior: "smooth" });
      pause(); resume();
    }
  };

  // On mobile, show only one skeleton or carousel of skeletons
  if (loading) {
    return (
      <div className="w-full py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse" />
            <div className="flex gap-2">
              <div className="w-11 h-11 bg-gray-100 rounded-full animate-pulse" />
              <div className="w-11 h-11 bg-gray-100 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="flex gap-5 overflow-hidden">
            {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  if (destinations.length === 0) return null;

  return (
    <div className="w-full py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-5 justify-center md:justify-start"
            >
              <span className="w-10 h-[2px] bg-red-600 rounded-full"></span>
              <span className="text-gray-900 font-bold uppercase tracking-[0.4em] text-[10px] font-['Poppins']">Editor's Selection</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-6 leading-[1.1] font-['Montserrat'] uppercase"
            >
              Trending <span className="text-red-600 italic">Destinations</span>
            </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "200px" }}
              viewport={{ once: true }}
              className="h-1.5 bg-red-600 rounded-full shadow-lg shadow-red-600/20 origin-left"
            ></motion.div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              className="hidden sm:flex items-center gap-2 px-8 py-4 rounded-full bg-premium-gradient text-white font-black uppercase tracking-widest text-[10px] transition shadow-lg shadow-red-600/20"
              onClick={() => navigate("/trending-destination-list")}
            >
              View Collection <span>→</span>
            </button>
            <div className="flex gap-2">
              <button className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 hover:bg-red-600 hover:text-white transition shadow-sm" onClick={() => navClick("prev")}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 hover:bg-red-600 hover:text-white transition shadow-sm" onClick={() => navClick("next")}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="relative">
          {isMobile ? (
            <div className="px-4">
              <DestinationCard key={slideKey} {...destinations[currentIndex]} />
              <div className="flex justify-center gap-2 mt-8">
                {destinations.map((_, i) => (
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
              className="flex gap-6 overflow-x-hidden select-none py-10 -my-10"
              style={{ cursor: "grab" }}
              onMouseDown={onMD} onMouseUp={onMU}
              onMouseLeave={onML} onMouseMove={onMM}
              onMouseEnter={pause}
              onTouchStart={onTS} onTouchMove={onTM} onTouchEnd={onTE}
            >
              {[...destinations, ...destinations].map((dest, i) => (
                <DestinationCard key={i} {...dest} />
              ))}
            </div>
          )}
        </div>

        {/* Live indicator */}
        {!isMobile && (
          <div className="flex items-center gap-3 mt-10 opacity-60">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-[10px] text-white/80 font-black uppercase tracking-[0.3em]">
              {destinations.length} Collections Active
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingDestination;
