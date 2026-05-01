import React from "react";
import { useParams } from "react-router-dom";
import ItineraryCard from "../../components/ItineraryCard";
import hotels from "../../data/hotels";
import GetAQuoteForm from "../../forms/GetAQuoteForm";

const BookHotelsPage = () => {
  const { id } = useParams();
  const selectedHotel = hotels.find((hotel) => hotel.id === id);

  if (!selectedHotel) {
    return (
      <div className="px-4 py-10 text-center text-red-500 font-semibold">
        Hotel not found. Please go back and select a valid hotel.
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-12 py-10 max-w-[1400px] w-full mx-auto">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Selected Hotel */}
        <div className="w-full md:w-[30%] mt-8">
          <h2 className="text-xl font-semibold mb-6 text-center capitalize">Selected Hotel</h2>
          <ItineraryCard {...selectedHotel} />
        </div>

        {/* Right: Booking Form */}
        <div className="w-full md:w-[70%]">
          <div className="bg-white rounded-md shadow-md">
            <GetAQuoteForm
              agencyName={selectedHotel.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookHotelsPage;
