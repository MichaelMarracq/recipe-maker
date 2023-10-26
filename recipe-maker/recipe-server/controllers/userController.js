// recipe-picker-server/controllers/userController.js

const passport = require("passport");
const db = require("../db"); // You will need to implement this module

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if the username is already taken
    const existingUser = await db.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already in use" });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await db.hashPassword(password);

    // Insert the new user into the database
    await db.createUser(username, hashedPassword);

    return res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = (req, res) => {
  // Passport.js has already authenticated the user during the request
  // You can send a success response here, e.g., res.json(req.user)
  res.status(200).json({ message: "Login successful" });
};

exports.logout = (req, res) => {
  req.logout(); // Passport.js function to log the user out
  res.status(200).json({ message: 'Logout successful' });
};
