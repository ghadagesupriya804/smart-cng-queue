import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../Styles/FindStations.css";

// Fix default marker icon paths broken by webpack/vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom colored icons
const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const orangeIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const userIcon = new L.DivIcon({
  className: "user-location-marker",
  html: `<div class="user-dot"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Mock data — replace with API call
const MOCK_STATIONS = [
  {
    id: 1,
    name: "Green Fuel CNG Station",
    lat: 12.9716,
    lng: 77.5946,
    address: "MG Road, Bangalore",
    phone: "+91 98765 43210",
    openingHours: "6:00 AM – 11:00 PM",
    status: "open",
    hasCNG: true,
    queue: "low",
    lastUpdated: "5 min ago",
    amenities: ["Air", "Washroom"],
  },
  {
    id: 2,
    name: "City Gas Station",
    lat: 12.9352,
    lng: 77.6245,
    address: "Koramangala, Bangalore",
    phone: "+91 98765 11111",
    openingHours: "24 Hours",
    status: "open",
    hasCNG: true,
    queue: "high",
    lastUpdated: "2 min ago",
    amenities: ["Store", "Air", "Washroom", "ATM"],
  },
  {
    id: 3,
    name: "Metro CNG Pump",
    lat: 12.9611,
    lng: 77.6387,
    address: "Indiranagar, Bangalore",
    phone: "+91 98765 22222",
    openingHours: "7:00 AM – 10:00 PM",
    status: "closed",
    hasCNG: true,
    queue: "n/a",
    lastUpdated: "30 min ago",
    amenities: ["Air"],
  },
  {
    id: 4,
    name: "Highway CNG Fuels",
    lat: 13.0,
    lng: 77.58,
    address: "Hebbal, Bangalore",
    phone: "+91 98765 33333",
    openingHours: "5:00 AM – 12:00 AM",
    status: "out_of_gas",
    hasCNG: true,
    queue: "n/a",
    lastUpdated: "10 min ago",
    amenities: ["Store", "Washroom"],
  },
];

// Haversine distance in km
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
}

// Recenter map when location changes
function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

const FindStations = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [stations, setStations] = useState(MOCK_STATIONS);
  const [selectedStation, setSelectedStation] = useState(null);
  const [view, setView] = useState("map"); // 'map' | 'list'
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    openOnly: false,
    cngOnly: true,
    availableOnly: false,
  });
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cng_favs")) || [];
    } catch {
      return [];
    }
  });

  // Get user location
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => setLocationError(err.message),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem("cng_favs", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Filter + sort stations
  const filteredStations = useMemo(() => {
    return stations
      .filter((s) => {
        if (filters.openOnly && s.status !== "open") return false;
        if (filters.cngOnly && !s.hasCNG) return false;
        if (filters.availableOnly && s.status === "out_of_gas") return false;
        if (
          searchQuery &&
          !s.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !s.address.toLowerCase().includes(searchQuery.toLowerCase())
        )
          return false;
        return true;
      })
      .map((s) => ({
        ...s,
        distance: userLocation
          ? parseFloat(getDistanceKm(userLocation.lat, userLocation.lng, s.lat, s.lng))
          : null,
      }))
      .sort((a, b) => {
        if (!userLocation) return 0;
        return a.distance - b.distance;
      });
  }, [stations, filters, searchQuery, userLocation]);

  const handleNavigate = (station) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`;
    window.open(url, "_blank");
  };

  const handleReportStatus = (id) => {
    // Hook to your backend API
    alert(`Thanks! Status report submitted for station #${id}`);
    setStations((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, lastUpdated: "just now" } : s
      )
    );
  };

  const getStatusBadge = (status) => {
    const map = {
      open: { label: "Open", class: "badge-open" },
      closed: { label: "Closed", class: "badge-closed" },
      out_of_gas: { label: "Out of Gas", class: "badge-warning" },
    };
    return map[status] || map.closed;
  };

  const getIcon = (status) => {
    if (status === "open") return greenIcon;
    if (status === "out_of_gas") return orangeIcon;
    return redIcon;
  };

  const mapCenter = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [12.9716, 77.5946];

  return (
    <div className="find-stations-page">
      {/* HEADER / SEARCH */}
      <header className="fs-header">
        <h1>Find CNG Stations</h1>
        <div className="fs-search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name or area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* FILTERS */}
        <div className="fs-filters">
          <label className={filters.openOnly ? "chip active" : "chip"}>
            <input
              type="checkbox"
              checked={filters.openOnly}
              onChange={(e) =>
                setFilters({ ...filters, openOnly: e.target.checked })
              }
            />
            Open Now
          </label>
          <label className={filters.cngOnly ? "chip active" : "chip"}>
            <input
              type="checkbox"
              checked={filters.cngOnly}
              onChange={(e) =>
                setFilters({ ...filters, cngOnly: e.target.checked })
              }
            />
            CNG Only
          </label>
          <label className={filters.availableOnly ? "chip active" : "chip"}>
            <input
              type="checkbox"
              checked={filters.availableOnly}
              onChange={(e) =>
                setFilters({ ...filters, availableOnly: e.target.checked })
              }
            />
            Fuel Available
          </label>
        </div>

        {/* VIEW TOGGLE */}
        <div className="fs-view-toggle">
          <button
            className={view === "map" ? "active" : ""}
            onClick={() => setView("map")}
          >
            🗺 Map
          </button>
          <button
            className={view === "list" ? "active" : ""}
            onClick={() => setView("list")}
          >
            ☰ List
          </button>
        </div>
      </header>

      {locationError && (
        <div className="fs-error">⚠ Location error: {locationError}</div>
      )}

      {/* MAIN CONTENT */}
      <main className="fs-main">
        {/* MAP VIEW */}
        {view === "map" && (
          <div className="fs-map-wrapper">
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {userLocation && (
                <>
                  <RecenterMap center={[userLocation.lat, userLocation.lng]} />
                  <Marker
                    position={[userLocation.lat, userLocation.lng]}
                    icon={userIcon}
                  >
                    <Popup>You are here</Popup>
                  </Marker>
                  <Circle
                    center={[userLocation.lat, userLocation.lng]}
                    radius={500}
                    pathOptions={{ color: "#2196f3", fillOpacity: 0.1 }}
                  />
                </>
              )}
              {filteredStations.map((s) => (
                <Marker
                  key={s.id}
                  position={[s.lat, s.lng]}
                  icon={getIcon(s.status)}
                  eventHandlers={{
                    click: () => setSelectedStation(s),
                  }}
                >
                  <Popup>
                    <strong>{s.name}</strong>
                    <br />
                    {s.address}
                    <br />
                    <span
                      className={`status-pill ${getStatusBadge(s.status).class}`}
                    >
                      {getStatusBadge(s.status).label}
                    </span>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}

        {/* LIST VIEW */}
        {view === "list" && (
          <div className="fs-list">
            {filteredStations.length === 0 && (
              <p className="no-results">No stations match your filters.</p>
            )}
            {filteredStations.map((s) => (
              <StationCard
                key={s.id}
                station={s}
                isFavorite={favorites.includes(s.id)}
                onToggleFav={() => toggleFavorite(s.id)}
                onNavigate={() => handleNavigate(s)}
                onReport={() => handleReportStatus(s.id)}
                onSelect={() => setSelectedStation(s)}
                badge={getStatusBadge(s.status)}
              />
            ))}
          </div>
        )}

        {/* BOTTOM SHEET (map view selected station) */}
        {view === "map" && selectedStation && (
          <div className="fs-bottom-sheet">
            <button
              className="sheet-close"
              onClick={() => setSelectedStation(null)}
            >
              ✕
            </button>
            <StationCard
              station={selectedStation}
              isFavorite={favorites.includes(selectedStation.id)}
              onToggleFav={() => toggleFavorite(selectedStation.id)}
              onNavigate={() => handleNavigate(selectedStation)}
              onReport={() => handleReportStatus(selectedStation.id)}
              compact
              badge={getStatusBadge(selectedStation.status)}
              distance={
                userLocation
                  ? getDistanceKm(
                      userLocation.lat,
                      userLocation.lng,
                      selectedStation.lat,
                      selectedStation.lng
                    )
                  : null
              }
            />
          </div>
        )}
      </main>
    </div>
  );
};

/* ---------- SUB-COMPONENT ---------- */
const StationCard = ({
  station,
  isFavorite,
  onToggleFav,
  onNavigate,
  onReport,
  badge,
  compact,
  distance,
}) => (
  <div className={`station-card ${compact ? "compact" : ""}`}>
    <div className="card-header">
      <div>
        <h3>{station.name}</h3>
        <p className="address">📍 {station.address}</p>
      </div>
      <button
        className={`fav-btn ${isFavorite ? "active" : ""}`}
        onClick={onToggleFav}
        aria-label="Toggle favorite"
      >
        {isFavorite ? "★" : "☆"}
      </button>
    </div>

    <div className="card-badges">
      <span className={`status-pill ${badge.class}`}>{badge.label}</span>
      {station.queue !== "n/a" && (
        <span className={`queue-pill queue-${station.queue}`}>
          Queue: {station.queue}
        </span>
      )}
      {distance != null && (
        <span className="distance-pill">{distance} km away</span>
      )}
    </div>

    <div className="card-details">
      <p>🕒 {station.openingHours}</p>
      <p>📞 <a href={`tel:${station.phone}`}>{station.phone}</a></p>
      <p className="last-updated">🔄 Updated {station.lastUpdated}</p>
    </div>

    <div className="card-amenities">
      {station.amenities?.map((a) => (
        <span key={a} className="amenity-tag">{a}</span>
      ))}
    </div>

    <div className="card-actions">
      <button className="btn-primary" onClick={onNavigate}>
        🧭 Navigate
      </button>
      <button className="btn-secondary" onClick={onReport}>
        ⚠ Report
      </button>
    </div>
  </div>
);

export default FindStations;