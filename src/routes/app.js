import React from "react";

import AuthRoutes from "./auth";
import ClientStack from "./client";
import { useAuth } from "../hooks";
import AdminStack from "./admin";

export default function xAppNavigation() {
  const { isLoggedIn, role } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <>{role === "admin" ? <AdminStack /> : <ClientStack />}</>
      ) : (
        <AuthRoutes />
      )}
    </>
  );
}
