import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from "react-router-dom";

import { useOutletContext } from "react-router-dom";
import EditItineraryModal from "./EditItineraryModal";


function encodeSVG(svg) {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export default function ItineraryParticularCard() {
  const {slug} =useParams()
   const { destinations, updateDestinationItinerary, removeDestinationItinerary, toggleDestinationItineraryPublic } = useOutletContext();
   
   const destination = destinations.find(d => d.slug === slug);
   console.log(destination,"dataToaParticular")
  const navigate = useNavigate()
  useEffect(() => {

    const cardsEl = document.querySelectorAll('.it-card');
    cardsEl.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'all 0.6s ease';
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 150);
    });

    // hover small scale handled in JSX with Tailwind
  }, []);

  const [editingItinerary, setEditingItinerary] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  function goBack() {
    // In real app, use router navigation or window.history.back()
    navigate("/admin/Manage-Itianary")
    ;
  }

  // ripple effect helper
  function handleButtonClick(e, action) {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.style.cssText = `position:absolute; width:${size}px; height:${size}px; left:${x}px; top:${y}px; background:rgba(255,255,255,0.35); border-radius:9999px; transform:scale(0); animation:ripple 0.6s ease-out; pointer-events:none;`;
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    // call action
    action();
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-full mb-6 hover:bg-gray-700 transition-all"
        >
          ← Back to Destinations
        </button>

        <h1 className="text-center text-4xl md:text-5xl font-extrabold text-blue-600 tracking-wider uppercase mb-12">
          {`Itineraries for ${destination.name}`}
        </h1>

     <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
  {destination.itineraries.map((c) => (
    <div
      key={c.id}
      className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transform transition-transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
      onClick={() => { setEditingItinerary(c); setIsEditOpen(true); }}
    >
      <div
        className="w-full h-60 bg-center bg-cover"
        style={{ backgroundImage: `url(${c.image})` }}
        aria-hidden
      />

      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{c.title}</h3>
        <p className="text-gray-500 mb-6">{c.subtitle}</p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/admin/destination/${slug}/destinations/${c.id}`); }}
            className="relative inline-block border-2 border-blue-600 text-blue-600 px-5 py-2 rounded-md font-semibold uppercase tracking-wide hover:bg-blue-600 hover:text-white transition-all"
          >
            View
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setEditingItinerary(c); setIsEditOpen(true); }}
            className="relative inline-block bg-orange-600 text-white px-5 py-2 rounded-md font-semibold uppercase tracking-wide hover:bg-orange-700 transition-all"
          >
            Edit
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); removeDestinationItinerary(slug, c.id); }}
            className="relative inline-block bg-red-600 text-white px-5 py-2 rounded-md font-semibold uppercase tracking-wide hover:bg-red-700 transition-all"
          >
            Delete
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); toggleDestinationItineraryPublic(slug, c.id, !c.public); }}
            className={`relative inline-block px-5 py-2 rounded-md font-semibold uppercase tracking-wide transition-all ${c.public ? 'bg-green-600 text-white hover:bg-green-700' : 'border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white'}`}
          >
            {c.public ? 'Public' : 'Make Public'}
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

      </div>

      {/* ripple keyframes */}
      <style>{`
        @keyframes ripple { to { transform: scale(2); opacity: 0; } }
      `}</style>

      {/* Edit modal reuse */}
      <EditItineraryModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        itinerary={editingItinerary ? {
          id: editingItinerary.id,
          name: editingItinerary.title,
          subtitle: editingItinerary.subtitle,
          type: destination.type,
          images: editingItinerary.images && editingItinerary.images.length ? editingItinerary.images : (editingItinerary.image ? [editingItinerary.image] : []),
          price: editingItinerary.price,
          discount: editingItinerary.discount,
          days: editingItinerary.days,
          destinations: editingItinerary.destinations,
          inclusions: editingItinerary.inclusions,
          exclusions: editingItinerary.exclusions,
          terms: editingItinerary.terms,
          paymentPolicy: editingItinerary.paymentPolicy,
        } : null}
        onSave={(updated) => {
          const payload = {
            ...updated,
            title: updated.name,
            image: Array.isArray(updated.images) && updated.images.length ? updated.images[0] : editingItinerary?.image,
          };
          updateDestinationItinerary(slug, editingItinerary.id, payload);
        }}
      />
    </div>
  );
}
