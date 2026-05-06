export default function AdminLeads({ data }) {
  const handleCall = () => {
    if (data.seller.contact) window.location.href = `tel:${data.seller.contact}`;
  };

  const handleWhatsApp = () => {
    if (data.seller.whatsapp) {
      const message = `Hello ${data.seller.name}, I received your enquiry regarding ${data.destination}. How can I help you?`;
      window.open(`https://wa.me/${data.seller.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 rounded-[2rem] p-6 w-full hover:shadow-xl transition-all duration-300 border-l-8 border-l-red-600">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
          <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full font-bold uppercase tracking-wider">{data.timeAgo}</span>
          <span className="text-red-600 font-black uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
            Target: {data.destination}
          </span>
        </div>

        <div className="space-y-3">
          <h4 className="text-2xl font-black text-slate-900">{data.seller.name}</h4>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <span className="text-lg">📧</span>
              <span className="text-sm">{data.seller.since}</span> {/* Email stored in since field in my mapping */}
            </div>
            <div className="flex items-center gap-2 text-slate-900 font-black">
              <span className="text-lg">📞</span>
              <span className="text-sm tracking-tight">{data.seller.contact}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 mt-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            Source: <span className="text-slate-900">{data.source}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            Pax: <span className="text-slate-900">Adults ({data.pax.adults})</span>
          </div>
        </div>
      </div>

      {/* Right Section - Action Buttons */}
      <div className="flex flex-col justify-center items-center md:items-end md:pl-8 mt-6 md:mt-0 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0">
        <div className="flex flex-col gap-3 w-full sm:w-auto">
          <button 
            onClick={handleCall}
            className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-red-200"
          >
            <span>Call Customer</span>
          </button>
          
          <button 
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-emerald-100"
          >
            <span>WhatsApp Now</span>
          </button>
        </div>
        
        <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
          Lead ID: {data._id?.slice(-8).toUpperCase()}
        </p>
      </div>
    </div>
  );
}
