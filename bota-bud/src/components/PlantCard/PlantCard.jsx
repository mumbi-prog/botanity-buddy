import React from 'react';
import './PlantCard.css';

function PlantCard({ plant, onClick, isSelected, onDelete}) {

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm('Sure about deleting the plant??');
    if (confirmDelete) {
        onDelete(plant.id);
    }
  };

  return (
    <div className={`plant-card ${isSelected ? 'selected' : ''}`}>
      <img src={plant.image_url} alt={plant.name} />
      <div className="plant-info">
        <div className='e-and-d'>
            <i className="bx bx-expand" title="expand" onClick={() => onClick(plant.id)}></i>
            <i class='bx bx-edit-alt'></i>
            <i class='bx bx-trash' onClick={handleDeleteClick}></i>
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
