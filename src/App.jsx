import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"; 
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import Header from "./Pages/Header"; 

function App() {
  return (
    <>
      <Header /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        {/* Fixed the typo here: Routep -> Route */}
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;