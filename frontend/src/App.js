import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login/login.js";
import Create from "./create/create.js";
import Home from "./components/home/Home.js";
import Inventory from "./inventory/Inventory.js"
import Baseportal from './base_portal/base_portal.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Create />} />
        <Route path="/base-portal" element={<BasePortal />} />
      </Routes>
    </Router>
  );
}

export default App;
