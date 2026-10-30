import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Footer.css"; // <-- Make sure this path is correct

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        
        <div className="footer-section">
          <h3>Smart CNG</h3>
          <p>Skip the wait. Fuel smarter. Real-time CNG queue tracking for a better driving experience.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Account</h4>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Create Account</Link></li>
            <li><Link to="/forgot-password">Reset Password</Link></li>
          </ul>
        </div>

      </div>
      
      <div className="footer-bottom">
        <p>© 2026 Smart CNG Queue Tracker. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;