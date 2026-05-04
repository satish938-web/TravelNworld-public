import { useMemo } from "react";
import ItineraryCard from "./ItineraryCard";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RightSidebar from "../RightSidebar";

const MyItineraries = () => {
  const navigate = useNavigate();
  const filterState = useSelector((state) => state.filter);
  const { rawDestinations, removeDestinationItinerary } = useOutletContext();
  
  const handleEdit = (itinerary) => {
    const id = itinerary._id || itinerary.id || itinerary.slug;
    if (id) navigate(`/agent/Edit-Itinary/${id}`);
  };

  const handleDelete = async (itinerary) => {
    if (window.confirm("Are you sure you want to delete this itinerary?")) {
      const id = itinerary._id || itinerary.id || itinerary.slug;
      if (removeDestinationItinerary) await removeDestinationItinerary(id);
    }
  };

  // Apply filters locally to the real data (rawDestinations)
  const list = useMemo(() => {
    if (!rawDestinations) return [];
    let data = [...rawDestinations];

    // Filter by Type (Domestic/International)
    const selectedTypes = Array.isArray(filterState.leadTypes)
      ? filterState.leadTypes.map((t) => String(t).toLowerCase())
      : [];
    if (selectedTypes.length && !selectedTypes.includes("all")) {
      data = data.filter((item) => selectedTypes.includes(String(item.type).toLowerCase()));
    }

    // Filter by City/Destination
    if (filterState.city) {
      const search = String(filterState.city).toLowerCase();
      data = data.filter((item) => 
        (item.destination || "").toLowerCase().includes(search) || 
        (item.title || "").toLowerCase().includes(search)
      );
    }

    // Filter by Budget
    if (filterState.budget?.max) {
      data = data.filter((item) => (item.discountedPrice || item.priceFrom || 0) <= filterState.budget.max);
    }

    return data;
  }, [rawDestinations, filterState]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Left: Itineraries Grid */}
      <div className="flex-1">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center lg:text-left text-gray-800">
          My Itineraries
        </h2>
        {list.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">
            No itineraries found. Start by creating a new itinerary!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {list.map((itinerary) => (
              <div
                key={itinerary._id || itinerary.id}
                className="transition-transform transform hover:scale-105 hover:shadow-xl rounded-lg"
              >
                <ItineraryCard 
                  destination={itinerary} 
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <aside className="hidden lg:block w-full lg:w-72 flex-shrink-0 bg-gray-50 border-l rounded-lg p-4 overflow-auto h-[90vh] sticky top-4 shadow-inner">
        <RightSidebar />
      </aside>
    </div>
  );
};

export default MyItineraries;
