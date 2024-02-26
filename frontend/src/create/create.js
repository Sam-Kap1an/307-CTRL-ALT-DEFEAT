// Create.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./create.css";

function Create() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSortifyClick = () => {
    navigate("/");
  };

  const handleSignUp = () => {
    const newUser = { name, email, password };

    fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data as needed
        console.log("User signed up successfully", data);

        // Clear form fields
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Error adding new user:", error);
      });
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
            value={password}
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
