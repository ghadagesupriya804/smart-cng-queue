import React from "react";
import { Link } from "react-router-dom";
import "../Styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      {/* --- NAVBAR --- */}
      {/* <nav className="about-navbar">
        <Link to="/" className="nav-brand">
          <div className="nav-logo">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <rect x="15" y="20" width="55" height="70" rx="8" fill="#E63946" />
              <rect x="25" y="35" width="35" height="20" rx="3" fill="#FFFFFF" />
              <path d="M42 72 C42 60, 52 50, 65 55 C65 68, 52 78, 42 72 Z" fill="#00A896" />
              <path d="M70 35 L80 35 L80 60 C80 70 75 80 65 80" stroke="#E0E1DD" strokeWidth="6" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          <span>Smart CNG</span>
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about" className="active">About Us</Link>
          <Link to="/login" className="nav-btn">Login</Link>
        </div>
      </nav> */}

      {/* --- HERO SECTION --- */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>Revolutionizing CNG Fueling</h1>
          <p>
            We are on a mission to eliminate long queues at CNG stations. 
            Smart CNG provides real-time data to help you fuel smarter, save time, and keep moving.
          </p>
        </div>
      </section>

      {/* --- MISSION / IMAGE SECTION --- */}
      <section className="about-mission">
        <div className="mission-image">
          {/* You can replace this URL with your own image later */}
          <img 
            src="https://images.unsplash.com/photo-1615671524827-c1fe3973b648?auto=format&fit=crop&w=800&q=80" 
            alt="CNG Station" 
          />
        </div>
        <div className="mission-text">
          <h2>Our Mission</h2>
          <p>
            Founded in 2026, Smart CNG was born out of frustration. We realized that drivers were wasting hours waiting in unpredictable queues. 
          </p>
          <p>
            We built a platform that connects drivers with live station data. Our goal is simple: <strong>No more guessing. No more waiting.</strong>
          </p>
          <ul className="mission-list">
            <li>✔ Real-time queue tracking</li>
            <li>✔ Verified station availability</li>
            <li>✔ Smart route planning</li>
          </ul>
        </div>
      </section>

      {/* --- WHY CHOOSE US (FEATURES GRID) --- */}
      <section className="about-features">
        <h2>Why Choose Smart CNG?</h2>
        <div className="features-grid">
          
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>Save Time</h3>
            <p>Never wait in a 2-hour queue again. Check live updates before you leave.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>Accurate Data</h3>
            <p>Powered by a community of drivers and live station integrations.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>Eco-Friendly</h3>
            <p>Reduce idling time, save fuel, and lower your carbon footprint.</p>
          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="about-footer">
        <p>© 2026 Smart CNG Queue Tracker. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/contact">Contact Us</Link>
          <Link to="/signup">Create Account</Link>
        </div>
      </footer>
    </div>
  );
};

export default About;