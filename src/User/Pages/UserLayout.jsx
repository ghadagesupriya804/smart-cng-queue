import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header"; // Your Header
import "./Styles/UserLayout.css"; // We'll create this next

const UserLayout = () => {
  return (
    <div className="user-layout">
      {/* 1. The Header stays here permanently */}
      <Header />

      {/* 2. This is where FindStations, Dashboard, etc. will load */}
      <div className="user-content">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;