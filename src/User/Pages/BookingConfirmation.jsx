import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import "./Styles/BookingConfirmation.css";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the booking data passed from BookSlot.jsx
  const bookingData = location.state?.booking || {
    id: "BKG-0000",
    token: "TKN-00",
    station: "Demo Station",
    address: "Demo Address",
    date: "Today",
    time: "10:00 AM",
    vehicle: "MH 00 XX 0000",
    amount: "₹ 0",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="confirmation-page">
      
      <div className="confirmation-card">
        
        {/* SUCCESS ANIMATION HEADER */}
        <div className="success-header">
          <div className="success-icon-wrapper">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="success-ring"></div>
          </div>
          <h1>Booking Confirmed!</h1>
          <p>Your queue slot has been successfully reserved.</p>
        </div>

        {/* DIGITAL TOKEN SECTION */}
        <div className="token-display">
          <span className="token-label">YOUR TOKEN NUMBER</span>
          <h2 className="token-number">{bookingData.token}</h2>
          <p className="token-note">Show this token at the station to enter the queue.</p>
        </div>

        {/* BOOKING SUMMARY DETAILS */}
        <div className="confirmation-details">
          <div className="detail-row">
            <div className="detail-item">
              <span className="label">Station</span>
              <span className="value">{bookingData.station}</span>
            </div>
            <div className="detail-item text-right">
              <span className="label">Booking ID</span>
              <span className="value">{bookingData.id}</span>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-item">
              <span className="label">Date & Time</span>
              <span className="value">{bookingData.date} at {bookingData.time}</span>
            </div>
            <div className="detail-item text-right">
              <span className="label">Vehicle</span>
              <span className="value">{bookingData.vehicle}</span>
            </div>
          </div>

          <div className="detail-row amount-row">
            <div className="detail-item">
              <span className="label">Estimated Amount</span>
              <span className="value highlight">{bookingData.amount}</span>
            </div>
          </div>
        </div>

        {/* IMPORTANT INSTRUCTIONS */}
        <div className="instructions-box">
          <h4>📌 Important Instructions</h4>
          <ul>
            <li>Please arrive at the station 10 minutes before your slot time.</li>
            <li>Keep your vehicle's RC and valid ID proof ready.</li>
            <li>If you miss your turn, you may have to rejoin the queue.</li>
          </ul>
        </div>

        {/* ACTION BUTTONS */}
        <div className="confirmation-actions">
          <Link to="/live-queue" className="btn-primary">
            📍 Track Live Queue
          </Link>
          
          {/* Pass the booking data to the details page */}
          <Link 
            to="/booking-details" 
            state={{ booking: bookingData }} 
            className="btn-secondary"
          >
            🎟️ View Ticket Details
          </Link>
        </div>

        <button className="btn-text" onClick={() => navigate("/dashboard")}>
          Return to Dashboard
        </button>

      </div>
    </div>
  );
};

export default BookingConfirmation;