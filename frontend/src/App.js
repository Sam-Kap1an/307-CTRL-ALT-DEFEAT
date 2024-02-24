
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login/login'; 
import Create from './create/create'; 
import Home from "./components/home/Home";
import Inventory from "./inventory/Inventory"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Create />} />
      </Routes>
    </Router>
  )
}


export default App;



