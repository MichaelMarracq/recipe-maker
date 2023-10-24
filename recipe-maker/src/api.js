// src/api.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Update with your server URL and port
});

export const checkUserStatus = async () => {
  try {
    const response = await api.get("/api/user");
    return response.data.user;
  } catch (error) {
    return null;
  }
};
