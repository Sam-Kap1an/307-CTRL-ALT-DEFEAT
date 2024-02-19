// Create.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './create.css';

function Create() {
  const navigate = useNavigate(); // Use useNavigate to get the navigate function

  const handleLoginClick = () => {
    // Navigate to the login page
    navigate('/login');
  };

  const handleSortifyClick = () => {
    // Navigate to the home page
    navigate('/');
  };

  return (
    <div className="login-container">
      <div id="sortify-text" onClick={handleSortifyClick}>
        <span style={{ color: '#d17ea8' }}>S</span>
        <span style={{ color: '#d17ea8' }}>O</span>
        <span style={{ color: '#d17ea8' }}>R</span>
        <span style={{ color: '#6e3652' }}>T</span>
        <span style={{ color: '#6e3652' }}>I</span>
        <span style={{ color: '#6e3652' }}>F</span>
        <span style={{ color: '#6e3652' }}>Y</span>
      </div>

      {/* Larger tan box */}
      <div className="tan-box">
        <p className="tan-box-content">Sign Up</p>

        {/* Name input */}
        <div className="input-container">
          <input type="text" placeholder="Name" className="login-input" />
        </div>

        {/* Email input */}
        <div className="input-container">
          <input type="text" placeholder="Email" className="login-input" />
        </div>

        {/* Password input */}
        <div className="input-container">
          <input type="password" placeholder="Password" className="login-input" />
        </div>

        {/* Your existing login form goes here */}

        {/* Create button inside tan box */}
        <button className="login-button">Sign Up</button>

        {/* "New Here?" text */}
        <p className="new-here" onClick={handleLoginClick}>Already Signed Up? Log In</p>
      </div>
    </div>
  );
}

export default Create;

