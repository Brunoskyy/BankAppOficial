import React from "react";
import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";
import { Home } from "../pages/Home";
import Signin from "../pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";

export default function Routes() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<Signin />} />
        <Route
          path="home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
      </RouterRoutes>
    </BrowserRouter>
  );
}
