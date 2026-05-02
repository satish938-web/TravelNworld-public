// PublicToggleButton.jsx
import React, { useEffect, useRef, useState } from "react";
import { Globe2, Lock } from "lucide-react";

export default function PublicToggleButton({ c, slug, toggleDestinationItineraryPublic }) {
  const [open, setOpen] = useState(false);
  const [optimisticPublic, setOptimisticPublic] = useState(Boolean(c && c.public));
  const rootRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // safe wrapper in case parent didn't pass a function
  function safeToggle(slugParam, id, value) {
    if (typeof toggleDestinationItineraryPublic === "function") {
      try {
        toggleDestinationItineraryPublic(slugParam, id, value);
      } catch (err) {
        // don't crash if parent's fn misbehaves
        console.error("toggleDestinationItineraryPublic error:", err);
      }
    } else {
      console.warn("toggleDestinationItineraryPublic not provided");
    }
  }

  // keep a responsive local copy for immediate UI feedback
  useEffect(() => {
    setOptimisticPublic(Boolean(c && c.public));
  }, [c?.public]);

  // helper to call toggle and close menu
  function doToggle(value) {
    setOptimisticPublic(Boolean(value)); // optimistic UI feedback
    safeToggle(slug, c?.id, value);
    setOpen(false);
    // return focus to the main button for accessibility
    btnRef.current?.focus();
  }

  // keyboard handler for the trigger button
  function onTriggerKey(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((v) => !v);
    }
  }

  // ensure public flag from local optimistic state
  const isPublic = Boolean(optimisticPublic);

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        ref={btnRef}
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        onKeyDown={onTriggerKey}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          isPublic
            ? "bg-green-600 text-white hover:bg-green-700"
            : "border border-green-600 text-green-700 hover:bg-green-600 hover:text-white"
        }`}
        title={isPublic ? "Public — click for options" : "Private — click for options"}
        type="button"
      >
        {isPublic ? <Globe2 size={20} /> : <Lock size={20} />}
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Visibility options"
          className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white border border-gray-200 z-50"
          onClick={(e) => e.stopPropagation()} // prevent card click when interacting with menu
        >
          <button
            role="menuitem"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); doToggle(true); }}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); doToggle(true); } }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
            type="button"
          >
            <Globe2 size={16} />
            <span>Make Public</span>
            {isPublic && <span className="ml-auto text-xs text-green-600 font-semibold">Active</span>}
          </button>

          <button
            role="menuitem"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); doToggle(false); }}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); doToggle(false); } }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
            type="button"
          >
            <Lock size={16} />
            <span>Make Private</span>
            {!isPublic && <span className="ml-auto text-xs text-gray-600 font-semibold">Active</span>}
          </button>
        </div>
      )}
    </div>
  );
}
