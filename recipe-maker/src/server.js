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

router.post("/favorite", async (req, res) => {
  const { userID, recipeId } = req.body;

  // Insert the favorite into the "favorites" table
  const query = {
    text: "INSERT INTO favorites(user_id, recipe_id) VALUES($1, $2) RETURNING *",
    values: [userID, recipeId],
  };

  try {
    const result = await pool.query(query);

    if (result.rowCount === 1) {
      res.status(201).json({ message: "Favorite saved successfully" });
    } else {
      res.status(500).json({ message: "Saving favorite failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Saving favorite failed" });
  }
});

router.get("/api/getfavorites", async (req, res) => {
  try {
    const { userID } = req.query; // Assuming userID is sent as a query parameter
    if (!userID) {
      return res.status(400).json({ message: "Missing userID" });
    }

    // Query your database to retrieve favorite recipe IDs associated with the userID
    const favoriteRecipes = await db.getFavoritesByUserID(userID);

    if (favoriteRecipes.length === 0) {
      return res.status(404).json({ message: "No favorite recipes found" });
    }

    // Extract recipe IDs from the database response
    const favoriteRecipeIDs = favoriteRecipes.map((recipe) => recipe.recipeID);

    return res.status(200).json(favoriteRecipeIDs);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error retrieving favorite recipes" });
  }
});

module.exports = router;
