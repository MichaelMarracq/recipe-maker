// src/components/DeleteRecipe.js

import React, { useState, useEffect } from 'react';
import { checkUserStatus, deleteRecipe } from '../api';

const DeleteRecipe = ({ match }) => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await checkUserStatus();
      if (userData) {
        setUser(userData);
        setRecipes(userData.recipes);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteRecipe = async () => {
    if (selectedRecipe) {
      // Make an API request to delete the selected recipe
      const success = await deleteRecipe(selectedRecipe);
      if (success) {
        // Update the user's recipes state after deletion
        setRecipes(recipes.filter((recipe) => recipe.id !== selectedRecipe));
        setSelectedRecipe(''); // Clear the selected recipe
      }
    }
  };

  return (
    <div>
      <h2>Delete Recipe</h2>
      <label>Select a Recipe to Delete:</label>
      <select onChange={(e) => setSelectedRecipe(e.target.value)}>
        <option value="">Select a recipe</option>
        {recipes.map((recipe) => (
          <option key={recipe.id} value={recipe.id}>
            {recipe.name}
          </option>
        ))}
      </select>
      <button onClick={handleDeleteRecipe}>Delete</button>
    </div>
  );
};

export default DeleteRecipe;
