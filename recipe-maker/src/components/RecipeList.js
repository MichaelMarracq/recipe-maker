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
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 style={{ color: "#ff6347", margin: "20px 0" }}>
        Bok Bok Chicken Picker
      </h2>
      <ul
        style={{
          listStyleType: "none",
          padding: "0",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {recipes.map((recipe) => (
          <li
            key={recipe.idMeal}
            style={{
              background: "#fff",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Link
              to={`/recipes/${recipe.idMeal}`}
              style={{
                textDecoration: "none",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              {recipe.strMeal}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
