import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../api";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const category = "Chicken"; // Replace with the desired category
  useEffect(() => {
    const fetchRecipes = async () => {
      const recipeData = await getRecipes(category);
      console.log(recipeData);
      setRecipes(recipeData);
      console.log(recipes);
    };

    fetchRecipes();
  }, [category]);

  return (
    <div>
      <h2>Recipe List</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.idMeal}>
            <Link to={`/recipes/${recipe.idMeal}`}>{recipe.strMeal}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
