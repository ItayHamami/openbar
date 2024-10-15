import React, { useState, useEffect } from 'react';
import { randomCocktails, searchByName, getAllIngredients, searchByIngredient } from '../utils/apiService';
import LoadingSign from './LoadingSign';
import { errorMsg } from '../utils/feedbackService';
import CocktailModal from './CocktailModal';
import CardComponent from './CardComponent';
import IngredientsForm from './IngredientsForm'; // Importing the IngredientsForm component

const Home = () => {
  const [homeDrinks, setHomeDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCocktailId, setSelectedCocktailId] = useState(null); // Change to hold the cocktail ID

  const fetchRandomCocktails = async () => {
    setIsLoading(true);
    try {
      const cocktailPromises = [];
      for (let i = 0; i < 6; i++) {
        cocktailPromises.push(randomCocktails());
      }
      const responses = await Promise.all(cocktailPromises);
      const cocktailsData = responses.map(response => response.data.drinks[0]);
      setHomeDrinks(cocktailsData);
    } catch (error) {
      errorMsg('Error fetching random cocktails');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (cocktail) => {
    setSelectedCocktailId(cocktail.idDrink); // Store only the cocktail ID
    setIsModalOpen(true);
  };

  const handleIngredientsSubmit = async (ingredients) => {
    setIsLoading(true);
    try {
      const ingredientPromises = ingredients.map((ingredient) => searchByIngredient(ingredient));
      const responses = await Promise.all(ingredientPromises);
      const cocktailList = responses.flatMap((res) => res.data.drinks);
      setHomeDrinks(cocktailList);
    } catch (error) {
      errorMsg('Error fetching cocktails by ingredients');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCocktailId(null); // Reset the cocktail ID
  };
  const handleCocktailSearch = async (value) => {
    setIsLoading(true);
    try {
      if (value.trim() === '') {
        fetchRandomCocktails();
      } else {
        const response = await searchByName(value);
        if (response.data.drinks) {
          setHomeDrinks(response.data.drinks);
        } else {
          errorMsg('Sorry, no cocktails matching your search.');
        }
      }
    } catch (error) {
      errorMsg('Error fetching cocktails');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    handleCocktailSearch(value);
  };

  useEffect(() => {
    fetchRandomCocktails();
    // fetchIngredients(); // Uncomment if needed
  }, []);

  return (
    <div className="hero container-fluid text-center p-5">
      <h1 className="color-primary">OpenBar</h1>
      <p className="color-secondary mb-4">Welcome to your free Cocktail assistant!</p>
      <div className="input-group mx-auto w-50 my-4">
        <input
          type="text"
          className="form-control"
          placeholder="What are we making today, Boss?"
          onChange={handleSearchChange}
        />
        <button onClick={fetchRandomCocktails} className="input-group-text">Random?</button>
      </div>

      <IngredientsForm onIngredientsSubmit={handleIngredientsSubmit} />

      {isLoading ? (
        <LoadingSign />
      ) : (
        <div className="container my-4">
          <div className="row">
            {homeDrinks.map(cocktail => (
              <div key={cocktail.idDrink} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                <CardComponent cocktail={cocktail} onClick={() => handleCardClick(cocktail)} />
              </div>
            ))}
          </div>
        </div>
      )}

      <CocktailModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        cocktailId={selectedCocktailId} // Pass the cocktail ID to the modal
      />
    </div>
  );
};

export default Home;
