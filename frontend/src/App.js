// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login/login'; // Update the import paths
import Create from './create/create'; // Update the import paths

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;




