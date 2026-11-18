
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// ==================================================
// PUBLIC PAGES
// ==================================================
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import AdminLogin from "./Pages/AdminLogin";
import PublicHeader from "./Pages/Header";

// ==================================================
// USER PAGES
// ==================================================
import UserHeader from "./User/Pages/Header";
import FindStations from "./User/Pages/FindStations";
import StationDetails from "./User/Pages/StationDetails";
import LiveQueue from "./User/Pages/LiveQueue";
import MyBookings from "./User/Pages/MyBookings";
import BookSlot from "./User/Pages/BookSlot";
import BookingDetails from "./User/Pages/BookingDetails";
import BookingConfirmation from "./User/Pages/BookingConfirmation";
import MyVehicles from "./User/Pages/MyVehicles";
import Profile from "./User/Pages/Profile";
import Settings from "./User/Pages/Settings";
import Notifications from "./User/Pages/Notifications";
import HelpSupport from "./User/Pages/HelpSupport";

// ==================================================
// ADMIN PAGES
// ==================================================
import AdminLayout from "./Admin/Pages/AdminLayout";

// ==================================================
// PUBLIC LAYOUT
// ==================================================
const PublicLayout = () => {
  return (
    <>
      <PublicHeader />
      <Outlet />
    </>
  );
};

// ==================================================
// USER LAYOUT
// ==================================================
const UserLayout = () => {
  return (
    <>
      <UserHeader />
      <Outlet />
    </>
  );
};

// ==================================================
// USER AUTHENTICATION
// ==================================================
const RequireUser = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// ==================================================
// ADMIN AUTHENTICATION
// ==================================================
const RequireAdmin = () => {
  const adminToken = localStorage.getItem("adminToken");

  if (!adminToken) {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;
};

// ==================================================
// MAIN APP
// ==================================================
function App() {
  return (
    <Routes>

      {/* ==========================================
          PUBLIC ROUTES
      ========================================== */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* ==========================================
          AUTHENTICATION ROUTES
      ========================================== */}
      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/admin-login" element={<AdminLogin />} />


      {/* ==========================================
          USER MODULE
      ========================================== */}
      <Route element={<RequireUser />}>
        <Route element={<UserLayout />}>

          <Route
            path="/dashboard"
            element={<div>Welcome to User Dashboard</div>}
          />

          <Route path="/find-stations" element={<FindStations />} />

          <Route path="/station-details" element={<StationDetails />} />

          <Route path="/live-queue" element={<LiveQueue />} />

          <Route path="/my-bookings" element={<MyBookings />} />

          <Route path="/book-slot" element={<BookSlot />} />

          <Route path="/booking-details" element={<BookingDetails />} />

          <Route
            path="/booking-confirmation"
            element={<BookingConfirmation />}
          />

          <Route path="/my-vehicles" element={<MyVehicles />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/settings" element={<Settings />} />

          <Route path="/notifications" element={<Notifications />} />

          <Route path="/help-support" element={<HelpSupport />} />

        </Route>
      </Route>


      {/* ==========================================
          ADMIN MODULE - SEPARATE AUTHENTICATION
      ========================================== */}
      <Route element={<RequireAdmin />}>
        <Route path="/admin" element={<AdminLayout />}>

          {/* ADMIN DASHBOARD */}
          <Route
            index
            element={
              <div>
                <h1>Welcome to Smart CNG Admin Dashboard</h1>
                <p>Manage your Smart CNG system here.</p>
              </div>
            }
          />

          {/* ADD MORE ADMIN PAGE ROUTES HERE */}

        </Route>
      </Route>


      {/* ==========================================
          FALLBACK ROUTE
      ========================================== */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default App;
