import React, { useState } from "react";
import axios from "axios";

const UserRegistration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    axios
      .post("/api/register", { username, password })
      .then((response) => {
        // Handle successful registration, e.g., redirect to the login page
      })
      .catch((error) => {
        console.error(error);
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
    </div>
  );
};

export default UserRegistration;
