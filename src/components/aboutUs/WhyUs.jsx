import React from "react";
import whyUs from "../../assets/images/logo/aboutUsHero/whyUs.png";

export default function WhyUs() {
  return (
    <div
      className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] bg-cover bg-center flex flex-col justify-between"
      style={{ backgroundImage: `url(${whyUs})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Heading */}
      <div className="relative z-10 pt-8 px-4 flex justify-center text-center">
        <h1 className="text-white text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold leading-snug max-w-2xl mx-auto relative">
          If you can’t find the tour you are looking for, just contact us
          {/* Circular Bubble Overlapping H1 */}
          {/* <span className="absolute -top-6 -right-6 sm:-top-8 sm:-right-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm md:text-base font-bold shadow-lg">
            1
          </span> */}
        </h1>
      </div>

      {/* Bubbles Section */}
      <div className="relative z-10 pb-10 px-4 flex justify-center">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:flex md:flex-wrap md:gap-8 justify-center">
          {[
            "Worldwide Services",
            "Customized Tours",
            "Expert Guidance",
            "24/7 Support",
            "Affordable Packages",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/20 backdrop-blur-lg text-white rounded-full p-4 sm:p-6 shadow-lg 
                         w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 
                         flex items-center justify-center text-center text-xs sm:text-sm md:text-base font-medium"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
