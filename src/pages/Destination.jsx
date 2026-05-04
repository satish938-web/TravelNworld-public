import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight, HiOutlineGlobeAlt, HiOutlineLocationMarker } from 'react-icons/hi';
import Hero from "../components/homeComponent/Hero.jsx";

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
      <Hero 
        page="Destination" 
        title1="The" 
        title2="Global" 
        italicTitle="Frontier." 
        subtitle="Embark on a voyage to the most iconic and remote corners of the planet. Whether you're drawn to the ancient architectural marvels of Europe, the pristine wilderness of Africa, or the spiritual sanctuaries of Asia, we provide the ultimate gateway to the world's diverse beauty."
        kicker="EXPLORE THE UNKNOWN"
        showForm={false}
      />

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
