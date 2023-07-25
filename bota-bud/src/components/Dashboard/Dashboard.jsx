import React, { useState, useEffect } from 'react';
import PlantCard from './PlantCard';
import PlantDetails from './PlantDetails';

function Dashboard() {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    fetchPlants();
  }, []);

  function fetchPlants() {
    fetch('http://localhost:9292/plants')
      .then((response) => response.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error('Error fetching plants:', error));
  }

  const handlePlantCardClick = (plantId) => {
    const selectedPlant = plants.find((plant) => plant.id === plantId);
    setSelectedPlant(selectedPlant);
  };

  return (
    <div>
      <h2>Plant Collection</h2>
      <div className="plant-card-container">
        {plants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} onClick={handlePlantCardClick} />
        ))}
      </div>
      {selectedPlant && <PlantDetails plant={selectedPlant} />}
    </div>
  );
}

export default Dashboard;
