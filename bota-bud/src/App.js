import React, { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {!isLoggedIn && !showLogin && <LandingPage onLoginButtonClick={() => setShowLogin(true)} />}
      {showLogin && !isLoggedIn && <Login onLoginSuccess={handleLoginSuccess} />}
      {isLoggedIn && <Dashboard handleLogout={handleLogout} />}
    </div>
  );
}

export default App;
