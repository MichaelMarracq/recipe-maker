import axios from "axios";

const API_KEY = "1"; // Replace with your TheMealDB API key
const API_URL = "https://www.themealdb.com/api/json/v1";

const api = axios.create({
  baseURL: `${API_URL}/${API_KEY}`,
});

// const category = "Seafood"; // Replace with the desired category
// const recipes = await getRecipes(category);

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getRecipes = async (category) => {
  try {
    const response = await api.get(`/filter.php?c=${category}`);
    return response.data.meals;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const checkUserStatus = async () => {
  try {
    const response = await api.get("/user");
    return response.data.user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getFavoriteRecipes = async () => {
  try {
    const response = await api.get("/user/favorites");
    return response.data.meals;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getRecipeDetails = async (recipeId) => {
  try {
    const response = await api.get(`/lookup.php?i=${recipeId}`);
    return response.data.meals;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const removeFavoriteRecipe = async (recipeId) => {
  try {
    await api.delete(`/user/favorites/${recipeId}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// export const searchRecipes = async (searchTerm) => {
//   try {
//     const response = await api.get(`/search.php?s=${searchTerm}`);
//     return response.data.meals;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export const listMealsByFirstLetter = async (letter) => {
//   try {
//     const response = await api.get(`/search.php?f=${letter}`);
//     return response.data.meals;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export const listMealCategories = async () => {
//   try {
//     const response = await api.get("/categories.php");
//     return response.data.categories;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export const listCategoriesAreasIngredients = async () => {
//   try {
//     const [categoriesResponse, areasResponse, ingredientsResponse] =
//       await Promise.all([
//         api.get("/list.php?c=list"),
//         api.get("/list.php?a=list"),
//         api.get("/list.php?i=list"),
//       ]);
//     return {
//       categories: categoriesResponse.data.meals,
//       areas: areasResponse.data.meals,
//       ingredients: ingredientsResponse.data.meals,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       categories: [],
//       areas: [],
//       ingredients: [],
//     };
//   }
// };

// export const filterByMainIngredient = async (ingredient) => {
//   try {
//     const response = await api.get(`/filter.php?i=${ingredient}`);
//     return response.data.meals;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export const filterByCategory = async (category) => {
//   try {
//     const response = await api.get(`/filter.php?c=${category}`);
//     return response.data.meals;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export const filterByArea = async (area) => {
//   try {
//     const response = await api.get(`/filter.php?a=${area}`);
//     return response.data.meals;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };
