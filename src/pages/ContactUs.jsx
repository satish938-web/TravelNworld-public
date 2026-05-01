import React from 'react'
import HeroSection from '../components/contactUs/HeroSection.jsx'
import ContactForm from '../forms/ContactForm.jsx'
import MapSection from '../components/contactUs/MapSection.jsx'

const ContactUs = () => {
  return (
    <div>
      <HeroSection />
      <ContactForm />
      <MapSection/>
    </div>
  )
}

export default ContactUs