import React, { useState } from "react";
import { Bookmark, Share2, Edit3 } from "lucide-react";
import { Link } from "react-router-dom";
import HotelEnquiryForm from "../../forms/EnquiryForm";
import hotelItemPropType from '../../propTypes/hotelItemPropType.js';
const HotelHeader = ({ hotelItem }) => {
  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: hotelItem.name,
      text: `Check out this hotel: ${hotelItem.name}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Sharing failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard.");
      } catch (err) {
        console.error("Clipboard copy failed:", err);
        alert("Failed to copy the link.");
      }
    }
  };

  return (
    <header className="mb-6 border rounded-md p-4 sm:p-5 shadow-sm bg-white">
      <div className="flex flex-col gap-4">
        {/* Hotel Name + Right Side Tags */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <h1 className="font-bold text-2xl sm:text-3xl">{hotelItem.name}</h1>
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-xs">
              Hotel Partner
            </span>
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-xs">
              Luxury Stay Verified
            </span>
            <button
              onClick={() => setSaved(!saved)}
              className={`border rounded p-2 transition ${
                saved ? "bg-yellow-400 text-white" : "hover:bg-gray-100"
              }`}
              title="Save"
            >
              <Bookmark
                size={18}
                className={saved ? "fill-white" : ""}
                fill={saved ? "white" : "none"}
              />
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {hotelItem.rating && (
            <div className="bg-green-600 text-white rounded-md px-2 py-0.5 font-semibold flex items-center gap-1">
              {hotelItem.rating} ★
              <span className="text-white/80 font-normal">
                ({hotelItem.reviews || "100+"} Reviews)
              </span>
            </div>
          )}
          <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-md text-xs font-medium">
            🌟 Guest Favorite
          </span>

          <span className="relative group bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md text-xs font-medium cursor-pointer">
            🏨 Verified
            <div className="absolute hidden group-hover:block bg-white text-black text-xs rounded p-2 top-full left-1/2 -translate-x-1/2 mt-1 w-max max-w-xs shadow-lg border z-10">
              This hotel information is verified.
            </div>
          </span>

          <span className="relative group bg-gray-100 text-black px-2 py-0.5 rounded-md text-xs font-medium cursor-pointer">
            ✅ Claimed
            <div className="absolute hidden group-hover:block bg-white text-black text-xs rounded p-2 top-full left-1/2 -translate-x-1/2 mt-1 w-max max-w-xs shadow-lg border z-10">
              This profile is officially claimed by the hotel.
            </div>
          </span>
        </div>

        {/* Address / Info */}
        <p className="relative group text-sm text-gray-700 font-semibold cursor-pointer">
          {hotelItem.location || "Dwarka Mor"} ·{" "}
          <span className="text-green-600">Available 24x7</span> ·{" "}
          {hotelItem.yearsInService || "10 Years"} in Service
          <div className="absolute hidden group-hover:block bg-white text-black font-semibold text-xs rounded p-4 top-full left-0 mt-1 w-max max-w-lg shadow-lg border z-10">
            {hotelItem.fullAddress}
          </div>
        </p>

        {/* Services / Tags */}
        <div className="flex flex-wrap gap-3 text-gray-700 text-sm font-semibold">
          <span className="bg-gray-100 px-2 py-1 rounded">Luxury Stay</span>
          <span className="bg-gray-100 px-2 py-1 rounded">Free Wi-Fi</span>
          <span className="bg-gray-100 px-2 py-1 rounded">Pool Access</span>
          <span className="bg-gray-100 px-2 py-1 rounded">Room Service</span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start">
          <a
            href={`tel:${hotelItem.phone || "9999999999"}`}
            className="bg-green-600 text-white px-4 py-1.5 rounded font-semibold inline-flex items-center gap-1 text-sm"
          >
            📞 {hotelItem.phone || "9999XXXXXX"}
          </a>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-1.5 rounded font-semibold text-sm"
          >
            Enquire Now
          </button>

          <button className="border border-green-600 text-green-600 px-4 py-1.5 rounded font-semibold bg-green-50 text-sm">
            WhatsApp
          </button>

          <button
            onClick={handleShare}
            className="border border-blue-600 px-3 py-1.5 rounded hover:bg-gray-100 text-blue-600 flex items-center gap-2 text-sm"
            title="Share this hotel"
          >
            <Share2 size={16} />
            <span className="hidden sm:inline font-semibold">Share</span>
          </button>

          <div className="relative group">
            <button className="border px-3 py-1.5 rounded hover:bg-gray-100 flex items-center gap-2 text-sm">
              <Edit3 size={16} />
              <span className="hidden sm:inline">Edit</span>
            </button>
            <div className="absolute hidden group-hover:block bg-white text-black text-xs rounded p-2 top-full left-1/2 -translate-x-1/2 mt-1 w-max shadow-lg border z-10">
              Edit/Suggest hotel information.
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <HotelEnquiryForm
            hotel={hotelItem}
            onClose={() => setShowModal(false)}
          />
        )}

        {/* Navigation */}
        <nav className="mt-2 border-t pt-3 flex flex-wrap gap-3 sm:gap-6 text-gray-700 font-semibold text-sm">
          <a href="#overview" className="hover:text-blue-600">Overview</a>
          <a href="#rooms" className="hover:text-blue-600">Rooms</a>
          <a href="#photos" className="hover:text-blue-600">Photos</a>
          <a href="#reviews" className="hover:text-blue-600">Reviews</a>
          {/* <Link
            to={`/hotels/${hotel.id}/${hotel.slug}/blogs`}
            className="hover:text-blue-600"
          >
            Blog
          </Link> */}
        </nav>
      </div>
    </header>
  );
};
HotelHeader.propTypes = {
  hotelItem: hotelItemPropType.isRequired,
};
export default HotelHeader;
