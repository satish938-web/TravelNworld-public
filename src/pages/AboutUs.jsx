import React from 'react'
import Hero from '../components/homeComponent/Hero.jsx'
import WelcomeToTravelnWorld from '../components/aboutUs/WelcomeToTravelnWorld.jsx'
import WhyUs from '../components/aboutUs/WhyUs.jsx'
import AboutOurServices from '../components/aboutUs/AboutOurServices.jsx'

const AboutUs = () => {
  return (
    <div>
      <Hero 
        page="About" 
        title1="The" 
        title2="Pinnacle" 
        italicTitle="Of Travel." 
        subtitle="Since our inception in 2010, Travel N World has been at the forefront of luxury tourism. We specialize in creating bespoke itineraries that transcend the ordinary, ensuring that every traveler experiences the soul of their destination through a lens of unparalleled comfort and sophistication."
        kicker="A DECADE OF EXCELLENCE"
        showForm={false}
      />
      <WelcomeToTravelnWorld />
      <WhyUs />
      <AboutOurServices />
    </div>
  )
}

export default AboutUs
