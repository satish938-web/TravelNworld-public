import React from "react";
import VideoBackground from "../components/VideoBackground";
import HomeContactUs from "../components/homeComponent/HomeContactUs.jsx";
import Testimonials from "../components/homeComponent/Testimonials.jsx";
import TrendingDestination from "../components/homeComponent/TrendingDestination.jsx";
import Hero from "../components/homeComponent/Hero.jsx";
import TopMostBanner from "../components/homeComponent/TopMostBanner.jsx";
import MiddleBanner from "../components/homeComponent/MiddleBanner.jsx";
import VerifiedTransportCard from "../components/homeComponent/VerifiedTransportCard.jsx";
import VerifiedHotels from "../components/homeComponent/VerifiedHotels.jsx";
import TourPackages from "../components/homeComponent/TourPackages.jsx";
import HomeAboutUs from "../components/homeComponent/HomeAboutUs.jsx";
import PlaceToVisit from "../components/homeComponent/PlaceToVisit.jsx";


import { motion } from "framer-motion";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full relative overflow-x-hidden"
    >
      <TopMostBanner />
      <Hero />
      <HomeAboutUs />

      <motion.div variants={sectionVariants}>
        <MiddleBanner />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <VerifiedTransportCard />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <TrendingDestination />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <VerifiedHotels />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <TourPackages />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <PlaceToVisit/>
      </motion.div>

      <motion.div variants={sectionVariants}>
        <HomeContactUs/>
      </motion.div>

      <motion.div variants={sectionVariants}>
        <Testimonials />
      </motion.div>
    </motion.div>   
  );
};


export default Home;
