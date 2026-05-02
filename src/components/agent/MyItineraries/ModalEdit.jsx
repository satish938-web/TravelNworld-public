// src/components/Modal.jsx
import React from "react";
export default function ModalEdit({ isOpen, onClose, children, maxWidth = "max-w-4xl" }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center pt-16 px-4">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className={`relative z-50 w-full ${maxWidth} bg-white rounded-lg shadow-lg overflow-auto max-h-[85vh]`}>
        {children}
      </div>
    </div>
  );
}
