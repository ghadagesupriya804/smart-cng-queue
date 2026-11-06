import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../Styles/AdminHeader.css"; // Adjust path if needed

const AdminHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    alert("Admin Logged out successfully!");
    navigate("/admin-login");
  };

  return (
    <header className="admin-header">
      <div className="header-container">
        
        {/* Logo */}
        <Link to="/admin/dashboard" className="logo" onClick={closeMenu}>
          <span className="logo-icon">⛽</span>
          <span className="logo-text">
            Smart CNG <span className="admin-badge">ADMIN</span>
          </span>
        </Link>

        {/* Mobile Hamburger */}
        <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={isMenuOpen ? "open" : ""}></span>
          <span className={isMenuOpen ? "open" : ""}></span>
          <span className={isMenuOpen ? "open" : ""}></span>
        </button>

        {/* Main Navigation */}
        <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
          <ul className="nav-list">
            
            {/* 1. Dashboard */}
            <li>
              <NavLink to="/admin/dashboard" onClick={closeMenu} className="nav-item">
                Dashboard
              </NavLink>
            </li>

            {/* 2, 3, 4, 10. Stations Group */}
            <li className="dropdown">
              <button 
                className={`nav-link-btn ${activeDropdown === "stations" ? "active" : ""}`}
                onClick={() => toggleDropdown("stations")}
              >
                Stations ▾
              </button>
              {activeDropdown === "stations" && (
                <div className="dropdown-menu">
                  <Link to="/admin/stations" onClick={closeMenu}>Manage Stations</Link>
                  <Link to="/admin/add-station" onClick={closeMenu}>Add Station</Link>
                  <Link to="/admin/edit-station" onClick={closeMenu}>Edit Station Details</Link>
                  <Link to="/admin/operators" onClick={closeMenu}>Station Operators</Link>
                </div>
              )}
            </li>

            {/* 5, 6, 7. Users & Bookings Group */}
            <li className="dropdown">
              <button 
                className={`nav-link-btn ${activeDropdown === "users" ? "active" : ""}`}
                onClick={() => toggleDropdown("users")}
              >
                Users & Bookings ▾
              </button>
              {activeDropdown === "users" && (
                <div className="dropdown-menu">
                  <Link to="/admin/users" onClick={closeMenu}>Manage Users</Link>
                  <Link to="/admin/user-details" onClick={closeMenu}>User Details</Link>
                  <Link to="/admin/bookings" onClick={closeMenu}>Manage Bookings</Link>
                </div>
              )}
            </li>

            {/* 8, 9, 11. Operations Group */}
            <li className="dropdown">
              <button 
                className={`nav-link-btn ${activeDropdown === "operations" ? "active" : ""}`}
                onClick={() => toggleDropdown("operations")}
              >
                Operations ▾
              </button>
              {activeDropdown === "operations" && (
                <div className="dropdown-menu">
                  <Link to="/admin/live-queue" onClick={closeMenu}>Manage Live Queue</Link>
                  <Link to="/admin/fuel" onClick={closeMenu}>Fuel Availability</Link>
                  <Link to="/admin/notifications" onClick={closeMenu}>Notifications Management</Link>
                </div>
              )}
            </li>

            {/* 12, 13. Reports Group */}
            <li className="dropdown">
              <button 
                className={`nav-link-btn ${activeDropdown === "reports" ? "active" : ""}`}
                onClick={() => toggleDropdown("reports")}
              >
                Reports ▾
              </button>
              {activeDropdown === "reports" && (
                <div className="dropdown-menu">
                  <Link to="/admin/reports" onClick={closeMenu}>Generate Reports</Link>
                  <Link to="/admin/analytics" onClick={closeMenu}>Power BI Analytics</Link>
                </div>
              )}
            </li>

          </ul>

          {/* Right Side: Profile & Logout */}
          <ul className="auth-list">
            <li className="dropdown">
              <button 
                className="profile-btn"
                onClick={() => toggleDropdown("profile")}
              >
                👤 <span>Admin ▾</span>
              </button>
              
              {activeDropdown === "profile" && (
                <div className="dropdown-menu right-align">
                  <Link to="/admin/profile" onClick={closeMenu}>Admin Profile</Link>
                  <Link to="/admin/settings" onClick={closeMenu}>Settings</Link>
                  <div className="divider"></div>
                  <button onClick={handleLogout} className="logout-text dropdown-btn">
                    Logout
                  </button>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;