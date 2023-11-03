-- Drop existing tables if they exist
DROP TABLE IF EXISTS user_favorites;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS users;

-- Recreate the database (optional, you might not need this if you are not dropping the database)
-- DROP DATABASE IF EXISTS recipe_picker;
-- CREATE DATABASE recipe_picker;

-- Assuming you're already connected to the `recipe_picker` database after it's creation

-- Recreate the users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL
);


-- Recreate the user_favorites table (junction table)
CREATE TABLE user_favorites (
  user_id INT,
  recipe_id INT
);
