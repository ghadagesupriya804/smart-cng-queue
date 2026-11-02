import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import "./Styles/BookingDetails.css";

const BookingDetails = () => {
  const location = useLocation();

  // Get the booking data passed from previous pages
  const booking = location.state?.booking || {
    id: "BKG-0000",
    station: "Demo Station",
    address: "Demo Address",
    date: "Today",
    time: "10:00 AM",
    vehicle: "MH 00 XX 0000",
    fuelType: "Full Tank",
    amount: "₹ 0",
    status: "Active",
    token: "TKN-00",
    bookedOn: "Today",
    operator: "Station Operator",
    phone: "+91 00000 00000"
  };

  // Timeline steps
  const timeline = [
    { title: "Booking Confirmed", time: "Just now", status: "completed" },
    { title: "Queue Started", time: "Pending", status: "pending" },
    { title: "Your Turn", time: "Est. " + booking.time, status: "pending" },
    { title: "Fuel Dispensed", time: "Pending", status: "pending" },
  ];

  return (
    <div className="booking-details-page">
      
      {/* Header & Back Button */}
      <div className="page-header">
        <div>
          <Link to="/my-bookings" className="back-link">
            ← Back to My Bookings
          </Link>
          <h1>Booking Details</h1>
          <p>View your digital receipt and queue status.</p>
        </div>
        <div className="header-actions">
          <button className="btn-outline" onClick={() => window.print()}>🖨️ Print Receipt</button>
        </div>
      </div>

      <div className="details-layout">
        
        {/* LEFT SIDE: DIGITAL TICKET */}
        <div className="ticket-container">
          <div className="digital-ticket">
            
            {/* Ticket Top (Branding & Token) */}
            <div className="ticket-top">
              <div className="ticket-logo">
                <span className="logo-icon">⛽</span>
                <span>Smart CNG</span>
              </div>
              <div className="ticket-status">
                <span className={`status-badge ${booking.status.toLowerCase()}`}>
                  {booking.status}
                </span>
              </div>
            </div>

            {/* Ticket Middle (Token Number) */}
            <div className="ticket-token-section">
              <span className="token-label">Your Token Number</span>
              <h1 className="token-number">{booking.token}</h1>
              <p>Show this at the station</p>
            </div>

            {/* Ticket Cutout Line */}
            <div className="ticket-divider">
              <div className="cutout left"></div>
              <div className="dashed-line"></div>
              <div className="cutout right"></div>
            </div>

            {/* Ticket Bottom (Booking Info) */}
            <div className="ticket-info-grid">
              <div className="info-item">
                <span className="label">Station</span>
                <span className="value">{booking.station}</span>
                <span className="sub-value">{booking.address}</span>
              </div>
              
              <div className="info-row">
                <div className="info-item">
                  <span className="label">Date</span>
                  <span className="value">{booking.date}</span>
                </div>
                <div className="info-item">
                  <span className="label">Time Slot</span>
                  <span className="value highlight">{booking.time}</span>
                </div>
              </div>

              <div className="info-row">
                <div className="info-item">
                  <span className="label">Vehicle</span>
                  <span className="value">{booking.vehicle}</span>
                </div>
                <div className="info-item">
                  <span className="label">Fuel Amount</span>
                  <span className="value">{booking.fuelType}</span>
                </div>
              </div>
            </div>

            {/* Ticket Footer */}
            <div className="ticket-footer">
              <div className="barcode">
                <div className="barcode-line"></div>
                <div className="barcode-line"></div>
                <div className="barcode-line"></div>
                <div className="barcode-line"></div>
                <div className="barcode-line"></div>
                <div className="barcode-line"></div>
                <div className="barcode-line"></div>
                <div className="barcode-line"></div>
              </div>
              <span className="booking-id">ID: {booking.id}</span>
            </div>

          </div>

          {/* Action Buttons below ticket */}
          <div className="ticket-actions">
            <Link to="/live-queue" className="btn-primary">
              📍 Track Live Queue
            </Link>
            <button className="btn-outline-danger">
              Cancel Booking
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: STATUS TIMELINE & DETAILS */}
        <div className="details-sidebar">
          
          {/* Timeline Card */}
          <div className="sidebar-card">
            <h3>Queue Status</h3>
            <div className="timeline">
              {timeline.map((step, index) => (
                <div className="timeline-item" key={index}>
                  <div className={`timeline-dot ${step.status}`}></div>
                  {index !== timeline.length - 1 && <div className={`timeline-line ${step.status}`}></div>}
                  <div className="timeline-content">
                    <h4>{step.title}</h4>
                    <p>{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary Card */}
          <div className="sidebar-card">
            <h3>Payment Summary</h3>
            <div className="payment-row">
              <span>Fuel Amount ({booking.fuelType})</span>
              <span>{booking.amount}</span>
            </div>
            <div className="payment-row">
              <span>Convenience Fee</span>
              <span>₹ 0.00</span>
            </div>
            <div className="payment-row">
              <span>GST (Included)</span>
              <span>₹ 0.00</span>
            </div>
            <div className="payment-divider"></div>
            <div className="payment-row total">
              <span>Total Paid</span>
              <span>{booking.amount}</span>
            </div>
          </div>

          {/* Support Card */}
          <div className="sidebar-card support-card">
            <div className="support-icon">🎧</div>
            <div>
              <h4>Need Help?</h4>
              <p>Contact station operator {booking.operator}</p>
              <a href={`tel:${booking.phone}`} className="support-phone">
                {booking.phone}
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingDetails;