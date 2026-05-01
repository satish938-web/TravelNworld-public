import React from "react";
import { useParams } from "react-router-dom";
import domesticItineraryData from "../../data/domesticItineraryData";
import internationalItineraryData from "../../data/internationalItineraryData";
import GetAQuoteForm from "../../forms/GetAQuoteForm";

const TourPGetAQuote = () => {
  const { type, destinationId, id } = useParams();

  // Decide data source based on type
  const dataSource =
    type === "international"
      ? internationalItineraryData
      : domesticItineraryData;

  const destinationItineraries = dataSource[destinationId] || [];

  // Find the specific itinerary by ID
  const itinerary = destinationItineraries.find(
    (item) => item.id.toString() === id.toString()
  );

  if (!itinerary) {
    return (
      <div className="p-6 text-center text-red-500 text-lg font-semibold">
        Itinerary not found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
      {/* Left: Itinerary Card */}
      <div className="w-full md:w-1/3 border rounded-lg shadow p-4 flex-shrink-0 bg-white">
        <img
          src={itinerary.image}
          alt={itinerary.name}
          className="w-full h-52 sm:h-64 md:h-48 object-cover rounded mb-4"
        />
        <h2 className="text-lg sm:text-xl font-bold text-blue-800 mb-2 text-center md:text-left">
          {itinerary.name}
        </h2>
        <p className="text-sm text-gray-600 text-center md:text-left">
          {itinerary.title}
        </p>
      </div>

      {/* Right: Quote Form */}
      <div className="w-full md:w-2/3 border rounded-lg shadow p-4 bg-white">
        <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-4 text-center md:text-left">
          Get a Quote
        </h3>
        <GetAQuoteForm agencyName={itinerary.name} />
      </div>
    </div>
  );
};

export default TourPGetAQuote;
