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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {recipe ? (
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              margin: "0",
              padding: "0",
              color: "#333",
            }}
          >
            {recipe.strMeal}
          </h2>
          {recipe && (
            <button
              onClick={addToFavorites}
              style={{
                display: "block",
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                margin: "10px auto",
              }}
            >
              Add to Favorites
            </button>
          )}
          <p>
            <strong>Category:</strong> {recipe.strCategory}
          </p>
          <p>
            <strong>Area:</strong> {recipe.strArea}
          </p>
          <h3>Instructions:</h3>
          <p style={{ textAlign: "justify" }}>{recipe.strInstructions}</p>
          <h3>Ingredients:</h3>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {getIngredients(recipe).map((ingredient, index) => (
              <li
                key={index}
                style={{
                  background: "#f8f9fa",
                  margin: "5px 0",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                {ingredient}: {recipe[`strMeasure${index + 1}`]}
              </li>
            ))}
          </ul>
          <p>
            <strong>Tags:</strong> {recipe.strTags?.split(",").join(", ")}
          </p>
          <div style={{ textAlign: "center" }}>
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
            />
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>Loading...</div>
      )}
    </div>
  );
};

export default RecipeDetail;
