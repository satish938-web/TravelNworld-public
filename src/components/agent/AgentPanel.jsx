import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import { 
  FileText, 
  Users, 
  Star, 
  BarChart3, 
  PlusCircle, 
  ArrowUpRight,
  TrendingUp,
  Zap,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  ChevronRight
} from "lucide-react";

const AgentPanel = () => {
  const { rawDestinations } = useOutletContext() || {};
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const stats = [
    { 
      label: "Total Itineraries", 
      value: rawDestinations?.length || 0, 
      icon: <FileText size={32} />, 
      color: "text-red-600",
      link: "Manage-Itianary"
    },
    { 
      label: "My Leads", 
      value: "48", 
      icon: <Zap size={32} />, 
      color: "text-red-600",
      link: "my-leads"
    },
    { 
      label: "Client Inquiries", 
      value: "11", 
      icon: <MessageSquare size={32} />, 
      color: "text-red-600",
      link: "report"
    },
    { 
      label: "Active Routes", 
      value: "17", 
      icon: <MapPin size={32} />, 
      color: "text-red-600",
      link: "reviews"
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Top Header Card */}
      <section className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 shadow-sm shadow-red-100">
            <LayoutDashboard size={24} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-50 p-2 pr-6 rounded-3xl border border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white shadow-lg shadow-red-200 overflow-hidden">
            <img src={user?.photo || "https://ui-avatars.com/api/?name=" + (user?.firstName || "Agent")} alt="User" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-black text-slate-900 text-sm">{user?.firstName || "Travel"} {user?.lastName || "Agent"}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Master Agent</p>
          </div>
        </div>
      </section>

      {/* Middle Customization/Quick Actions Card */}
      <section className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <LayoutDashboard size={120} />
        </div>
        
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-200">
             <PlusCircle size={20} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Quick Management</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <Link to="profile" className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:border-red-100 transition-all duration-500 group">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
               <Users size={28} />
            </div>
            <div>
              <p className="font-black text-slate-900 text-lg">Agent Profile</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Update brand details</p>
            </div>
            <ChevronRight className="ml-auto text-slate-300 group-hover:text-red-600 transition-colors" />
          </Link>

          <Link to="Create-Itinary" className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:border-red-100 transition-all duration-500 group">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
               <FileText size={28} />
            </div>
            <div>
              <p className="font-black text-slate-900 text-lg">New Package</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Create travel route</p>
            </div>
            <ChevronRight className="ml-auto text-slate-300 group-hover:text-red-600 transition-colors" />
          </Link>
        </div>
      </section>

      {/* Bottom KPI Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-[2rem] p-8 border-b-4 border-red-600 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-x border-t border-slate-100 flex flex-col items-center justify-center text-center group hover:-translate-y-2 transition-all duration-500">
            <div className={`${stat.color} mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
              {stat.icon}
            </div>
            <h3 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">{stat.value}</h3>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Optional Performance Section */}
      <section className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
               <TrendingUp size={24} />
            </div>
            <div>
               <p className="font-black text-slate-900">Performance Status: Optimal</p>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Agent score: 92%</p>
            </div>
         </div>
         <Link to="report" className="px-6 py-3 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-red-600 transition-all duration-300">
            View Full Report
         </Link>
      </section>
    </div>
  );
};

export default AgentPanel;
