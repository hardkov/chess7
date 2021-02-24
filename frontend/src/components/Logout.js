import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { logoutUser } from "../services/authService";

export default function Logout() {
  useEffect(() => {
    logoutUser();
  });

  return <Redirect to="/" />;
}
