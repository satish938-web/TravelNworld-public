import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ItineraryCard from "../../components/ItineraryCard";
import hotels from "../../data/hotels";

const VerifiedHotelsList = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  // Show only first 4 if showAll is false
  const hotelsToDisplay = showAll ? hotels : hotels.slice(0, 4);

  return (
    <div className="px-4 sm:px-6 md:px-12 py-10 max-w-[1400px] w-full mx-auto">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline text-sm flex items-center"
      >
        ← Back
      </button>

      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        All Verified Hotels
      </h1>

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hotelsToDisplay.map(({ id, name, title, image }) => (
          <div
            key={id}
            className="bg-white rounded-md shadow-sm overflow-hidden w-full max-w-[240px] mx-auto"
          >
            <ItineraryCard id={id} name={name} title={title} image={image}>
              <div className="mt-auto w-full">
                <button
                  onClick={() => navigate(`/book-hotel/${id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full text-sm"
                >
                  Book Hotel
                </button>
                <button
                  onClick={() => navigate(`/hotel-details/${id}`)}
                  className="border border-blue-600 mt-1 hover:bg-blue-600 hover:text-white text-blue-600 px-4 py-2 rounded-md w-full text-sm"
                >
                  View Details
                </button>
              </div>
            </ItineraryCard>
          </div>
        ))}
      </div>

      {/* View All Button */}
      {!showAll && hotels.length > 4 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-sm font-semibold shadow-md transition duration-300"
          >
            View All Hotels
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifiedHotelsList;
