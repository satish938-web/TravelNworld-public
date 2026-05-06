import React from 'react'
import ContactForm from '../forms/ContactForm.jsx'
import MapSection from '../components/contactUs/MapSection.jsx'
import { usePageHero } from '../hooks/usePageHero'
import { motion } from 'framer-motion'

const ContactUs = () => {
  const { mediaUrl, isVideo } = usePageHero('Contact');
  return (
    <div>
      <div className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Backend Media Layer */}
        <div className="absolute inset-0 z-0">
          {mediaUrl ? (
            isVideo ? (
              <video 
                src={mediaUrl} 
                autoPlay muted loop playsInline 
                className="w-full h-full object-cover opacity-50"
              />
            ) : (
              <img 
                src={mediaUrl} 
                alt="Contact Background"
                className="w-full h-full object-cover opacity-50"
              />
            )
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <motion.div 
            whileHover={{ rotate: 0, scale: 1.1 }}
            className="w-16 h-16 mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 rotate-3 transform transition-all backdrop-blur-sm"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 font-['Montserrat'] leading-[0.9]">
            Connect With <br className="md:hidden" />
            <span className="text-red-600 font-black italic">Our Concierge.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed font-['Barlow']">
            Our global network of travel experts is at your disposal. Reach out to our dedicated concierge team for personalized service.
          </p>
        </motion.div>
      </div>
      <ContactForm />
      <MapSection/>
    </div>
  )
}

export default ContactUs
