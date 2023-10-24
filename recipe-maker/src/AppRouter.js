import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import UserRegistration from "./components/UserRegistration";
import UserLogin from "./components/UserLogin";
import UserFavorites from "./components/UserFavorites";

const AppRouter = () => {
  return (
    <Router>
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
