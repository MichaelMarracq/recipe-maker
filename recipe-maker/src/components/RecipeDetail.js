import React, { useState, useEffect } from "react";
import axios from "axios";

const RecipeDetail = (props) => {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const recipeId = props.match.params.id;
    axios
      .get(`/api/recipes/${recipeId}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.match.params.id]);

  return (
    <div>
      <h1>Recipe Detail</h1>
      {recipe && (
        <div>
          <h2>{recipe.name}</h2>
          <p>{recipe.instructions}</p>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <img src={recipe.image_url} alt={recipe.name} />
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
