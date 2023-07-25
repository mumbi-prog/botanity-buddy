import React, { useState } from 'react';
import "./Login.css"

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        fetch('http://localhost:9292/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        })
        .then((response) => response.json())
        .then((data) => {
            // handle successful login by user
            if (data.success) {
            console.log('Login successful!');
            onLoginSuccess();
            } else {
                // handle unsuccwssful login by user
            console.error('Login failed. Please check your credentials.');
            }
        })
        .catch((error) => {
            console.error('Error during login:', error);
        });
    }

//   login form layout

  return (
    <div>
      <h2>Login</h2>
      <div className='credentials'>
            <input
            type="text"
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
      </div>
      <br />
      <div className='credentials'>
            <input
            type="password"
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
      </div>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
