import React, { useState, useCallback, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Check, AlertCircle, Eye, EyeOff } from "lucide-react";
import agenlogin from "../assets/images/agentlogin.jpeg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../utils/api";

import toast from "react-hot-toast";

const B2BLogin = () => {
   

  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginMode, setLoginMode] = useState("agent");
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_BASE}/api/auth/google-login`, {
        token: credentialResponse.credential,
      });

      const token = response.data.accessToken;
      const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // Default 7 days

      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiry", String(expiry));
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("isProfileComplete", String(response.data.user.isProfileComplete));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Login successful!");
      if (!response.data.user.isProfileComplete) {
        navigate("/agent/profile");
      } else {
        navigate("/agent/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Google Authentication failed.");
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
  const token = localStorage.getItem("token");
  const expiry = parseInt(localStorage.getItem("tokenExpiry"));
  const isProfileComplete = localStorage.getItem("isProfileComplete");
 const role = localStorage.getItem("role");

    if (token && expiry && Date.now() < expiry) {
    if (role === "SUPERADMIN") {
      navigate("/superadmin/dashboard");
    } else if (role === "AGENT" || role === "ADMIN") {
 if (isProfileComplete === "true") {
      navigate("/agent/");
    } else {
      navigate("/agent/profile");
    }
  }
  }else {
    localStorage.clear();
  }
}, [navigate]);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  
 

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!isOtpSent) {
      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
      }
    } else {
      if (loginMode !== "superadmin" && isOtpSent) {
      if (!otp.trim() || otp.length < 6) {
        newErrors.otp = "Valid 6-digit OTP is required";
      }
    }
  }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors)[0]);
      return false;
    }
    return true;
  }, [formData, isOtpSent, otp]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      if (!isOtpSent) {
        // --- STEP 1: Request login or OTP ---
        const response = await axios.post(`${API_BASE}/api/auth/login`, {
          email: formData.email,
          password: formData.password,
          rememberMe,
        
        });

       

        if (response.data.otpSent) {
          setIsOtpSent(true);
          setIsSubmitting(false);
          toast.success("OTP sent to your email!");
          return; 
        }
      } else {
        // --- STEP 2: Verify OTP ---
        const response = await axios.post(`${API_BASE}/api/auth/verify-otp`, { 
          email: formData.email, 
          otp: otp ,
          rememberMe: rememberMe
        });
          
        const token = response.data.accessToken;
        const expiry = rememberMe
          ? Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
          : Date.now() + 24 * 60 * 60 * 1000; // 1 day

            localStorage.setItem("token", token);
            localStorage.setItem("tokenExpiry", String(expiry));
            localStorage.setItem("role", response.data.user.role);
            localStorage.setItem("isProfileComplete", String(response.data.user.isProfileComplete));
            localStorage.setItem("user", JSON.stringify(response.data.user));

            toast.success("Login successful!");
            if (!response.data.user.isProfileComplete) {
              navigate("/agent/profile");
            } else {
              navigate("/agent/");
            }
              }
            } catch (error) {
              toast.error(error.response?.data?.message || "Authentication failed. Please try again.");
            } finally {
              setIsSubmitting(false);
            }
          };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Luxurious Hero Panel */}
      <div className="hidden md:flex w-1/2 relative flex-col justify-center items-start p-16 overflow-hidden bg-black">
        <img 
          src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2029&auto=format&fit=crop" 
          alt="B2B Portal" 
          className="absolute inset-0 w-full h-full object-cover opacity-40" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay" />
        
        <div className="relative z-10 w-full max-w-lg">
          <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest mb-6 inline-block">
            Partner Portal
          </span>
          <h1 className="text-5xl font-black text-white mb-6 leading-tight tracking-tight font-['Montserrat']">
            Empowering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300 italic font-light">Global Agencies.</span>
          </h1>
          <p className="text-slate-300 text-lg font-light leading-relaxed mb-12">
            Join the most exclusive network of travel professionals. Access premium inventory, manage your bookings seamlessly, and scale your business with our cutting-edge B2B tools.
          </p>
          
          <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8 mt-auto">
            <div>
              <div className="text-3xl font-black text-white mb-1">500+</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Premium Partners</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white mb-1">10k+</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Luxury Itineraries</div>
            </div>
          </div>
        </div>
      </div>



      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white shadow-lg">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-8 space-y-4" noValidate>
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Login</h1>
          <p className="text-center text-gray-600 mb-4">Welcome to the HelloTravel family!</p>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                setErrors({ form: "Google Login Failed" });
              }}
              useOneTap
              theme="filled_blue"
              shape="pill"
              width="350"
            />
          </div>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" /><span className="px-2 text-gray-500">or</span><hr className="flex-grow border-gray-300" />
          </div>

          {/* Email Field (Locked when OTP sent) */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={isSubmitting || isOtpSent}
              className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 ${errors.email ? "border-red-300 bg-red-50" : "border-gray-300"}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {loginMode === "superadmin" || !isOtpSent ? (
            /* Password UI */
            <div className="relative">
              <label className="block text-xs font-medium text-gray-700 mb-1">Password *</label>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                disabled={isSubmitting}
                className={`w-full pr-10 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 ${errors.password ? "border-red-300 bg-red-50" : "border-gray-300"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
          ) : (
            /* OTP UI */
            <div>
              <label className="block text-xs font-bold text-indigo-600 mb-1 uppercase tracking-wider">Enter 6-Digit OTP *</label>
              <input
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 border border-indigo-300 bg-indigo-50 rounded-lg text-center tracking-[0.8em] font-bold"
              />
              {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
              <button type="button" onClick={() => setIsOtpSent(false)} className="text-xs text-gray-500 hover:text-indigo-600 underline mt-2">Back to Password</button>
            </div>
          )}

                  <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label className="text-sm text-gray-600">
            Remember me (7 days)
          </label>
        </div>

         <button
  type="submit"
  disabled={isSubmitting}
  className="w-full bg-premium-gradient text-white py-2 rounded-md font-medium flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-70 shadow-lg shadow-red-600/10"
>
  {isSubmitting && (
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
  )}

  {isSubmitting
    ? "Processing..."
    : isOtpSent
    ? "Verify & Login"
    : "Login"}
</button>

          <p className="text-center text-sm text-gray-600">
            New User? <Link to="/b2bSignup" className="text-blue-600 hover:underline">Signup Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default B2BLogin;
