import React, { useState } from "react";
import { getImageUrl } from "../utils/api";
import { FaPhoneAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

const tourPackages = [
  {
    id: 1,
    title: "Nainital Lake: Uttarakhand",
    duration: "5 days & 4 nights",
    rating: "4.5",
    reviews: 251,
    price: 21800,
    oldPrice: 29900,
    discount: 8100,
    itinerary: ["2D UK", "2D Nainital", "1D Pangong Tso",],
    image:
      "https://images.pexels.com/photos/29870625/pexels-photo-29870625.jpeg",
  },
  {
    id: 2,
    title: "Best-Selling Haridwar Uttarakhand Tours ",
    duration: "7 days & 6 nights",
    rating: "4.6",
    reviews: 3400,
    price: 34800,
    oldPrice: 46284,
    discount: 11484,
    itinerary: ["2D UK", "1D Haridwar", "1D Pangong Tso"],
    image:
      "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQFnZbWs7Vs8RDZL8EYBrc1vUOA31Rt2EV4zRguEaALmLFuoRpS4wmfL6PymGqX2FbAe0rZ0NkMhd3AGMARmVTFqvpJzRNcgRP9J5Pjjw",
  },
  {
    id: 3,
    title: "Romantic Mussoorie Tour From Delhi",
    duration: "6 days & 5 nights",
    rating: "4.5",
    reviews: 928,
    price: 29999,
    oldPrice: 41700,
    discount: 11701,
    itinerary: ["2D Mus", "1D Dehradun", "1D Pangong Tso"],
    image:
      "https://img.traveltriangle.com/apac/attachments/pictures/838920/original/Mussoorie.jpg?tr=w-680,h-400",
  },
  {
    id: 4,
    title: "Divine Haridwar & Rishikesh Getaway",
    duration: "5 days & 4 nights",
    rating: "4.5",
    reviews: 251,
    price: 21800,
    oldPrice: 29900,
    discount: 8100,
    itinerary: ["2D UK", "2D Nainital", "1D Pangong Tso",],
    image:"https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/1388/Almora.jpg?crop=830:545px&downsize=830:545px?downsize=inherit:inherit",
  },
  {
    id: 5,
    title: "Ranikhet with Wild Corbett Vacation ",
    duration: "7 days & 6 nights",
    rating: "4.6",
    reviews: 3400,
    price: 34800,
    oldPrice: 46284,
    discount: 11484,
    itinerary: ["2D UK", "1D Nainital,", "1D Pangong Tso"],
    image:
       "https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/1201/Corbett-panorama-dears.jpg?downsize=414:200",
  },
{
    id:6,
    title: "Divine Journey to Haridwar & Rishikesh",
    duration: "6 days & 5 nights",
    rating: "4.5",
    reviews: 928,
    price: 29999,
    oldPrice: 41700,
    discount: 11701,
    itinerary: ["2D Dehradun", "1D Rishikesh ", "1D Pangong Tso"],
    image:
      // "https://img.traveltriangle.com/apac/attachments/pictures/838920/original/Mussoorie.jpg?tr=w-680,h-400",
      "https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/1273/shiva-parmarth-niketan-haridwar-1362470804.jpg?downsize=414:200",
  },
  {
    id: 7,
    title: "Lord Krishna aur Arjuna ke chariot Rishikesh (Uttarakhand)",
    duration: "5 days & 4 nights",
    rating: "4.5",
    reviews: 251,
    price: 21800,
    oldPrice: 29900,
    discount: 8100,
    itinerary: ["2D Rishikesh ", "2D Triveni Ghat", "1D Pangong Tso",],
    image:
    "https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/1273/Rishikesh4.jpg?downsize=414:200"
     
  },
  {
    id: 8,
    title: "Refreshing Rishikesh & Haridwar Trip- From Delhi ",
    duration: "7 days & 6 nights",
    rating: "4.6",
    reviews: 3400,
    price: 34800,
    oldPrice: 46284,
    discount: 11484,
    itinerary: ["2D UK", "1D Haridwar", "1D Pangong Tso"],
    image:
      "https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/1343/Night%20view%20of%20river%20Ganga.jpeg?downsize=414:200",
  },
  {
    id: 9,
    title: "Relaxed Stay in Nainital, Wild Corbett and Delhi",
    duration: "6 days & 5 nights",
    rating: "4.5",
    reviews: 928,
    price: 29999,
    oldPrice: 41700,
    discount: 11701,
    itinerary: ["2D Mus", "1D Dehradun", "1D Pangong Tso"],
    image:
      "https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/1201/Rajasthan11_Kumbhalgarh_FI.jpg?downsize=414:200",
  },
];

const DomesticDestination = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState("");
  // const navigate = useNavigate();

  const openForm = (title) => {
    setSelectedPlace(title);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedPlace("");
  };

  return (
    <div>
 

      <div className="text-center mt-10 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Domestic Destination</h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tourPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl overflow-hidden shadow transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={getImageUrl(pkg.image)}
                  alt={pkg.title}
                  className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="p-4 space-y-2">
                <p className="text-gray-600 text-sm">{pkg.duration}</p>
                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                  ⭐ {pkg.rating}
                  <span className="text-gray-500 font-normal">
                    ({pkg.reviews})
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{pkg.title}</h3>

                <div className="flex flex-wrap gap-2 text-sm font-semibold">
                  {pkg.itinerary.map((point, index) => (
                    <span key={index} className="bg-yellow-100 px-2 py-1 rounded">
                      {point}
                    </span>
                  ))}
                </div>

                <div className="mt-2 space-y-1">
                  <p className="text-gray-500 text-sm line-through">
                    INR {pkg.oldPrice.toLocaleString()}
                  </p>
                  <p className="text-green-600 text-xs font-bold">
                    SAVE INR {pkg.discount.toLocaleString()}
                  </p>
                  <p className="text-black text-xl font-bold">
                    INR {pkg.price.toLocaleString()}
                    <span className="text-sm font-medium text-gray-600"> /Adult</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-4">
                <button className="w-10 h-10 border border-orange-500 text-orange-500 rounded-lg flex items-center justify-center text-lg hover:bg-orange-50 transition">
                  <FaPhoneAlt />
                </button>
                <button
                  onClick={() => openForm(pkg.title)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg w-full transition"
                >
                  Request Callback
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
            <button
              onClick={closeForm}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4">Enquiry Form</h3>
            <form className="space-y-4">
              <input
                type="text"
                value={selectedPlace}
                readOnly
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="tel"
                placeholder="Your Phone"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <textarea
                placeholder="Your Message"
                rows={3}
                className="w-full border border-gray-300 rounded px-3 py-2"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
              {/* <button
                type="button"
                onClick={() => navigate("/tour")}
                className="w-full mt-2 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition duration-300"
              >
                Connect with an Expert
              </button> */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DomesticDestination;
