import React, { useState, useEffect } from "react";
import { getRecipeDetails } from "../api";
import { useParams } from "react-router-dom"; // Import useParams

const getIngredients = (recipe) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    if (ingredient) {
      ingredients.push(ingredient);
    }
  }
  return ingredients;
};

const RecipeDetail = () => {
  const { id } = useParams(); // Use useParams to access the :id parameter

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      console.log(id); // Access the recipe ID from the URL
      const detailedRecipe = await getRecipeDetails(id);
      console.log(detailedRecipe);
      setRecipe(detailedRecipe[0]);
      console.log(recipe);
    };

    fetchRecipeDetails();
  }, [id]);

  return (
    <div>
      {recipe ? (
        <div>
          <h2>{recipe.strMeal}</h2>
          <p>Category: {recipe.strCategory}</p>
          <p>Area: {recipe.strArea}</p>
          <p>Instructions:</p>
          <p>{recipe.strInstructions}</p>
          <p>Ingredients:</p>

          <ul>
            {getIngredients(recipe).map((ingredient, index) => (
              <li key={index}>
                {ingredient}: {recipe[`strMeasure${index + 1}`]}
              </li>
            ))}
          </ul>

          <p>Tags: {recipe.strTags}</p>

          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default RecipeDetail;

{
  /* <ul>
  {getIngredients(recipe).map((ingredient, index) => (
    <li key={index}>
      {ingredient}: {recipe[`strMeasure${index + 1}`]}
    </li>
  ))}
</ul>; */
}
