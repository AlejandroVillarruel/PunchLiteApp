import React from "react";

import { AuthContext } from "../contexts/authContext";

export const useAuth = () => {
  const {
    isLoggedIn,
    login,
    logout,
    user,
    profile,
    getProfile,
    appLoaded,
    setAppLoaded,
    role,
  } = React.useContext(AuthContext);

  return {
    isLoggedIn,
    login,
    logout,
    user,
    profile,
    getProfile,
    appLoaded,
    setAppLoaded,
    role,
  };
};
