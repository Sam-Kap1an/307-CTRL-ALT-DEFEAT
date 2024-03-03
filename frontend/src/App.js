import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login/login";
import Create from "./create/create";
import Home from "./components/home/Home";
import Inventory from "./inventory/Inventory";
import Base_portal from "./base_portal/base_portal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Create />} />
        <Route path="/base-portal" element={<Base_portal />} />
      </Routes>
    </Router>
  );
}

export default App;
