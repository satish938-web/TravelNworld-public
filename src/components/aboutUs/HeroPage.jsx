import React from "react";
import heroBg from "../../assets/images/logo/aboutUsHero/heroPage.jpg";

const HeroPage = () => {
  return (
    <section
      className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[75vh] flex items-center justify-center md:justify-start bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl px-4 sm:px-6 lg:px-12 text-center md:text-left text-white">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug">
          Explore The World With Us
        </h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto md:mx-0">
          Discover breathtaking destinations, unforgettable experiences, and
          create memories that last a lifetime.
        </p>
      </div>
    </section>
  );
};

export default HeroPage;
