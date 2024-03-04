import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login/login";
import Create from "./create/create";
import Home from "./components/home/Home";
import Inventory from "./inventory/Inventory";
import BasePortal from "./base_portal/base_portal";
import Areas from "./area_page/Areas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Create />} />
        <Route path="/base-portal" element={<BasePortal />} />
        <Route path="/areas" element={<Areas />} />
      </Routes>
    </Router>
  );
}

export default App;
