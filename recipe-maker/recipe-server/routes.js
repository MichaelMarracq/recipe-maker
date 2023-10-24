// recipe-picker-server/routes.js

const express = require("express");
const recipeController = require("./controllers/recipeController");
const authController = require("./auth/authController");
const router = express.Router();

// Define routes
router.get("/api/recipes", recipeController.getRecipes);
router.post(
  "/api/user/favorites",
  authController.ensureAuthenticated,
  recipeController.addFavorite
);
router.delete(
  "/api/user/favorites/:recipeId",
  authController.ensureAuthenticated,
  recipeController.removeFavorite
);
router.post("/api/register", userController.register);
router.post("/api/login", authController.authenticate, userController.login);

module.exports = router;
