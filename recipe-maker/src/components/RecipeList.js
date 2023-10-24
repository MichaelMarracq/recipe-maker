import React, { useState, useEffect } from "react";
import axios from "axios";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/recipes?search=your_search_query") // Replace 'your_search_query'
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Recipe List</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <a href={`/recipes/${recipe.id}`}>{recipe.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
