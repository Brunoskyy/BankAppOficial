import React from "react";
import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";
import { Home } from "../pages/Home";
import Signin from "../pages/Login";
import { Payment } from "../pages/Payment";
import { ProtectedRoutes } from "./ProtectedRoute";

export default function Routes() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<Signin />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/payment" element={<Payment />} />
        </Route>
      </RouterRoutes>
    </BrowserRouter>
  );
}
