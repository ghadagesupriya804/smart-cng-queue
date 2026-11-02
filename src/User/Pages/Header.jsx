
// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import "./Styles/Header.css";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();

//   // All User Dashboard Menus
//   const navLinks = [
//     { name: "Dashboard", path: "/dashboard", icon: "📊" },
//     { name: "Find CNG Stations", path: "/find-stations", icon: "📍" },
//     { name: "Station Details", path: "/station-details", icon: "⛽" },
//     { name: "Live Queue Status", path: "/live-queue", icon: "🔴" },
//     { name: "Book Queue Slot", path: "/book-slot", icon: "🎟️" },
//     { name: "Booking Confirmation", path: "/booking-confirmation", icon: "✅" },
//     { name: "My Bookings", path: "/my-bookings", icon: "📋" },
//     { name: "Booking Details", path: "/booking-details", icon: "📄" },
//     { name: "My Vehicles", path: "/my-vehicles", icon: "🚗" },
//     { name: "My Profile", path: "/my-profile", icon: "👤" },
//     { name: "Notifications", path: "/notifications", icon: "🔔" },
//     { name: "Settings", path: "/settings", icon: "⚙️" },
//     { name: "Help & Support", path: "/help-support", icon: "❓" },
//   ];

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <header className="header user-header">

//       <div className="header-container">

//         {/* Logo */}
//         <Link to="/dashboard" className="logo">
//           <span className="logo-icon">⛽</span>
//           <span className="logo-text">Smart CNG</span>
//         </Link>

//         {/* Mobile Hamburger */}
//         <button
//           className="hamburger"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           aria-label="Toggle menu"
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </button>

//         {/* User Dashboard Navigation */}
//         <nav className={`nav user-nav ${isMenuOpen ? "active" : ""}`}>

//           <ul className="nav-list user-nav-list">

//             {navLinks.map((link) => (
//               <li key={link.path}>
//                 <Link
//                   to={link.path}
//                   className={
//                     location.pathname === link.path ? "active" : ""
//                   }
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <span>{link.icon}</span>
//                   {link.name}
//                 </Link>
//               </li>
//             ))}

//             {/* Logout */}
//             <li>
//               <button
//                 className="user-logout-btn"
//                 onClick={handleLogout}
//               >
//                 🚪 Logout
//               </button>
//             </li>

//           </ul>

//         </nav>

//       </div>

//     </header>
//   );
// };

// export default Header;
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Styles/Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="header">
      <div className="header-container">
        
        {/* Logo */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-icon">⛽</span>
          <span className="logo-text">Smart CNG</span>
        </Link>

        {/* Mobile Hamburger */}
        <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={isMenuOpen ? "open" : ""}></span>
          <span className={isMenuOpen ? "open" : ""}></span>
          <span className={isMenuOpen ? "open" : ""}></span>
        </button>

        {/* Main Navigation */}
        <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
          <ul className="nav-list">
            <li>
              <NavLink to="/dashboard" onClick={closeMenu} className="nav-item">Dashboard</NavLink>
            </li>
            
            <li className="dropdown">
              <button 
                className={`nav-link-btn ${activeDropdown === "find" ? "active" : ""}`}
                onClick={() => toggleDropdown("find")}
              >
                Find Stations ▾
              </button>
              {activeDropdown === "find" && (
                <div className="dropdown-menu">
                  <Link to="/find-stations" onClick={closeMenu}>Find CNG Stations</Link>
                  <Link to="/station-details" onClick={closeMenu}>Station Details</Link>
                </div>
              )}
            </li>

            <li>
              <NavLink to="/live-queue" onClick={closeMenu} className="nav-item">Live Queue</NavLink>
            </li>

            <li>
              <NavLink to="/book-slot" onClick={closeMenu} className="nav-item">Book Slot</NavLink>
            </li>
          </ul>

          {/* Right Side: Bookings, Vehicles, Profile */}
          <ul className="auth-list">
            
            <li className="dropdown">
              <button 
                className={`nav-link-btn ${activeDropdown === "bookings" ? "active" : ""}`}
                onClick={() => toggleDropdown("bookings")}
              >
                My Bookings ▾
              </button>
              {activeDropdown === "bookings" && (
                <div className="dropdown-menu right-align">
                  <Link to="/my-bookings" onClick={closeMenu}>My Bookings</Link>
                  <Link to="/booking-details" onClick={closeMenu}>Booking Details</Link>
                  <Link to="/booking-confirmation" onClick={closeMenu}>Booking Confirmation</Link>
                </div>
              )}
            </li>

            <li>
              {/* ✅ Added 'nav-item' class here */}
              <NavLink to="/my-vehicles" onClick={closeMenu} className="nav-item">
                My Vehicles
              </NavLink>
            </li>

            <li className="dropdown">
              <button 
                className="profile-btn"
                onClick={() => toggleDropdown("profile")}
              >
                👤 <span>Profile ▾</span>
              </button>
              
              {activeDropdown === "profile" && (
                <div className="dropdown-menu right-align">
                <Link to="/profile" onClick={closeMenu}>My Profile</Link>
                  <Link to="/notifications" onClick={closeMenu}>Notifications 🔔</Link>
                  <Link to="/settings" onClick={closeMenu}>Settings ⚙️</Link>
                  <Link to="/help" onClick={closeMenu}>Help & Support ❓</Link>
                  <div className="divider"></div>
                  <Link to="/logout" className="logout-text" onClick={closeMenu}>Logout</Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;