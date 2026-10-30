// import React from 'react';
// import Login from './Pages/Login';

// function App() {
//   return <Login />;
// }

// export default App;
// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login"; // Adjust path if needed
import Signup from "./Pages/Signup"; // Adjust path if needed

function App() {
  return (
    <Routes>
      {/* Redirect root URL to login */}
      <Route path="/" element={<Navigate to="/login" />} />
      
      {/* Define your pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;