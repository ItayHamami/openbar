import axios from 'axios';

const apiBase = 'https://www.thecocktaildb.com/api/json/v1/1/';

// Function to search cocktails by name
export function searchByName(cocktailName) {
  return axios.get(`${apiBase}search.php?s=${cocktailName}`);
}

// Function to fetch random cocktails
export function randomCocktails() {
  return axios.get(`${apiBase}random.php`);
}

// Function to search cocktails by ingredient
export function searchByIngredient(ingredient) {
  return axios.get(`${apiBase}filter.php?i=${ingredient}`);
}

// Function to get all possible ingredients
export function getAllIngredients() {
  return axios.get(`${apiBase}list.php?i=list`).then(response => {
    // Check if the expected property exists
    if (response.data.drinks && response.data.drinks[0].strIngredient1) {
      // Return only the ingredient names if the expected property exists
      return response.data.drinks.map(drink => drink.strIngredient1);
    } else {
      // Handle the case where the expected property is missing
      console.error('Unexpected API response format. Ingredients not found.');
      return []; // Return an empty array to prevent errors in filtering
    }
  }).catch(error => {
    console.error('Error fetching ingredients:', error);
    return Promise.reject(error);
  });
}

// New function to get cocktail details by ID
export function getCocktailById(cocktailId) {
  return axios.get(`${apiBase}lookup.php?i=${cocktailId}`).then(response => {
    if (response.data.drinks) {
      return response.data.drinks[0]; // Return the first drink from the response
    } else {
      throw new Error('Cocktail not found');
    }
  }).catch(error => {
    console.error('Error fetching cocktail by ID:', error);
    return Promise.reject(error);
  });
}

/* Utility function to handle errors (if needed in the future)
function handleApiError(error) {
  console.error('API Error:', error.response?.data || error.message);
  return Promise.reject(error);
}
*/