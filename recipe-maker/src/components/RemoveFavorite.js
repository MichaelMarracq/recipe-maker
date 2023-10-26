// src/components/RemoveFavorite.js

import React, { useState, useEffect } from 'react';
import { checkUserStatus } from '../api';

const RemoveFavorite = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await checkUserStatus();
      if (userData) {
        setUser(userData);
        setFavorites(userData.favorites);
      }
    };

    fetchUserData();
  }, []);

  const handleRemoveFavorite = async () => {
    if (selectedRecipe) {
      // Make an API request to remove the selected recipe from the user's favorites
      const success = await removeFavoriteRecipe(selectedRecipe);
      if (success) {
        // Update the user's favorites state after removal
        setFavorites(favorites.filter((recipe) => recipe.id !== selectedRecipe));
        setSelectedRecipe(''); // Clear the selected recipe
      }
    }
  };

  return (
    <div>
      <h2>Remove Favorite Recipe</h2>
      <label>Select a Recipe to Remove:</label>
      <select onChange={(e) => setSelectedRecipe(e.target.value)}>
        <option value="">Select a recipe</option>
        {favorites.map((recipe) => (
          <option key={recipe.id} value={recipe.id}>
            {recipe.name}
          </option>
        ))}
      </select>
      <button onClick={handleRemoveFavorite}>Remove</button>
    </div>
  );
};

export default RemoveFavorite;
