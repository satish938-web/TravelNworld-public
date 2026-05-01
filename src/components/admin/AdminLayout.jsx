import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader.jsx";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { useState, useMemo, useEffect, useCallback } from "react";
import axios from "axios";
import { API_BASE } from "../../utils/api";

export default function AdminLayout() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); // for mobile sidebar toggle
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  const fetchItineraries = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE}/api/agent-itineraries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Backend returns { data: [...] }
      setItineraries(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch itineraries", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItineraries();
  }, [fetchItineraries]);

  const handelChange = (filterType) => {
    setFilters((prev) =>
      prev.includes(filterType)
        ? prev.filter((f) => f !== filterType)
        : [...prev, filterType]
    );
  };

  const groupedItineraries = useMemo(() => {
    const groups = {};
    itineraries.forEach((it) => {
      const destName = it.destination || "Unknown";
      if (!groups[destName]) {
        groups[destName] = {
          id: destName.toLowerCase().replace(/\s+/g, "-"),
          name: destName,
          slug: destName.toLowerCase().replace(/\s+/g, "-"),
          type: it.type || "domestic",
          image: it.coverImageUrl || (it.gallery && it.gallery[0]) || "",
          itineraries: [],
        };
      }
      groups[destName].itineraries.push({
        ...it,
        id: it._id || it.id,
        name: it.title,
        image: it.coverImageUrl || (it.gallery && it.gallery[0]) || "",
        subtitle: it.duration || "",
      });
    });
    return Object.values(groups);
  }, [itineraries]);

  const filteredDestinations = useMemo(() => {
    if (filters.length === 0) return groupedItineraries;
    return groupedItineraries.filter((d) => filters.includes(d.type));
  }, [groupedItineraries, filters]);

  const addItinerary = (newItinerary) => {
    fetchItineraries(); // Refresh from backend
  };

  const updateItinerary = (updatedItinerary) => {
    fetchItineraries(); // Refresh from backend
  };

  const removeItinerary = (id) => {
    fetchItineraries(); // Refresh from backend
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <AdminHeader
        toggleSidebar={() => setSidebarOpen((prev) => !prev)}
        toggleRightSidebar={() => setRightSidebarOpen((prev) => !prev)}
      />

      <div className="flex flex-1 relative">
        {/* Left Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full bg-indigo-900 text-white z-30 transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0 w-64`}
        >
          <div className="h-full overflow-auto pt-24">
            <LeftSidebar />
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main
          className="flex-1 ml-0 md:ml-64 p-4 pt-24 transition-all duration-300 min-h-screen overflow-auto"
        >
          <Outlet
            context={{
              destinations: filteredDestinations,
              rawDestinations: itineraries,
              addItinerary,
              updateDestinationItinerary: updateItinerary,
              removeDestinationItinerary: removeItinerary,
              toggleDestinationItineraryPublic: (slug, id, isPublic) => {
                // To be implemented or handled via update
                fetchItineraries();
              },
              refreshItineraries: fetchItineraries
            }}
          />
        </main>
        {rightSidebarOpen && window.innerWidth < 1024 && (
          <div
            className="fixed inset-0 bg-black/30 z-20"
            onClick={() => setRightSidebarOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
}
