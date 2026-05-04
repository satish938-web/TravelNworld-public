import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FaMapMarkerAlt, FaEdit, FaTrash, FaEye, FaLock } from "react-icons/fa";

const ItineraryCard = ({ destination, onEdit, onDelete, onTogglePublic, showActions = true }) => {
  const navigate = useNavigate();

  if (!destination) {
    return (
      <div className="bg-gray-200 rounded-xl shadow-md overflow-hidden h-48 animate-pulse"></div>
    );
  }

  const handleCardClick = () => {
    const id = destination._id || destination.id;
    if (destination.slug) {
      navigate(`/agent/destinations/${destination.slug}`, { state: { destination } });
    } else if (id) {
       // Fallback to ID based routing if needed, or destination specific view
       navigate(`/agent/destinations/${id}`, { state: { destination } });
    }
  };

  const imageUrl = destination.coverImageUrl || 
    (destination.images && destination.images.length ? (typeof destination.images[0] === "string" ? destination.images[0] : destination.images[0].url) : null) ||
    (destination.gallery && destination.gallery.length ? destination.gallery[0] : null) ||
    "/path-to-default-image.jpg";

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer relative group w-full"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => { if (e.key === "Enter") handleCardClick(); }}
    >
      {/* Image */}
      <div className="w-full h-48 sm:h-56 md:h-48 lg:h-52 relative overflow-hidden">
        <img
          src={imageUrl}
          alt={destination.name || "itinerary image"}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/path-to-default-image.jpg"; }}
        />

        {/* Action buttons overlay */}
        {showActions && (
          <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit?.(destination); }}
              className="p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
              title="Edit Itinerary"
            >
              <FaEdit className="text-blue-600" size={14} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete?.(destination); }}
              className="p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
              title="Delete Itinerary"
            >
              <FaTrash className="text-red-600" size={14} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onTogglePublic?.(destination); }}
              className={`p-2 rounded-full shadow-md transition-colors ${
                destination.public
                  ? "bg-green-500/90 hover:bg-green-500"
                  : "bg-gray-500/90 hover:bg-gray-500"
              }`}
              title={destination.public ? "Make Private" : "Make Public"}
            >
              {destination.public ? <FaEye className="text-white" size={14} /> : <FaLock className="text-white" size={14} />}
            </button>
          </div>
        )}

        {/* Bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4">
          <div className="flex items-center text-white text-sm sm:text-base">
            <FaMapMarkerAlt className="mr-2 text-orange-400" />
            <span className="font-medium truncate">{destination.destination || destination.name || "Untitled"}</span>
          </div>
        </div>

        {destination.type === "international" && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs sm:text-sm px-2 py-1 rounded">
            International
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base truncate">
          {destination.title || destination.name}
        </h3>
        <div className="flex items-center justify-between text-sm sm:text-base">
          <div className="flex flex-col">
            <span className="font-bold text-[#E69233]">
              ₹{(destination.discountedPrice || destination.priceFrom || destination.price || 0).toLocaleString()}
            </span>
            {destination.priceFrom && destination.discountedPrice && (
              <span className="text-xs text-gray-400 line-through">₹{destination.priceFrom.toLocaleString()}</span>
            )}
          </div>
          {destination.duration && (
            <span className="text-gray-500 text-xs">{destination.duration}</span>
          )}
        </div>
      </div>
    </div>
  );
};

ItineraryCard.propTypes = {
  destination: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    slug: PropTypes.string,
    images: PropTypes.array,
    type: PropTypes.oneOf(["domestic", "international"]),
    price: PropTypes.number,
    discount: PropTypes.number,
    destinations: PropTypes.arrayOf(PropTypes.string),
    public: PropTypes.bool,
    title: PropTypes.string,
  }),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onTogglePublic: PropTypes.func,
  showActions: PropTypes.bool,
};

ItineraryCard.defaultProps = {
  destination: null,
  showActions: true,
};

export default ItineraryCard;
