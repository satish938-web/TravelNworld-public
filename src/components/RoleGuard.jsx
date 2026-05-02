import { Navigate } from "react-router-dom";

const RoleGuard = ({ allowedRoles, children }) => {
  const role = localStorage.getItem("role");

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/b2blogin" replace />;
  }

  return children;
};

export default RoleGuard;
