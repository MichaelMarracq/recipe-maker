import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { getRecipeDetails } from "../api";

const UserFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteDetails, setFavoriteDetails] = useState([]);
  const user = useUser();

  useEffect(() => {
    if (user.user.id) {
      axios
        .get(`/api/getfavorites?userId=${user.user.id}`)
        .then(async (response) => {
          setFavorites(response.data);

          // Fetch details for all favorite recipes
          const details = await Promise.all(
            response.data.map((recipeId) => getRecipeDetails(recipeId))
          );
          setFavoriteDetails(details.filter((detail) => detail !== null));
        })
        .catch((error) => {
          console.error("Error fetching favorites:", error);
        });
    }
  }, [user.user]);

  // Define some basic inline styles
  const styles = {
    container: {
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto",
    },
    listItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "20px",
      padding: "10px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    image: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      marginRight: "15px",
    },
    recipeName: {
      fontWeight: "bold",
    },
    recipeDetails: {
      flex: 1,
    },
    link: {
      textDecoration: "none",
      color: "#007BFF",
    },
  };

  return (
    <div style={styles.container}>
      <h1>My Favorites</h1>
      <ul>
        {favoriteDetails.map((recipe) => (
          <li key={recipe[0].idMeal} style={styles.listItem}>
            <img
              src={recipe[0].strMealThumb}
              alt={recipe[0].strMeal}
              style={styles.image}
            />
            <div style={styles.recipeDetails}>
              <h3 style={styles.recipeName}>{recipe[0].strMeal}</h3>
              <p>{recipe[0].strInstructions.substring(0, 150)}...</p>
            </div>
            <a href={`/recipes/${recipe[0].idMeal}`} style={styles.link}>
              View Recipe
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserFavorites;
