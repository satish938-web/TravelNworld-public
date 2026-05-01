import React from 'react';
import { getImageUrl } from '../utils/api';

const ItineraryCard = ({ id, name, title, image, children }) => {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100/50 flex flex-col h-full">
      <div className="relative overflow-hidden group/img">
        <img
          src={getImageUrl(image)}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover/img:scale-110"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
          <span className="text-[9px] font-bold uppercase tracking-widest text-red-600 font-['Poppins']">Top Rated</span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-1 font-['Montserrat'] tracking-tight group-hover:text-red-600 transition-colors">{name}</h3>
        <p className="text-sm text-gray-500 mb-6 font-['Inter'] line-clamp-2 leading-relaxed">{title}</p>
        <div className="mt-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ItineraryCard;
