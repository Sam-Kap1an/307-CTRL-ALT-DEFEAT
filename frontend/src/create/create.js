// Create.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./create.css";

function Create() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPassword] = useState("");

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSortifyClick = () => {
    navigate("/");
  };

  const handleSignUp = async () => {
    try {
      const newUser = { name, email, pwd };

      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.status === 201) {
        const payload = await response.json();
        localStorage.setItem("authToken", payload.token);

        const authToken = localStorage.getItem("authToken");
        console.log("Token stored in local storage:", authToken);

        console.log("Sign up successful!");
        // Redirect to user portal
      } else {
        console.log("Could not sign up", response.status);
      }
    } catch (error) {
      console.error("Error signing up:", error);
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

      <div className="tan-box">
        <p className="tan-box-content">Sign Up</p>

        <div className="input-container">
          <input
            type="text"
            placeholder="Name"
            className="login-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-container">
          <input
            type="text"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={pwd}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-button" onClick={handleSignUp}>
          Sign Up
        </button>

        <p className="new-here" onClick={handleLoginClick}>
          Already Signed Up? Log In
        </p>
      </div>
    </div>
  );
}

export default Create;
