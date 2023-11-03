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

  return (
    <div>
      <h1>User Login</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      {loginMessage && <p>{loginMessage}</p>}
    </div>
  );
};

export default UserLogin;
