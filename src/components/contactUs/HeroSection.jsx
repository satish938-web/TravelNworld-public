import React from 'react';
import HeroImage from '../../assets/images/contactUsHero.png';

const HeroSection = () => {
  return (
    <div className="relative w-full h-[60vh] md:h-[60vh] mt-1 overflow-hidden">
      <img
        src={HeroImage}
        alt="Contact Us Hero"
        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-10000 ease-out"
      />

      {/* Overlay text container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-40 text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Explore the World with Us</h1>
        <p className="text-lg md:text-2xl max-w-2xl">
          Your adventure starts here. Discover new places, cultures, and memories.
        </p>
      </div>
    </div>
  );
};
 
export default HeroSection;
