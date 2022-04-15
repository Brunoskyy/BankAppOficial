import { Outlet, Navigate } from "react-router-dom";
import Signin from "../pages/Login";

export const ProtectedRoutes = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
