import React from "react";
import { Outlet } from "react-router-dom";
import LeftBar from "../components/LeftBar";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";

const Layout = () => {
  const { LeftBarOpen } = useSelector((state) => state.modalSlice);
  return (
    <div className="flex gap-3 p-2">
      <LeftBar />
      <div className={`${LeftBarOpen ? 'absolute top-0 left-0 bg-black opacity-50 w-full h-screen z-30': ''}`}></div>
      <div className="flex flex-col gap-3 w-full">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
