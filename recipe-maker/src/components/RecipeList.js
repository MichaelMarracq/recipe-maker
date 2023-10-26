// src/components/RecipeDetail.js

import React, { useState, useEffect } from 'react';
import { getRecipeDetails } from '../api'; // Import the new API function

const RecipeDetail = ({ match }) => {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const recipeId = match.params.id; // Get the recipe ID from the URL
    const fetchRecipeDetails = async () => {
      const detailedRecipe = await getRecipeDetails(recipeId);
      setRecipe(detailedRecipe);
    };

    fetchRecipeDetails();
  }, [match.params.id]);

  return (
    <div>
      {recipe ? (
        <div>
          <h2>{recipe.name}</h2>
          <p>{recipe.description}</p>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p>Preparation Steps:</p>
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            )}
          </ol>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default RecipeDetail;
