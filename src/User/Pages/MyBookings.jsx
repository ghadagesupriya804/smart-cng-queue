import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Clock, MapPin, Fuel, 
  XCircle, CheckCircle2, History, Navigation, AlertCircle 
} from 'lucide-react';
import './Styles/MyBookings.css';

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  // --- MOCK DATA ---
  const [bookings, setBookings] = useState([
    {
      id: "BK-8921",
      stationName: "City Gas Station",
      stationId: 2,
      address: "Koramangala, Bangalore",
      date: "02 Nov 2026",
      time: "10:30 AM",
      fuelType: "CNG",
      amount: "₹ 450",
      status: "upcoming" // upcoming, completed, cancelled
    },
    {
      id: "BK-8922",
      stationName: "Highway CNG Fuels",
      stationId: 4,
      address: "Hebbal, Bangalore",
      date: "05 Nov 2026",
      time: "02:00 PM",
      fuelType: "CNG",
      amount: "₹ 600",
      status: "upcoming"
    },
    {
      id: "BK-8110",
      stationName: "Green Fuel CNG Station",
      stationId: 1,
      address: "MG Road, Bangalore",
      date: "28 Oct 2026",
      time: "09:00 AM",
      fuelType: "CNG",
      amount: "₹ 500",
      status: "completed"
    },
    {
      id: "BK-7500",
      stationName: "Metro CNG Pump",
      stationId: 3,
      address: "Indiranagar, Bangalore",
      date: "15 Oct 2026",
      time: "04:30 PM",
      fuelType: "CNG",
      amount: "₹ 300",
      status: "cancelled"
    }
  ]);

  // --- FUNCTIONALITY: Cancel Booking ---
  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setBookings(prev => 
        prev.map(b => b.id === id ? { ...b, status: "cancelled" } : b)
      );
      // Switch to cancelled tab so the user sees the result
      setActiveTab('cancelled'); 
    }
  };

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter(b => b.status === activeTab);

  // Helper for Status Badges
  const getStatusBadge = (status) => {
    switch(status) {
      case 'upcoming': 
        return <span className="status-badge status-upcoming"><Clock size={14}/> Upcoming</span>;
      case 'completed': 
        return <span className="status-badge status-completed"><CheckCircle2 size={14}/> Completed</span>;
      case 'cancelled': 
        return <span className="status-badge status-cancelled"><XCircle size={14}/> Cancelled</span>;
      default: return null;
    }
  };

  return (
    <div className="my-bookings-page">
      <main className="my-bookings-container">
        
        <div className="bookings-header">
          <div>
            <h1 className="page-title">My Bookings</h1>
            <p className="page-subtitle">Manage your upcoming slots and view history.</p>
          </div>
          <Link to="/book-slot" className="btn-primary-green">
            <Calendar size={18} />
            Book New Slot
          </Link>
        </div>

        {/* Tabs */}
        <div className="bookings-tabs">
          <button 
            className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming ({bookings.filter(b => b.status === 'upcoming').length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            History
          </button>
          <button 
            className={`tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`}
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled
          </button>
        </div>

        {/* Bookings List */}
        <div className="bookings-list">
          {filteredBookings.length === 0 ? (
            <div className="empty-state">
              <History size={48} color="#cbd5e1" />
              <h3>No {activeTab} bookings found</h3>
              <p>When you book a slot, it will appear here.</p>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                
                {/* Left Side: Details */}
                <div className="booking-details">
                  <div className="booking-top">
                    <h3>{booking.stationName}</h3>
                    {getStatusBadge(booking.status)}
                  </div>
                  
                  <div className="booking-info-grid">
                    <div className="info-item">
                      <MapPin size={16} color="#64748b" />
                      <span>{booking.address}</span>
                    </div>
                    <div className="info-item">
                      <Calendar size={16} color="#64748b" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="info-item">
                      <Clock size={16} color="#64748b" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="info-item">
                      <Fuel size={16} color="#64748b" />
                      <span>{booking.fuelType} • {booking.amount}</span>
                    </div>
                  </div>
                  <p className="booking-id">Booking ID: <strong>{booking.id}</strong></p>
                </div>

                {/* Right Side: Actions */}
                <div className="booking-actions">
                  {booking.status === 'upcoming' && (
                    <>
                      <Link to={`/station-details/${booking.stationId}`} className="btn-secondary">
                        <Navigation size={16} /> Navigate
                      </Link>
                      <button 
                        className="btn-danger-outline" 
                        onClick={() => handleCancel(booking.id)}
                      >
                        Cancel Booking
                      </button>
                      <p className="cancel-note"><AlertCircle size={12}/> Free cancellation up to 1 hr before</p>
                    </>
                  )}
                  {booking.status === 'completed' && (
                    <button className="btn-secondary">Download Receipt</button>
                  )}
                  {booking.status === 'cancelled' && (
                    <p className="text-muted">Refund processed to original payment method.</p>
                  )}
                </div>

              </div>
            ))
          )}
        </div>

      </main>
    </div>
  );
};

export default MyBookings;