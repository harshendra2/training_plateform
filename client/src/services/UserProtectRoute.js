import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function UserProtect() {
  const auth = localStorage.getItem("usertoken");
  return auth ? <Outlet /> : <Navigate to="/" />;
}

export default UserProtect;
