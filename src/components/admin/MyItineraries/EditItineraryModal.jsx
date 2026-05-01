import React from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import AddItinerariesPremium from "./AddItinerariesPremium";

export default function EditItineraryModal({ isOpen, onClose, itinerary, onSave }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-10 sm:pt-16 px-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="relative z-[10000] w-full max-w-5xl bg-white rounded-[30px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-5 border-b bg-white sticky top-0 z-10">
          <div>
            <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">Edit Itinerary</h3>
            <p className="text-xs text-gray-500 font-medium">Update your travel package details</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-red-600 hover:text-white transition-all shadow-sm"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Content - Scrollable area for the Premium Form */}
        <div className="flex-1 overflow-y-auto bg-[#f8fafc] p-2 sm:p-6 custom-scrollbar">
          <AddItinerariesPremium 
            isModal={true} 
            initialData={itinerary} 
            onSubmit={(updatedData) => {
              onSave(updatedData);
              // The form handles its own success message, we can close after a delay or let user close
              setTimeout(onClose, 1500);
            }} 
          />
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}

EditItineraryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  itinerary: PropTypes.object,
  onSave: PropTypes.func,
};

EditItineraryModal.defaultProps = {
  onSave: () => {},
};
