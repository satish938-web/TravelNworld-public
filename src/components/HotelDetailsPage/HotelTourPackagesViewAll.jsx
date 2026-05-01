import React from "react";
import { useParams } from "react-router-dom";
import TourPackages from "../../assets/images/hotel.jpg"; 
import hotels from "../../data/hotels"; 

const HotelTourPackagesViewAll = () => {
  const { hotelId } = useParams();

  const hotel = hotels.find((h) => h.id === hotelId);

  if (!hotel) {
    return <div className="p-6">Hotel not found.</div>;
  }

  const packages = hotel.tourPackages || [];

  return (
    <section className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">
        Tour Packages at {hotel.name}
      </h1>

      {packages.length === 0 ? (
        <p>No tour packages available.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="border rounded-md shadow-sm overflow-hidden flex flex-col bg-white text-sm"
            >
              {/* IMAGE */}
              <div className="h-36 w-full">
                <img
                  src={TourPackages}
                  alt={`Package for ${pkg.destination}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* DETAILS */}
              <div className="p-3 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-sm mb-1">
                    Packages For {pkg.destination}
                  </h3>
                  <p className="text-gray-700 text-xs mb-2 line-clamp-2">
                    {pkg.description}
                  </p>
                  <p className="font-bold text-sm mb-2">{pkg.price} onwards</p>
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  <button className="text-blue-600 text-xs font-semibold underline w-fit">
                    View Details
                  </button>
                  <button className="border border-blue-600 text-blue-600 text-xs font-semibold py-1 rounded hover:bg-blue-50 w-full">
                    Enquire Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default HotelTourPackagesViewAll;
