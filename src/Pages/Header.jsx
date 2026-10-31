
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Styles/Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLoginMenu(false);
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

            {/* --- NEW ATTRACTIVE LOGIN DROPDOWN --- */}
            <li className="login-dropdown-container" ref={dropdownRef}>
              <button
                className={`login-btn ${showLoginMenu ? "active" : ""}`}
                onClick={() => setShowLoginMenu(!showLoginMenu)}
              >
                <span>Login</span>
                <svg className={`chevron ${showLoginMenu ? "rotate" : ""}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className={`login-dropdown-menu ${showLoginMenu ? "show" : ""}`}>
                <Link
                  to="/login"
                  className="dropdown-card"
                  onClick={() => { setIsMenuOpen(false); setShowLoginMenu(false); }}
                >
                  <div className="icon-wrapper user-icon">👤</div>
                  <div className="text-wrapper">
                    <strong>User Login</strong>
                    <span>Access your dashboard</span>
                  </div>
                </Link>


                <Link to="/admin-login" className="dropdown-card">
                  <div className="icon-wrapper admin-icon">🛡️</div>
                  <div className="text-wrapper">
                    <strong>Admin Login</strong>
                    <span>Manage CNG stations</span>
                  </div>
                </Link>
              </div>
            </li>
            {/* --- END LOGIN DROPDOWN --- */}

            <li>
              <Link
                to="/signup"
                className="btn-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;