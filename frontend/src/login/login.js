import React, { useState } from "react";

import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./login.css";

function Login() {
  const navigate = useNavigate(); // Use useNavigate to get the navigate function
  const [email, setEmail] = useState("");
  const [pwd, setPassword] = useState("");
  const [token, setToken] = useState(null);

  const handleSignUpClick = () => {
    // Navigate to the signup page
    navigate("/signup");
  };

  const handleSortifyClick = () => {
    // Navigate to the home page
    navigate("/");
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, pwd }),
      });

      if (response.status === 200) {
        const payload = await response.json();
        setToken(payload.token);
        localStorage.setItem("authToken", payload.token);

        const authToken = localStorage.getItem("authToken");
        console.log("Token stored in local storage:", authToken);

        console.log("Login successful!");
        // Redirect to user portal
        navigate("/base-portal");
      } else {
        console.log("Invalid email or password", response.status);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-container">
      <div id="sortify-text" onClick={handleSortifyClick}>
        <span style={{ color: "#d17ea8" }}>S</span>
        <span style={{ color: "#d17ea8" }}>O</span>
        <span style={{ color: "#d17ea8" }}>R</span>
        <span style={{ color: "#6e3652" }}>T</span>
        <span style={{ color: "#6e3652" }}>I</span>
        <span style={{ color: "#6e3652" }}>F</span>
        <span style={{ color: "#6e3652" }}>Y</span>
      </div>

      {/* Larger tan box */}
      <div className="tan-box">
        <p className="tan-box-content">Login</p>

        {/* Email input */}
        <div className="input-container">
          <input
            type="text"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password input */}
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={pwd}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Your existing login form goes here */}

        {/* Login button inside tan box */}
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        {/* "New Here?" text */}
        <p className="new-here" onClick={handleSignUpClick}>
          New Here? Create an Account
        </p>
      </div>
    </div>
  );
}

export default Login;
