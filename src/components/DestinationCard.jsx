// src/components/DestinationCard.jsx

import React from "react";
import PropTypes from "prop-types";
import { getImageUrl } from "../utils/api";

const DestinationCard = ({ title, description, image, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative w-[280px] rounded-[2rem] overflow-hidden shadow-xl cursor-pointer border border-gray-100/50"
    >
      {/* Image */}
      <div className="overflow-hidden bg-gray-200 aspect-[3/4]">
        <img
          src={getImageUrl(image) || "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1000&auto=format&fit=crop"}
          alt={title}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1000&auto=format&fit=crop";
          }}
          className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
        />
      </div>

      {/* Overlay with title and description */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
        <h3 className="text-white text-3xl font-extrabold font-['Montserrat'] tracking-tight leading-none mb-2 group-hover:text-red-500 transition-colors">{title}</h3>
        <p className="text-gray-300 text-[16px] font-['Inter'] font-medium line-clamp-2 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

DestinationCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default DestinationCard;
