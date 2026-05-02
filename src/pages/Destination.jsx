import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight, HiOutlineGlobeAlt, HiOutlineLocationMarker } from 'react-icons/hi';

const Destination = () => {
  const categories = [
    {
      id: 'domestic',
      title: 'Domestic',
      subtitle: 'Explore the Heart of India',
      description: 'From the Himalayas to the backwaters of Kerala, discover the rich heritage and diverse landscapes of our incredible nation.',
      image: 'https://images.unsplash.com/photo-1524492707947-55a576878130?q=80&w=1200&auto=format&fit=crop',
      link: '/domestic',
      icon: <HiOutlineLocationMarker className="text-red-600" size={24} />
    },
    {
      id: 'international',
      title: 'International',
      subtitle: 'World-Class Escapes',
      description: 'Embark on a global journey. Explore exotic beaches, modern skylines, and ancient wonders across the seven continents.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109c055?q=80&w=1200&auto=format&fit=crop',
      link: '/international',
      icon: <HiOutlineGlobeAlt className="text-red-600" size={24} />
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Luxury Hero Section */}
      <div className="relative pt-44 pb-24 px-6 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.2),transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="w-10 h-px bg-red-600"></span>
            <span className="text-red-600 font-bold uppercase tracking-[0.4em] text-[10px]">Your Journey Begins Here</span>
            <span className="w-10 h-px bg-red-600"></span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-white tracking-tight leading-none mb-8"
          >
            Choose Your <span className="text-red-600 italic">Horizon</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto"
          >
            Whether you seek the comfort of home or the thrill of the unknown, we have the perfect destination waiting for you.
          </motion.p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200"
            >
              <img 
                src={cat.image} 
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
              
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl transform transition-transform group-hover:scale-110 duration-500">
                  {cat.icon}
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight uppercase">
                  {cat.title}
                </h2>
                <p className="text-red-500 font-bold uppercase tracking-[0.2em] text-xs mb-6">
                  {cat.subtitle}
                </p>
                
                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-10 max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {cat.description}
                </p>
                
                <Link 
                  to={cat.link}
                  className="flex items-center gap-3 w-fit bg-white hover:bg-red-600 text-slate-900 hover:text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest uppercase transition-all duration-300 shadow-xl"
                >
                  Explore Now
                  <HiOutlineArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destination;
