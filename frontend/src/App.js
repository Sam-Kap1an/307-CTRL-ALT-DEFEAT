
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login/login'; 
import Create from './create/create'; 
import Home from "./components/home/Home";
import Base from './base/base';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Create />} />
        <Route path="/base" element={<Base />} />
      </Routes>
    </Router>
  )
}


export default App;



