import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle, AiOutlineWarning } from "react-icons/ai";
import { Eye, EyeOff } from "lucide-react";
import agenlogin from "../assets/images/agentlogin.jpg";
//import { Eye, EyeOff } from "lucide-react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


import { API_BASE } from "../utils/api";

const B2BSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_no: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
const [otp, setOtp] = useState("");



  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setFormError("");
  };

  const validateForm = () => {
    const e = {};
    const { firstName, lastName, email, phone_no, password, confirmPassword } = formData;

    if (!firstName.trim()) e.firstName = "First name is required";
    if (!lastName.trim()) e.lastName = "Last name is required";

    if (!email.trim()) e.email = "Email is required";
    else if (!emailRegex.test(email.trim())) e.email = "Enter a valid email";

    if (!phone_no) e.phone_no = "Phone number is required";
    else if (!/^\d{10}$/.test(phone_no)) e.phone_no = "Phone number must be 10 digits";

    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";

    if (!confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) e.confirmPassword = "Passwords do not match";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const signup = async (data) => {
    const payload = {
      first_Name: data.firstName.trim(),
      last_Name: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      phone_no: data.phone_no.trim(),
      password: data.password,
    };

    const apiBase = API_BASE;

  try {
    const res = await fetch(`${apiBase}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(async () => {
        const text = await res.text().catch(() => "");
        return { message: text };
      });
      throw new Error(errJson.message || errJson.error || `Signup failed with status ${res.status}`);
    }

    const signupResult = await res.json();

 

// ✅ return success to trigger OTP UI
return signupResult;
  } catch (err) {
    console.error("Signup error:", err.message);
    throw err;
  }
};




  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setIsSubmitting(true);
  setFormError("");

  try {
    const apiBase = API_BASE;

    if (!isOtpSent) {
      //  STEP 1: SIGNUP
      await signup(formData);

      //  STEP 2: SEND OTP (via login API)
      const res = await fetch(`${apiBase}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (data.otpSent) {
        setIsOtpSent(true); // ✅ SWITCH UI
        return;
      } else {
        throw new Error("OTP not sent");
      }
    } else {
      // 🔥 STEP 3: VERIFY OTP
      const res = await fetch(`${apiBase}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: otp,
        }),
      });

      const data = await res.json();

      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);

        navigate("/admin"); //  SUCCESS
      } else {
        throw new Error("Invalid OTP");
      }
    }
  } catch (err) {
    setFormError(err.message);
  } finally {
    setIsSubmitting(false);
  }
};

//   const handleVerifyOtp = async () => {
//   try {
//     const apiBase = API_BASE;

//     const res = await fetch(`${apiBase}/api/auth/verify-otp`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: formData.email,
//         otp: otp,
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.message || "OTP verification failed");
//     }

//     if (data.accessToken) {
//       localStorage.setItem("token", data.accessToken);

//       // 🎯 REDIRECT TO DASHBOARD
//       navigate("/admin");
//     } else {
//       throw new Error("No token received");
//     }

//   } catch (err) {
//     setFormError(err.message);
//   }
// };
  return (
  <div className="min-h-screen flex bg-gray-50">
    {/* Left Panel */}
    <div className="hidden md:flex w-1/2 bg-white flex-col justify-center items-center p-10">
      <img
        src={agenlogin}
        alt="Agent illustration"
        className="mb-6 rounded-md object-cover max-h-[70vh] w-full"
      />
      <div className="text-center max-w-sm">
        <h2 className="text-2xl font-semibold text-gray-800">
          Join HelloTravel B2B
        </h2>
        <p className="mt-2 text-gray-500 text-sm">
          Create itineraries, manage leads and grow your travel business.
        </p>
      </div>
    </div>

    {/* Signup Form */}
    <div className="flex-1 flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg"
        noValidate
      >
        <h1 className="text-3xl font-bold text-center text-gray-900">
          {isOtpSent ? "Verify OTP" : "Sign up"}
        </h1>

        <p className="text-center text-gray-600">
          {isOtpSent
            ? `OTP sent to ${formData.email}`
            : "Create your agent account on HelloTravel"}
        </p>

        {/* Error */}
        {formError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {formError}
          </div>
        )}

        {/* EMAIL (Always visible) */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              handleInputChange("email", e.target.value)
            }
            disabled={isOtpSent}
            className="w-full px-3 py-2 border rounded-lg text-sm border-gray-300"
          />
        </div>

        
        {!isOtpSent ? (
          <>
            {/* NAME */}
            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) =>
                  handleInputChange("firstName", e.target.value)
                }
                className="px-3 py-2 border rounded-lg text-sm"
              />
              <input
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) =>
                  handleInputChange("lastName", e.target.value)
                }
                className="px-3 py-2 border rounded-lg text-sm"
              />
            </div>

            {/* PHONE */}
            <input
              type="tel"
              placeholder="Phone number"
              value={formData.phone_no}
              onChange={(e) =>
                handleInputChange("phone_no", e.target.value)
              }
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />

            {/* PASSWORD */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

            {/* CONFIRM PASSWORD */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
          </>
        ) : (
          <>
            {/* 🔥 OTP UI */}
            <div>
              <label className="block text-xs font-bold text-indigo-600 mb-1 uppercase tracking-wider">
                Enter 6-Digit OTP *
              </label>

              <input
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 border border-indigo-300 bg-indigo-50 rounded-lg text-center tracking-[0.8em] font-bold"
              />

              <button
                type="button"
                onClick={() => setIsOtpSent(false)}
                className="text-xs text-gray-500 hover:text-indigo-600 underline mt-2"
              >
                Back to Signup
              </button>
            </div>
          </>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium flex items-center justify-center gap-2"
        >
          {isSubmitting && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {isOtpSent ? "Verify & Signup" : "Create account"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/b2blogin" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  </div>
);
};
export default B2BSignup;
