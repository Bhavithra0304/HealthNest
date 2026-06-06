import React from "react";
import { Navigate } from "react-router-dom";

export const getCurrentUser = () => {
  const fromLocal = localStorage.getItem("hn_user");
  const fromSession = sessionStorage.getItem("hn_user");
  if (fromLocal) return JSON.parse(fromLocal);
  if (fromSession) return JSON.parse(fromSession);
  return null;
};

export const getAdminSession = () => {
  const admin =
    localStorage.getItem("hn_admin") || sessionStorage.getItem("hn_admin");
  return admin ? JSON.parse(admin) : null;
};

export const logout = () => {
  localStorage.removeItem("hn_user");
  sessionStorage.removeItem("hn_user");
  localStorage.removeItem("hn_admin");
  sessionStorage.removeItem("hn_admin");
};
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const user = getCurrentUser();
  const admin = getAdminSession();

  if (adminOnly) {
    if (!admin) return <Navigate to="/login" replace />;
    return children;
  }

  if (!user && !admin) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
