import React, { useState, useEffect } from "react";
import Navber from "../Pages/Shared/Navber";
import { Outlet } from "react-router";
import Footer from "../Pages/Shared/Footer";
import Lottie from "lottie-react";
import loaderAnimation from "../../public/loader.json"
const Root = () => {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // 1.5s loader
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {loading ? (
        // Lottie Loader
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <div className="flex flex-col items-center">
            <Lottie animationData={loaderAnimation} loop={true} className="w-40 h-40" />
            <p className="text-xl font-semibold text-gray-700 mt-4">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          <header>
            <Navber />
          </header>

          <main className="flex-1">
            <Outlet />
          </main>

          <footer>
            <Footer />
          </footer>
        </>
      )}
    </div>
  );
};

export default Root;
