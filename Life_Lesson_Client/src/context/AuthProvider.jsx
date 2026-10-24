import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import useAxios from "../hooks/useAxios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase user
  const [dbUser, setDbUser] = useState(null); // Database user (role etc.)
  const [loading, setLoading] = useState(true);

  const axios = useAxios();

  // 🔹 Save user to DB (only if not exists)
  const saveUser = async (firebaseUser, additionalData = {}) => {
    try {
      await axios.post("/users", {
        email: firebaseUser.email,
        name: additionalData.name || firebaseUser.displayName || "",
        photo: additionalData.photo || firebaseUser.photoURL || "",
        role: "user",
      });
    } catch (err) {
      console.error(err?.response?.data || err.message);
    }
  };

  // 🔹 Refetch DB user (for role update etc.)
  const refetchUser = async (email) => {
    if (!email) return;
    try {
      const res = await axios.get(`/users/${encodeURIComponent(email)}`);
      setDbUser(res.data);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
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

  const updateUserProfile = (name, photo) => {
    if (!auth.currentUser) return Promise.resolve();
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
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
    user,
    dbUser,
    loading,
    registerUser,
    updateUserProfile,
    signInUser,
    googleSignIn,
    logOut,
    refetchUser,
    saveUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
