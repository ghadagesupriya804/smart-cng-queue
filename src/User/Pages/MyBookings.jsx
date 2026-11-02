import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Styles/MyBookings.css"; 

const MyBookings = () => {
  // Dummy Data for Bookings
  const [bookings] = useState([
    {
      id: "BKG-8923",
      station: "HP CNG Station - Andheri",
      address: "Western Express Hwy, Mumbai",
      date: "02 Nov 2026",
      time: "10:30 AM",
      vehicle: "MH 02 AB 1234",
      amount: "₹ 450",
      status: "Active", // Active, Completed, Cancelled
      token: "TKN-45",
    },
    {
      id: "BKG-7712",
      station: "IOCL CNG Pump - Bandra",
      address: "SV Road, Bandra West",
      date: "28 Oct 2026",
      time: "02:15 PM",
      vehicle: "MH 02 AB 1234",
      amount: "₹ 300",
      status: "Completed",
      token: "TKN-12",
    },
    {
      id: "BKG-6611",
      station: "Bharat Gas - Thane",
      address: "Ghodbunder Road, Thane",
      date: "15 Oct 2026",
      time: "09:00 AM",
      vehicle: "MH 04 CD 5678",
      amount: "₹ 600",
      status: "Cancelled",
      token: "N/A",
    },
  ]);

  const [activeTab, setActiveTab] = useState("All");

  // Filter Logic
  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "All") return true;
    return b.status === activeTab;
  });

  return (
    <div className="my-bookings-page">
      
      {/* Page Header */}
      <div className="bookings-header">
        <div>
          <h1>My Bookings</h1>
          <p>Manage your CNG queue slots and history.</p>
        </div>
        <Link to="/book-slot" className="btn-new-booking">
          + Book New Slot
        </Link>
      </div>

      {/* Tabs */}
      <div className="booking-tabs">
        {["All", "Active", "Completed", "Cancelled"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="bookings-list">
        {filteredBookings.length === 0 ? (
          <div className="no-bookings">
            <span>📁</span>
            <h3>No {activeTab.toLowerCase()} bookings found</h3>
            <p>Looks like you haven't made any bookings in this category yet.</p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div className="booking-card" key={booking.id}>
              
              {/* Left Side: Ticket Info */}
              <div className="booking-ticket">
                <div className="ticket-header">
                  <span className="ticket-id">{booking.id}</span>
                  <span className={`status-badge ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </div>
                
                <div className="ticket-body">
                  <h3>{booking.station}</h3>
                  <p className="address">📍 {booking.address}</p>
                  
                  <div className="ticket-grid">
                    <div>
                      <span className="label">Date</span>
                      <span className="value">{booking.date}</span>
                    </div>
                    <div>
                      <span className="label">Time</span>
                      <span className="value">{booking.time}</span>
                    </div>
                    <div>
                      <span className="label">Vehicle</span>
                      <span className="value">{booking.vehicle}</span>
                    </div>
                    <div>
                      <span className="label">Token No.</span>
                      <span className="value highlight">{booking.token}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Action Panel */}
              <div className="booking-actions-panel">
                <div className="amount-section">
                  <span className="label">Est. Amount</span>
                  <h2>{booking.amount}</h2>
                </div>

                <div className="action-buttons">
                  {booking.status === "Active" && (
                    <>
                      <Link to="/live-queue" className="btn-primary">
                        View Live Queue
                      </Link>
                      <button className="btn-outline danger">Cancel Booking</button>
                    </>
                  )}
                  {booking.status === "Completed" && (
                    <Link to="/booking-details" className="btn-outline">
                      View Receipt
                    </Link>
                  )}
                  {booking.status === "Cancelled" && (
                    <Link to="/book-slot" className="btn-outline">
                      Book Again
                    </Link>
                  )}
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;