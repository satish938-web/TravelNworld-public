import React from "react";
import img1 from "../../assets/images/logo/aboutUsHero/welcome1.jpg";
import img2 from "../../assets/images/logo/aboutUsHero/welcome2.jpg";
import img3 from "../../assets/images/logo/aboutUsHero/welcome3.png";
import img4 from "../../assets/images/logo/aboutUsHero/welcome4.png";
import img5 from "../../assets/images/logo/aboutUsHero/welcome5.png";

const WelcomeToTravelnWorld = () => {
  const cards = [
    { img: img1, text: "ZERO RUPEES DOWN PAYMENT" },
    { img: img2, text: "NO COST EMI" },
    { img: img3, text: "ZERO RUPEES INTEREST" },
    { img: img4, text: "6 MONTHS EASY EMI HOLIDAYS" },
    { img: img5, text: "ZERO PROCESSING FEE" },
  ];

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-20 py-10 md:py-16">
      {/* Welcome Section */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Welcome to TravelnWorld
        </h1>
        <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg text-justify">
          TravelnWorld Pvt Ltd is built on a strong foundation aiming to provide
          exceptional customer satisfaction and unforgettable holiday
          experiences. Whether it&apos;s a once-in-a-lifetime vacation or a corporate
          retreat, TravelnWorld ensures you get what you want in the shortest
          time. With years of expertise in destination management, we handle
          customer needs seamlessly – from holiday bookings, tours, excursions,
          business trips, hotel arrangements, to much more.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg text-justify">
          Discover what makes TravelnWorld distinct and why we are trusted by
          thousands of travelers worldwide.
        </p>
      </div>

      {/* Stress-Free Section */}
      <div className="mt-10 md:mt-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
          Stress-Free Holidays with TravelnWorld
        </h2>

        {/* Infinite Scrolling Cards */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll space-x-3 sm:space-x-4 md:space-x-6 w-max px-2 sm:px-4">
            {[...cards, ...cards].map((card, i) => (
              <div
                key={i}
                className="bg-yellow-400 p-3 sm:p-4 md:p-6 rounded-xl shadow-lg text-center min-w-[160px] sm:min-w-[200px] md:min-w-[250px] flex-shrink-0"
              >
                <img
                  src={card.img}
                  alt={`holiday-${i}`}
                  className="h-28 sm:h-36 md:h-48 w-full object-cover rounded-lg mb-2 sm:mb-3 md:mb-4"
                />
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
                  {card.text}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeToTravelnWorld;
