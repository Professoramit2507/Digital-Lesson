import React from "react";
import logoImg from "../assets/imgaes/logo.jpg";
import { Link, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <div className="p-4">
        <Link className="flex" to="/">
          <img className="w-10 h-10" src={logoImg} alt="" />
          <a className="btn btn-ghost text-xl">Digital Life Lessons</a>
        </Link>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthLayout;
