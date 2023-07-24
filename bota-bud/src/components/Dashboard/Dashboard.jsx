import React, { useState, useEffect } from 'react';

function Dashboard() {
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        fetchPlants();
    }, []);

    function fetchPlants() {
        fetch('http://localhost:9292/plants')
        .then((response) => response.json())
        .then((data) => setPlants(data))
        .catch((error) => console.error('Error fetching plants:', error));
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
        {renderPlants()}
        </div>
    );
}

export default Dashboard;
