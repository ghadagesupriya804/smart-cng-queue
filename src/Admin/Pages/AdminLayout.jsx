import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader"; // Your new Admin Header
import "../Styles/AdminLayout.css"; // CSS for Admin Layout (adjust path if needed)

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      {/* 1. The Admin Header will stay here permanently */}
      <AdminHeader />

      {/* 2. The selected page out of the 15 will load here (e.g., Dashboard, Users, Stations) */}
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;