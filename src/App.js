import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RecipeDetail from './components/RecipeDetail';
import { fetchRecipesByIngredients } from './api/recipes';
import './global.module.css'

const App = () => {
  const [recipes, setRecipes] = useState([]); // Manage recipes state at the root level

  const handleSearch = async (searchQuery) => {
    console.log('Searching for recipes with:', searchQuery); // Debugging
    const fetchedRecipes = await fetchRecipesByIngredients(searchQuery);
    setRecipes(fetchedRecipes); // Update recipes based on search
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage recipes={recipes} onSearch={handleSearch} />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
};

export default App;