import React, { useState } from "react";

// Section heading with icon
const SectionHeading = ({ icon, title }) => (
  <div className="flex items-center gap-2 mb-4">
    <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
      {icon}
    </span>
    <h2 className="text-sm font-semibold text-blue-600">{title}</h2>
  </div>
);

const GetAQuoteForm = ({ agencyName, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelType: "",
    destination: "",
    startDate: "",
    endDate: "",
    adults: "",
    children: "",
    seniors: "",
    budget: "",
    services: [],
    requirements: "",
    source: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        services: checked
          ? [...prev.services, value]
          : prev.services.filter((s) => s !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    if (onSubmit) onSubmit(agencyName);

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      travelType: "",
      destination: "",
      startDate: "",
      endDate: "",
      adults: "",
      children: "",
      seniors: "",
      budget: "",
      services: [],
      requirements: "",
      source: "",
    });
  };

  return (
    <div className="bg-white flex items-start justify-start p-4 md:p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6 md:space-y-5">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Get a Quote {agencyName && `for ${agencyName}`}
        </h1>

        {/* Personal Information */}
        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
          <SectionHeading
            title="Personal Information"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A9 9 0 1118.88 6.196 9 9 0 015.12 17.804z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full text-sm rounded-md bg-gray-100 px-4 py-3 placeholder-gray-400 focus:outline-none"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full text-sm rounded-md bg-gray-100 px-4 py-3 placeholder-gray-400 focus:outline-none"
                placeholder="Enter email"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className="w-full text-sm rounded-md bg-gray-100 px-4 py-3 placeholder-gray-400 focus:outline-none"
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </div>

        {/* Travel Preferences */}
        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
          <SectionHeading
            title="Travel Preferences"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.5 6L3 9l7.5 3L21 9l-10.5-3zM3 9v6l7.5 3V9L3 6z"
                />
              </svg>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Travel Type *
              </label>
              <select
                name="travelType"
                value={formData.travelType}
                onChange={handleChange}
                required
                className="w-full text-sm rounded-md bg-gray-100 px-4 py-3 focus:outline-none border-b border-gray-300"
              >
                <option value="">Select travel type</option>
                <option value="Himalayan Treks">Himalayan Treks</option>
                <option value="Spiritual Journeys">Spiritual Journeys</option>
                <option value="Adventure Hub">Adventure Hub</option>
                <option value="Nature Explorers">Nature Explorers</option>
                <option value="Cultural Tours">Cultural Tours</option>
                <option value="Beach Getaways">Beach Getaways</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Preferred Destination
              </label>
              <input
                name="destination"
                type="text"
                value={formData.destination}
                onChange={handleChange}
                className="w-full text-sm rounded-md bg-gray-100 px-4 py-3 placeholder-gray-400 focus:outline-none border-b border-gray-300"
                placeholder="e.g., Nepal, Bali, Switzerland"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Start Date
              </label>
              <input
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full text-sm rounded-md bg-gray-100 px-4 py-3 focus:outline-none border-b border-gray-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                End Date
              </label>
              <input
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full text-sm rounded-md bg-gray-100 px-4 py-3 focus:outline-none border-b border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Number of Travelers */}
        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
          <SectionHeading
            title="Number of Travelers"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M12 12a4 4 0 100-8 4 4 0 000 8z"
                />
              </svg>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Adults (18+)
              </label>
              <input
                name="adults"
                type="number"
                value={formData.adults}
                onChange={handleChange}
                className="w-full text-sm rounded-md bg-gray-100 px-4 py-3 focus:outline-none border-b border-gray-300"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Children (2-17)
              </label>
              <input
                name="children"
                type="number"
                value={formData.children}
                onChange={handleChange}
                className="w-full text-sm rounded-md bg-gray-100 px-4 py-3 focus:outline-none border-b border-gray-300"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Seniors (65+)
              </label>
              <input
                name="seniors"
                type="number"
                value={formData.seniors}
                onChange={handleChange}
                className="w-full text-sm rounded-md bg-gray-100 px-4 py-3 focus:outline-none border-b border-gray-300"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Budget & Services */}
        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
          <SectionHeading
            title="Budget & Services"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 1.119-3 2.5S10.343 13 12 13s3 1.119 3 2.5S13.657 18 12 18"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v2M12 19v2"
                />
              </svg>
            }
          />
          <div className="mb-4 min-w-0">
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Budget Range (per person)
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full text-sm rounded-md bg-gray-100 px-4 py-3 focus:outline-none border-b border-gray-300 "
            >
              <option value="">Select budget range</option>
              <option value="100-500">$100 - $500</option>
              <option value="500-1000">$500 - $1000</option>
              <option value="1000-2000">$1000 - $2000</option>
              <option value="2000+">$2000+</option>
            </select>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-700 mb-2">
              Additional Services Required
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                "Hotel Accommodation",
                "Transportation",
                "Tour Guide",
                "Travel Insurance",
                "Meals",
              ].map((service) => (
                <label
                  key={service}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    value={service}
                    onChange={handleChange}
                    checked={formData.services.includes(service)}
                    className="w-4 h-4 border border-gray-300 rounded-sm bg-white focus:ring-0"
                  />
                  <span className="break-words" >{service}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
          <SectionHeading
            title="Additional Information"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 110-16 8 8 0 010 16z"
                />
              </svg>
            }
          />
          <div className="mb-3">
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Special Requirements or Notes
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows="3"
              className="w-full text-sm rounded-md bg-gray-100 px-4 py-3 placeholder-gray-400 focus:outline-none border-b border-gray-300"
              placeholder="Any special requests?"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              How did you hear about us?
            </label>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full text-sm rounded-md bg-gray-100 px-4 py-3 focus:outline-none border-b border-gray-300"
            >
              <option value="">Select</option>
              <option value="Google">Google</option>
              <option value="Social Media">Social Media</option>
              <option value="Friend">Friend</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-auto bg-orange-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-600 transition text-sm"
          >
            Request Quote
          </button>
        </div>
      </form>
    </div>
  );
};

export default GetAQuoteForm;