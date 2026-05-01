import React, { useState } from "react";
import { getImageUrl } from "../utils/api";

const internationalPackages = [
  {
    id: 1,
    duration: "7 days & 6 nights",
    rating: 5.0,
    reviews: 512,
    title:
      "Singapore And Bali Honeymoon Bliss | City Romance To Tropical Retreat",
    cities: "3D Singapore • 4D Kuta",
    originalPrice: 84616,
    discountedPrice: 55000,
    image:
      "https://assets.traveltriangle.com/blog/wp-content/uploads/2019/07/cover-Debosmita.jpg",
  },
  {
    id: 2,
    duration: "7 days & 6 nights",
    rating: 5.0,
    reviews: 512,
    title:
      "Singapore And Bali Honeymoon Bliss | City Romance To Tropical Retreat",
    cities: "3D Singapore • 4D Kuta",
    originalPrice: 84616,
    discountedPrice: 55000,
    image:
      "https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/1971/Eye-on-Malaysia.jpg?downsize=414:200",
  },
  {
    id: 3,
    duration: "7 days & 6 nights",
    rating: 5.0,
    reviews: 512,
    title:
      "Singapore And Bali Honeymoon Bliss | City Romance To Tropical Retreat",
    cities: "3D Singapore • 4D Kuta",
    originalPrice: 84616,
    discountedPrice: 55000,
    image:
      "https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/6679/DJI_0230.JPG?downsize=414:200",
  },
];

const InternationalDestination = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState("");

  const openForm = (place) => {
    setSelectedPlace(place);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedPlace("");
  };

  return (
    <div>
      <div className="  py-10 text-center">
        <h1 className="text-blue-700 text-3xl md:text-4xl font-bold">
          International Destinations
        </h1>
        <p className="mt-2 text-lg opacity-90">
          Explore our curated international travel package
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {internationalPackages.map((pkg) => {
          const savings = pkg.originalPrice - pkg.discountedPrice;

          return (
            <div
              key={pkg.id}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="overflow-hidden h-64 rounded-t-xl">
                <img
                  src={getImageUrl(pkg.image)}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Details */}
              <div className="p-4 space-y-2">
                <p className="text-sm text-gray-500 group-hover:text-black transition">
                  {pkg.duration}
                </p>

                <div className="flex items-center text-green-600 text-sm font-semibold group-hover:text-green-700 transition">
                  <span className="mr-1">★</span>
                  <span>{pkg.rating}</span>
                  <span className="text-gray-400 ml-1 group-hover:text-gray-600 transition">
                    ({pkg.reviews})
                  </span>
                </div>

                <h3 className="text-gray-900 font-semibold text-[16px] leading-snug group-hover:text-orange-600 transition">
                  {pkg.title}
                </h3>

                <div className="bg-orange-100 text-sm text-gray-800 px-2 py-1 rounded-md w-fit group-hover:bg-orange-200 transition">
                  {pkg.cities}
                </div>

                <p className="text-sm text-gray-500 line-through mt-1 group-hover:text-gray-700 transition">
                  INR {pkg.originalPrice.toLocaleString()}
                </p>
                <p className="text-xs font-semibold text-green-700 group-hover:text-green-800 transition">
                  SAVE INR {savings.toLocaleString()}
                </p>
                <p className="text-xl font-bold text-gray-900 group-hover:text-black transition">
                  INR {pkg.discountedPrice.toLocaleString()}
                  <span className="text-sm font-normal text-gray-500 group-hover:text-gray-700">
                    {" "}
                    /Adult
                  </span>
                </p>

                {/* Button to open form */}
                <button
                  onClick={() => openForm(pkg.title)}
                  className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          );
        })}
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternationalDestination;
