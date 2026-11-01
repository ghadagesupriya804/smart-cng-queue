import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Styles/Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Find CNG Stations", path: "/find-stations" },
    { name: "Contact Us", path: "/contact" },
  ];

  const handleLogout = () => {
    // Add your logout logic here
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-icon">⛽</span>
          <span className="logo-text">Smart CNG</span>
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={isMenuOpen ? "open" : ""}></span>
          <span className={isMenuOpen ? "open" : ""}></span>
          <span className={isMenuOpen ? "open" : ""}></span>
        </button>

        {/* Navigation */}
        <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={location.pathname === link.path ? "active" : ""}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="auth-list">
            {/* --- NEW USER PROFILE DROPDOWN --- */}
            <li className="login-dropdown-container" ref={dropdownRef}>
              <button
                className={`login-btn user-btn ${showUserMenu ? "active" : ""}`}
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="avatar">A</div>
                <span>My Account</span>
                <svg className={`chevron ${showUserMenu ? "rotate" : ""}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className={`login-dropdown-menu user-menu ${showUserMenu ? "show" : ""}`}>
                <div className="menu-header">
                  <strong>Aarush</strong>
                  <span>aarush@example.com</span>
                </div>
                <hr />
                <Link to="/dashboard" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                  📊 User Dashboard
                </Link>
                <Link to="/my-bookings" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                  🎟️ My Bookings
                </Link>
                <Link to="/my-vehicles" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                  🚗 My Vehicles
                </Link>
                <Link to="/my-profile" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                  👤 My Profile
                </Link>
                <Link to="/settings" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                  ⚙️ Settings
                </Link>
                <hr />
                <button onClick={handleLogout} className="dropdown-item logout-btn">
                  🚪 Logout
                </button>
              </div>
            </li>
            {/* --- END USER PROFILE DROPDOWN --- */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;