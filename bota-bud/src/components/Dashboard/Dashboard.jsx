import React, { useState, useEffect } from 'react';
import PlantCard from '../PlantCard/PlantCard';
import PlantDetails from '../PlantDetails/PlantDetails';
import { BrowserRouter as Router} from 'react-router-dom';
import logoImage from '../../images/logo02.png'
import "./Dashboard.css"

function Dashboard({ handleLogout }) {
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
    setSelectedPlant(plantId);
};

  const handleBackToDashboard = () => {
    setSelectedPlant(null);
  };

  return (
    <Router>
        <div className="navbar">
        <div className="navbar-left">
          <img src={logoImage} alt="Botanical Buddy" className="logo-image" />
        </div>
        <div className="navbar-right">
          <button className="logout-button" onClick={handleLogout}>
             <i class='bx bxs-user-circle'></i>
            Logout
          </button>
        </div>
        </div>
        <div className='plant-dashboard'>
            <h2>Plant Collection</h2>
            <div className="plant-card-container">
            {plants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} onClick={handlePlantCardClick} isSelected={plant.id === selectedPlant}/>
            ))}
            </div>
            <div className={`deets-modal' ${selectedPlant ? '' : 'hidden'}`}>
                <div className="plant-deets">
                    {selectedPlant && (
                        <PlantDetails
                        plant={plants.find((plant) => plant.id === selectedPlant)}
                        onBackToDashboard={handleBackToDashboard}
                        />
                    )}
                </div>
            </div>
        </div>
    </Router>
  );
}

export default Dashboard;
