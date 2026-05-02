import { Outlet } from "react-router-dom";
import AgentHeader from "./AgentHeader.jsx";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { useState, useMemo, useEffect, useCallback } from "react";
import axios from "axios";
import { API_BASE } from "../../utils/api";
import logo from "../../assets/images/logo/logo.png";

export default function AgentLayout() {
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
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <AgentHeader
        onOpenLeft={() => setSidebarOpen((prev) => !prev)}
        onOpenRight={() => setRightSidebarOpen((prev) => !prev)}
      />

      <div className="flex flex-1 relative">
        {/* Left Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full bg-white border-r border-slate-200 z-40 transform transition-all duration-500 ease-in-out shadow-[4px_0_24px_rgba(0,0,0,0.02)]
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0 w-64 lg:w-72`}
        >
          {/* Logo Section in Sidebar for Mobile */}
          <div className="p-8 md:hidden">
             <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
              <h2 className="text-xl font-black text-slate-900 uppercase">Agent<span className="text-red-600">Panel</span></h2>
            </div>
          </div>
          
          <div className="h-full overflow-auto pt-20 md:pt-28 pb-8 custom-scrollbar">
            <LeftSidebar />
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main
          className="flex-1 ml-0 md:ml-64 lg:ml-72 p-4 sm:p-6 lg:p-10 transition-all duration-300 min-h-screen relative z-0"
          style={{ paddingTop: '80px' }}
        >
          <div className="max-w-[1600px] mx-auto">
            <Outlet
              context={{
                destinations: filteredDestinations,
                rawDestinations: itineraries,
                addItinerary,
                updateDestinationItinerary: updateItinerary,
                removeDestinationItinerary: removeItinerary,
                toggleDestinationItineraryPublic: (slug, id, isPublic) => {
                  fetchItineraries();
                },
                refreshItineraries: fetchItineraries
              }}
            />
          </div>
        </main>
        
        {rightSidebarOpen && window.innerWidth < 1024 && (
          <div
            className="fixed inset-0 bg-black/10 z-20"
            onClick={() => setRightSidebarOpen(false)}
          ></div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
