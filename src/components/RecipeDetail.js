import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeDetails } from '../api/recipes';
import styles from '../styles/RecipeDetail.module.css'; // Custom styles
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const getRecipeDetails = async () => {
      console.log('Fetching recipe with ID:', id);
      const fetchedRecipe = await fetchRecipeDetails(id);
      setRecipe(fetchedRecipe);
      setLikes(fetchedRecipe.aggregateLikes || 0);
      setLoading(false);
    };
    getRecipeDetails();
  }, [id]);

  const handleLike = () => {
    setLikes((prevLikes) => (hasLiked ? prevLikes - 1 : prevLikes + 1));
    setHasLiked((prevHasLiked) => !prevHasLiked);
  };

  if (loading) {
    return <div className={styles.loader}>Loading recipe details...</div>; // Use global 
  }

  return (
    <div className={styles.pageContainer}>
      <Navbar showSearch={false} />
      <div className={styles.detailContent}>
        <h1 className={styles.title}>{recipe.title}</h1>
        <div className={styles.imageWrapper}>
          <img src={recipe.image} alt={recipe.title} className={styles.image} />
        </div>
        <div className={styles.summary} dangerouslySetInnerHTML={{ __html: recipe.summary }} />

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Ingredients</h2>
          <ul className={styles.ingredientList}>
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id} className={styles.ingredientItem}>
                {ingredient.amount} {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Instructions</h2>
          <div className={styles.instructions} dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
        </section>

        <div className={styles.details}>
          <p><strong>Preparation Time:</strong> {recipe.preparationMinutes} minutes</p>
          <p><strong>Cooking Time:</strong> {recipe.cookingMinutes} minutes</p>
          <p><strong>Servings:</strong> {recipe.servings}</p>
          <p><strong>Health Score:</strong> {recipe.healthScore}</p>
          <p>
            <strong>Source:</strong>{' '}
            <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
              {recipe.sourceName}
            </a>
          </p>
          <p className={styles.likesContainer}>
            <strong>Aggregated Likes:</strong> {likes}
            <button className={styles.likeButton} onClick={handleLike}>
              <FontAwesomeIcon icon={faHeart} className={styles.heartIcon} /> {hasLiked ? 'Unlike' : 'Like'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;