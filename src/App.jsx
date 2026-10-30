import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"; // Adjust path if needed
import About from "./Pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import Header from "./Pages/Header"; // Your Header component

function App() {
  return (
    <>
      <Header /> {/* Put your header here so it shows on all pages */}
      
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Add other routes here */}
      </Routes>
    </>
  );
}

export default App;