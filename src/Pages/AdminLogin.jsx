import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Login.css"; // Reusing the same CSS for identical design

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    captcha: "",
  });

  const [generatedCaptcha] = useState(() => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from({ length: 6 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.captcha.trim()) newErrors.captcha = "Please enter the captcha";
    else if (formData.captcha.toUpperCase() !== generatedCaptcha)
      newErrors.captcha = "Captcha does not match";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    // --- ADMIN LOGIN SUCCESS DEMO ---
    alert("Admin Login Successful! Redirecting to Dashboard...");
    
    // (In a real app, you would make an API call here and verify the token)
    navigate("/admin"); // Redirects directly to the admin dashboard after login
  };

  return (
    <div className="login-container">

      {/* LEFT SIDE - CNG BACKGROUND AND BRANDING */}
      <div className="login-left">
        <div className="overlay">
          <div className="brand">
            <div className="brand-logo">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="20" width="55" height="70" rx="8" fill="#E63946" />
                <rect x="25" y="35" width="35" height="20" rx="3" fill="#FFFFFF" />
                <path d="M42 72 C42 60, 52 50, 65 55 C65 68, 52 78, 42 72 Z" fill="#00A896" />
                <path d="M70 35 L80 35 L80 60 C80 70 75 80 65 80" stroke="#E0E1DD" strokeWidth="6" strokeLinecap="round" fill="none" />
                <rect x="75" y="25" width="10" height="15" rx="2" fill="#E0E1DD" />
              </svg>
            </div>
            <div className="brand-text">
              <h1>Smart CNG</h1>
              <p>Queue Availability Tracker</p>
            </div>
          </div>

          {/* Tagline - Text modified for Admin */}
          <div className="tagline">
            <h2>Manage the Network.</h2>
            <h2>Keep it Moving.</h2>
            <p>
              Authorized access only. Log in to manage stations, monitor queues, and oversee operations.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="login-right">
        <div className="login-form-wrapper">
          
          {/* Form Header - Text modified for Admin */}
          <div className="form-header">
            <h2 style={{ color: "#e63946" }}>Admin Portal</h2>
            <p>Secure login for Smart CNG administrators</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="email">Admin Email</label>
              <div className="input-wrapper">
                <span className="input-icon">✉</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="admin@smartcng.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter admin password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "error" : ""}
                  autoComplete="current-password"
                />
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            {/* CAPTCHA */}
            <div className="form-group">
              <label htmlFor="captcha">Captcha Verification</label>
              <div className="captcha-row">
                <input
                  type="text"
                  id="captcha"
                  name="captcha"
                  placeholder="Enter captcha"
                  value={formData.captcha}
                  onChange={handleChange}
                  className={errors.captcha ? "error" : ""}
                  autoComplete="off"
                />
                <div className="captcha-box" title="Captcha">
                  {generatedCaptcha.split("").map((ch, i) => (
                    <span key={i} style={{ transform: `rotate(${(i % 3 - 1) * 8}deg)` }}>
                      {ch}
                    </span>
                  ))}
                </div>
              </div>
              {errors.captcha && <span className="error-text">{errors.captcha}</span>}
            </div>

            {/* FORGOT PASSWORD */}
            <div className="forgot-row">
              <Link to="/forgot-password">Forgot admin password?</Link>
            </div>

            {/* SIGN IN BUTTON */}
            <button 
              type="submit" 
              className="btn-signin" 
              style={{ background: "linear-gradient(135deg, #e63946 0%, #b32d37 100%)" }} // Red button for Admin theme
            >
              Login as Admin
            </button>

            <p className="signup-text">
              Not an admin? <Link to="/login" style={{ color: "#00a896" }}>Go to User Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;