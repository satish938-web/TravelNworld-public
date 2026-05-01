import React from 'react'
import { useParams } from "react-router-dom";
import hotels from '../../data/hotels'
import HotelHeader from '../HotelDetailsPage/HotelHeader';
import HotelRightSide from '../HotelDetailsPage/HotelRightSide';
import HotelGallery from '../HotelDetailsPage/HotelGallery';
import HotelVerifiedReview from '../HotelDetailsPage/HotelVerifiedReview';
import HotelQuickSection from '../HotelDetailsPage/HotelQuickSection';
import HotelTourPackages from '../HotelDetailsPage/HotelTourPackages';
import HotelHappyCustomer from '../HotelDetailsPage/HotelHappyCustomer';
import HotelHappyCustomerVideo from '../HotelDetailsPage/HotelHappyCustomerVideo';

const HotelDetailsPage = () => {
    const { id } = useParams();
    const selectedHotel = hotels.find((hotel) => hotel.id === id);
  return (
    <div className="w-full px-4 py-6 bg-white min-h-screen font-sans">
      {/* HEADER */}
      <HotelHeader hotelItem={selectedHotel} />
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-[80%] flex flex-col gap-6 mb-6 border rounded-md p-5 shadow-sm relative">
          <HotelGallery hotelItem={selectedHotel} />
          <HotelTourPackages hotelItem={selectedHotel}/>
          <HotelQuickSection hotelItem={selectedHotel} />
          <HotelHappyCustomer hotelItem={selectedHotel}/>
          <HotelHappyCustomerVideo hotelItem={selectedHotel}/>
          <HotelVerifiedReview  hotelItem={selectedHotel}/>
        </div>
        {/* RIGHT SIDE */}
        <div className="w-full lg:w-[20%] flex flex-col gap-6">
          <HotelRightSide hotelItem={selectedHotel} />
        </div>
      </div>
    </div>
  )
}

export default HotelDetailsPage
