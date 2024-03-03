import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login/login";
import Create from "./create/create";
import Home from "./components/home/Home";
<<<<<<< HEAD
import Inventory from "./inventory/Inventory";
import Base_portal from "./base_portal/base_portal";
=======
import Inventory from "./inventory/Inventory"
import Base_portal from './base_portal/base_portal';


>>>>>>> main

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Create />} />
<<<<<<< HEAD
        <Route path="/base-portal" element={<Base_portal />} />
=======
        <Route path="/base_portal" element={<Base_portal />} />
>>>>>>> main
      </Routes>
    </Router>
  );
}

export default App;
