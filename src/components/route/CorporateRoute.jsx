import React from "react";
import { Navigate, Outlet } from "react-router"; // Sesuaikan import (react-router atau react-router-dom)

const CorporateRoute = () => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  const user = userString ? JSON.parse(userString) : null;

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "corporate") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default CorporateRoute;