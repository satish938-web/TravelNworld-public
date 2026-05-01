import React from 'react'
import HeroPage from '../components/aboutUs/HeroPage.jsx'
import WelcomeToTravelnWorld from '../components/aboutUs/WelcomeToTravelnWorld.jsx'
import WhyUs from '../components/aboutUs/WhyUs.jsx'
import AboutOurServices from '../components/aboutUs/AboutOurServices.jsx'

const AboutUs = () => {
  return (
    <div>
      <HeroPage />
      <WelcomeToTravelnWorld />
      <WhyUs />
      <AboutOurServices />
    </div>
  )
}

export default AboutUs