import React, { useState } from "react";
import "./Styles/LiveQueue.css";

const LiveQueue = () => {
  // Dummy data for the selected station
  const [station] = useState({
    name: "HP CNG Station - Andheri",
    address: "Western Express Hwy, Mumbai",
    totalCars: 14,
    estimatedTime: 35, // minutes
    status: "Open",
    maxCapacity: 25,
  });

  const [myToken, setMyToken] = useState(null);
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinQueue = () => {
    setIsJoining(true);
    // Simulate API call
    setTimeout(() => {
      setMyToken({
        tokenNumber: "CNG-402",
        carsAhead: 14,
        estimatedWait: 35,
      });
      setIsJoining(false);
    }, 1500);
  };

  // Calculate progress percentage for the circular/bar view
  const progressPercentage = (station.totalCars / station.maxCapacity) * 100;

  return (
    <div className="live-queue-page">
      
      {/* PAGE HEADER */}
      <div className="queue-header">
        <h1>Live Queue Status</h1>
        <p>Real-time updates directly from the station.</p>
      </div>

      <div className="queue-grid">
        
        {/* LEFT SIDE: STATION INFO & QUEUE VISUALIZER */}
        <div className="queue-main-card">
          <div className="station-title-row">
            <div>
              <h2>{station.name}</h2>
              <p>📍 {station.address}</p>
            </div>
            <span className="status-badge open">● {station.status}</span>
          </div>

          <div className="queue-visualizer">
            <div className="queue-circle-wrapper">
              {/* Circular Progress Bar (using conic-gradient) */}
              <div 
                className="queue-circle" 
                style={{
                  background: `conic-gradient(#00a896 ${progressPercentage}%, #eef2f5 0)`
                }}
              >
                <div className="queue-inner-circle">
                  <h2>{station.totalCars}</h2>
                  <span>Cars in Queue</span>
                </div>
              </div>
            </div>

            <div className="queue-stats-text">
              <div className="stat-item">
                <span className="stat-label">Estimated Wait Time</span>
                <span className="stat-value highlight">~ {station.estimatedTime} mins</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Station Capacity</span>
                <span className="stat-value">{station.maxCapacity} Cars</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Last Updated</span>
                <span className="stat-value text-muted">Just now</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: BOOKING / TOKEN SECTION */}
        <div className="queue-side-card">
          {myToken ? (
            // View when user has joined the queue
            <div className="token-success-view">
              <div className="success-icon">🎟️</div>
              <h2>You're in the Queue!</h2>
              <p>Show this token at the station.</p>

              <div className="digital-token">
                <span className="token-label">Your Token</span>
                <h1 className="token-number">{myToken.tokenNumber}</h1>
                <div className="token-details">
                  <div>
                    <strong>{myToken.carsAhead}</strong>
                    <span>Cars Ahead</span>
                  </div>
                  <div>
                    <strong>{myToken.estimatedWait} min</strong>
                    <span>Est. Wait</span>
                  </div>
                </div>
              </div>

              <button className="btn-cancel-token" onClick={() => setMyToken(null)}>
                Cancel Booking
              </button>
            </div>
          ) : (
            // View to join the queue
            <div className="join-queue-view">
              <h3>Plan your visit</h3>
              <p>Join the virtual queue now to save your spot. You will be notified when your turn is near.</p>

              <div className="join-form">
                <div className="input-group">
                  <label>Vehicle Number</label>
                  <input type="text" placeholder="e.g. MH12AB1234" />
                </div>
                <div className="input-group">
                  <label>Fuel Amount (Optional)</label>
                  <select>
                    <option>Full Tank</option>
                    <option>₹ 500</option>
                    <option>₹ 1000</option>
                  </select>
                </div>
              </div>

              <button 
                className="btn-join-queue" 
                onClick={handleJoinQueue}
                disabled={isJoining}
              >
                {isJoining ? "Joining..." : "Join Queue Now"}
              </button>

              <p className="join-note">
                * You must arrive at the station within 15 minutes of your estimated turn.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default LiveQueue;