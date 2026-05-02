import { useState, useCallback } from "react";
import { Eye, EyeOff, Check } from "lucide-react";

// Password validation rules
const validatePassword = (password) => {
  if (!password || password.trim() === "") return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password)) return "Must contain at least one uppercase letter";
  if (!/[a-z]/.test(password)) return "Must contain at least one lowercase letter";
  if (!/[0-9]/.test(password)) return "Must contain at least one number";
  if (!/[@$!%*?&#]/.test(password))
    return "Must contain at least one special character (@$!%*?&#)";
  return "";
};

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [show, setShow] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Validate form like AddUser
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else {
      const passwordError = validatePassword(formData.newPassword);
      if (passwordError) newErrors.newPassword = passwordError;
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback(
    (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

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
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // fake API
      setSubmitSuccess(true);
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setErrors({});
    } catch (err) {
      console.error("Password update failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <form
        onSubmit={handleSubmit}
        className="max-w-full mx-auto p-6 space-y-6 rounded-lg border border-gray-200 bg-white shadow-sm"
        noValidate
      >
        <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>

        {submitSuccess && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-sm text-green-700">
            <Check className="w-4 h-4" />
            Password updated successfully
          </div>
        )}

        {/* Grid layout like AddUser */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Current Password */}
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Current Password *
            </label>
            <div className="relative">
              <input
                id="currentPassword"
                type={show.currentPassword ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                placeholder="Enter current password"
                className={`w-full rounded-md px-3 py-2 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.currentPassword
                    ? "border-red-500"
                    : "border-gray-300 bg-gray-50"
                }`}
                disabled={isSubmitting}
                aria-describedby={errors.currentPassword ? "currentPassword-error" : undefined}
              />
              <button
                type="button"
                onClick={() =>
                  setShow((prev) => ({ ...prev, currentPassword: !prev.currentPassword }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {show.currentPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <p id="currentPassword-error" className="text-red-500 text-xs mt-1">
                {errors.currentPassword}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password *
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={show.newPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) => handleInputChange("newPassword", e.target.value)}
                placeholder="Enter new password"
                className={`w-full rounded-md px-3 py-2 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.newPassword
                    ? "border-red-500"
                    : "border-gray-300 bg-gray-50"
                }`}
                disabled={isSubmitting}
                aria-describedby={errors.newPassword ? "newPassword-error" : "newPassword-help"}
              />
              <button
                type="button"
                onClick={() =>
                  setShow((prev) => ({ ...prev, newPassword: !prev.newPassword }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {show.newPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.newPassword ? (
              <p id="newPassword-error" className="text-red-500 text-xs mt-1">
                {errors.newPassword}
              </p>
            ) : (
              <p id="newPassword-help" className="text-gray-500 text-xs mt-1">
                Minimum 8 characters with uppercase, lowercase, number & special character
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password *
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={show.confirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Re-enter new password"
                className={`w-full rounded-md px-3 py-2 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300 bg-gray-50"
                }`}
                disabled={isSubmitting}
                aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
              />
              <button
                type="button"
                onClick={() =>
                  setShow((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {show.confirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p id="confirmPassword-error" className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-[#312E81] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 transition-colors flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            "Update Password"
          )}
        </button>

      </form>

    </div>
  );
};

export default ResetPassword;
