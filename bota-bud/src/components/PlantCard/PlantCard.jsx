import React from 'react';
import './PlantCard.css';

function PlantCard({ plant, onClick }) {
  return (
    <div className="plant-card" onClick={() => onClick(plant.id)}>
      <img src={plant.image_url} alt={plant.name} />
      <div className="plant-info">
        <h3>{plant.name}</h3>
        <p>Species: {plant.species}</p>
      </div>
    </div>
  );
}

export default PlantCard;
