import React from 'react';
import { BedDouble, Star, MapPin, Clock4 } from 'lucide-react';
import hotelItemPropType from '../../propTypes/hotelItemPropType.js';
const HotelQuickSection = ({ hotelItem }) => {
  if (!hotelItem) return null;

  return (
    <section id="quick-info" className="bg-white border rounded-md shadow-sm p-5 mt-6">
      {/* Quick Information */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Quick Information</h2>
        <p className="text-sm text-gray-700">City</p>
        <p className="font-bold text-base text-gray-900">{hotelItem.city}</p>
      </div>

      {/* Highlights from the Hotel */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Highlights from the hotel</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 w-[70%] md:gap-2 text-center">
          <div className="flex flex-col gap-4">
            <BedDouble className="text-indigo-500" size={36} />
            <p className="text-sm text-left font-medium mt-2 text-gray-800"> Rooms</p>
          </div>
          <div className="flex flex-col gap-4">
            <Star className="text-yellow-500" size={36} />
            <p className="text-sm text-left font-medium mt-2 text-gray-800">Top Ratings</p>
          </div>
          <div className="flex flex-col gap-4">
            <MapPin className="text-green-600" size={36} />
            <p className="text-sm text-left font-medium mt-2 text-gray-800">Prime Location</p>
          </div>
          <div className="flex flex-col gap-4">
            <Clock4 className="text-blue-600" size={36} />
            <p className="text-sm text-left font-medium mt-2 text-gray-800">{hotelItem.timings || 'Open 24 Hrs'}</p>
          </div>
        </div>
      </div>

      {/* Hotel Services */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-base font-semibold mb-2">✔ Services Offered</h3>
        <p className="text-sm text-gray-700">
          {hotelItem.highlights?.join(', ') || 'Clean rooms, Friendly staff, Free WiFi, Room service'}{" "}
          {hotelItem.highlights && hotelItem.highlights.length > 4 && (
            <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
              +{hotelItem.highlights.length - 4}
            </span>
          )}
        </p>
      </div>
    </section>
  );
};
HotelQuickSection.propTypes = {
  hotelItem: hotelItemPropType.isRequired,
};
export default HotelQuickSection;
