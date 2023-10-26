// src/components/UserFavoritesList.js

import React, { useEffect, useState } from 'react';
import { checkUserStatus, getFavoriteRecipes } from '../api'; // Import the new API function

const UserFavoritesList = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = await checkUserStatus();
      if (user) {
        // Fetch the user's favorite recipes based on their ID from the server
        const userFavorites = await getFavoriteRecipes();
        setFavorites(userFavorites);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h2>Your Favorite Recipes</h2>
      <ul>
        {favorites.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
          // Render other recipe details as needed
        ))}
      </ul>
    </div>
  );
};

export default UserFavoritesList;
