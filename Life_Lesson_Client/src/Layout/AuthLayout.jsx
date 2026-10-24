import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col selection:bg-cyan-500 selection:text-black">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
