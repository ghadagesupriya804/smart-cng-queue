// Header.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Styles/Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Find CNG Stations", path: "/find-stations" },
    { name: "Contact Us", path: "/contact" },
  ];

  const authLinks = [
    { name: "Login", path: "/login" },
    { name: "Signup", path: "/signup" },
    // { name: "Forgot Password", path: "/forgot-password" },
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
            {authLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`auth-link ${
                    location.pathname === link.path ? "active" : ""
                  } ${link.name === "Signup" ? "btn-primary" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;