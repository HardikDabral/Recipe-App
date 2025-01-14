import axios from 'axios';

const API_KEY = 'cee59e2d38c4473eafd5f65a43dbb448'; // Your actual API key
const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

export const fetchRecipes = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apiKey: API_KEY,
        number: 20, // Number of recipes to fetch
      },
    });
    return response.data.results; // Return the list of recipes
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return []; // Return an empty array in case of error
  }
};

export const fetchRecipeDetails = async (id) => {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
        params: {
          apiKey: API_KEY,
        },
      });
      console.log('Recipe Details:', response.data); // Log the response here
      return response.data;
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      throw new Error('Failed to fetch recipe details');
    }
  };
  
  
  export const fetchRecipesByIngredients = async (ingredients) => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
            params: {
                ingredients, // Pass the ingredients as a comma-separated string
                apiKey: API_KEY,
                number: 20, // Number of recipes to fetch
            },
        });
        console.log('Fetched recipes by ingredients:', response.data); // Debugging
        return response.data; // Return the list of recipes
    } catch (error) {
        console.error('Error fetching recipes by ingredients:', error);
        return []; // Return an empty array in case of error
    }
};
  