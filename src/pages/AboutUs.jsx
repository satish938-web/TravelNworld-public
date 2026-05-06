import React from 'react'
import WelcomeToTravelnWorld from '../components/aboutUs/WelcomeToTravelnWorld.jsx'
import WhyUs from '../components/aboutUs/WhyUs.jsx'
import AboutOurServices from '../components/aboutUs/AboutOurServices.jsx'
import { usePageHero } from '../hooks/usePageHero'
import { motion } from 'framer-motion'

const FALLBACK = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop";

const AboutUs = () => {
  const { mediaUrl, isVideo } = usePageHero('About');
  const displayUrl = mediaUrl || FALLBACK;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO */}
      <div className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Media Background Layer */}
        <div className="absolute inset-0 z-0">
          {mediaUrl ? (
            isVideo ? (
              <video 
                src={mediaUrl} 
                autoPlay muted loop playsInline 
                className="w-full h-full object-cover opacity-50 grayscale-[0.2]"
              />
            ) : (
              <img 
                src={mediaUrl} 
                alt="About Us Background"
                className="w-full h-full object-cover opacity-50 grayscale-[0.2]"
              />
            )
          ) : (
            <img 
              src={FALLBACK} 
              alt="About Us" 
              className="w-full h-full object-cover opacity-30 grayscale"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        {/* Floating Accents */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] translate-y-1/3 -translate-x-1/4" />

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 py-2 px-6 rounded-full border border-red-500/30 bg-red-600/10 text-red-400 text-[10px] font-black uppercase tracking-[0.5em] mb-12 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            Since 2010
          </motion.span>

          <h1
            className="text-white tracking-tighter mb-10 leading-[0.85] font-['Montserrat'] font-black"
            style={{ fontSize: 'clamp(40px, 10vw, 100px)' }}
          >
            THE PINNACLE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 italic font-light">
              Of TravelN World.
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto mb-14 font-['Barlow']">
            Crafting bespoke itineraries that transcend the ordinary. Our legacy is defined by the extraordinary memories we create.
          </p>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 text-white px-12 py-5 rounded-xl text-xs font-black uppercase tracking-[0.3em] transition-all shadow-2xl shadow-red-600/20"
          >
            Explore Our World
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/30 text-[10px] font-bold tracking-[0.4em] uppercase">
          <div className="w-px h-16 bg-gradient-to-b from-red-600 to-transparent" />
          Scroll
        </div>
      </div>

      <style>{`
        @keyframes gridDrift { from { transform: translateY(0); } to { transform: translateY(60px); } }
      `}</style>

      <WelcomeToTravelnWorld />
      <WhyUs />
      <AboutOurServices />
    </div>
  );
};

export default AboutUs;