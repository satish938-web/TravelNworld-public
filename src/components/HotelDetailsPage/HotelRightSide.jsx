import React from 'react';
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  Share2,
  Globe,
  Star,
  Edit,
  Copy,
} from "lucide-react";
import hotelItemPropType from '../../propTypes/hotelItemPropType.js';
function HotelRightSide({ hotelItem }) {
  return (
    <div className="w-full lg:w-full flex flex-col gap-6">
      {/* Contact Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border rounded-lg shadow-sm bg-white"
      >
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800 text-2xl font-serif">Contact</h3>
          <a
            href={`tel:${hotelItem.phone}`}
            className="text-blue-600 font-medium text-sm hover:underline"
          >
            📞 {hotelItem.phone}
          </a>
        </div>

        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800 text-xl mb-1">Address</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{hotelItem.address}</p>
          <div className="flex gap-4 mt-2 text-md text-blue-600">
            <button className="flex items-center gap-1 hover:underline">
              <MapPin size={14} /> Get Directions
            </button>
            <button className="flex items-center gap-1 hover:underline">
              <Copy size={14} /> Copy
            </button>
          </div>
        </div>

        <div className="p-4 flex items-center justify-between border-b">
          <span className="flex items-center gap-2 text-green-600 font-medium text-md">
            <Clock size={14} /> {hotelItem.timings || "Open 24 Hrs"}
          </span>
        </div>

        <div className="p-4 flex flex-col gap-3 text-md text-blue-600">
          <button className="flex items-center gap-2 hover:underline">
            <Edit size={14} /> Suggest New Timings
          </button>
          <button className="flex items-center gap-2 hover:underline">
            <Mail size={14} /> Send Enquiry by Email
          </button>
          <button className="flex items-center gap-2 hover:underline">
            <Phone size={14} /> Get info via SMS/Email
          </button>
          <button className="flex items-center gap-2 hover:underline">
            <Share2 size={14} /> Share
          </button>
          <button className="flex items-center gap-2 hover:underline">
            <Star size={14} /> Tap to rate
          </button>
          <button className="flex items-center gap-2 hover:underline">
            <Edit size={14} /> Edit this Listing
          </button>
          <button className="flex items-center gap-2 hover:underline">
            <Globe size={14} /> Visit Website
          </button>
          <button className="flex items-center gap-2 hover:underline">
            <Share2 size={14} /> Follow us
          </button>
        </div>

      </motion.div>

      {/* Also listed in */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="border rounded-lg shadow-sm bg-white p-4"
      >
        <h3 className="font-semibold text-gray-800 text-xl mb-3">Also listed in</h3>
        <div className="flex flex-wrap gap-2">
          {hotelItem.tags?.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 text-sm bg-gray-100 border rounded-full cursor-pointer hover:bg-gray-200 transition"
            >
              {tag}
            </span>
          ))}
        </div>
        <button className="mt-3 text-blue-600 text-md font-medium hover:underline">More</button>
      </motion.div>

      {/* Report an error */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="border rounded-lg shadow-sm bg-white p-4"
      >
        <h3 className="font-semibold text-gray-800 text-xl mb-2">Report an error</h3>
        <p className="text-md text-gray-600 mb-3">
          Help us to make this listing more updated and relevant for you.
        </p>
        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-600 hover:text-white transition">
          Report Now
        </button>
      </motion.div>

      {/* Nearby Listings */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className="border rounded-lg shadow-sm bg-white p-4"
      >
        <h3 className="font-semibold text-gray-800 text-xl mb-2">Nearby Listings</h3>
        <ul className="text-md text-blue-600 space-y-1">
          <li><a href="#" className="hover:underline">Hotels in {hotelItem.city || "Rishikesh"}</a></li>
          <li><a href="#" className="hover:underline">Taxi Services</a></li>
          <li><a href="#" className="hover:underline">Tour Guides</a></li>
        </ul>
      </motion.div>
    </div>
  );
}
HotelRightSide.propTypes = {
  hotelItem: hotelItemPropType.isRequired,
};
export default HotelRightSide;
