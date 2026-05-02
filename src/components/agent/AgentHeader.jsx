import React from "react";
import { Home, Headphones, Menu as MenuIcon, ListFilterPlus, ShoppingCart } from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/logo.png";
import profilImg from "../../assets/images/profile.png";

export default function AgentHeader({ onOpenLeft, onOpenRight }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiry");
  navigate("/b2bLogin");

  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Logo + Mobile Menu */}
        <div className="flex items-center gap-6 min-w-0">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={onOpenLeft}
            className="inline-flex md:hidden items-center justify-center rounded-xl p-2 text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <MenuIcon size={24} />
          </button>

          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <img
                src={logo}
                alt="Logo"
                className="h-14 w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Recharge button */}
          <button className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#0a0f1d] text-white text-xs font-black uppercase tracking-widest hover:bg-red-600 transition-all duration-300 active:scale-95 shadow-xl shadow-slate-900/10">
            <ShoppingCart size={14} className="mb-0.5" />
            Recharge Now
          </button>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-4 text-slate-400 border-x border-slate-200 px-4 sm:px-6">
            <button 
              onClick={() => navigate("/agent")}
              className="p-2.5 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 relative group"
            >
              <Home size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border-2 border-white" />
            </button>
            <button className="p-2.5 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300">
              <Headphones size={20} />
            </button>
          </div>

          {/* Profile + Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 pl-2">
              <div className="text-right leading-tight">
                <p className="font-black text-slate-900 text-sm tracking-wide truncate max-w-[150px]">
                  {user?.firstName ? `${user.firstName} ${user.lastName}` : "ADMIRE HOLIDAYS"}
                </p>
                <div className="flex items-center justify-end gap-1.5 mt-1">
                  <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">Verified Agent</span>
                </div>
              </div>
              <div className="relative group cursor-pointer">
                <img
                  src={user?.photo || profilImg}
                  alt="Profile"
                  className="h-11 w-11 rounded-2xl border-2 border-white shadow-md object-cover group-hover:border-red-600 transition-all"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="bg-slate-100 hover:bg-red-600 text-slate-600 hover:text-white p-3 rounded-2xl transition-all duration-300 group shadow-sm active:scale-90"
              title="Logout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
