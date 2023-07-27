import React, { useState, useEffect } from 'react';
import PlantCard from '../PlantCard/PlantCard';
import PlantDetails from '../PlantDetails/PlantDetails';
import { BrowserRouter as Router } from 'react-router-dom';
import logoImage from '../../images/logo02.png';
import './Dashboard.css';

function Dashboard({ handleLogout }) {
  const [plants, setPlants] = useState([]);
  const [selectedPlantId, setSelectedPlantId] = useState(null); 
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormValues, setEditFormValues] = useState({
    id: '',
    name: '',
    species: '',
    image_url: '',
  });

  useEffect(() => {
    fetchPlants();
  }, []);

  function fetchPlants() {
    fetch('http://localhost:9292/plants')
      .then((response) => response.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error('Error fetching plants:', error));
  }

  const handlePlantDelete = (plantId) => {
    fetch(`http://localhost:9292/plants/${plantId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Plant deleted successfully.') {
          setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== plantId));
        }
      })
      .catch((error) => console.error('Error deleting plant:', error));
  };

  const handleUpdatePlant = () => {
    fetch(`http://localhost:9292/plants/${editFormValues.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: editFormValues.name,
        species: editFormValues.species,
        image_url: editFormValues.image_url,
      }),
    })
      .then((response) => response.json())
      .then((updatedPlant) => {
        setPlants((prevPlants) =>
          prevPlants.map((plant) => (plant.id === updatedPlant.id ? updatedPlant : plant))
        );
        setShowEditForm(false);
      })
      .catch((error) => console.error('Error updating plant:', error));
  };

  const handleEditPlant = (plant) => {
    setEditFormValues({
      id: plant.id,
      name: plant.name,
      species: plant.species,
      image_url: plant.image_url,
    });
    setShowEditForm(true);
  };

  const handlePlantCardClick = (plantId) => {
    setSelectedPlantId(plantId);
    setShowEditForm(false);
  };

  const handleBackToDashboard = () => {
    setSelectedPlantId(null);
    setShowEditForm(false); 
  };

  return (
    <Router>
      <div className="navbar">
        <div className="navbar-left">
          <img src={logoImage} alt="Botanical Buddy" className="logo-image" />
        </div>
        <div className="navbar-right">
          <button className="logout-button" onClick={handleLogout}>
            <i className="bx bxs-user-circle"></i>
            Logout
          </button>
        </div>
      </div>
      <div className="plant-dashboard">
        <h2>Plant Collection</h2>
        {selectedPlantId && (
          <PlantDetails
            plant={plants.find((plant) => plant.id === selectedPlantId)}
            onBackToDashboard={handleBackToDashboard}
          />
        )}
        <div className="plant-card-container">
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onClick={handlePlantCardClick}
              isSelected={plant.id === selectedPlantId}
              onDelete={handlePlantDelete}
            />
          ))}
        </div>
      </div>
    </Router>
  );
}

export default Dashboard;
