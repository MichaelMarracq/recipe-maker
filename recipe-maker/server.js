// Connect to the PostgreSQL database
const express = require("express");
const { Client } = require("pg");

const app = express();
const port = 5000;

// PostgreSQL client setup
const client = new Client({
  user: "mike",
  host: "localhost",
  database: "recipe_picker",
  password: "ingaomg1", // Remember to secure your password for production
  port: 5432,
});

client.connect();

app.use(express.json());

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await client.query(
      "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *",
      [username, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    // Retrieve user from the database
    const query = {
      text: "SELECT * FROM users WHERE username = $1",
      values: [username],
    };

    const result = await client.query(query);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Since we're not hashing, we compare plaintext passwords (not recommended in production)
      if (password === user.password) {
        res.json({
          message: "Login successful",
          user: { id: user.id, username: user.username },
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.detail });
  }
});

app.post("/api/favorites", async (req, res) => {
  const { userId, recipeId } = req.body; // Make sure these match the client-side

  // Ensure both userId and recipeId are provided
  if (!userId || !recipeId) {
    return res
      .status(400)
      .json({ message: "User ID and Recipe ID are required" });
  }

  try {
    // Insert the favorite into the database
    const insertQuery = {
      text: "INSERT INTO user_favorites(user_id, recipe_id) VALUES($1, $2) RETURNING *",
      values: [userId, recipeId],
    };

    const result = await client.query(insertQuery);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.detail });
  }
});

app.get("/api/getfavorites", async (req, res) => {
  const { userId } = req.query; // Extract userId from query parameters

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    // Query to select all recipe IDs for the given user ID from the user_favorites table
    const query = {
      text: "SELECT recipe_id FROM user_favorites WHERE user_id = $1",
      values: [userId],
    };

    const result = await client.query(query);

    // Extract just the recipe IDs to return
    const recipeIds = result.rows.map((row) => row.recipe_id);

    res.json(recipeIds); // Send back the array of recipe IDs
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
