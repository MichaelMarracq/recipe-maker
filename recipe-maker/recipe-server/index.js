// recipe-picker-server/index.js

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const authController = require("./auth/authController");

const app = express();

// ... (other middleware and route setup)

// Configure express-session
app.use(
  session({
    secret: "your-secret-key", // Change this to a strong, random secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ... (other middleware and route setup)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
