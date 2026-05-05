import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  List,
  FileText,
  BarChart,
  Star,
  User,
  Users,
  ChevronDown,
  Film,
} from "lucide-react";

import toast from "react-hot-toast";

const LeftSidebar = () => {
  const [accountOpen, setAccountOpen] = useState(false);
  const [itinerariesOpen,setItinerariesOpen]=useState(false)

  const role = localStorage.getItem("role");
  const menuItems = [
    { path: "/agent", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "buy-leads", label: "Buy Leads", icon: <ShoppingCart size={18} /> },
    { path: "my-leads", label: "My Leads", icon: <List size={18} /> },
    ...(role === "SUPERADMIN" ? [{ path: "hero-videos", label: "Hero Videos", icon: <Film size={18} /> }] : []),
    { path: "report", label: "My Report", icon: <BarChart size={18} /> },
    { path: "reviews", label: "My Reviews", icon: <Star size={18} /> },
    // My Account will be handled separately
    { path: "team", label: "My Team", icon: <Users size={18} /> },
  ];

  const accountSubItems = [
    { path: "profile", label: "Profile" },
    { path: "additional-info", label: "Additional Info" },
    { path: "reset-password", label: "Reset Password" },
    // { path: "my-account/security", label: "Security" },
  ];
  const myItianarySubItems =[
      { path: "Create-Itinary", label: "Create Itinerary" },
    { path: "Manage-Itianary", label: "Manage Itinerary" },
  ];
  const [isProfileComplete, setIsProfileComplete] = useState(
    localStorage.getItem("isProfileComplete") === "true"
  );

  useEffect(() => {
    const handleProfileUpdate = () => {
      setIsProfileComplete(localStorage.getItem("isProfileComplete") === "true");
    };
    window.addEventListener("profileUpdated", handleProfileUpdate);
    window.addEventListener("storage", handleProfileUpdate);
    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate);
      window.removeEventListener("storage", handleProfileUpdate);
    };
  }, []);

  const handleRestrictedClick = (e) => {
    if (!isProfileComplete) {
      e.preventDefault();
      toast.error("Please complete your profile (Company Address) to unlock all features.");
    }
  };

  return (
    <nav className="flex flex-col space-y-1.5 px-4 pt-4">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={isProfileComplete ? item.path : "#"}
          onClick={handleRestrictedClick}
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3.5 text-sm font-bold rounded-xl transition-all duration-300 group relative
             ${!isProfileComplete ? "opacity-30 cursor-not-allowed grayscale" : ""}
             ${
               isActive && isProfileComplete
                 ? "bg-red-50 text-red-600"
                 : "text-slate-500 hover:text-red-600 hover:bg-slate-50"
             }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && isProfileComplete && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-600 rounded-r-full" />
              )}
              <span className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-red-600' : 'text-slate-400 group-hover:text-red-600'}`}>
                {item.icon}
              </span>
              <span className="tracking-wide">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}

      <div className="mt-8 mb-4 px-5">
        <div className="h-px bg-slate-100 w-full" />
      </div>

      {/* My Itinerary with Dropdown */}
      <div className="space-y-1.5">
        <button
          onClick={(e) => {
            if (!isProfileComplete) {
              handleRestrictedClick(e);
              return;
            }
            setItinerariesOpen((prev) => !prev);
          }}
          className={`flex items-center justify-between w-full px-5 py-3.5 text-sm font-bold rounded-xl transition-all duration-300 group
            ${!isProfileComplete ? "opacity-30 cursor-not-allowed grayscale" : "text-slate-500 hover:text-red-600 hover:bg-slate-50"}
            ${itinerariesOpen ? "text-red-600 bg-red-50/50" : ""}`}
        >
          <span className="flex items-center gap-4">
            <span className={`group-hover:scale-110 transition-transform duration-300 ${itinerariesOpen ? 'text-red-600' : 'text-slate-400'}`}>
              <FileText size={18} />
            </span>
            <span className="tracking-wide">Packages</span>
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-500 ${
              itinerariesOpen ? "rotate-180 text-red-600" : "text-slate-400"
            }`}
          />
        </button>

        {itinerariesOpen && (
          <div className="ml-9 mt-1 flex flex-col space-y-1 border-l border-slate-100 pl-4 py-1">
            {myItianarySubItems.map((sub) => (
              <NavLink
                key={sub.path}
                to={sub.path}
                className={({ isActive }) =>
                  `px-4 py-2.5 text-xs font-bold rounded-lg transition-all duration-300
                   ${
                     isActive
                       ? "text-red-600 bg-red-50"
                       : "text-slate-500 hover:text-red-600 hover:bg-slate-50"
                   }`
                }
              >
                {sub.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* My Account with Dropdown */}
      <div className="space-y-1.5">
        <button
          onClick={() => setAccountOpen((prev) => !prev)}
          className={`flex items-center justify-between w-full px-5 py-3.5 text-sm font-bold rounded-xl transition-all duration-300 group
            text-slate-500 hover:text-red-600 hover:bg-slate-50
            ${accountOpen ? "text-red-600 bg-red-50/50" : ""}`}
        >
          <span className="flex items-center gap-4">
            <span className={`group-hover:scale-110 transition-transform duration-300 ${accountOpen ? 'text-red-600' : 'text-slate-400'}`}>
              <User size={18} />
            </span>
            <span className="tracking-wide">Settings</span>
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-500 ${
              accountOpen ? "rotate-180 text-red-600" : "text-slate-400"
            }`}
          />
        </button>

        {accountOpen && (
          <div className="ml-9 mt-1 flex flex-col space-y-1 border-l border-slate-100 pl-4 py-1">
            {accountSubItems.map((sub) => (
              <NavLink
                key={sub.path}
                to={sub.path}
                className={({ isActive }) =>
                  `px-4 py-2.5 text-xs font-bold rounded-lg transition-all duration-300
                   ${
                     isActive
                       ? "text-red-600 bg-red-50"
                       : "text-slate-500 hover:text-red-600 hover:bg-slate-50"
                   }`
                }
              >
                {sub.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default LeftSidebar;
