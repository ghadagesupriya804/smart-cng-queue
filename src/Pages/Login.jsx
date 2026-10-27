import React, { useState } from "react";
import "../Styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    captcha: "",
    notRobot: false,
  });

  const [generatedCaptcha] = useState(() => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from({ length: 6 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.captcha)
      newErrors.captcha = "Please enter the captcha";
    else if (formData.captcha.toUpperCase() !== generatedCaptcha)
      newErrors.captcha = "Captcha does not match";

    if (!formData.notRobot)
      newErrors.notRobot = "Please verify you are not a robot";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Login submitted:", formData);
    alert("Login successful! (demo)");
  };

  return (
    <div className="login-container">
      {/* LEFT SIDE - IMAGE */}
      <div className="login-left">
        <div className="overlay">
          <div className="brand">
            <div className="brand-logo">⛽</div>
            <h1>Smart CNG</h1>
            <p>Queue Availability Tracker</p>
          </div>
          <div className="tagline">
            <h2>Skip the Wait.</h2>
            <h2>Fuel Smarter.</h2>
            <p>Real-time CNG station queues, live updates, and smarter fueling decisions — all in one place.</p>
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
            {/* Email */}
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
                />
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* Password */}
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
                />
              </div>
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            {/* Captcha */}
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
                />
                <div className="captcha-box" title="Captcha">
                  {generatedCaptcha.split("").map((ch, i) => (
                    <span
                      key={i}
                      style={{ transform: `rotate(${Math.random() * 20 - 10}deg)` }}
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </div>
              {errors.captcha && (
                <span className="error-text">{errors.captcha}</span>
              )}
            </div>

            {/* Not a Robot */}
            <div className="form-group">
              <label className="robot-check">
                <input
                  type="checkbox"
                  name="notRobot"
                  checked={formData.notRobot}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <span className="robot-label">
                  <strong>I'm not a robot</strong>
                  <small>Protected by reCAPTCHA</small>
                </span>
              </label>
              {errors.notRobot && (
                <span className="error-text">{errors.notRobot}</span>
              )}
            </div>

            {/* Forgot */}
            <div className="forgot-row">
              <a href="#forgot">Forgot password?</a>
            </div>

            {/* Submit */}
            <button type="submit" className="btn-signin">
              Sign In
            </button>

            <p className="signup-text">
              Don't have an account? <a href="#signup">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;