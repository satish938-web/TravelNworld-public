import React from 'react'
import ContactForm from '../forms/ContactForm.jsx'
import MapSection from '../components/contactUs/MapSection.jsx'
import Hero from '../components/homeComponent/Hero.jsx'

const ContactUs = () => {
  return (
    <div>
      <Hero 
        page="Contact" 
        title1="Connect" 
        title2="With" 
        italicTitle="Our Concierge." 
        subtitle="Our global network of travel experts is at your disposal. Whether you have a specific itinerary in mind or need inspiration for your next great adventure, reach out to our dedicated concierge team for personalized service that starts the moment you say hello."
        kicker="BESPOKE ASSISTANCE"
        showForm={false}
      />
      <ContactForm />
      <MapSection/>
    </div>
  )
}

export default ContactUs
