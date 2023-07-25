import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlantDetails.css';

function PlantDetails({ plant }) {
    const navigate = useNavigate();
    const [careTasks, setCareTasks] = useState(plant.care_tasks);

    const handleCheckboxClick = (id) => {
        setCareTasks((prevTasks) =>
        prevTasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        )
        );
    };

    const handleBackToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div className="plant-details">
        <div className="plant-image">
            <img src={plant.image_url} alt={plant.name} />
        </div>
        <div className="plant-info">
            <h2>{plant.name}</h2>
            <p>Species: {plant.species}</p>
            <h3>Care Tasks</h3>
            <ul>
            {careTasks.map((task) => (
                <li key={task.id}>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleCheckboxClick(task.id)}
                />
                <span
                    style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    }}
                >
                    {task.name}
                </span>
                    <p>{task.description}, </p>
                    <p>By {task.due_date}</p>
                </li>
            ))}
            </ul>
            <button onClick={handleBackToDashboard} className='b-dash'>Back to Dashboard</button>
        </div>
        </div>
  );
}

export default PlantDetails;
