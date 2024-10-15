import React, { useEffect, useState } from 'react';
import { getCocktailById } from '../utils/apiService'; // Import the new function

const CocktailModal = ({ isOpen, onClose, cocktailId }) => {
  const [cocktail, setCocktail] = useState(null);
  
  useEffect(() => {
    const fetchCocktail = async () => {
      if (cocktailId) {
        try {
          const cocktailData = await getCocktailById(cocktailId); // Fetch cocktail by ID
          setCocktail(cocktailData);
        } catch (error) {
          console.error('Error fetching cocktail:', error);
        }
      }
    };

    fetchCocktail();
  }, [cocktailId]);

  return (
    isOpen && cocktail && (
      <>
        <div className="modal-backdrop fade show" onClick={onClose}></div>
        <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div 
              className="position-relative p-1" 
              style={{
                background: 'linear-gradient(90deg, #6a11cb, #2575fc)', 
                borderRadius: '10px'
              }}
            >
              <div className="modal-content border-0 rounded-3 shadow-lg">
                <div className="modal-header">
                  <h2 className="modal-title">{cocktail.strDrink}</h2>
                  <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-6 mb-3 d-flex justify-content-center align-items-center">
                        <img 
                          src={cocktail.strDrinkThumb} 
                          alt={cocktail.strDrink} 
                          className="img-fluid rounded-3 shadow"
                          style={{ maxWidth: '100%', height: 'auto' }} 
                        />
                      </div>
                      <div className="col-md-6">
                        <h5 className="mb-3 text-secondary fw-bold">Ingredients:</h5>
                        <ul className="list-unstyled ingredients-list">
                          {Array.from({ length: 15 }).map((_, index) => {
                            const ingredient = cocktail[`strIngredient${index + 1}`];
                            const measurement = cocktail[`strMeasure${index + 1}`];

                            return ingredient && (
                              <li key={index} className="d-flex mb-1">
                                <span className="measurement me-2 fw-bold text-primary">{measurement || ''}</span>
                                <span className="ingredient">{ingredient}</span>
                              </li>
                            );
                          })}
                        </ul>
                        <h5 className="mt-4 mb-2 text-secondary fw-bold">Instructions:</h5>
                        <p className="text-muted">{cocktail.strInstructions}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer justify-content-end p-2">
                  <button type="button" className="btn btn-light rounded-pill px-4" onClick={onClose}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default CocktailModal;
