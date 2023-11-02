import React, { useState } from "react";
import axios from "axios";

const UserRegistration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");

  const handleRegister = () => {
    axios
      .post("/api/register", { username, password })
      .then((response) => {
        console.log("Registration successful:", response);
        setRegistrationMessage("Registration successful. You can now log in.");
        // Optionally, you can redirect the user to the login page
        // Example: window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Registration error:", error);
        if (error.response && error.response.data) {
          console.error("Server response:", error.response.data);
          setRegistrationMessage(error.response.data.message);
        } else {
          console.error("Unknown error occurred.");
          setRegistrationMessage(
            "Registration failed. Please try again later."
          );
        }
      });
  };

  return (
    <div>
      <h1>User Registration</h1>
      <form>
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
        <button onClick={handleRegister}>Register</button>
      </form>
      {registrationMessage && <p>{registrationMessage}</p>}
    </div>
  );
};

export default UserRegistration;
