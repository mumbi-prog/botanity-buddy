import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
      setIsLoggedIn(true);
    };

    return (
      <div className="App">
        <LandingPage />
        
        {isLoggedIn ? <Dashboard /> : <Login onLoginSuccess={handleLoginSuccess} />}
      </div>
    );
}

export default App;
