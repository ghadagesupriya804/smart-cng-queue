
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// Public Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import AdminLogin from "./Pages/AdminLogin";
import PublicHeader from "./Pages/Header";


// User Pages
import UserHeader from "./User/Pages/Header";
import FindStations from "./User/Pages/FindStations";
import StationDetails from "./User/Pages/StationDetails";
import LiveQueue from "./User/Pages/LiveQueue";
import MyBookings from "./User/Pages/MyBookings";
import BookSlot from "./User/Pages/BookSlot";
import BookingDetails from "./User/Pages/BookingDetails";
import BookingConfirmation from "./User/Pages/BookingConfirmation";
import Profile from "./User/Pages/Profile";
import Settings from "./User/Pages/Settings";
// Public Layout
const PublicLayout = () => (
  <>
    <PublicHeader />
    <Outlet />
  </>
);

// User Layout
const UserLayout = () => (
  <>
    <UserHeader />
    <Outlet />
  </>
);

// Authentication
const RequireUser = () => {
  const token = localStorage.getItem("token");

  return token ? <UserLayout /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* User Routes */}
      <Route element={<RequireUser />}>
        <Route path="/dashboard" element={<div>Welcome to User Dashboard</div>} />
        <Route path="/find-stations" element={<FindStations />} />
        <Route path="/station-details" element={<StationDetails />} />
        <Route path="/live-queue" element={<LiveQueue />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/book-slot" element={<BookSlot />} />
        <Route path="/booking-details" element={<BookingDetails />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/settings" element={<Settings />} />

      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;
