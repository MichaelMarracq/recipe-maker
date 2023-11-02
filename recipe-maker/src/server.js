const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

// Set up a PostgreSQL connection pool
const pool = new Pool({
  user: "your_db_user",
  host: "your_db_host",
  database: "your_db_name",
  password: "your_db_password",
  port: 5432, // Change to your PostgreSQL port if it's different
});

// Define the route for user registration
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Insert the user into the "users" table
  const query = {
    text: "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *",
    values: [username, password],
  };

  try {
    S;
    const result = await pool.query(query);

    if (result.rowCount === 1) {
      res.status(201).json({ message: "Registration successful" });
    } else {
      res.status(500).json({ message: "User registration failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "User registration failed" });
  }
});

module.exports = router;
