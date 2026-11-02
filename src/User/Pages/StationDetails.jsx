
import React from "react";
import {
  MapPin,
  Clock,
  Phone,
  Star,
  CheckCircle2,
  XCircle,
  Navigation,
  Share2,
  Heart,
  Fuel,
  Store,
  Bath,
  Coffee,
  ArrowLeft
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./Styles/StationDetails.css";

const StationDetails = () => {
  const navigate = useNavigate();

  const station = {
    id: 1,
    name: "Highway CNG Fuels",
    address: "Hebbal, Outer Ring Road, Bengaluru, Karnataka 560024",
    status: "Out Of Gas",
    rating: 4.2,
    reviews: 128,
    timings: "5:00 AM – 12:00 AM",
    phone: "+91 98765 33333",
    lastUpdated: "10 min ago",
    amenities: [
      "Store",
      "Washroom",
      "Air Pressure",
      "Drinking Water"
    ],
    coordinates: {
      lat: 13.0358,
      lng: 77.5970
    }
  };

  const isAvailable = station.status === "Available";

  const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${station.coordinates.lat},${station.coordinates.lng}`;

  return (
    <div className="station-details-container">

      <main className="details-main-content">

        <button
          className="back-btn"
          onClick={() => navigate("/find-stations")}
        >
          <ArrowLeft className="back-icon" />
          Back to Find Stations
        </button>

        <div className="details-header">

          <div>
            <div className="header-title-row">

              <h1 className="station-name">
                {station.name}
              </h1>

              <span className={`status-badge ${isAvailable ? "available" : "out-of-gas"}`}>
                {isAvailable ? (
                  <CheckCircle2 className="status-icon" />
                ) : (
                  <XCircle className="status-icon" />
                )}
                {station.status}
              </span>

            </div>

            <div className="address-row">
              <MapPin size={18} />
              <p>{station.address}</p>
            </div>

            <div className="rating-row">
              <Star size={16} fill="currentColor" />
              {station.rating}
              <span className="review-count">
                ({station.reviews} reviews)
              </span>
            </div>

          </div>

          <div className="header-actions">

            <button className="icon-btn" aria-label="Add to favourites">
              <Heart size={20} />
            </button>

            <button
              className="icon-btn"
              aria-label="Share station"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: station.name,
                    text: station.address,
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied!");
                }
              }}
            >
              <Share2 size={20} />
            </button>

            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-navigate"
              style={{ textDecoration: "none" }}
            >
              <Navigation size={18} />
              Navigate
            </a>

          </div>
        </div>

        <div className="details-grid">

          <div>

            <div className="info-cards-row">

              <div className="detail-card">
                <div className="card-icon-wrapper green">
                  <Clock size={24} />
                </div>

                <div className="card-content">
                  <h4>Operating Hours</h4>
                  <p>{station.timings}</p>
                </div>
              </div>

              <div className="detail-card">
                <div className="card-icon-wrapper blue">
                  <Phone size={24} />
                </div>

                <div className="card-content">
                  <h4>Contact</h4>
                  <p>{station.phone}</p>
                </div>
              </div>

            </div>

            <div className="section-card">

              <h2 className="section-title">
                <Fuel size={20} color="#059669" />
                Live Fuel Status
              </h2>

              <div className="fuel-status-box">

                <div className="fuel-info">
                  <h5>CNG (Compressed Natural Gas)</h5>
                  <p>Updated: {station.lastUpdated}</p>
                </div>

                <span className={`status-badge ${isAvailable ? "available" : "out-of-gas"}`}>
                  {station.status}
                </span>

              </div>
            </div>

            <div className="section-card">

              <h2 className="section-title">
                Amenities
              </h2>

              <div className="amenities-list">

                {station.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-tag">

                    {amenity === "Store" && <Store size={16} />}
                    {amenity === "Washroom" && <Bath size={16} />}
                    {amenity === "Air Pressure" && <Navigation size={16} />}
                    {amenity === "Drinking Water" && <Coffee size={16} />}

                    {amenity}

                  </div>
                ))}

              </div>
            </div>

          </div>

          <div>

            <div className="map-card">

              <div className="map-placeholder">

                <MapPin size={40} color="#059669" />

                <p style={{ marginTop: "10px", fontWeight: "500" }}>
                  Map View
                </p>

                <p style={{ fontSize: "12px" }}>
                  Lat: {station.coordinates.lat},
                  Lng: {station.coordinates.lng}
                </p>

              </div>

              <div className="map-footer">

                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="map-link"
                >
                  Get Directions on Google Maps
                </a>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default StationDetails;
