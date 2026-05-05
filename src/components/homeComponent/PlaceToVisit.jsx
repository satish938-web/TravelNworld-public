import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { getJson } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AUTO_SCROLL_SPEED = 1.5;

const PlaceToVisit = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("International");
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

  const fetchPlaces = async (category) => {
    setLoading(true);
    try {
      const res = await getJson(`/api/destinations/cards?type=${category.toLowerCase()}`);
      if (res?.data && Array.isArray(res.data)) {
        setPlaces(res.data.map((d, i) => ({
          id: d._id || i,
          slug: d.slug,
          name: d.name,
          desc: d.shortDescription || "Explore top attractions.",
          img: d.coverImageUrl
        })));
        setLoading(false);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const SkeletonCard = () => (
    <div className="flex-shrink-0 w-[290px] aspect-[4/5] bg-gray-100 rounded-[2rem] animate-pulse" />
  );

  useEffect(() => {
    fetchPlaces(activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Mobile auto-slide
  useEffect(() => {
    if (!isMobile || isPaused || !places.length) return;
    const iv = setInterval(() => {
      setCurrentIndex(p => (p + 1) % places.length);
      setSlideKey(k => k + 1);
    }, 4000);
    return () => clearInterval(iv);
  }, [isMobile, isPaused, places.length]);

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
  }, [isPaused, isMobile, places.length]);

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
      setCurrentIndex(p => dir === "next" ? (p + 1) % places.length : (p - 1 + places.length) % places.length);
      setSlideKey(k => k + 1);
      pause(); resume(3000);
    } else {
      const amt = dir === "next" ? 310 : -310; // Card (290) + Gap (20)
      scrollRef.current.scrollBy({ left: amt, behavior: "smooth" });
      pause(); resume();
    }
  };

  return (
    <section className="w-full bg-white py-24 relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4 justify-center md:justify-start"
            >
              <span className="w-12 h-[2px] bg-red-600 rounded-full"></span>
              <span className="text-red-600 font-black uppercase tracking-[0.6em] text-[13px]">Top Picks</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-6 leading-[1.1] font-['Montserrat']"
            >
              Top <span className="text-red-600 font-light">Destinations</span>
            </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "circOut", delay: 0.3 }}
              className="h-1.5 bg-gradient-to-r from-red-600 to-black rounded-full shadow-lg shadow-red-600/20 origin-left"
            ></motion.div>
            <div className="flex items-center gap-6 mt-8 justify-center md:justify-start">
              {["International", "Domestic"].map(cat => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setCurrentIndex(0); setSlideKey(0); }}
                  className={`text-[13px] font-black uppercase tracking-widest pb-1 transition-all duration-300 border-b-2 ${activeCategory === cat ? "border-red-600 text-red-600" : "border-transparent text-gray-400 hover:text-black"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              className="hidden sm:flex items-center gap-2 px-8 py-4 rounded-full bg-premium-gradient text-white font-black uppercase tracking-widest text-[12px] transition shadow-lg shadow-red-600/20"
              onClick={() => navigate("/packages")}
            >
              Explore All <span>→</span>
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

        {/* Cards */}
        <div className="relative">
          {loading ? (
            <div className="flex gap-6 overflow-hidden">
              {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : places.length > 0 && (
            isMobile ? (
              <div className="px-4">
                <div 
                  className="group relative w-full rounded-2xl overflow-hidden shadow-lg mx-auto aspect-[4/5] cursor-pointer" 
                  key={slideKey}
                  onClick={() => {
                    const slug = places[currentIndex].slug || places[currentIndex].name.toLowerCase().replace(/\s+/g, '-');
                    navigate(activeCategory === "International" ? `/international-itinerary/${slug}` : `/domestic-itinerary/${slug}`);
                  }}
                >
                  <img
                    src={places[currentIndex].img}
                    alt={places[currentIndex].name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8">
                    <h3 className="text-white text-2xl font-black mb-2 group-hover:text-red-500 transition-colors">{places[currentIndex].name}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">{places[currentIndex].desc}</p>
                  </div>
                </div>
                <div className="flex justify-center gap-2 mt-8">
                  {places.map((_, i) => (
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
                {[...places, ...places].map((place, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      const slug = place.slug || place.name.toLowerCase().replace(/\s+/g, '-');
                      navigate(activeCategory === "International" ? `/international-itinerary/${slug}` : `/domestic-itinerary/${slug}`);
                    }}
                    className="flex-shrink-0 w-[290px] group relative rounded-[2rem] overflow-hidden shadow-xl aspect-[4/5] cursor-pointer border border-gray-100/50"
                  >
                    <img
                      src={place.img}
                      alt={place.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 opacity-90 group-hover:opacity-100 transition-opacity">
                      <h3 className="text-white text-3xl font-extrabold mb-1 group-hover:text-red-500 transition-colors font-['Montserrat'] tracking-wide">{place.name}</h3>
                      <p className="text-gray-100 text-[16px] line-clamp-2 leading-relaxed font-['Inter']">
                        {place.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        {/* Live indicator */}
        {!isMobile && (
          <div className="flex items-center gap-3 mt-10 opacity-30">
            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[12px] text-gray-500 font-black uppercase tracking-[0.3em]">
              {places.length} Destinations Active
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlaceToVisit;
