import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterActions, fetchItineraries } from "../../features/filter/filterSlice";

export default function RightSidebar() {
  const state = useSelector((s) => s.filter);
  const dispatch = useDispatch();

  // Function to fetch itineraries based on filters
  const fetchFilteredItineraries = () => {
    dispatch(
      fetchItineraries({
        leadTypes: state.leadTypes,
        city: state.city,
        travelers: state.travelers,
        duration: state.duration,
        travelDate: state.travelDate,
        hotelCategories: state.hotelCategories,
        budget: state.budget,
      })
    );
  };

  // Debounce API call whenever filters change
  useEffect(() => {
    const handler = setTimeout(fetchFilteredItineraries, 300);
    return () => clearTimeout(handler);
  }, [
    state.leadTypes,
    state.city,
    state.travelers,
    state.duration,
    state.travelDate?.from,
    state.travelDate?.to,
    state.hotelCategories,
    state.budget?.max,
  ]);

  const leadTypesOptions = ["All", "domestic", "international", "Trending destination", "Outbound", "Inbound"];
  const travelersOptions = ["10+ People", "6 - 10 People", "4 - 5 People", "2 - 3 People", "1 Person"];
  const durationOptions = ["14+ Days", "8 - 14 Days", "4 - 7 Days", "1 - 3 Days"];
  const hotelOptions = ["5+ Star", "5 Star", "4 Star", "3 Star", "2 Star", "1 Star"];

  return (
    <div className="p-4 space-y-6 w-full max-w-sm lg:max-w-xs overflow-auto">
      {/* Lead Type */}
      <fieldset className="space-y-1">
        <legend className="font-semibold text-gray-800">Itinerary Type</legend>
        {leadTypesOptions.map((type) => (
          <label key={type} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={state.leadTypes.includes(type)}
              onChange={() => dispatch(filterActions.toggleLeadType(type))}
              className="accent-orange-500"
            />
            <span className="text-gray-600 capitalize">{type}</span>
          </label>
        ))}
      </fieldset>

      {/* City */}
      <div className="space-y-1">
        <label className="font-semibold text-gray-800 block">To Cities</label>
        <input
          type="text"
          value={state.city || ""}
          onChange={(e) => dispatch(filterActions.setCity(e.target.value))}
          placeholder="Search 3 letters for cities..."
          className="border border-gray-300 rounded p-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      {/* Travelers */}
      <fieldset className="space-y-1">
        <legend className="font-semibold text-gray-800">Travelers</legend>
        {travelersOptions.map((opt) => (
          <label key={opt} className="flex items-center gap-2">
            <input
              type="radio"
              name="travelers"
              checked={state.travelers === opt}
              onChange={() => dispatch(filterActions.setTravelers(opt))}
              className="accent-orange-500"
            />
            <span className="text-gray-600">{opt}</span>
          </label>
        ))}
      </fieldset>

      {/* Duration */}
      <fieldset className="space-y-1">
        <legend className="font-semibold text-gray-800">Duration</legend>
        {durationOptions.map((opt) => (
          <label key={opt} className="flex items-center gap-2">
            <input
              type="radio"
              name="duration"
              checked={state.duration === opt}
              onChange={() => dispatch(filterActions.setDuration(opt))}
              className="accent-orange-500"
            />
            <span className="text-gray-600">{opt}</span>
          </label>
        ))}
      </fieldset>

      {/* Travel Date */}
      <fieldset className="space-y-1">
        <legend className="font-semibold text-gray-800">Travel Date</legend>
        <input
          type="date"
          value={state.travelDate?.from || ""}
          onChange={(e) =>
            dispatch(filterActions.setDate({ field: "from", value: e.target.value }))
          }
          className="border border-gray-300 rounded p-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
        <input
          type="date"
          value={state.travelDate?.to || ""}
          onChange={(e) =>
            dispatch(filterActions.setDate({ field: "to", value: e.target.value }))
          }
          className="border border-gray-300 rounded p-2 w-full mt-1 focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </fieldset>

      {/* Hotel Categories */}
      <fieldset className="space-y-1">
        <legend className="font-semibold text-gray-800">Hotel</legend>
        {hotelOptions.map((opt) => (
          <label key={opt} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={state.hotelCategories.includes(opt)}
              onChange={() => dispatch(filterActions.toggleHotel(opt))}
              className="accent-orange-500"
            />
            <span className="text-gray-600">{opt}</span>
          </label>
        ))}
      </fieldset>

      {/* Budget */}
      <fieldset className="space-y-1">
        <legend className="font-semibold text-gray-800">Total Budget</legend>
        <input
          type="range"
          min="0"
          max="1000000"
          value={state.budget?.max || 0}
          onChange={(e) =>
            dispatch(filterActions.setBudget({ field: "max", value: Number(e.target.value) }))
          }
          className="w-full accent-orange-500"
        />
        <span className="text-gray-600">₹{state.budget?.max || 0}</span>
      </fieldset>
    </div>
  );
}
