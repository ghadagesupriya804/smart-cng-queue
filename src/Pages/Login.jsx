import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Login.css";

const Login = () => {
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    if (!formData.captcha.trim()) {
      newErrors.captcha = "Please enter the captcha";
    } else if (
      formData.captcha.toUpperCase() !== generatedCaptcha
    ) {
      newErrors.captcha = "Captcha does not match";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Demo only. Real authentication requires a backend API.
    alert("Login form validated successfully! (Demo)");
  };

  return (
    <div className="login-container">

      {/* LEFT SIDE - CNG BACKGROUND AND BRANDING */}
      <div className="login-left">
        <div className="overlay">

          {/* BRAND LOGO */}
          <div className="brand">
            <div className="brand-logo">
              <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Smart CNG fuel pump logo"
              >
                {/* Fuel Pump Body */}
                <rect
                  x="15"
                  y="20"
                  width="55"
                  height="70"
                  rx="8"
                  fill="#E63946"
                />

                {/* Display Screen */}
                <rect
                  x="25"
                  y="35"
                  width="35"
                  height="20"
                  rx="3"
                  fill="#FFFFFF"
                />

                {/* Eco Leaf */}
                <path
                  d="M42 72 C42 60, 52 50, 65 55 C65 68, 52 78, 42 72 Z"
                  fill="#00A896"
                />

                {/* Fuel Hose */}
                <path
                  d="M70 35 L80 35 L80 60 C80 70 75 80 65 80"
                  stroke="#E0E1DD"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />

                <rect
                  x="75"
                  y="25"
                  width="10"
                  height="15"
                  rx="2"
                  fill="#E0E1DD"
                />
              </svg>
            </div>

            <div className="brand-text">
              <h1>Smart CNG</h1>
              <p>Queue Availability Tracker</p>
            </div>
          </div>

          {/* HERO TAGLINE */}
          <div className="tagline">
            <h2>Skip the Wait.</h2>
            <h2>Fuel Smarter.</h2>

            <p>
              Real-time CNG station queues, live updates,
              and smarter fueling decisions — all in one place.
            </p>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="login-right">
        <div className="login-form-wrapper">

          <div className="form-header">
            <h2>Welcome Back</h2>
            <p>Sign in to check live CNG queue status</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>

            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>

              <div className="input-wrapper">
                <span className="input-icon">✉</span>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                  autoComplete="email"
                />
              </div>

              {errors.email && (
                <span className="error-text">
                  {errors.email}
                </span>
              )}
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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "error" : ""}
                  autoComplete="current-password"
                />
              </div>

              {errors.password && (
                <span className="error-text">
                  {errors.password}
                </span>
              )}
            </div>

            {/* CAPTCHA */}
            <div className="form-group">
              <label htmlFor="captcha">
                Captcha Verification
              </label>

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
                    <span
                      key={i}
                      style={{
                        transform: `rotate(${(i % 3 - 1) * 8}deg)`,
                      }}
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              {errors.captcha && (
                <span className="error-text">
                  {errors.captcha}
                </span>
              )}
            </div>

            {/* FORGOT PASSWORD */}
            <div className="forgot-row">
              {/* ✅ Lowercase path fixed */}
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            {/* SIGN IN */}
            <button type="submit" className="btn-signin">
              Sign In
            </button>

            <p className="signup-text">
              Don't have an account?{" "}
              {/* ✅ Lowercase path fixed */}
              <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>

    </div>
  );
};

export default Login;