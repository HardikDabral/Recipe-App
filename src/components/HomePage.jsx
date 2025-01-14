import React, { useEffect, useState } from 'react';
import { fetchRecipes, fetchRecipesByIngredients } from '../api/recipes';
import styles from '../styles/Home.module.css';
import Card from './Card';
import Navbar from './Navbar';
import Hero from './Hero';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(false); // Track if no recipes are found within 6 seconds

  // Function to fetch recipes, either default or by search query
  const getRecipes = async (searchQuery = null) => {
    setLoading(true);
    setError(false);

    const timeout = setTimeout(() => {
      if (loading) {
        setError(true); // Set error if loading takes more than 6 seconds
      }
    }, 6000);

    try {
      const fetchedRecipes = searchQuery
        ? await fetchRecipesByIngredients(searchQuery)
        : await fetchRecipes();
      setRecipes(fetchedRecipes);
      clearTimeout(timeout);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipes(); // Fetch default recipes on initial load
  }, []);

  // Function to handle search
  const handleSearch = (query) => {
    getRecipes(query); // Fetch recipes based on search query
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <Hero />
      <div id="cards-section" className={styles.grid}>
        {loading ? (
          <p className={styles.loading}>Loading recipes...</p>
        ) : error || recipes.length === 0 ? (
          <p className={styles.loading}>No recipes found.</p>
        ) : (
          recipes.map((recipe) => (
            <Card
              key={recipe.id}
              title={recipe.title}
              imageUrl={recipe.image}
              id={recipe.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
