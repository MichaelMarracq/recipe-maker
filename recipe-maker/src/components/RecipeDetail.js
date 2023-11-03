import React, { useState, useEffect } from "react";
import { getRecipeDetails } from "../api";
import { useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext"; // Adjust the import path as necessary

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
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { user } = useUser(); // Use the useUser hook to access the current user from UserContext

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const detailedRecipe = await getRecipeDetails(id);
      setRecipe(detailedRecipe[0]);
    };

    fetchRecipeDetails();
  }, [id]);

  const addToFavorites = async () => {
    if (!user) {
      console.error("User is not logged in");
      return;
    }

    // Logging out the userId and recipeId that will be sent in the request
    console.log("User ID:", user.id);
    console.log("Recipe ID:", id);

    // Ensure you replace 'USER_ID' with user.id from your context
    const userId = user.id; // This assumes your user object has an 'id' field

    const requestBody = JSON.stringify({ userId, recipeId: id });
    console.log("Request Body:", requestBody); // Logging out the request body

    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      console.log("Response status:", response.status); // Log the response status

      if (response.ok) {
        const responseData = await response.json();
        console.log("Recipe successfully added to favorites:", responseData); // Log the successful response data
      } else {
        const errorResponse = await response.text();
        console.error("Failed to add recipe to favorites:", errorResponse); // Log the error response data
      }
    } catch (error) {
      console.error("There was an error adding the recipe to favorites", error);
    }
  };

  return (
    <div>
      {recipe ? (
        <div>
          <h2>{recipe.strMeal}</h2>
          {recipe && <button onClick={addToFavorites}>Add to Favorites</button>}
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
