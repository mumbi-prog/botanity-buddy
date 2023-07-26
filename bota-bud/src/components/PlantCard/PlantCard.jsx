import React from 'react';
import './PlantCard.css';

function PlantCard({ plant, onClick }) {
  return (
    <div className="plant-card" onClick={() => onClick(plant.id)}>
      <img src={plant.image_url} alt={plant.name} />
      <div className="plant-info">
        <div className='e-and-d'>
            <i class='bx bx-edit-alt'></i>
            <i class='bx bx-trash'></i>
        </div>
        <div className="info-holder">
            <h3>{plant.name}</h3>
            <p>Species: {plant.species}</p>
        </div>
      </div>
    </div>
  );
}

export default PlantCard;
