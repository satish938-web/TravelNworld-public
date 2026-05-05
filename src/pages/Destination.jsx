import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight, HiOutlineGlobeAlt, HiOutlineLocationMarker } from 'react-icons/hi';
import { usePageHero } from '../hooks/usePageHero';
import { getImageUrl } from '../utils/api';
import goaImg from '../assets/images/places/goa.jpg';

const Destination = () => {
  const { mediaUrl, isVideo } = usePageHero('Destination');

  const categories = [
    {
      id: 'domestic',
      title: 'Domestic',
      subtitle: 'Explore the Heart of India',
      label: 'Discover India',
      tag: 'India',
      num: '01',
      description: 'From the Himalayas to the backwaters of Kerala — uncover the rich heritage and diverse landscapes of our incredible nation.',
      image: goaImg,
      link: '/packages?type=domestic',
      icon: <HiOutlineLocationMarker size={20} />
    },
    {
      id: 'international',
      title: 'International',
      subtitle: 'World-Class Escapes',
      label: 'Beyond Borders',
      tag: 'Worldwide',
      num: '02',
      description: 'Exotic beaches, modern skylines, and ancient wonders — journey across all seven continents with curated escapes.',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop', // Iconic Eiffel Tower
      link: '/packages?type=international',
      icon: <HiOutlineGlobeAlt size={20} />
    }
  ];

  const stats = [
    { num: '12K+', label: 'Elite Members' },
    { num: '80+',  label: 'Destinations' },
    { num: '9+',   label: 'Years Leading' },
  ];

  const filters = ['All Destinations', 'Beach', 'Adventure', 'Cultural', 'Luxury'];

  return (
    <div className="min-h-screen font-['Montserrat']">

      {/* ════════════════════════════════
          HERO — dark red/black
      ════════════════════════════════ */}
      <div className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Media Background Layer */}
        <div className="absolute inset-0 z-0">
          {mediaUrl ? (
            isVideo ? (
              <video
                src={mediaUrl}
                autoPlay loop muted playsInline
                className="w-full h-full object-cover opacity-60"
              />
            ) : (
              <img
                src={mediaUrl}
                alt="Hero"
                className="w-full h-full object-cover opacity-60"
              />
            )
          ) : (
            <img
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop"
              alt="Travel Hero"
              className="w-full h-full object-cover opacity-30 grayscale"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        {/* Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

        {/* Hero content */}
        <motion.div
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 border border-red-500/30 bg-red-600/10 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-red-400 mb-8 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            Global Explorations
          </motion.span>

          <h1 className="text-[clamp(3rem,9vw,6rem)] font-black leading-[0.9] tracking-tighter text-white mb-8 font-['Montserrat']">
            THE GLOBAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 italic font-light">Frontier.</span>
          </h1>

          <p className="text-slate-300 text-lg md:text-xl max-w-2xl leading-relaxed font-light mb-12 font-['Barlow']">
            Journey to the most iconic and remote corners of the planet. From ancient architectural marvels to pristine wilderness.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-16">
            {stats.map((s, i) => (
              <motion.div 
                key={s.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="text-center"
              >
                <div className="text-4xl font-black text-white leading-none mb-2 font-['Montserrat']">
                  {s.num}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 font-['Barlow']">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ════════════════════════════════
          CARDS SECTION — gray → white
      ════════════════════════════════ */}
      <div className="bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-5xl mx-auto px-6 py-16">

          {/* Section heading */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-600 mb-3">
              Where Do You Want To Go?
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 leading-none">
              Choose Your <span className="text-red-600">Journey.</span>
            </h2>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative h-[460px] rounded-[1.5rem] overflow-hidden border border-gray-200 shadow-xl shadow-gray-300/50"
              >
                {/* Card image */}
                <img
                  src={getImageUrl(cat.image)}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-[900ms] group-hover:scale-110"
                  style={{ zIndex: 0 }}
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

                {/* Red shimmer on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top-left region badge */}
                <div className="absolute top-5 left-5 bg-white/90 border border-gray-200 backdrop-blur-sm rounded-full px-3 py-1.5 text-[9px] font-bold tracking-[0.15em] text-gray-600 uppercase shadow-sm">
                  {cat.tag}
                </div>

                {/* Top-right number */}
                <div className="absolute top-5 right-5 text-[11px] font-black text-white/20 tracking-widest">
                  {cat.num}
                </div>

                {/* Card body */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-2xl bg-red-600/15 border border-red-600/35 flex items-center justify-center mb-4 text-red-500 transition-all duration-300 group-hover:bg-red-600/35 group-hover:border-red-600/60">
                    {cat.icon}
                  </div>

                  {/* Label */}
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-red-500 mb-1">
                    {cat.label}
                  </p>

                  {/* Title */}
                  <h3 className="text-[2.2rem] font-black uppercase tracking-[-1.2px] leading-none mb-1 text-white">
                    {cat.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/45 mb-4">
                    {cat.subtitle}
                  </p>

                  {/* Description — reveals on hover */}
                  <p className="text-xs text-white/60 leading-relaxed max-w-xs mb-6 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-28 group-hover:opacity-100">
                    {cat.description}
                  </p>

                  {/* CTA button */}
                  <Link
                    to={cat.link}
                    className="inline-flex items-center gap-2 w-fit bg-red-600 hover:bg-red-700 active:scale-95 text-white px-7 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-lg shadow-red-900/30"
                  >
                    Explore Now
                    <HiOutlineArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Destination;