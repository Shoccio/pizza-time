import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import OrderHistory from "./components/order-history";
import Dashboard from "./components/dashboard";
import OrderLog from "./components/order-log";
import "./App.css";

function Navbar() {
  const location = useLocation(); // Get the current route

  // Map paths to titles
  const pageTitles = {
    "/dashboard": "Dashboard",
    "/order-log": "Order Log",
    "/order-history": "Order History",
  };

  return (
    <div className="header-container">
      <nav className="navbar">
        <div className="navlogo">
          <h1>{pageTitles[location.pathname]}</h1>
          <img src="/pizza-icon.png" alt="Pizza Icon" className="App-logo" />
        </div>
        <div className="nav-links">
          <Link to="/dashboard" className={`nav-btn ${location.pathname === "/dashboard" ? "active" : ""}`}>Dashboard</Link>
          <Link to="/order-log" className={`nav-btn ${location.pathname === "/order-log" ? "active" : ""}`}>Order Log</Link>
          <Link to="/order-history" className={`nav-btn ${location.pathname === "/order-history" ? "active" : ""}`}>Order History</Link>
        </div>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar /> 

        <Routes>
          <Route path="/" element={<Navigate to="/order-history" />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order-log" element={<OrderLog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
