import { Link } from "react-router-dom";
import React, { useState } from "react";
import "../Styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error when typing
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email";

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulate API call
    console.log("Contact Form Submitted:", formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="contact-page">
      
      {/* --- HERO SECTION --- */}
      <section className="contact-hero">
        <h1>Get in Touch</h1>
        <p>Have a question, feedback, or need help? We'd love to hear from you.</p>
      </section>

      {/* --- MAIN CONTENT (Split Layout) --- */}
      <section className="contact-container">
        
        {/* LEFT SIDE - INFO */}
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p>Fill up the form and our team will get back to you within 24 hours.</p>
          
          <div className="info-item">
            <div className="info-icon">📞</div>
            <div>
              <h4>Phone</h4>
              <p>+91 98765 43210</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">✉️</div>
            <div>
              <h4>Email</h4>
              <p>support@smartcng.com</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">📍</div>
            <div>
              <h4>Location</h4>
              <p>Tech Hub, Mumbai, India</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="contact-form-wrapper">
          {isSubmitted ? (
            <div className="success-message">
              <div className="success-icon">✅</div>
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. We will get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "error" : ""}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? "error" : ""}
                />
                {errors.subject && <span className="error-text">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? "error" : ""}
                ></textarea>
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>

              <button type="submit" className="contact-btn">
                Send Message
              </button>
            </form>
          )}
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

export default Contact;