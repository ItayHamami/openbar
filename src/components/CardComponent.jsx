import React from 'react';

const CardComponent = ({ cocktail, onClick }) => {
  return (
    <div className="card position-relative p-0 bg-gradient rounded-4 shadow"
         style={{ backgroundImage: 'linear-gradient(135deg, #6a11cb, #2575fc)' }}>
      <div className="card-body bg-transparent p-0">
        <img src={cocktail.strDrinkThumb} loading='lazy' className="img-fluid w-100 rounded-top" alt={cocktail.strDrink} />
        <h5 className="color-secondary text-center my-3">{cocktail.strDrink}</h5>
      </div>
      <div className="card-footer bg-transparent">
        <button onClick={onClick} className="btn btn-primary rounded-pill w-100"
                style={{ backgroundImage: 'linear-gradient(135deg, #8E2DE2, #4A00E0)' }}>
          Show me how it's done!
        </button>
      </div>
    </div>
  );
};

export default CardComponent;
