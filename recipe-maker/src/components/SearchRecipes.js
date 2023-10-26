// src/components/SearchRecipes.js

import React, { useState, useEffect } from 'react';
import { searchRecipes } from '../api';

const SearchRecipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      // Make an API request to search for recipes based on the search term
      const fetchSearchResults = async () => {
        const results = await searchRecipes(searchTerm);
        setSearchResults(results);
      };

      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div>
      <h2>Search for Recipes</h2>
      <input
        type="text"
        placeholder="Enter a recipe name or ingredient"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {searchResults.map((recipe) => (
          <li key={recipe.id}>
            <a href={`/recipe/${recipe.id}`}>{recipe.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchRecipes;
