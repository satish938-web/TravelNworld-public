import { Navigate, useLocation } from "react-router-dom";

const ProfileGuard = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("tokenExpiry");
  const isProfileComplete = localStorage.getItem("isProfileComplete");


   if (!token || !expiry || Date.now() >= parseInt(expiry)) {
    return <Navigate to="/b2blogin" state={{ from: location }} replace />;
  }

  if (isProfileComplete !== "true") {
    return <Navigate to="/admin/profile" state={{ from: location }} replace />;
  }

  return children;
};


  

export default ProfileGuard;