import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoutes = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
