import React, { useState } from "react";
import axios from "axios";

const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    axios
      .post("/api/login", { username, password })
      .then((response) => {
        // Handle successful login, e.g., redirect to a user dashboard
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>User Login</h1>
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
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default UserLogin;
