
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Styles/Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // All User Dashboard Menus
  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Find CNG Stations", path: "/find-stations", icon: "📍" },
    { name: "Station Details", path: "/station-details", icon: "⛽" },
    { name: "Live Queue Status", path: "/live-queue", icon: "🔴" },
    { name: "Book Queue Slot", path: "/book-slot", icon: "🎟️" },
    { name: "Booking Confirmation", path: "/booking-confirmation", icon: "✅" },
    { name: "My Bookings", path: "/my-bookings", icon: "📋" },
    { name: "Booking Details", path: "/booking-details", icon: "📄" },
    { name: "My Vehicles", path: "/my-vehicles", icon: "🚗" },
    { name: "My Profile", path: "/my-profile", icon: "👤" },
    { name: "Notifications", path: "/notifications", icon: "🔔" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
    { name: "Help & Support", path: "/help-support", icon: "❓" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header user-header">

      <div className="header-container">

        {/* Logo */}
        <Link to="/dashboard" className="logo">
          <span className="logo-icon">⛽</span>
          <span className="logo-text">Smart CNG</span>
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* User Dashboard Navigation */}
        <nav className={`nav user-nav ${isMenuOpen ? "active" : ""}`}>

          <ul className="nav-list user-nav-list">

            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={
                    location.pathname === link.path ? "active" : ""
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{link.icon}</span>
                  {link.name}
                </Link>
              </li>
            ))}

            {/* Logout */}
            <li>
              <button
                className="user-logout-btn"
                onClick={handleLogout}
              >
                🚪 Logout
              </button>
            </li>

          </ul>

        </nav>

      </div>

    </header>
  );
};

export default Header;
