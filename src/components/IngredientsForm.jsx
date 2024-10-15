import React, { useState, useEffect } from 'react';
import { getAllIngredients } from '../utils/apiService';

const IngredientsForm = ({ onIngredientsSubmit }) => {
  const [ingredients, setIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false); // Toggle state for ingredient list visibility

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const ingredientList = await getAllIngredients();
        setIngredients(ingredientList);
        const alcoholicIngredients = ingredientList.filter(ingredient => isAlcoholic(ingredient));
        setFilteredIngredients(alcoholicIngredients);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };
    fetchIngredients();
  }, []);

  const isAlcoholic = (ingredient) => {
    const alcoholicKeywords = [
      'vodka', 'rum', 'gin', 'tequila', 'whiskey', 'beer', 'wine', 'cognac', 'vermouth',
      'brandy', 'liqueur', 'bourbon', 'champagne', 'scotch', 'amaretto', 'schnapps', 'port',
      'sherry', 'ricard', 'galliano', 'ouzo', 'pisco', 'absolut', 'firewater', 'lager', 'ale',
      'johnnie walker', 'midori', 'sambuca', 'everclear', 'kahlua', 'baileys', 'jack daniels'
    ];
  
    return alcoholicKeywords.some(keyword => 
      new RegExp(`\\b${keyword}\\b`, 'i').test(ingredient)
    );
  };

  const handleIngredientChange = (ingredient) => {
    setSelectedIngredients((prev) => prev.includes(ingredient)
      ? prev.filter((item) => item !== ingredient)
      : [...prev, ingredient]
    );
  };

  const handleSubmit = () => {
    if (selectedIngredients.length > 0) {
      onIngredientsSubmit(selectedIngredients);
    } else {
      alert('Please select at least one ingredient!');
    }
  };

  return (
    <div className="container mt-4 p-4 bg-light rounded border border-primary">
      <h5 className="text-primary mb-3">Select Your Ingredients (Alcoholic)</h5>
      <button
        className="btn btn-info mb-3"
        onClick={() => setIsListVisible(!isListVisible)}
      >
        {isListVisible ? 'Hide Ingredients' : 'Show Ingredients'}
      </button>

      {isListVisible && (
        <div className="row">
          {filteredIngredients.map((ingredient, index) => (
            <div key={index} className="col-sm-6 col-md-4 col-lg-3 mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={ingredient}
                  id={`ingredient-${index}`}
                  onChange={() => handleIngredientChange(ingredient)}
                />
                <label className="form-check-label" htmlFor={`ingredient-${index}`}>
                  {ingredient}
                </label>
              </div>
            </div>
          ))}

<button className="btn btn-primary rounded-pill mt-3" onClick={handleSubmit}>
        Find Cocktails
      </button>

        </div>
        
      )}


    </div>
  );
};

export default IngredientsForm;
