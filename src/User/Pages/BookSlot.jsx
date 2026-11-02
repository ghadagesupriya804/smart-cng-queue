import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/BookSlot.css";

const BookSlot = () => {
  const navigate = useNavigate();

  // State for the form
  const [bookingData, setBookingData] = useState({
    station: "HP CNG Station - Andheri",
    vehicle: "MH 02 AB 1234",
    date: new Date().toISOString().split("T")[0], // Default today
    time: "10:00 AM",
    fuelType: "Full Tank",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dummy Stations for dropdown
  const stations = [
    "HP CNG Station - Andheri",
    "IOCL CNG Pump - Bandra",
    "Bharat Gas - Thane",
    "Mahanagar Gas - Powai",
  ];

  // Dummy Vehicles for dropdown
  const vehicles = ["MH 02 AB 1234", "MH 04 CD 5678", "Add New Vehicle +"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Generate new token and booking ID
      const generatedToken = `TKN-${Math.floor(10 + Math.random() * 90)}`;
      const newBookingId = `BKG-${Math.floor(1000 + Math.random() * 9000)}`;
      
      // Create final booking object to send to the next page
      const finalBookingData = {
        ...bookingData,
        token: generatedToken,
        id: newBookingId,
        amount: bookingData.fuelType === "Full Tank" ? "₹ 500" : bookingData.fuelType,
        status: "Active"
      };

      alert("Slot Booked Successfully! Token Generated.");
      
      // Navigate to confirmation page and pass the data
      navigate("/booking-confirmation", { state: { booking: finalBookingData } });
      
    }, 1500);
  };

  return (
    <div className="book-slot-page">
      
      {/* Page Header */}
      <div className="page-header">
        <h1>Book Your Queue Slot</h1>
        <p>Skip the physical wait. Reserve your spot online.</p>
      </div>

      <div className="booking-layout">
        
        {/* LEFT SIDE: FORM STEPS */}
        <div className="booking-form-container">
          <form onSubmit={handleSubmit}>
            
            {/* STEP 1: Select Station & Vehicle */}
            <div className="booking-step">
              <div className="step-header">
                <span className="step-number">1</span>
                <h2>Select Station & Vehicle</h2>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Select CNG Station</label>
                  <select name="station" value={bookingData.station} onChange={handleChange}>
                    {stations.map((st, i) => (
                      <option key={i} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Select Vehicle</label>
                  <select name="vehicle" value={bookingData.vehicle} onChange={handleChange}>
                    {vehicles.map((v, i) => (
                      <option key={i} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* STEP 2: Date & Time */}
            <div className="booking-step">
              <div className="step-header">
                <span className="step-number">2</span>
                <h2>Choose Date & Time</h2>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input 
                    type="date" 
                    name="date" 
                    value={bookingData.date} 
                    onChange={handleChange} 
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="form-group">
                  <label>Preferred Time Slot</label>
                  <div className="time-slots">
                    {["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM"].map((time) => (
                      <label key={time} className={`time-chip ${bookingData.time === time ? "active" : ""}`}>
                        <input 
                          type="radio" 
                          name="time" 
                          value={time} 
                          checked={bookingData.time === time}
                          onChange={handleChange}
                        />
                        {time}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3: Fuel Amount */}
            <div className="booking-step">
              <div className="step-header">
                <span className="step-number">3</span>
                <h2>Fuel Requirement</h2>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Select Amount</label>
                  <div className="fuel-options">
                    {["Full Tank", "₹ 500", "₹ 1000", "₹ 1500"].map((amount) => (
                      <label key={amount} className={`fuel-chip ${bookingData.fuelType === amount ? "active" : ""}`}>
                        <input 
                          type="radio" 
                          name="fuelType" 
                          value={amount} 
                          checked={bookingData.fuelType === amount}
                          onChange={handleChange}
                        />
                        {amount}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn-confirm-booking" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE: SUMMARY CARD */}
        <div className="booking-summary-card">
          <h3>Booking Summary</h3>
          
          <div className="summary-item">
            <span className="label">Station</span>
            <span className="value">{bookingData.station}</span>
          </div>
          
          <div className="summary-item">
            <span className="label">Date</span>
            <span className="value">{bookingData.date}</span>
          </div>

          <div className="summary-item">
            <span className="label">Time</span>
            <span className="value highlight">{bookingData.time}</span>
          </div>

          <div className="summary-item">
            <span className="label">Vehicle</span>
            <span className="value">{bookingData.vehicle}</span>
          </div>

          <div className="summary-item">
            <span className="label">Fuel Type</span>
            <span className="value">{bookingData.fuelType}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="info-box">
            <span className="info-icon">ℹ️</span>
            <p>Please arrive 10 minutes before your slot. Your token will be generated instantly.</p>
          </div>

          <div className="badge-secure">
            🛡️ 100% Secure Booking
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookSlot;