import React, { useState, useEffect } from "react";
import axios from "axios";

const UserFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [recipeIdToAdd, setRecipeIdToAdd] = useState("");
  const [recipeIdToRemove, setRecipeIdToRemove] = useState("");

  useEffect(() => {
    // Fetch user's favorite recipes from the server
    axios
      .get("/api/user/favorites")
      .then((response) => {
        setFavorites(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAddFavorite = () => {
    // Send a POST request to add the recipe to favorites
    axios
      .post("/api/user/favorites", { recipeId: recipeIdToAdd })
      .then((response) => {
        // Handle the response (e.g., update state or show a message)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveFavorite = (recipeId) => {
    // Send a DELETE request to remove the recipe from favorites
    axios
      .delete(`/api/user/favorites/${recipeId}`)
      .then((response) => {
        // Handle the response (e.g., update state or show a message)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>My Favorites</h1>
      <div>
        <label>Add Recipe to Favorites:</label>
        <input
          type="text"
          placeholder="Recipe ID"
          value={recipeIdToAdd}
          onChange={(e) => setRecipeIdToAdd(e.target.value)}
        />
        <button onClick={handleAddFavorite}>Add to Favorites</button>
      </div>
      <ul>
        {favorites.map((recipe) => (
          <li key={recipe.id}>
            <a href={`/recipes/${recipe.id}`}>{recipe.name}</a>
            <button onClick={() => handleRemoveFavorite(recipe.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserFavorites;
