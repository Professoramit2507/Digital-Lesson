import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import useAxios from "../hooks/useAxios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // Firebase user
  const [dbUser, setDbUser] = useState(null);  // Database user (role etc.)
  const [loading, setLoading] = useState(true);

  const axios = useAxios();

  // 🔹 Save user to DB (only if not exists)
  const saveUser = async (firebaseUser) => {
    try {
      await axios.post("/users", {
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        role: "user",
      });
    } catch (err) {
      // ignore duplicate user error
      console.error(err?.response?.data || err.message);
    }
  };

  // 🔹 Refetch DB user (for role update etc.)
  const refetchUser = async (email) => {
    try {
      const res = await axios.get(`/users/${encodeURIComponent(email)}`);
      setDbUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Auth state listener (MOST IMPORTANT PART)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // ✅ Firebase user
        await saveUser(currentUser);

        try {
          const res = await axios.get(
            `/users/${encodeURIComponent(currentUser.email)}`
          );
          setDbUser(res.data);
        } catch (err) {
          console.error(err);
        }

        setLoading(false);
      } else {
        setUser(null);
        setDbUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Auth functions
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // 🔹 Context value
  const authInfo = {
    user,       // firebase user
    dbUser,     // database user (role)
    loading,
    registerUser,
    signInUser,
    googleSignIn,
    logOut,
    refetchUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
