import React from "react";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Alert } from "react-native";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [appLoaded, setAppLoaded] = React.useState(false);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [profile, setProfile] = React.useState({});
  const [role, setRole] = React.useState("");

  const login = async (user) => {
    // setIsLoggedIn(true);
    setUser(user);

    await getProfile(user.uid);
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const getProfile = async (uid) => {
    try {
      const profileRef = await getDoc(doc(db, "users", uid));
      const profileData = profileRef.data();

      if (profileData?.status === "pending") {
        Alert.alert(
          "Account Pending",
          "Your account is still pending approval. Please try again later."
        );
        logout();
        return;
      }

      setIsLoggedIn(true);

      setRole(profileData.role);

      setProfile({
        ...profileData,
        id: profileRef.id,
      });
    } catch (error) {
      console.error("Error getting profile: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        user,
        profile,
        getProfile,
        appLoaded,
        setAppLoaded,
        role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
