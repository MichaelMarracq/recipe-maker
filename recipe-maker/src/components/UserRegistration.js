import React, { useState } from "react";
import axios from "axios";

const UserRegistration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      console.log("Attempting to register with:", username, password);
      const response = await axios.post("/api/register", {
        username,
        password,
      });
      console.log("Registration successful:", response.data);
      setRegistrationMessage("Registration successful. You can now log in.");
    } catch (error) {
      console.error("Registration error:", error);
      setRegistrationMessage(
        error.message || "Registration failed. Please try again later."
      );
    }
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "300px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    margin: "10px 0",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#0275d8", // Different color to distinguish from the login button
    color: "white",
    cursor: "pointer",
  };

  const messageStyle = {
    color: registrationMessage.includes("successful") ? "#28a745" : "#dc3545",
    fontWeight: "bold",
    textAlign: "center",
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>User Registration</h1>
      <form onSubmit={handleRegister} style={formStyle}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Register
        </button>
      </form>
      {registrationMessage && <p style={messageStyle}>{registrationMessage}</p>}
    </div>
  );
};

export default UserRegistration;
