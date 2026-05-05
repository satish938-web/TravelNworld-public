import React, { useState, useCallback } from "react";
import { AlertCircle, Check, X } from "lucide-react";

const domesticCities = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

const internationalCities = [
  "Amsterdam",
  "Bangkok",
  "Barcelona",
  "Beijing",
  "Berlin",
  "Chicago",
  "Dubai",
  "Hong Kong",
  "Istanbul",
  "Kuala Lumpur",
  "London",
  "Los Angeles",
  "New York",
  "Paris",
  "Rome",
  "San Francisco",
  "Singapore",
  "Sydney",
  "Tokyo",
  "Toronto"
];


const destinationTypeOptions = ["Domestic", "International"];

// const destinationOptions = [
//   "Kashmir", "Kerala", "Himachal Pradesh", "Goa",
//   "Andaman Islands", "Dubai", "Thailand", "Singapore",
// ];

const budgetOptions = [
  { value: "below5000", label: "Under ₹5,000" },
  { value: "below10000", label: "Under ₹10,000" },
  { value: "below15000", label: "Under ₹15,000" },
  { value: "below20000", label: "Under ₹20,000" },
  { value: "below45000", label: "Under ₹45,000" },
  { value: "above50000", label: "Above ₹50,000" },
];

const daysOptions = [
  "1N/2D", "2N/3D", "3N/4D", "4N/5D", "5N/6D", "6N/7D", "7N/8D", "10N/11D",
];

const purposeOptions = [
  "Family Vacation", "Backpacking", "Honeymoon Trip", "Adventure Trip",
  "Pilgrimage", "Educational Tour", "Corporate Travel", "MICE Travel",
];

import toast from "react-hot-toast";

const PlanMyTripForm = ({ onClose = () => { } }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    expectedTravelDate: "",
    destinationType: "",
    departureCity: "",
    destination: "",
    days: "",
    adults: "",
    kids: "",
    budget: "",
    purpose: "",
    consultation: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validation function similar to Profile form
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone_no.trim()) {
      newErrors.phone_no = "Phone number is required";
    } else if (!/^[0-9]{7,15}$/.test(formData.phone_no)) {
      newErrors.phone_no = "Phone number must be 7 to 15 digits";
    }

    if (!formData.expectedTravelDate) {
      newErrors.expectedTravelDate = "Expected travel date is required";
    }

    if (!formData.destinationType) {
      newErrors.destinationType = "Travel type is required";
    }

    if (!formData.departureCity) {
      newErrors.departureCity = "Departure city is required";
    }

    if (!formData.destination) {
      newErrors.destination = "Destination is required";
    }

    if (!formData.days) {
      newErrors.days = "Number of days is required";
    }

    if (formData.adults === "") {
      newErrors.adults = "Number of adults is required";
    } else if (isNaN(formData.adults) || Number(formData.adults) < 0) {
      newErrors.adults = "Adults must be a non-negative number";
    }

    if (formData.kids === "") {
      newErrors.kids = "Number of kids is required";
    } else if (isNaN(formData.kids) || Number(formData.kids) < 0) {
      newErrors.kids = "Kids must be a non-negative number";
    }

    if (!formData.budget) {
      newErrors.budget = "Budget range is required";
    }

    if (!formData.purpose) {
      newErrors.purpose = "Trip purpose is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback(
    (field, value) => {
      // Handle phone number formatting
      if (field === "phone_no") {
        value = value.replace(/\D/g, "");
        if (value.length > 15) return;
      }

      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [errors]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const loadToast = toast.loading("Submitting your trip plan...");

    try {
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone_no: formData.phone_no.trim(),
        expectedTravelDate: formData.expectedTravelDate,
        destinationType: formData.destinationType,
        departureCity: formData.departureCity,
        destination: formData.destination,
        NumberodDays: formData.days,
        adults: parseInt(formData.adults) || 0,
        kids: parseInt(formData.kids) || 0,
        budget: formData.budget,
        purpose: formData.purpose,
        consultation: formData.consultation,
      };

      // Simulate API call (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitSuccess(true);
      toast.success("Trip plan submitted successfully!", { id: loadToast });

      // Close form after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error("Form submission failed:", error);
      toast.error("Error submitting form. Please try again.", { id: loadToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-2"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg bg-white border border-gray-200"
      >
        <div className="max-w-full mx-auto p-6 space-y-4 rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Plan My Trip
            </h2>
            <button
              onClick={onClose}
              type="button"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-50"
              aria-label="Close form"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter full name"
                disabled={isSubmitting}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter email address"
                disabled={isSubmitting}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                value={formData.phone_no}
                onChange={(e) => handleInputChange("phone_no", e.target.value)}
                placeholder="Enter phone number"
                disabled={isSubmitting}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
              {errors.phone_no && (
                <p className="text-red-500 text-xs mt-1" role="alert">
                  {errors.phone_no}
                </p>
              )}
            </div>
          </div>

          {/* Travel Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1">
                Expected Travel Date *
              </label>
              <input
                type="date"
                value={formData.expectedTravelDate}
                onChange={(e) => handleInputChange("expectedTravelDate", e.target.value)}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
              {errors.expectedTravelDate && (
                <p className="text-red-500 text-xs mt-1" role="alert">
                  {errors.expectedTravelDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1">
                Travel Type *
              </label>
              <select
                value={formData.destinationType}
                onChange={(e) => handleInputChange("destinationType", e.target.value)}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              >
                <option value="">Select travel type</option>
                {destinationTypeOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.destinationType && (
                <p className="text-red-500 text-xs mt-1" role="alert">
                  {errors.destinationType}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1">
                Departure City *
              </label>
              <select
                value={formData.departureCity}
                onChange={(e) => handleInputChange("departureCity", e.target.value)}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              >
                <option value="">Select departure city</option>
                {(formData.destinationType === "International" ? internationalCities : domesticCities).map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.departureCity && (
                <p className="text-red-500 text-xs mt-1" role="alert">
                  {errors.departureCity}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1">
                Destination *
              </label>
              <select
                value={formData.destination}
                onChange={(e) => handleInputChange("destination", e.target.value)}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              >
                <option value="">Select destination</option>
                {(formData.destinationType === "International" ? internationalCities : domesticCities).map((destination, index) => (
                  <option key={index} value={destination}>
                    {destination}
                  </option>
                ))}
              </select>
              {errors.destination && (
                <p className="text-red-500 text-xs mt-1" role="alert">
                  {errors.destination}
                </p>
              )}
            </div>
          </div>

          {/* Trip Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1">
                Number of Days *
              </label>
              <select
                value={formData.days}
                onChange={(e) => handleInputChange("days", e.target.value)}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              >
                <option value="">Select days</option>
                {daysOptions.map((days, index) => (
                  <option key={index} value={days}>
                    {days}
                  </option>
                ))}
              </select>
              {errors.days && (
                <p className="text-red-500 text-xs mt-1" role="alert">
                  {errors.days}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1">
                Adults *
              </label>
              <input
                type="number"
                min="0"
                value={formData.adults}
                onChange={(e) => handleInputChange("adults", e.target.value)}
                placeholder="e.g. 2"
                disabled={isSubmitting}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
              {errors.adults && (
                <p className="text-red-500 text-xs mt-1" role="alert">
                  {errors.adults}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1">
                Kids *
              </label>
              <input
                type="number"
                min="0"
                value={formData.kids}
                onChange={(e) => handleInputChange("kids", e.target.value)}
                placeholder="e.g. 1"
                disabled={isSubmitting}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
              {errors.kids && (
                <p className="text-red-500 text-xs mt-1" role="alert">
                  {errors.kids}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1">
                Budget Range *
              </label>
              <select
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              >
                <option value="">Select budget range</option>
                {budgetOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.budget && (
                <p className="text-red-500 text-xs mt-1" role="alert">
                  {errors.budget}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1">
                Trip Purpose *
              </label>
              <select
                value={formData.purpose}
                onChange={(e) => handleInputChange("purpose", e.target.value)}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              >
                <option value="">Select trip purpose</option>
                {purposeOptions.map((purpose, index) => (
                  <option key={index} value={purpose}>
                    {purpose}
                  </option>
                ))}
              </select>
              {errors.purpose && (
                <p className="text-red-500 text-xs mt-1" role="alert">
                  {errors.purpose}
                </p>
              )}
            </div>
          </div>

          {/* Consultation */}
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-2">
              Need  Get a free consultation?
            </label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="consultation"
                  checked={formData.consultation === true}
                  onChange={() => handleInputChange("consultation", true)}
                  disabled={isSubmitting}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="consultation"
                  checked={formData.consultation === false}
                  onChange={() => handleInputChange("consultation", false)}
                  disabled={isSubmitting}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full px-6 py-4 bg-premium-gradient text-white rounded-xl font-black uppercase tracking-widest text-[13px] hover:bg-black disabled:opacity-50 flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-red-600/10"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Trip Plan"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanMyTripForm;
