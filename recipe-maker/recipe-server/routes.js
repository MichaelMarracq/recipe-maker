// recipe-picker-server/routes.js

const express = require('express');
const authController = require('./auth/authController');
const userController = require('./controllers/userController');
const recipeController = require('./controllers/recipeController'); // Import your recipe controller
const router = express.Router();

// Define routes
router.get('/api/recipes', recipeController.getRecipes); // Add your route to fetch recipes
router.get('/api/recipes/:id', recipeController.getRecipeById); // Add your route to fetch a single recipe

router.post('/api/register', userController.register);
router.post('/api/login', authController.authenticate, userController.login);
router.get('/api/logout', userController.logout); // Add the logout route

// Check if a user is logged in
router.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ user: req.user });
  } else {
    return res.status(401).json({ message: 'Not authenticated' });
  }
});

// Protect routes with ensureAuthenticated middleware
router.post('/api/user/favorites', authController.ensureAuthenticated, recipeController.addFavorite);
router.delete('/api/user/favorites/:recipeId', authController.ensureAuthenticated, recipeController.removeFavorite);

module.exports = router;
