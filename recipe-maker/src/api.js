// src/api.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Update with your server URL and port
});

export const checkUserStatus = async () => {
  try {
    const response = await api.get("/api/user");
    return response.data.user;
  } catch (error) {
    return null;
  }
};

export const getFavoriteRecipes = async () => {
  try {
    const response = await axios.get('/api/user/favorites');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getRecipeDetails = async (recipeId) => {
  try {
    const response = await axios.get(`/api/recipes/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const removeFavoriteRecipe = async (recipeId) => {
  try {
    await axios.delete(`/api/user/favorites/${recipeId}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateRecipe = async (recipeId, updatedRecipe) => {
  try {
    await axios.put(`/api/recipes/${recipeId}`, updatedRecipe);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteRecipe = async (recipeId) => {
  try {
    await axios.delete(`/api/recipes/${recipeId}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const searchRecipes = async (searchTerm) => {
  try {
    const response = await axios.get(`/api/recipes/search?term=${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};