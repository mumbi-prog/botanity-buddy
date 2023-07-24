import React, { useState, useEffect } from 'react';

function Dashboard() {
    const [plants, setPlants] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPlants();
    }, []);

    function fetchPlants() {
        fetch('http://localhost:9292/plants')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to fetch plant data');
            }
            return response.json();
          })
          .then((data) => {
            setPlants(data);
            setError(null); 
          })
          .catch((error) => {
            console.error('Error fetching plants:', error);
            setError('Error fetching plant data. Please try again later.');
          });
    }

    function renderPlants() {
        return plants.map((plant) => (
        <div key={plant.id}>
            <h4>{plant.name}</h4>
            <p>Species: {plant.species}</p>
            <img src={plant.image_url} alt={plant.name} />
        </div>
        ));
    }

    return (
        <div>
        <h2>Plant Collection</h2>
        {error ? <p>{error}</p> : renderPlants()}
        </div>
    );
}

export default Dashboard;
