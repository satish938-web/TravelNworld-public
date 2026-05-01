import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ImageGallery from '../ImageGallery'; 
import VideoGallery from '../VideoGallery';
import hotelItemPropType from '../../propTypes/hotelItemPropType.js'

const HotelGallery = ({ hotelItem }) => {
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false);
  const [isVideoGalleryOpen, setIsVideoGalleryOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <section id="photos">
      <h2 className="font-semibold text-lg mb-4">Photos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {/* Image gallery + caption */}
        <div className="flex flex-col items-center">
          <div className="w-[200px]"> 
            <ImageGallery 
              hotelItem={hotelItem} 
              isOpen={isImageGalleryOpen} 
              setIsOpen={setIsImageGalleryOpen} 
            />
          </div>
          <p 
            className="mt-2 text-center font-medium cursor-pointer text-blue-600 hover:underline"
            onClick={() => setIsImageGalleryOpen(true)}
          >
            See All Images 
          </p>
        </div>

        {/* Video gallery + caption */}
        <div className="flex flex-col items-center">
          <div className="w-[200px]">
            <VideoGallery 
              hotelItem={hotelItem}
              isOpen={isVideoGalleryOpen}
              setIsOpen={setIsVideoGalleryOpen}
            />
          </div>
          <p 
            className="mt-2 text-center font-medium cursor-pointer text-blue-600 hover:underline"
            onClick={() => setIsVideoGalleryOpen(true)}
          >
            All Videos
          </p>
        </div>
      </div>

      {/* Upload Button */}
      <div className="mt-4">
        <button 
          onClick={() => navigate('/b2blogin')}
          className="bg-blue-600 text-white px-5 py-2 rounded font-semibold">
          Upload Photos
        </button>
      </div>
    </section>
  );
};
HotelGallery.propTypes = {
  hotelItem: hotelItemPropType.isRequired,
};
export default HotelGallery;
