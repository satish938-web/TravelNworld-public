import React from "react";
import { Navigate, useLocation, useOutletContext } from "react-router-dom";

const ProfileGuard = ({ children }) => {
  const location = useLocation();
  const context = useOutletContext();
  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("tokenExpiry");
  const isProfileComplete = localStorage.getItem("isProfileComplete");


   if (!token || !expiry || Date.now() >= parseInt(expiry)) {
    return <Navigate to="/b2blogin" state={{ from: location }} replace />;
  }

  if (isProfileComplete !== "true") {
    return <Navigate to="/agent/profile" state={{ from: location }} replace />;
  }

  return React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { context });
    }
    return child;
  });
};


  

export default ProfileGuard;
