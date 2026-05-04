import React, { useState, useEffect } from "react";
import axios from "axios";
import { Info, Save, MapPin, Layout, Image as ImageIcon, MessageSquare, Plus, Minus, X, Briefcase, Trash2, Edit3, ExternalLink, Video, Star, PenTool, LayoutDashboard } from "lucide-react";
import { API_BASE } from "../../../utils/api";
import MediaUploader from "./MediaUploader";
import { country_and_states } from "./country-states";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import toast from "react-hot-toast";

const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
};

const emptyAddress = {
  houseNo: "", street: "", area: "", city: "", state: "", postalCode: "", country: "",
};

const InputField = ({ label, type = "text", value, onChange, placeholder }) => (
  <div>
    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
    />
  </div>
);

const TextAreaField = ({ label, value, onChange, placeholder, rows = 4 }) => (
  <div>
    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-slate-50 focus:bg-white"
    />
  </div>
);

const TagInput = ({ label, value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState("");
  
  // Handle both string and array values safely
  const tags = Array.isArray(value) 
    ? value 
    : (typeof value === "string" && value ? value.split(",").map(t => t.trim()).filter(t => t !== "") : []);

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        const newTags = [...tags, inputValue.trim()];
        onChange(newTags);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      const newTags = tags.slice(0, -1);
      onChange(newTags);
    }
  };

  const removeTag = (tagToRemove) => {
    const newTags = tags.filter(t => t !== tagToRemove);
    onChange(newTags);
  };

  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">{label}</label>
      <div className="border border-gray-200 rounded-xl px-4 py-2 w-full focus-within:ring-2 focus-within:ring-blue-500 transition-all bg-slate-50 focus-within:bg-white min-h-[100px] flex flex-wrap gap-2 items-start content-start">
        {tags.map((tag, idx) => (
          <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[11px] font-bold border border-blue-100">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="hover:text-blue-800 transition-colors">
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : "Add more..."}
          className="flex-1 outline-none py-2 text-sm text-slate-700 bg-transparent min-w-[120px]"
        />
      </div>
      <p className="mt-2 text-[10px] text-slate-400 font-medium italic">Press Enter or comma to add a tag. These become cards on your profile.</p>
    </div>
  );
};

const AddressField = ({ address, onChange, onRemove, label, isBranch }) => {
  const handleLocalChange = (field, value) => {
    // If it's a single field update, wrap it in an object
    onChange({ [field]: value });
  };

  return (
    <div className="border border-gray-200 mb-6 p-6 rounded-2xl bg-white shadow-sm relative group">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">{label}</span>
        {isBranch && (
          <button
            type="button"
            onClick={onRemove}
            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
          >
            <Minus size={18} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="House / Flat No." value={address.houseNo} onChange={(e) => handleLocalChange("houseNo", e.target.value)} />
        <InputField label="Street / Locality" value={address.street} onChange={(e) => handleLocalChange("street", e.target.value)} />
        <InputField label="Area / Colony" value={address.area} onChange={(e) => handleLocalChange("area", e.target.value)} />
        <InputField label="City / Town" value={address.city} onChange={(e) => handleLocalChange("city", e.target.value)} />

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Country</label>
          <select
            value={address.country}
            onChange={(e) => {
              // Update both country and state in a single call to avoid race conditions
              onChange({ country: e.target.value, state: "" });
            }}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Country</option>
            {Object.keys(country_and_states.country).map((c) => (
              <option key={c} value={c}>{country_and_states.country[c]}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">State</label>
          <select
            value={address.state}
            onChange={(e) => handleLocalChange("state", e.target.value)}
            disabled={!address.country}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <option value="">Select State</option>
            {address.country && country_and_states.states[address.country]?.map((s) => (
              <option key={s.code} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
        <InputField label="Postal Code" value={address.postalCode} onChange={(e) => handleLocalChange("postalCode", e.target.value)} />
      </div>
    </div>
  );
};

const TestimonialEditor = ({ testimonials, onChange, agentId }) => {
  const handleAdd = () => onChange([...testimonials, { name: "", text: "", rating: 5, image: "", profile: "", date: "" }]);
  const handleRemove = (idx) => onChange(testimonials.filter((_, i) => i !== idx));
  const handleUpdate = (idx, field, value) => {
    const updated = testimonials.map((t, i) => i === idx ? { ...t, [field]: value } : t);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {testimonials.map((t, idx) => (
        <div key={idx} className="border border-gray-200 p-6 rounded-2xl bg-white shadow-sm relative group">
          <button type="button" onClick={() => handleRemove(idx)} className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100">
            <Minus size={18} />
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Customer Name" value={t.name} onChange={(e) => handleUpdate(idx, "name", e.target.value)} />
            <InputField label="Date" value={t.date} onChange={(e) => handleUpdate(idx, "date", e.target.value)} />
            <div className="sm:col-span-2">
              <TextAreaField label="Feedback" value={t.text} onChange={(e) => handleUpdate(idx, "text", e.target.value)} rows={3} />
            </div>
            <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MediaUploader
                key={`${agentId}-testimonial-bg-${idx}`}
                label="Background Image URL"
                maxFiles={1}
                existingUrls={t.image ? [t.image] : []}
                onChange={(urls) => handleUpdate(idx, "image", urls[0] || "")}
              />
              <MediaUploader
                key={`${agentId}-testimonial-profile-${idx}`}
                label="Avatar URL"
                maxFiles={1}
                existingUrls={t.profile ? [t.profile] : []}
                onChange={(urls) => handleUpdate(idx, "profile", urls[0] || "")}
              />
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={handleAdd} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 hover:border-blue-400 hover:text-blue-500 transition-all flex items-center justify-center gap-2 bg-slate-50 hover:bg-blue-50 font-bold">
        <Plus size={20} /> Add New Testimonial
      </button>
    </div>
  );
};

const SECTIONS = [
  { id: "agentBannerImage", label: "Banner Image", icon: <ImageIcon size={18} /> },
  { id: "branchAddresses", label: "Branches", icon: <MapPin size={18} /> },
  { id: "overview", label: "Overview", icon: <Info size={18} /> },
  { id: "quickInfo", label: "Quick Info", icon: <LayoutDashboard size={18} /> },
  { id: "services", label: "Services", icon: <Briefcase size={18} /> },
  { id: "tourPackages", label: "Packages", icon: <Briefcase size={18} /> },
  { id: "agentPhotos", label: "Gallery", icon: <ImageIcon size={18} /> },
  { id: "agentVideos", label: "Videos", icon: <Video size={18} /> },
  { id: "reviews", label: "Reviews", icon: <Star size={18} /> },
  { id: "blog", label: "Blog", icon: <PenTool size={18} /> },
  { id: "testimonials", label: "Testimonials", icon: <MessageSquare size={18} /> },
];

const AdditionalInfo = () => {
  const [selectedSection, setSelectedSection] = useState(SECTIONS[0].id);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [itineraries, setItineraries] = useState([]);
  const [itinerariesLoading, setItinerariesLoading] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [publicReviews, setPublicReviews] = useState([]);
  const [publicReviewsLoading, setPublicReviewsLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setItinerariesLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/agent-itineraries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItineraries(res.data.data || []);
    } catch (err) {
      console.error("Error fetching itineraries:", err);
    } finally {
      setItinerariesLoading(false);
    }
  };

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get(`${API_BASE}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.user) {
        const data = res.data.user;
        // Auto-migrate old blog data to the new blogs array if needed
        if ((!data.blogs || data.blogs.length === 0) && data.blogDescription) {
          data.blogs = [{
            title: data.blogTitle || "Latest Story",
            content: data.blogDescription || "",
            image: data.blogImage || "",
            isPublished: data.isBlogPublished !== false,
            createdAt: new Date()
          }];
        }
        setFormData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formData && selectedSection === "reviews") {
      fetchPublicReviews();
    }
  }, [formData, selectedSection]);

  const fetchPublicReviews = async () => {
    setPublicReviewsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE}/api/agents/all/reviews`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const agentId = formData._id;
      const filtered = (res.data.data || []).filter(r => r.agentId === agentId || r.agentId?._id === agentId);
      setPublicReviews(filtered);
    } catch (err) {
      console.error("Error fetching public reviews", err);
    } finally {
      setPublicReviewsLoading(false);
    }
  };

  const deletePublicReview = async (reviewId) => {
    if (window.confirm("This review was submitted by a user. Are you sure you want to delete it?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_BASE}/api/agents/reviews/${reviewId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Public review removed!");
        fetchPublicReviews();
      } catch (err) {
        toast.error("Failed to delete review");
      }
    }
  };

  const handleUpdateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_BASE}/api/auth/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Information updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error saving information");
    } finally {
      setSaving(false);
    }
  };

  const renderEditor = () => {
    if (!formData) return null;

    switch (selectedSection) {
      case "agentBannerImage":
        return (
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <MediaUploader
              key={`${formData._id}-banner`}
              label="Agent Profile Banner (Drag & Upload Multiple)"
              maxFiles={5}
              existingUrls={Array.isArray(formData.bannerImage) ? formData.bannerImage : (formData.bannerImage ? [formData.bannerImage] : [])}
              onChange={(urls) => handleUpdateField("bannerImage", urls)}
            />
            <p className="mt-4 text-[10px] text-slate-400 font-medium italic">This banner appears as the large background image on the agent's public profile.</p>
          </div>
        );
      case "branchAddresses":
        return (
          <div className="space-y-6">
            {(formData.branchAddresses || []).map((addr, idx) => (
              <AddressField
                key={idx}
                address={addr}
                isBranch={true}
                onChange={(updates) => {
                  setFormData(prev => {
                    const updated = [...(prev.branchAddresses || [])];
                    updated[idx] = { ...updated[idx], ...updates };
                    return { ...prev, branchAddresses: updated };
                  });
                }}
                onRemove={() => {
                  const updated = formData.branchAddresses.filter((_, i) => i !== idx);
                  handleUpdateField("branchAddresses", updated.length > 0 ? updated : [{ ...emptyAddress }]);
                }}
                label={`Branch Office ${idx + 1}`}
              />
            ))}
            <button
              type="button"
              onClick={() => handleUpdateField("branchAddresses", [...(formData.branchAddresses || []), { ...emptyAddress }])}
              className="w-full py-4 border-2 border-dashed border-blue-200 rounded-2xl text-blue-500 hover:bg-blue-50 transition-all font-bold flex items-center justify-center gap-2"
            >
              <Plus size={20} /> Add New Branch Office
            </button>
          </div>
        );
      case "overview":
        return (
          <div className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <TextAreaField label="Agency Overview" value={formData.overview || ""} onChange={(e) => handleUpdateField("overview", e.target.value)} placeholder="Tell us about your travel agency..." rows={8} />
          </div>
        );
      case "quickInfo":
        return (
          <div className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <TextAreaField label="Quick Facts & Information" value={formData.quickInfo || ""} onChange={(e) => handleUpdateField("quickInfo", e.target.value)} placeholder="Key bullet points or summary..." />
          </div>
        );
      case "services":
        return (
          <div className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <TagInput label="Services & Highlights (Tags)" value={formData.services || ""} onChange={(val) => handleUpdateField("services", val)} placeholder="e.g. Flight Booking, Visa Assistance, Custom Tours..." />
          </div>
        );
      case "tourPackages":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-slate-500 font-medium italic">These itineraries are assigned to you by the Superadmin. You can edit their details below.</p>
            </div>

            {itinerariesLoading ? (
              <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>
            ) : itineraries.length === 0 ? (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center">
                <Briefcase className="mx-auto text-slate-300 mb-4" size={48} />
                <h3 className="text-slate-600 font-bold">No itineraries assigned yet</h3>
                <p className="text-slate-400 text-sm mt-1">When the Superadmin assigns a package to you, it will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {itineraries.map((it) => (
                  <div key={it._id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${it.type === 'domestic' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-purple-50 text-purple-600 border border-purple-100'}`}>
                          {it.type}
                        </span>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => { setSelectedItinerary(it); setShowEditModal(true); }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Itinerary"
                          >
                            <Edit3 size={16} />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-bold text-slate-800 line-clamp-1">{it.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <MapPin size={12} /> {it.destination} • {it.duration}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                      <div className="text-blue-600 font-black text-sm">
                        ₹{it.discountedPrice || it.priceFrom || "N/A"}
                      </div>
                      <a href={`/itinerary/${it.slug}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "agentPhotos":
        return (
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <MediaUploader
              key={`${formData._id}-gallery`}
              label="Agency Gallery (Photos & Videos)"
              maxFiles={50}
              existingUrls={Array.isArray(formData.agentPhotos) ? formData.agentPhotos : []}
              onChange={(urls) => handleUpdateField("agentPhotos", urls)}
            />
          </div>
        );
      case "agentVideos":
        return (
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <MediaUploader
              key={`${formData._id}-videos`}
              label="Customer Video Testimonials (Drag & Upload MP4)"
              maxFiles={20}
              existingUrls={Array.isArray(formData.agentVideos) ? formData.agentVideos : []}
              onChange={(urls) => handleUpdateField("agentVideos", urls)}
            />
            <p className="mt-4 text-[10px] text-slate-400 font-medium italic">These videos will appear in the 'Videos' section of your public profile under Happy Travelers.</p>
          </div>
        );
      case "reviews":
        const reviews = Array.isArray(formData.reviewsList) ? formData.reviewsList : [];
        return (
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-900">Manage Reviews & Ratings</h3>
              <button 
                onClick={() => {
                  const newReviews = [{ name: "", rating: 5, comment: "", date: new Date().toISOString() }, ...reviews];
                  handleUpdateField("reviewsList", newReviews);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
              >
                + Add New Review
              </button>
            </div>

            <div className="space-y-6">
              {reviews.map((rev, idx) => (
                <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 relative group">
                  <button 
                    onClick={() => {
                      const filtered = reviews.filter((_, i) => i !== idx);
                      handleUpdateField("reviewsList", filtered);
                    }}
                    className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    Delete
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Reviewer Name</label>
                      <input
                        type="text"
                        value={rev.name || ""}
                        onChange={(e) => {
                          const updated = [...reviews];
                          updated[idx].name = e.target.value;
                          handleUpdateField("reviewsList", updated);
                        }}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Rating (1-5)</label>
                      <select
                        value={rev.rating || 5}
                        onChange={(e) => {
                          const updated = [...reviews];
                          updated[idx].rating = parseInt(e.target.value);
                          handleUpdateField("reviewsList", updated);
                        }}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Review Comment</label>
                    <textarea
                      value={rev.comment || ""}
                      onChange={(e) => {
                        const updated = [...reviews];
                        updated[idx].comment = e.target.value;
                        handleUpdateField("reviewsList", updated);
                      }}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                      placeholder="Write the review content here..."
                    />
                  </div>
                </div>
              ))}
              {reviews.length === 0 && (
                <div className="text-center py-10 text-slate-400 font-medium">No reviews added yet. Click "+ Add New Review" to begin.</div>
              )}
            </div>

            {/* Public User Reviews Section */}
            <div className="mt-12 pt-8 border-t-2 border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Public User Reviews</h3>
                  <p className="text-xs text-slate-400 font-medium">Reviews submitted by visitors on the public profile</p>
                </div>
              </div>

              {publicReviewsLoading ? (
                <div className="flex items-center justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div></div>
              ) : publicReviews.length === 0 ? (
                <div className="bg-slate-50 rounded-2xl p-10 text-center border border-slate-100">
                  <p className="text-slate-400 text-sm font-medium">No public reviews found for this agent yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {publicReviews.map((rev) => (
                    <div key={rev._id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between group hover:border-orange-200 transition-all">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-slate-900 text-sm">{rev.userName}</span>
                          <div className="flex items-center gap-0.5 px-2 py-0.5 bg-orange-50 rounded-md">
                            <Star className="text-orange-500" size={10} />
                            <span className="text-orange-600 font-black text-[10px]">{rev.rating}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {new Date(rev.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-slate-600 text-xs italic">"{rev.comment}"</p>
                        {rev.images && rev.images.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {rev.images.map((img, idx) => (
                              <img 
                                key={idx} 
                                src={getImageUrl(img)} 
                                alt="Review" 
                                className="w-10 h-10 object-cover rounded-lg border border-slate-100"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button 
                          onClick={() => deletePublicReview(rev._id)}
                          className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                          title="Delete Public Review"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case "blog":
        const blogs = formData.blogs || [];
        
        const handleBlogUpdate = (idx, field, val) => {
          const updatedBlogs = [...blogs];
          updatedBlogs[idx] = { ...updatedBlogs[idx], [field]: val };
          handleUpdateField("blogs", updatedBlogs);
        };
        const addNewBlog = () => {
          handleUpdateField("blogs", [...blogs, { title: "", content: "", image: "", isPublished: true, createdAt: new Date() }]);
        };
        const removeBlog = (idx) => {
          if (window.confirm("Are you sure you want to delete this travel story? This cannot be undone.")) {
            handleUpdateField("blogs", blogs.filter((_, i) => i !== idx));
          }
        };

        return (
          <div className="space-y-6 animate-fadeIn">
            {blogs.map((blog, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6 relative group">
                <button 
                  onClick={() => removeBlog(idx)}
                  className="absolute top-6 right-6 p-2.5 text-slate-400 hover:text-white hover:bg-red-500 transition-all bg-slate-50 rounded-2xl shadow-sm group"
                  title="Delete Story"
                >
                  <Trash2 size={22} />
                </button>

                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-xs font-black">
                    {idx + 1}
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Story #{idx + 1}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Blog Title</label>
                    <input
                      type="text"
                      placeholder="Enter Blog Title"
                      value={blog.title || ""}
                      onChange={(e) => handleBlogUpdate(idx, "title", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition-all font-medium bg-slate-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Visibility</label>
                    <select 
                      value={blog.isPublished !== false ? "Public" : "Private"}
                      onChange={(e) => handleBlogUpdate(idx, "isPublished", e.target.value === "Public")}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none bg-slate-50 font-medium cursor-pointer"
                    >
                      <option value="Public">Public</option>
                      <option value="Private">Private / Draft</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Cover Image</label>
                  <MediaUploader
                    key={`${formData._id}-blog-${idx}`}
                    label=""
                    maxFiles={1}
                    existingUrls={blog.image ? [blog.image] : []}
                    onChange={(urls) => handleBlogUpdate(idx, "image", urls[0] || "")}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">Blog Content</label>
                  <div className="quill-wrapper">
                    <ReactQuill
                      theme="snow"
                      value={blog.content || ""}
                      onChange={(val) => handleBlogUpdate(idx, "content", val)}
                      style={{ height: '250px', marginBottom: '50px' }}
                      placeholder="Share your travel story..."
                      className="bg-white rounded-xl"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addNewBlog}
              className="w-full py-8 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-slate-400 hover:border-red-600 hover:text-red-600 hover:bg-red-50/30 transition-all font-black uppercase tracking-widest flex flex-col items-center gap-2"
            >
              <span className="text-2xl">+</span>
              <span className="text-[10px]">Add New Travel Story</span>
            </button>
            
            <p className="mt-4 text-[10px] text-slate-400 font-medium italic text-center">Don't forget to click "Save Changes" at the bottom after adding your stories.</p>
          </div>
        );
      case "testimonials":
        return (
          <TestimonialEditor
            agentId={formData._id}
            testimonials={formData.testimonials || []}
            onChange={(updated) => handleUpdateField("testimonials", updated)}
          />
        );
      default:
        return null;
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Additional Information</h1>
        <p className="text-slate-500 mt-2 font-medium">Customize your public profile, branch locations, and testimonials.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-2">
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setSelectedSection(sec.id)}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all
                ${selectedSection === sec.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100 scale-[1.02]"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200"}`}
            >
              {sec.icon}
              {sec.label}
            </button>
          ))}

          <div className="mt-8 pt-6 border-t border-slate-200">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all shadow-xl disabled:opacity-50"
            >
              <Save size={18} />
              {saving ? "Saving..." : "Save All Changes"}
            </button>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-3">
              <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
              {SECTIONS.find(s => s.id === selectedSection)?.label}
            </h2>
            {renderEditor()}
          </div>
        </div>
      </div>

      {/* Edit Modal (Simplified for now, can be expanded) */}
      {showEditModal && selectedItinerary && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="text-xl font-black text-slate-900">Edit Itinerary</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{selectedItinerary.title}</p>
              </div>
              <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm"><X size={20} /></button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Title" value={selectedItinerary.title} onChange={(e) => setSelectedItinerary({ ...selectedItinerary, title: e.target.value })} />
                <InputField label="Duration" value={selectedItinerary.duration} onChange={(e) => setSelectedItinerary({ ...selectedItinerary, duration: e.target.value })} />
                <InputField label="Destination" value={selectedItinerary.destination} onChange={(e) => setSelectedItinerary({ ...selectedItinerary, destination: e.target.value })} />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Price (₹)" type="number" value={selectedItinerary.priceFrom} onChange={(e) => setSelectedItinerary({ ...selectedItinerary, priceFrom: e.target.value })} />
                  <InputField label="Discounted (₹)" type="number" value={selectedItinerary.discountedPrice} onChange={(e) => setSelectedItinerary({ ...selectedItinerary, discountedPrice: e.target.value })} />
                </div>
              </div>
              <TextAreaField label="Description" rows={6} value={selectedItinerary.destinationDetail} onChange={(e) => setSelectedItinerary({ ...selectedItinerary, destinationDetail: e.target.value })} />
              <TextAreaField label="Inclusions (comma separated)" value={Array.isArray(selectedItinerary.inclusions) ? selectedItinerary.inclusions.join(", ") : selectedItinerary.inclusions} onChange={(e) => setSelectedItinerary({ ...selectedItinerary, inclusions: e.target.value })} />
              <TextAreaField label="Exclusions (comma separated)" value={Array.isArray(selectedItinerary.exclusions) ? selectedItinerary.exclusions.join(", ") : selectedItinerary.exclusions} onChange={(e) => setSelectedItinerary({ ...selectedItinerary, exclusions: e.target.value })} />
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setShowEditModal(false)} className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-white transition-all">Cancel</button>
              <button
                onClick={async () => {
                  try {
                    await axios.put(`${API_BASE}/api/agent-itineraries/${selectedItinerary.slug}`, selectedItinerary, {
                      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                    });
                    toast.success("Itinerary updated!");
                    setShowEditModal(false);
                    fetchItineraries();
                  } catch (e) { toast.error("Error updating itinerary"); }
                }}
                className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdditionalInfo;
