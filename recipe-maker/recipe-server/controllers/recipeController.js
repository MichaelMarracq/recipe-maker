// controllers/recipeController.js

const axios = require("axios");
const YOUR_API_KEY = "1"; // Replace with your API key

exports.getRecipes = async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/${YOUR_API_KEY}/search.php?s=${req.query.search}`
    );
    const recipes = response.data.meals;
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching recipes" });
  }
};

// recipe-picker-server/controllers/recipeController.js

// ... (previous code)

exports.addFavorite = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user's ID from the authenticated request
    const recipeId = req.body.recipeId; // Get the recipe ID from the request body

    // Add the recipe to the user's favorites in the database
    await db.addFavorite(userId, recipeId);

    res.status(200).json({ message: "Recipe added to favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding recipe to favorites" });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user's ID from the authenticated request
    const recipeId = req.params.recipeId; // Get the recipe ID from the URL parameter

    // Remove the recipe from the user's favorites in the database
    await db.removeFavorite(userId, recipeId);

    res.status(200).json({ message: "Recipe removed from favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error removing recipe from favorites" });
  }
};

// ... (rest of the code)
