import React from 'react'
import BlogCards from '../components/blogs/BlogCards.jsx'
import { usePageHero } from '../hooks/usePageHero'
import { motion } from 'framer-motion'

const Blogs = () => {
  const { mediaUrl, isVideo } = usePageHero('Blog');
  return (
    <div>
      <div className="relative w-full h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-[#0f172a]">
        <div className="absolute inset-0 z-0">
          {mediaUrl ? (
            isVideo ? (
              <video 
                src={mediaUrl} 
                autoPlay 
                muted 
                loop 
                playsInline 
                preload="auto"
                className="w-full h-full object-cover opacity-75"
              />
            ) : (
              <img 
                src={mediaUrl} 
                alt="Editorial Background"
                className="w-full h-full object-cover opacity-75"
              />
            )
          ) : (
            <img 
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop" 
              alt="Editorial Background"
              className="w-full h-full object-cover opacity-50 grayscale-[0.2]"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/90 via-[#0f172a]/40 to-[#0f172a]/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-[1.5px] w-12 bg-red-600"></span>
              <span className="text-red-500 font-black uppercase tracking-[0.6em] text-[11px] font-['Barlow']">
                The Editorial
              </span>
              <span className="h-[1.5px] w-12 bg-red-600"></span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 font-['Montserrat'] leading-[0.9]">
              INSIDER <br/>
              <span className="text-red-500 italic font-light drop-shadow-2xl">Perspectives.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed font-['Barlow'] max-w-2xl mx-auto">
              Deep dive into the world of elite travel. From secret Mediterranean retreats to arctic expeditions, our editorial is your ultimate global compass.
            </p>
          </motion.div>
        </div>
      </div>
      <BlogCards/>
      
    </div>
  )
}

export default Blogs
