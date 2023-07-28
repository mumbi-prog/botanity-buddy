import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const isLoggedInLocalStorage = localStorage.getItem('isLoggedIn');
    if (isLoggedInLocalStorage) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    localStorage.setItem('isLoggedIn', true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
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
