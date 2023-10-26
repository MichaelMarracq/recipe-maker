// src/components/EditRecipe.js

import React, { useState, useEffect } from 'react';
import { checkUserStatus, getRecipeDetails, updateRecipe } from '../api';

const EditRecipe = ({ match }) => {
  const [recipe, setRecipe] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const recipeId = match.params.id; // Get the recipe ID from the URL
    const fetchRecipeData = async () => {
      const detailedRecipe = await getRecipeDetails(recipeId);
      setRecipe(detailedRecipe);
      setName(detailedRecipe.name);
      setDescription(detailedRecipe.description);
      setIngredients(detailedRecipe.ingredients);
      setSteps(detailedRecipe.steps);
    };

    fetchRecipeData();
  }, [match.params.id]);

  const handleSaveChanges = async () => {
    // Make an API request to update the recipe with the new information
    const updatedRecipe = {
      name,
      description,
      ingredients,
      steps,
    };

    const success = await updateRecipe(recipe.id, updatedRecipe);
    if (success) {
      // Handle successful update, e.g., show a success message or redirect
    }
  };

  return (
    <div>
      <h2>Edit Recipe</h2>
      <label>Name: </label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>Description: </label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <label>Ingredients: </label>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(e, index)}
            />
          </li>
        ))}
      </ul>
      <label>Preparation Steps: </label>
      <ol>
        {steps.map((step, index) => (
          <li key={index}>
            <textarea
              value={step}
              onChange={(e) => handleStepChange(e, index)}
            />
          </li>
        ))}
      </ol>
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
};

export default EditRecipe;
