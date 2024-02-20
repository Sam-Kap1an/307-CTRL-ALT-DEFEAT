// base.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './base.css';

function BaseHeader() {
  const navigate = useNavigate(); // Use useNavigate to get the navigate function

  const handleSortifyClick = () => {
    // Navigate to the home page
    navigate('/');
  };

  return (
    <div className="groups-container">

      <thead>
        <tr>
           <th>
              <div id="sortify-text" onClick={handleSortifyClick}>
                <span style={{ color: '#d17ea8' }}>S</span>
                <span style={{ color: '#d17ea8' }}>O</span>
                <span style={{ color: '#d17ea8' }}>R</span>
                <span style={{ color: '#6e3652' }}>T</span>
                <span style={{ color: '#6e3652' }}>I</span>
                <span style={{ color: '#6e3652' }}>F</span>
                <span style={{ color: '#6e3652' }}>Y</span>
              </div>
            </th>
            

            <th>
              <div id="username-text" onClick={handleSortifyClick}>
              <span style={{ color: '#d17ea8' }}>Welcome, </span>
              <span style={{ color: '#6e3652' }}>USER</span>

              </div>
            </th>
        </tr>
      </thead>
    </div>
  );
}

function BaseBody() {
  const navigate = useNavigate(); // Use useNavigate to get the navigate function

  const handleSignUpClick = () => {
    // Navigate to the signup page
    navigate('/signup');
  };

  return (
    <div className="groups-container">
      {/* Larger tan box */}
      <div className="tan-box">
        <p className="tan-box-content">Login</p>

        {/* Email input */}
        <div className="input-container">
          <input type="text" placeholder="Email" className="login-input" />
        </div>

        {/* Password input */}
        <div className="input-container">
          <input type="password" placeholder="Password" className="login-input" />
        </div>

        {/* Your existing login form goes here */}

        {/* Login button inside tan box */}
        <button className="login-button">Login</button>

        {/* "New Here?" text */}
        <p className="new-here" onClick={handleSignUpClick}>New Here? Create an Account</p>
      </div>
    </div>
  );
}

function Base() {
  return (
    <table>
      <BaseHeader />
      <BaseBody
      />
    </table>
  );
}



export default Base;





