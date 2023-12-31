import React, { useState, useEffect } from 'react';
import PlantCard from '../PlantCard/PlantCard';
import PlantDetails from '../PlantDetails/PlantDetails';
import { BrowserRouter as Router } from 'react-router-dom';
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
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlant, setNewPlant] = useState({
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

    // add plant
  const handleAddPlant = () => {
    fetch('http://localhost:9292/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newPlant.name,
        species: newPlant.species,
        image_url: newPlant.image_url,
      }),
    })
      .then((response) => response.json())
      .then((createdPlant) => {
        setPlants((prevPlants) => [createdPlant, ...prevPlants]);
        setNewPlant({
          name: '',
          species: '',
          image_url: '',
        });
        setShowAddForm(false);
      })
      .catch((error) => {
        console.error('Error adding new plant:', error);
      });
  };

    // edit plant
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
        setSelectedPlantId(updatedPlant.id); 
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

    // delete plant
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

  const handlePlantCardClick = (plantId) => {
    setSelectedPlantId(plantId);
    setShowEditForm(false);
  };

  //handlecancelplantdetails
  const handleCancelDetails = () => {
    setSelectedPlantId(null);
  };

  return (
    <Router>
     <div className="navbar">
        <div className="navbar-right">
        <button className="logout-button" onClick={handleLogout}>
            <i className="bx bxs-user-circle"></i>
            Logout
        </button>
        </div>
      </div>
      <div className="plant-dashboard">
        <h2>Plant Collection</h2>
        <button className="add-plant-button" onClick={() => setShowAddForm(true)}>
          Add Plant
        </button>

        {/*add new plant form*/}
        {showAddForm && (
          <div className="plant-form">
            <h3 className='form-title'>Add New Plant</h3>
            <form>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newPlant.name}
                  onChange={(e) =>
                    setNewPlant({ ...newPlant, name: e.target.value })
                  }
                />
                </div>
                <div className="form-group">
                    <label>Species:</label>
                    <input
                    type="text"
                    name="species"
                    value={newPlant.species}
                    onChange={(e) =>
                        setNewPlant({ ...newPlant, species: e.target.value })
                    }
                    />
                </div>
                <div className="form-group">
                    <label>Image URL:</label>
                    <input
                    type="text"
                    name="image_url"
                    value={newPlant.image_url}
                    onChange={(e) =>
                        setNewPlant({ ...newPlant, image_url: e.target.value })
                    }
                    />
                </div>
              <button type="button" onClick={handleAddPlant}>
                Save Plant
              </button>
              <button type="button" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
            </form>
          </div>
        )}

         {/*edit plant form*/}
        {showEditForm ? (
          <div className="plant-form">
            <h3 className='form-title'>Edit Plant</h3>
            <form>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={editFormValues.name}
                  onChange={(e) =>
                    setEditFormValues({ ...editFormValues, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Species:</label>
                <input
                  type="text"
                  name="species"
                  value={editFormValues.species}
                  onChange={(e) =>
                    setEditFormValues({ ...editFormValues, species: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Image URL:</label>
                <input
                  type="text"
                  name="image_url"
                  value={editFormValues.image_url}
                  onChange={(e) =>
                    setEditFormValues({ ...editFormValues, image_url: e.target.value })
                  }
                />
              </div>
              <button type="button" onClick={handleUpdatePlant}>
                Save Changes
              </button>
              <button type="button" onClick={() => setShowEditForm(false)}>
                Cancel
              </button>
            </form>
          </div>
        ) : null}

        {selectedPlantId ? (
        <PlantDetails
            plant={plants.find((plant) => plant.id === selectedPlantId)}
            onCancel={handleCancelDetails} // Pass the onCancel function here
            onEdit={() => handleEditPlant(plants.find((plant) => plant.id === selectedPlantId))}
        />
        ) : null}
        
        <div className="plant-card-container">
          {plants.map((plant) => (
            <PlantCard
                key={plant.id}
                plant={plant}
                onClick={handlePlantCardClick}
                isSelected={plant.id === selectedPlantId}
                onDelete={handlePlantDelete}
                onEdit={handleEditPlant}
            />
          ))}
        </div>
      </div>
    </Router>
  );
}

export default Dashboard;
