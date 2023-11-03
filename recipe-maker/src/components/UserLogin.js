// src/components/UserLogin.js
import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext"; // import the context hook

const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const { setUser } = useUser(); // use the setUser function from the context

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/login", { username, password });

      if (response.status === 200) {
        // Assuming the response will have the user object including the id
        setUser(response.data.user);
        setLoginMessage("Login successful.");

        // Optionally, store the user's ID in localStorage
        localStorage.setItem("currentUser", JSON.stringify(response.data.user));

        // Redirect or further actions
        // ...
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginMessage("Login failed. Please check your username and password.");
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
    backgroundColor: "#5cb85c",
    color: "white",
    cursor: "pointer",
  };

  const messageStyle = {
    color: loginMessage.includes("successful") ? "#28a745" : "#dc3545",
    fontWeight: "bold",
    textAlign: "center",
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>User Login</h1>
      <form onSubmit={handleLogin} style={formStyle}>
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
          Login
        </button>
      </form>
      {loginMessage && <p style={messageStyle}>{loginMessage}</p>}
    </div>
  );
};

export default UserLogin;
