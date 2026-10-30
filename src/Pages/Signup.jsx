
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Login.css"; // Reusing the same CSS for the theme!

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        vehicleNumber: "",
        city: "",
        terms: false,
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

        // Full Name
        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";

        // Email
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Enter a valid email";

        // Mobile (10 digits)
        if (!formData.mobile) newErrors.mobile = "Mobile number is required";
        else if (!/^\d{10}$/.test(formData.mobile))
            newErrors.mobile = "Enter a valid 10-digit mobile number";

        // Password
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6)
            newErrors.password = "Password must be at least 6 characters";

        // Confirm Password
        if (!formData.confirmPassword)
            newErrors.confirmPassword = "Please confirm your password";
        else if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";

        // Vehicle Number (Indian format, e.g., MH12AB1234)
        if (!formData.vehicleNumber)
            newErrors.vehicleNumber = "Vehicle number is required";
        else if (!/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/i.test(formData.vehicleNumber))
            newErrors.vehicleNumber = "Format: MH12AB1234";

        // City
        if (!formData.city) newErrors.city = "City / Area is required";

        // Terms
        if (!formData.terms)
            newErrors.terms = "You must accept the terms and conditions";

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        console.log("Signup submitted:", formData);
        alert("Signup successful! (demo)");
    };

    return (
        <div className="login-container">
            {/* LEFT SIDE - IMAGE (SAME AS LOGIN) */}
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

                    <div className="tagline">
                        <h2>Join the Network.</h2>
                        <h2>Save Your Time.</h2>
                        <p>Create an account to track real-time CNG queues and plan your fueling schedule smarter.</p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE - SIGNUP FORM */}
            <div className="login-right">
                <div className="login-form-wrapper" style={{ maxWidth: "460px" }}>
                    <div className="form-header">
                        <h2>Create Account</h2>
                        <p>Sign up to get started</p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>

                        {/* Grid for side-by-side fields */}
                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">👤</span>
                                    <input type="text" name="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} className={errors.fullName ? "error" : ""} />
                                </div>
                                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                            </div>

                            <div className="form-group">
                                <label>Mobile Number</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">📱</span>
                                    <input type="tel" name="mobile" placeholder="9876543210" value={formData.mobile} onChange={handleChange} className={errors.mobile ? "error" : ""} />
                                </div>
                                {errors.mobile && <span className="error-text">{errors.mobile}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-wrapper">
                                <span className="input-icon">✉</span>
                                <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} className={errors.email ? "error" : ""} />
                            </div>
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Password</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">🔒</span>
                                    <input type="password" name="password" placeholder="Create password" value={formData.password} onChange={handleChange} className={errors.password ? "error" : ""} />
                                </div>
                                {errors.password && <span className="error-text">{errors.password}</span>}
                            </div>

                            <div className="form-group">
                                <label>Confirm Password</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">🔒</span>
                                    <input type="password" name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} className={errors.confirmPassword ? "error" : ""} />
                                </div>
                                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Vehicle Number</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">🚗</span>
                                    <input type="text" name="vehicleNumber" placeholder="MH12AB1234" value={formData.vehicleNumber} onChange={handleChange} className={errors.vehicleNumber ? "error" : ""} />
                                </div>
                                {errors.vehicleNumber && <span className="error-text">{errors.vehicleNumber}</span>}
                            </div>

                            <div className="form-group">
                                <label>City / Area</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">📍</span>
                                    <input type="text" name="city" placeholder="e.g. Mumbai" value={formData.city} onChange={handleChange} className={errors.city ? "error" : ""} />
                                </div>
                                {errors.city && <span className="error-text">{errors.city}</span>}
                            </div>
                        </div>

                        {/* Terms Checkbox */}
                     <div className="form-group">
    <label
        className="robot-check"
        style={{
            padding: "10px 14px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
        }}
    >
        {/* Checkbox + custom checkmark (LEFT) */}
        <span style={{ position: "relative", display: "inline-block", width: "18px", height: "18px", flexShrink: 0 }}>
            <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                style={{
                    position: "absolute",
                    opacity: 0,
                    width: "18px",
                    height: "18px",
                    margin: 0,
                    cursor: "pointer",
                    zIndex: 2,
                }}
            />
            <span
                className="checkmark"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "18px",
                    height: "18px",
                    border: "1.5px solid #999",
                    borderRadius: "3px",
                    background: formData.terms ? "#4a90e2" : "#fff",
                    display: "inline-block",
                }}
            ></span>
        </span>

        {/* Text (RIGHT) */}
        <span className="robot-label">
            <strong style={{ fontSize: "13px", fontWeight: "500" }}>
                I agree to the Terms & Conditions
            </strong>
        </span>
    </label>

    {errors.terms && <span className="error-text">{errors.terms}</span>}
</div>

                        <button type="submit" className="btn-signin">
                            Create Account
                        </button>

                        <p className="signup-text">
              Already have an account? <Link to="/Login">Sign In</Link>
            </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;