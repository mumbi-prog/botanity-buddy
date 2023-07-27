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

    const [newTask, setNewTask] = useState({
      name: '',
      description: '',
      due_date: '',
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const toggleAddTaskForm = () => {
      setShowAddTaskForm(!showAddTaskForm);
    };

    const handleAddTask = () => {

      fetch('http://localhost:9292/care_tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newTask.name,
          description: newTask.description,
          due_date: newTask.due_date,
          plant_id: plant.id,
        }),
      })
        .then((response) => response.json())
        .then((createdTask) => {
          setCareTasks((prevTasks) => [...prevTasks, createdTask]);
          toggleAddTaskForm();
        })
        .catch((error) => {
          console.error('Error adding care task:', error);
        });
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
          <h3>Add New Care Task</h3>
          <form>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={newTask.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Due Date:</label>
              <input
                type="date"
                name="due_date"
                value={newTask.due_date}
                onChange={handleInputChange}
              />
              </div>
            <button type="button" onClick={handleAddTask}>
              Save
            </button>
            <button type="button" onClick={toggleAddTaskForm}>
              Cancel
            </button>
          </form>
        </div>
      )}
        </div>
  );
}

export default PlantDetails;