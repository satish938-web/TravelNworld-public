import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function ItineraryDetail() {
  const { slug, itineraryId } = useParams();
  const navigate = useNavigate();
  const outlet = useOutletContext() || {};
  const { destinations = [], updateItinerary } = outlet;

  const destination = destinations.find((d) => d.slug === slug) || null;
  const original = destination?.itineraries?.find((i) => `${i.id}` === `${itineraryId}`) || null;

  const [itinerary, setItinerary] = useState(original);
  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]); 

  useEffect(() => {
    setItinerary(original);
    if (original?.images?.length) {
      const previews = original.images.map((url, i) => ({
        id: `existing-${i}`,
        url,
        name: url.split("/").pop(),
        isNew: false,
      }));
      setImagePreviews(previews);
    } else {
      setImagePreviews([]);
    }
    setErrors({});
  }, [original]);

  if (!itinerary) {
    return (
      <div className="p-4 md:p-6 text-center">
        <h2 className="text-xl font-semibold">Itinerary not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-3 px-4 py-2 bg-orange-500 text-white rounded"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{itinerary.name || itinerary.title}</h1>
          <div className="flex items-center text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            <FaMapMarkerAlt className="mr-2 text-orange-400" />
            <span>
              {(itinerary.type || destination?.type) === "international"
                ? "International"
                : "Domestic"}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative rounded-lg overflow-hidden shadow h-48 sm:h-64 md:h-72 mb-6">
        <img
          src={
            imagePreviews?.[0]?.url ||
            (Array.isArray(itinerary.images) && itinerary.images[0]) ||
            itinerary.image ||
            "/path-to-default-image.jpg"
          }
          alt={itinerary.name || itinerary.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overview */}
      <div className="mb-6">
        {itinerary.subtitle && (
          <p className="text-base sm:text-lg text-gray-700 mb-1">{itinerary.subtitle}</p>
        )}
        {Array.isArray(itinerary.destinations) && itinerary.destinations.length > 0 && (
          <p className="text-sm sm:text-base text-gray-600">
            Destinations: {itinerary.destinations.join(", ")}
          </p>
        )}
        {(itinerary.price || itinerary.discount) && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {itinerary.price && (
              <span className="text-lg sm:text-xl font-semibold text-gray-800">
                ₹{Number(itinerary.price).toLocaleString()}
              </span>
            )}
            {itinerary.discount && (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs sm:text-sm rounded">
                {itinerary.discount}% Off
              </span>
            )}
          </div>
        )}
      </div>

      {/* Gallery */}
      {Array.isArray(itinerary.images) && itinerary.images.length > 1 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
          {itinerary.images.slice(0, 8).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`img-${idx}`}
              className="w-full h-24 sm:h-28 md:h-32 object-cover rounded"
            />
          ))}
        </div>
      )}

      {/* Day-wise Itinerary */}
      {Array.isArray(itinerary.days) && itinerary.days.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">Itinerary</h2>
          <div className="space-y-4">
            {itinerary.days.map((d, i) => (
              <div key={i} className="border rounded p-3 sm:p-4 bg-white">
                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-1">
                  <strong className="text-gray-800">Day {d.dayNumber || i + 1}: {d.title}</strong>
                  {d.meals && <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">Meals: {d.meals}</span>}
                </div>
                {d.details && <p className="text-gray-700 text-sm sm:text-base">{d.details}</p>}
                {d.activities && (
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">Activities: {d.activities}</p>
                )}
                {d.stay && (
                  <p className="text-gray-600 text-xs sm:text-sm">Stay: {d.stay}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inclusions / Exclusions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {itinerary.inclusions && (
          <div className="bg-white border rounded p-3 sm:p-4">
            <h3 className="font-semibold mb-2">Inclusions</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base">
              {String(itinerary.inclusions).split(/\n|,/).map((x) => x.trim()).filter(Boolean).map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>
        )}
        {itinerary.exclusions && (
          <div className="bg-white border rounded p-3 sm:p-4">
            <h3 className="font-semibold mb-2">Exclusions</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base">
              {String(itinerary.exclusions).split(/\n|,/).map((x) => x.trim()).filter(Boolean).map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Terms & Payment Policy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {itinerary.terms && (
          <div className="bg-white border rounded p-3 sm:p-4">
            <h3 className="font-semibold mb-2">Terms & Conditions</h3>
            <p className="text-gray-700 text-sm sm:text-base whitespace-pre-line">{itinerary.terms}</p>
          </div>
        )}
        {itinerary.paymentPolicy && (
          <div className="bg-white border rounded p-3 sm:p-4">
            <h3 className="font-semibold mb-2">Payment Policy</h3>
            <p className="text-gray-700 text-sm sm:text-base whitespace-pre-line">{itinerary.paymentPolicy}</p>
          </div>
        )}
      </div>

      {/* Back button */}
      <div className="flex justify-start mt-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Back
        </button>
      </div>
    </div>
  );
}
