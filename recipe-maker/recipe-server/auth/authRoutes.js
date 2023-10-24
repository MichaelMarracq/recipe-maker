// recipe-picker-server/auth/authRoutes.js

const express = require("express");
const passport = require("passport");
const router = express.Router();

// User registration route
router.post("/register", passport.authenticate("local"), (req, res) => {
  // You will implement user registration in a later step.
});

// User login route
router.post("/login", passport.authenticate("local"), (req, res) => {
  // You will implement user login in a later step.
});

module.exports = router;
