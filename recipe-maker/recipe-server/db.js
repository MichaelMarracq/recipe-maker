// recipe-picker-server/db.js

const promise = require("bluebird");
const bcrypt = require("bcrypt");
const initOptions = {
  promiseLib: promise,
};

const pgp = require("pg-promise")(initOptions);
const connectionString =
  "postgres://mike:ingaomg1@localhost:3000/recipe_picker"; // Update with your actual PostgreSQL connection details
const db = pgp(connectionString);

function addFavorite(userId, recipeId) {
  return db.none(
    "INSERT INTO user_favorites (user_id, recipe_id) VALUES ($1, $2)",
    [userId, recipeId]
  );
}

function removeFavorite(userId, recipeId) {
  return db.none(
    "DELETE FROM user_favorites WHERE user_id = $1 AND recipe_id = $2",
    [userId, recipeId]
  );
}

async function getUserByUsername(username) {
  return db.oneOrNone("SELECT * FROM users WHERE username = $1", username);
}

async function createUser(username, password) {
  return db.none("INSERT INTO users (username, password) VALUES ($1, $2)", [
    username,
    password,
  ]);
}

async function hashPassword(password) {
  return bcrypt.hash(password, 10); // 10 is the number of salt rounds
}

// Add more database functions as needed

module.exports = {
  addFavorite,
  removeFavorite,
  getUserByUsername,
  createUser,
  hashPassword,
  // Export other functions here
};
