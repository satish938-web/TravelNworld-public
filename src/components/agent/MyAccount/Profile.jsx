import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { AlertCircle, Check, Camera, Plus, Minus, User as UserIcon, Building, Mail, MapPin, Save, Info } from "lucide-react";
import axios from "axios";
import userImage from "../../../assets/images/user.jpg";
import { country_and_states } from "./country-states";
import { useNavigate } from "react-router-dom";
import { API_BASE, S3_BASE_URL, getImageUrl } from "../../../utils/api";
import { uploadToS3 } from "../../../utils/s3Upload";
import toast from "react-hot-toast";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const emptyAddress = {
  houseNo: "",
  street: "",
  area: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

//  Reusable Input with Label & Error
const InputField = ({ label, icon, type = "text", value, onChange, error, ...rest }) => (
  <div>
    <label className="block text-[10px] font-black text-slate-400 mb-1.5 uppercase tracking-widest flex items-center gap-2">
      {icon} {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
      {...rest}
    />
    {error && <p className="text-red-500 text-[10px] mt-1 font-bold">{error}</p>}
  </div>
);

const AddressField = ({ address, onChange, label, errors }) => {
  const handleLocalChange = (field, value) => {
    onChange({ [field]: value });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
      <h4 className="text-sm font-black text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-tight">
        <MapPin size={18} className="text-blue-600" /> {label}
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InputField label="House / Flat No." value={address?.houseNo} onChange={(e) => handleLocalChange("houseNo", e.target.value)} />
        <InputField label="Street / Locality" value={address?.street} onChange={(e) => handleLocalChange("street", e.target.value)} />
        <InputField label="Area / Colony" value={address?.area} onChange={(e) => handleLocalChange("area", e.target.value)} />
        <InputField label="City / Town" value={address?.city} onChange={(e) => handleLocalChange("city", e.target.value)} />
        
        <div>
          <label className="block text-[10px] font-black text-slate-400 mb-1.5 uppercase tracking-widest">Country</label>
          <select
            value={address?.country}
            onChange={(e) => {
              // Consolidate updates to avoid race conditions
              onChange({ country: e.target.value, state: "" });
            }}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Country</option>
            {Object.keys(country_and_states.country).map((c) => (
              <option key={c} value={c}>{country_and_states.country[c]}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 mb-1.5 uppercase tracking-widest">State</label>
          <select
            value={address?.state}
            onChange={(e) => handleLocalChange("state", e.target.value)}
            disabled={!address?.country}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <option value="">Select State</option>
            {address?.country && country_and_states.states[address.country]?.map((s) => (
              <option key={s.code} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
        <InputField label="Postal Code" value={address?.postalCode} onChange={(e) => handleLocalChange("postalCode", e.target.value)} />
      </div>
    </div>
  );
};

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const redirectMessage = location.state?.message;

  const [formData, setFormData] = useState({
    company: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    photo: null,
    secondaryEmails: [],
    companyAddress: { ...emptyAddress },
    // Background fields kept for data consistency
    branchAddresses: [],
    overview: "",
    agentPhotos: [],
    tourPackages: "",
    quickInfo: "",
    services: "",
    reviews: "",
    blog: "",
    testimonials: [],
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/b2blogin");
      return; 
    }

    try {
      const res = await axios.get(`${API_BASE}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.user) {
        const u = res.data.user;
        setFormData(prev => ({
          ...prev,
          ...u,
          secondaryEmails: Array.isArray(u.secondaryEmails) ? u.secondaryEmails : [],
          branchAddresses: Array.isArray(u.branchAddresses) ? u.branchAddresses : [],
          agentPhotos: Array.isArray(u.agentPhotos) ? u.agentPhotos : [],
          testimonials: Array.isArray(u.testimonials) ? u.testimonials : [],
        }));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleAddressChange = (updates) => {
    setFormData(prev => ({
      ...prev,
      companyAddress: { ...prev.companyAddress, ...updates }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadToast = toast.loading("Saving identity details...");

    try {
      const token = localStorage.getItem("token");
      let photoUrl = typeof formData.photo === "string" ? formData.photo : null;
      
      if (formData.photo instanceof File) {
        try {
          const fileKey = await uploadToS3(formData.photo, "agent-profile");
          photoUrl = fileKey.startsWith("http") ? fileKey : `${S3_BASE_URL}/${fileKey}`;
        } catch (uploadErr) {
          console.error("Photo upload failed:", uploadErr);
          toast.error("Photo upload failed. Please try again.", { id: loadToast });
          setIsSubmitting(false);
          return;
        }
      }

      const res = await axios.put(`${API_BASE}/api/auth/profile`, { ...formData, photo: photoUrl }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        const isComplete = res.data.user.isProfileComplete ?? true; 
        localStorage.setItem("isProfileComplete", String(isComplete));
        window.dispatchEvent(new Event("profileUpdated"));
        setFormData(prev => ({ ...prev, ...res.data.user }));
      }
      toast.success("Profile updated successfully!", { id: loadToast });
    } catch (err) {
      console.error(err);
      toast.error("Error saving profile: " + (err.response?.data?.message || err.message), { id: loadToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Profile Information</h1>
        <p className="text-slate-500 mt-2 font-medium">Update your core identity and contact details.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Identity Section */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5 -mr-10 -mt-10">
             <UserIcon size={200} />
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative group">
              <img
                src={formData.photo instanceof File ? URL.createObjectURL(formData.photo) : getImageUrl(formData.photo) || userImage}
                alt="Profile"
                className="w-32 h-32 rounded-[2rem] object-cover shadow-2xl border-4 border-white group-hover:scale-105 transition-transform duration-500"
              />
              <label htmlFor="photo" className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-3 rounded-2xl shadow-xl cursor-pointer hover:bg-blue-700 transition-all active:scale-90">
                <Camera size={18} />
              </label>
              <input id="photo" type="file" accept="image/*" className="hidden" onChange={(e) => handleChange("photo", e.target.files[0])} />
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              <InputField label="First Name" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} icon={<UserIcon size={12} />} />
              <InputField label="Last Name" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} icon={<UserIcon size={12} />} />
              <InputField label="Company Name" value={formData.company} onChange={(e) => handleChange("company", e.target.value)} icon={<Building size={12} />} />
              <InputField label="Phone Number" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} icon={<Mail size={12} />} />
            </div>
          </div>
        </div>

        {/* Email Management */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
          <h3 className="text-sm font-black text-slate-900 mb-8 flex items-center gap-2 uppercase tracking-tight">
             <Mail size={18} className="text-blue-600" /> Communication
          </h3>
          <div className="space-y-6">
            <InputField label="Primary Email (Registered)" type="email" value={formData.email} disabled icon={<Check size={12} className="text-green-500" />} />
            
            {formData.secondaryEmails?.map((email, idx) => (
              <div key={idx} className="flex items-end gap-3 group animate-in slide-in-from-left-4">
                <div className="flex-1">
                  <InputField
                    label={`Secondary Email ${idx + 1}`}
                    type="email"
                    value={email}
                    onChange={(e) => {
                      const updated = [...formData.secondaryEmails];
                      updated[idx] = e.target.value;
                      handleChange("secondaryEmails", updated);
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleChange("secondaryEmails", formData.secondaryEmails.filter((_, i) => i !== idx))}
                  className="mb-1 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                >
                  <Minus size={18} />
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => handleChange("secondaryEmails", [...(formData.secondaryEmails || []), ""])}
              className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-all font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Secondary Email
            </button>
          </div>
        </div>

        {/* Primary Address */}
        <AddressField
          address={formData.companyAddress}
          onChange={(updates) => handleAddressChange(updates)}
          label="Headquarters Address"
        />

        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 flex items-start gap-4">
          <Info size={20} className="text-blue-600 mt-0.5" />
          <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
            <span className="font-black uppercase tracking-widest mr-2">Note:</span>
            Branch locations, services, gallery, and public profile details have been moved to the <span className="font-black">"Additional Information"</span> section for a more organized experience.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-3 px-10 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl disabled:opacity-50 active:scale-95 text-[11px] uppercase tracking-[0.2em]"
          >
            <Save size={18} />
            {isSubmitting ? "Syncing Profile..." : "Save Identity Details"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
