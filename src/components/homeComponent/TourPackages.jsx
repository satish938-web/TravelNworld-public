import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DestinationCard from "../DestinationCard";
import { getJson } from "../../utils/api";

const TourPackages = () => {
  const navigate = useNavigate();
  const [internationalDestinations, setInternationalDestinations] = useState([]);
  const [domesticDestinations, setDomesticDestinations] = useState([]);
  const [loadingIntl, setLoadingIntl] = useState(true);
  const [loadingDom, setLoadingDom] = useState(true);

  useEffect(() => {
    setLoadingIntl(true);
    getJson("/api/destinations/type/international")
      .then((res) => {
        if (res?.data && Array.isArray(res.data)) {
          setInternationalDestinations(res.data.map((d) => ({
            title: d.name,
            image: d.coverImageUrl,
            description: d.shortDescription || "Explore top attractions.",
            type: "international",
            slug: d.slug
          })));
          setLoadingIntl(false);
        }
      }).catch(err => console.error("International Fetch Error:", err));

    setLoadingDom(true);
    getJson("/api/destinations/type/domestic")
      .then((res) => {
        if (res?.data && Array.isArray(res.data)) {
          setDomesticDestinations(res.data.map((d) => ({
            title: d.name,
            image: d.coverImageUrl,
            description: d.shortDescription || "Explore top attractions.",
            type: "domestic",
            slug: d.slug
          })));
          setLoadingDom(false);
        }
      }).catch(err => console.error("Domestic Fetch Error:", err));
  }, []);

  const SkeletonSection = ({ title }) => (
    <div className="w-full max-w-[1800px] mx-auto px-6 mb-32 animate-pulse">
      <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
      <div className="h-10 w-64 bg-gray-200 rounded mb-12" />
      <div className="flex gap-6 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-[280px] h-[380px] bg-gray-100 rounded-[2rem]" />
        ))}
      </div>
    </div>
  );

  const handleCardClick = (title, type, slug) => {
    const destinationId = slug || title.toLowerCase().replace(/\s+/g, "-");
    if (type === "international") {
      navigate(`/international-itinerary/${destinationId}`);
    } else if (type === "domestic") {
      navigate(`/domestic-itinerary/${destinationId}`);
    }
  };

  const Section = ({ title, data, type }) => {
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

    useEffect(() => {
      const fn = () => setIsMobile(window.innerWidth < 768);
      fn(); window.addEventListener("resize", fn);
      return () => window.removeEventListener("resize", fn);
    }, []);

    // Mobile auto-slide
    useEffect(() => {
      if (!isMobile || isPaused || !data.length) return;
      const iv = setInterval(() => {
        setCurrentIndex(p => (p + 1) % data.length);
        setSlideKey(k => k + 1);
      }, 5000);
      return () => clearInterval(iv);
    }, [isMobile, isPaused, data.length]);

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
    }, [isPaused, isMobile, data.length]);

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
        setCurrentIndex(p => dir === "next" ? (p + 1) % data.length : (p - 1 + data.length) % data.length);
        setSlideKey(k => k + 1);
        pause(); resume(3000);
      } else {
        const amt = dir === "next" ? 300 : -300; // Card (280) + Gap (20)
        scrollRef.current.scrollBy({ left: amt, behavior: "smooth" });
        pause(); resume();
      }
    };

    if (data.length === 0) return null;

    return (
      <div className="w-full max-w-[1800px] mx-auto px-6 mb-32 relative overflow-hidden">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-5 justify-center md:justify-start"
            >
              <span className="w-10 h-[2px] bg-red-600 rounded-full"></span>
              <span className="text-red-600 font-black uppercase tracking-[0.5em] text-[12px] font-['Montserrat']">
                {type === "international" ? "Worldwide" : "Across India"}
              </span>
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-4 leading-[1.1] font-['Montserrat']"
            >
              {title} <span className="text-red-600 font-light">Packages</span>
            </motion.h3>
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
              onClick={() => navigate(type === 'international' ? '/international' : '/domestic')}
              className="hidden sm:flex items-center gap-2 px-8 py-4 rounded-full bg-premium-gradient text-white font-black uppercase tracking-widest text-[12px] transition shadow-lg shadow-red-600/20"
            >
              View All <span>→</span>
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
                <DestinationCard
                  title={data[currentIndex].title}
                  image={data[currentIndex].image}
                  description={data[currentIndex].description}
                  onClick={() => handleCardClick(data[currentIndex].title, data[currentIndex].type, data[currentIndex].slug)}
                />
              </div>
              <div className="flex justify-center gap-2 mt-8">
                {data.map((_, i) => (
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
              {[...data, ...data].map((dest, i) => (
                <div key={i} className="flex-shrink-0">
                  <DestinationCard
                    title={dest.title}
                    image={dest.image}
                    description={dest.description}
                    onClick={() => handleCardClick(dest.title, dest.type, dest.slug)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full py-24 bg-white overflow-hidden">
      {/* Main Section Header */}
      <div className="max-w-[1800px] mx-auto px-6 mb-32 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="h-[2px] w-16 bg-red-600/20"></div>
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-red-600 font-bold uppercase tracking-[0.6em] text-[12px] font-['Poppins']"
          >
            Next Adventure
          </motion.span>
          <div className="h-[2px] w-16 bg-red-600/20"></div>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-extrabold text-black tracking-tighter mb-10 leading-[1.1] font-['Montserrat']"
        >
          Discover Your <br /> <span className="text-red-600 font-light">Next Journey</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 max-w-4xl mx-auto text-base md:text-lg font-medium leading-relaxed font-['Inter']"
        >
          Explore our hand-picked selection of the world's most breathtaking destinations. 
          From serene beaches to majestic mountains, we have it all.
        </motion.p>
      </div>

      {loadingIntl ? (
        <SkeletonSection title="International" />
      ) : internationalDestinations.length > 0 && (
        <Section 
          title="International" 
          data={internationalDestinations} 
          type="international" 
        />
      )}
      
      <div className="max-w-[1600px] mx-auto px-4 py-16">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>

      {loadingDom ? (
        <SkeletonSection title="Domestic" />
      ) : domesticDestinations.length > 0 && (
        <Section 
          title="Domestic" 
          data={domesticDestinations} 
          type="domestic" 
        />
      )}
    </div>
  );
};

export default TourPackages;
