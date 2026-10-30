import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  // Step 1: Email, Step 2: OTP, Step 3: Reset Password
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // --- VALIDATION LOGIC ---
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address";
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.otp) newErrors.otp = "OTP is required";
    else if (formData.otp.length !== 6) newErrors.otp = "OTP must be 6 digits";
    return newErrors;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.newPassword) newErrors.newPassword = "Password is required";
    else if (formData.newPassword.length < 6)
      newErrors.newPassword = "Password must be at least 6 characters";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.newPassword !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  // --- SUBMIT HANDLER ---
  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === 1) {
      const errs = validateStep1();
      if (Object.keys(errs).length > 0) return setErrors(errs);

      alert(`OTP sent to ${formData.email} (Demo: use 123456)`);
      setStep(2);
    } else if (step === 2) {
      const errs = validateStep2();
      if (Object.keys(errs).length > 0) return setErrors(errs);

      if (formData.otp !== "123456") {
        return setErrors({ otp: "Invalid OTP. (Hint: use 123456)" });
      }
      setStep(3);
    } else if (step === 3) {
      const errs = validateStep3();
      if (Object.keys(errs).length > 0) return setErrors(errs);

      alert("Password reset successfully! Please log in.");
      navigate("/login");
    }
  };

  return (
    <div className="forgot-container">
      
      {/* LEFT SIDE */}
      <div className="forgot-left">
        <div className="overlay">
          <div className="forgot-brand">
            <div className="forgot-brand-logo">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="20" width="55" height="70" rx="8" fill="#E63946" />
                <rect x="25" y="35" width="35" height="20" rx="3" fill="#FFFFFF" />
                <path d="M42 72 C42 60, 52 50, 65 55 C65 68, 52 78, 42 72 Z" fill="#00A896" />
                <path d="M70 35 L80 35 L80 60 C80 70 75 80 65 80" stroke="#E0E1DD" strokeWidth="6" strokeLinecap="round" fill="none" />
                <rect x="75" y="25" width="10" height="15" rx="2" fill="#E0E1DD" />
              </svg>
            </div>
            <div className="forgot-brand-text">
              <h1>Smart CNG</h1>
              <p>Queue Availability Tracker</p>
            </div>
          </div>

          <div className="forgot-tagline">
            <h2>Recover Access.</h2>
            <h2>Get Back on Road.</h2>
            <p>Don't let a forgotten password stop you. Reset it securely and continue tracking CNG queues.</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="forgot-right">
        <div className="forgot-form-wrapper">
          
          <div className="forgot-header">
            <h2>
              {step === 1 && "Forgot Password?"}
              {step === 2 && "Enter OTP"}
              {step === 3 && "Create New Password"}
            </h2>
            <p>
              {step === 1 && "Enter your email to receive a verification code."}
              {step === 2 && `We sent a code to ${formData.email}`}
              {step === 3 && "Your new password must be different from previous."}
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            
            {/* STEP 1: EMAIL */}
            {step === 1 && (
              <div className="forgot-group">
                <label>Email Address</label>
                <div className="forgot-input-wrapper">
                  <span className="forgot-input-icon">✉</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "forgot-error" : ""}
                  />
                </div>
                {errors.email && <span className="forgot-error-text">{errors.email}</span>}
              </div>
            )}

            {/* STEP 2: OTP */}
            {step === 2 && (
              <div className="forgot-group">
                <label>6-Digit OTP</label>
                <div className="forgot-input-wrapper">
                  <span className="forgot-input-icon">🔑</span>
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter 6-digit code"
                    maxLength="6"
                    value={formData.otp}
                    onChange={handleChange}
                    className={errors.otp ? "forgot-error" : ""}
                  />
                </div>
                {errors.otp && <span className="forgot-error-text">{errors.otp}</span>}
              </div>
            )}

            {/* STEP 3: NEW PASSWORD */}
            {step === 3 && (
              <>
                <div className="forgot-group">
                  <label>New Password</label>
                  <div className="forgot-input-wrapper">
                    <span className="forgot-input-icon">🔒</span>
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="Enter new password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className={errors.newPassword ? "forgot-error" : ""}
                    />
                  </div>
                  {errors.newPassword && <span className="forgot-error-text">{errors.newPassword}</span>}
                </div>

                <div className="forgot-group">
                  <label>Confirm New Password</label>
                  <div className="forgot-input-wrapper">
                    <span className="forgot-input-icon">🔒</span>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm new password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? "forgot-error" : ""}
                    />
                  </div>
                  {errors.confirmPassword && <span className="forgot-error-text">{errors.confirmPassword}</span>}
                </div>
              </>
            )}

            <button type="submit" className="forgot-btn">
              {step === 1 && "Send Reset Code"}
              {step === 2 && "Verify OTP"}
              {step === 3 && "Reset Password"}
            </button>

            <p className="forgot-footer">
              Remember your password? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;