import React, { useState } from "react";
import "./Styles/HelpSupport.css";

const HelpSupport = () => {
  // State for FAQ Accordion
  const [openFaq, setOpenFaq] = useState(null);

  // ✅ Only 8 questions (to keep the design balanced)
  const faqs = [
    {
      question: "How do I cancel my booking?",
      answer: "You can cancel your booking by going to 'My Bookings' and clicking on the 'Cancel Booking' button. Please note that cancellations made within 1 hour of the slot time may attract a penalty."
    },
    {
      question: "What happens if I miss my queue turn?",
      answer: "If you miss your turn, your token will be skipped. You will need to generate a new token and rejoin the queue at the back."
    },
    {
      question: "How is the wait time calculated?",
      answer: "The wait time is calculated in real-time based on the number of cars currently in the queue and the average fueling time per vehicle at that specific station."
    },
    {
      question: "Can I book a slot for multiple vehicles?",
      answer: "Currently, one booking covers one vehicle. If you have multiple vehicles, you can add them to your profile and book separate slots for each."
    },
    {
      question: "Is online payment available?",
      answer: "No, currently we only facilitate queue booking. You will need to pay for the CNG fuel directly at the station after your turn."
    },
    {
      question: "How accurate is the Live Queue status?",
      answer: "Our live queue status is updated by station operators and verified by user reports. While we strive for 100% accuracy, actual wait times may vary slightly due to unexpected delays."
    },
    {
      question: "What if the station runs out of gas?",
      answer: "If a station runs out of CNG, the status will immediately change to 'Out of Gas' on the app. Your booking will be automatically refunded or rescheduled."
    },
    {
      question: "Can I pre-book a slot for tomorrow?",
      answer: "Yes, you can book a slot up to 24 hours in advance. However, tokens are generated on a first-come, first-serve basis."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Handle Contact Form Submit
  const handleSupportSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent to our support team! We will get back to you within 24 hours.");
    e.target.reset();
  };

  return (
    <div className="help-support-page">
      
      {/* --- HERO SECTION --- */}
      <section className="help-hero">
        <h1>How can we help you today?</h1>
        <p>Search our knowledge base or contact our support team.</p>
        
        <div className="hero-search">
          <span>🔍</span>
          <input type="text" placeholder="Search for articles, issues, or FAQs..." />
        </div>
      </section>

      {/* --- QUICK ACTIONS --- */}
      <section className="quick-actions">
        <div className="action-card">
          <div className="action-icon" style={{ background: '#e3f2fd', color: '#1e88e5' }}>📚</div>
          <h3>Browse FAQs</h3>
          <p>Find answers to common questions quickly.</p>
          <a href="#faqs">View FAQs →</a>
        </div>

        <div className="action-card">
          <div className="action-icon" style={{ background: '#e8f5e9', color: '#00a896' }}>📞</div>
          <h3>Call Us</h3>
          <p>Speak directly with our support team.</p>
          <a href="tel:+911800123456">+91 1800 123 456 →</a>
        </div>

        <div className="action-card">
          <div className="action-icon" style={{ background: '#fff3e0', color: '#f39c12' }}>✉️</div>
          <h3>Email Support</h3>
          <p>Send us an email and we'll reply soon.</p>
          <a href="mailto:support@smartcng.com">support@smartcng.com →</a>
        </div>
      </section>

      <div className="help-layout">
        
        {/* --- LEFT: FAQ SECTION --- */}
        <section className="faq-section" id="faqs">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about Smart CNG.</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                className={`faq-item ${openFaq === index ? "active" : ""}`} 
                key={index}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <h4>{faq.question}</h4>
                  <span className="faq-toggle">{openFaq === index ? "−" : "+"}</span>
                </div>
                {openFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* --- RIGHT: CONTACT FORM --- */}
        <section className="contact-support-section">
          <div className="support-card">
            <h2>Still need help?</h2>
            <p>Fill out the form below and our team will get back to you.</p>

            <form onSubmit={handleSupportSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" required placeholder="John Doe" />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" required placeholder="you@example.com" />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <select required defaultValue="">
                  <option value="" disabled>Select an issue</option>
                  <option value="booking">Booking Issue</option>
                  <option value="payment">Payment Problem</option>
                  <option value="app">App Bug / Error</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea required rows="4" placeholder="Describe your issue in detail..."></textarea>
              </div>

              <button type="submit" className="btn-submit">
                Send Message
              </button>
            </form>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HelpSupport;