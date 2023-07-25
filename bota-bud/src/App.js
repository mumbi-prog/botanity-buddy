import React, { useState } from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

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
