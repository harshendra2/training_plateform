import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function Protect() {
  const auth = localStorage.getItem("admindbtoken");
  return auth ? <Outlet /> : <Navigate to="/" />;
}

export default Protect;
