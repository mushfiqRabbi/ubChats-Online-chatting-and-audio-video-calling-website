"use client";

import { createContext, useEffect, useState, useContext } from "react";
import app from "@/Firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);

const AuthContext = createContext({});

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  });

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? <p>loading</p> : children}
    </AuthContext.Provider>
  );
};
