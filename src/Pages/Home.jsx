import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      
      {/* 1. HERO SECTION */}
      <section className="home-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">⚡ Live Queue Updates</span>
          <h1>
            Skip the Wait.<br />
            <span>Fuel Smarter.</span>
          </h1>
          <p>
            Real-time CNG station queues, live pressure updates, and smarter
            fueling decisions — all in one place.
          </p>
          <div className="hero-buttons">
            <Link to="/find-stations" className="btn-primary">
              Find CNG Stations
            </Link>
            <Link to="/signup" className="btn-outline">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section className="home-features">
        <div className="section-header">
          <h2>Why use Smart CNG?</h2>
          <p>Save time, fuel, and frustration with our live tracking system.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon">📍</div>
            <h3>Live Map</h3>
            <p>See every CNG station near you with real-time queue status.</p>
          </div>
          <div className="feature-card">
            <div className="icon">⏱️</div>
            <h3>Skip the Wait</h3>
            <p>Know the estimated wait time before you drive to the station.</p>
          </div>
          <div className="feature-card">
            <div className="icon">📊</div>
            <h3>Pressure & Price</h3>
            <p>Check gas pressure and current rates before leaving home.</p>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="how-it-works">
        <div className="section-header">
          <h2>How it Works</h2>
          <p>Get in, get fueled, and get moving in three simple steps.</p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <span className="step-num">01</span>
            <h3>Search Nearby</h3>
            <p>Allow location access and instantly view all CNG stations in your area.</p>
          </div>
          <div className="step-card">
            <span className="step-num">02</span>
            <h3>Check Live Status</h3>
            <p>Look at queue lengths, gas pressure, and estimated wait times.</p>
          </div>
          <div className="step-card">
            <span className="step-num">03</span>
            <h3>Fuel Up Fast</h3>
            <p>Drive to the shortest queue and get back on the road without the hassle.</p>
          </div>
        </div>
      </section>

      {/* 4. LIVE PREVIEW SECTION (With Image) */}
      <section className="live-preview">
        <div className="preview-content">
          <div className="preview-text">
            <h2>Real-time Data at your Fingertips</h2>
            <p>
              No more driving around the city guessing which station is open or 
              which one has a 2-hour wait. Our community-driven platform gives you 
              the exact status of every station.
            </p>
            <ul className="preview-list">
              <li><span className="check">✓</span> Accurate Queue Lengths</li>
              <li><span className="check">✓</span> Gas Pressure Indicators</li>
              <li><span className="check">✓</span> Station Operating Hours</li>
            </ul>
            <Link to="/find-stations" className="btn-primary" style={{marginTop: '20px', display: 'inline-block'}}>
              Explore the Map
            </Link>
          </div>
          
          <div className="preview-image-container">
            {/* Make sure you have an image named station-preview.jpg in your assets/Images folder */}
            <img 
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000&auto=format&fit=crop" 
              alt="CNG Station Preview" 
              className="preview-img" 
            />
            {/* Floating Status Card over the image */}
            <div className="floating-status">
              <h4>Gulberg CNG Station</h4>
              <div className="status-row">
                <span className="badge badge-success">Short Queue</span>
                <span className="time">~8 mins</span>
              </div>
            </div>
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

export default Home;