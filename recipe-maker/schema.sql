-- Create the database
CREATE DATABASE recipe_picker;

-- Create the users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL
);

-- Create the recipes table
CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  instructions TEXT,
  ingredients TEXT[],
  image_url VARCHAR(255)
);

-- Create the user_favorites table (junction table)
CREATE TABLE user_favorites (
  user_id INT,
  recipe_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);
