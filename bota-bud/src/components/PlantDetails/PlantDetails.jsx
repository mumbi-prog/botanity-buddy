import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlantDetails.css';

function PlantDetails({ plant }) {
    const navigate = useNavigate();
    const [careTasks, setCareTasks] = useState(plant.care_tasks);
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);

    const handleCheckboxClick = (id) => {
        setCareTasks((prevTasks) =>
        prevTasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        )
        );
    };

    const toggleAddTaskForm = () => {
      setShowAddTaskForm(!showAddTaskForm);
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

            <button onClick={toggleAddTaskForm} className="add-task-button">
              Add Task
            </button>
            <ul>
              {careTasks.map((task) => (
                  <li key={task.id} className={`task-item-${task.id}`}>
                  <div className="task-item">
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
                      <i class='bx bx-edit-alt' style={{ marginLeft: '10px' }}></i>
                      <i class='bx bx-trash' style={{ marginLeft: '10px' }}></i>
                    </span>
                  </div>
                  <div className="task-description">
                    <p>{task.description}</p>
                    <p>By {task.due_date}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={handleBackToDashboard} className='b-dash'>Back to Dashboard</button>
        </div>

        {showAddTaskForm && (
        <div className="add-task-form">
        </div>
      )}
        </div>
  );
}

export default PlantDetails;
