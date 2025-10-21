import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import RestaurantDetails from "./pages/signup/RestaurantDetails";
import VerifyEmail from "./pages/signup/VerifyEmail";
import UserDetails from "./pages/signup/UserDetails";
import SignupSuccess from "./pages/signup/SignupSuccess";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<RestaurantDetails />} />
        <Route path="/signup/verify-email" element={<VerifyEmail />} />
        <Route path="/signup/user-details" element={<UserDetails />} />
        <Route path="/signup/success" element={<SignupSuccess />} />
      </Routes>
    </Router>
  );
};

export default App;