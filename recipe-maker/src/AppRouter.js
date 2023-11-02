import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import UserRegistration from "./components/UserRegistration";
import UserLogin from "./components/UserLogin";
import UserFavorites from "./components/UserFavorites";
import Navbar from "./components/Navbar"; // Import your Navbar component

const AppRouter = () => {
  return (
    <Router>
      <Navbar /> {/* Add your Navbar component here */}
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/favorites" element={<UserFavorites />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
