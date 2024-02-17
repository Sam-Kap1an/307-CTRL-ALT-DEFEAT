// Login.js
import React from 'react';
import './login.css';

function Login({ onSignUpClick }) {
  return (
    <div className="login-container">
      <div id="sortify-text">
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
        <p className="new-here" onClick={onSignUpClick}>New Here? Create an Account</p>
      </div>
    </div>
  );
}

export default Login;



