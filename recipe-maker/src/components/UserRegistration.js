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

  return (
    <div>
      <h1>User Registration</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {registrationMessage && <p>{registrationMessage}</p>}
    </div>
  );
};

export default UserRegistration;
