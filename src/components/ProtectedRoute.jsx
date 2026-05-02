import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") 
    const expiry = localStorage.getItem("tokenExpiry");

  if (!token || !expiry || Date.now() >= parseInt(expiry)) {
    return <Navigate to="/b2blogin" replace />;
  }

  return <Outlet />; 
};


export default ProtectedRoute;
