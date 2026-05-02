import ItineraryCard from "./ItineraryCard";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import RightSidebar from "../RightSidebar";

const MyItineraries = () => {
  const state = useSelector((state) => state.filter);
  const { destinations } = useOutletContext();
  const list =
    state?.itineraries && state.itineraries.length
      ? state.itineraries
      : destinations || [];

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
            {list.map((destination) => (
              <div
                key={destination.id}
                className="transition-transform transform hover:scale-105 hover:shadow-xl rounded-lg"
              >
                <ItineraryCard destination={destination} />
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
