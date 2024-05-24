import React from 'react';
import './LandingPage.css';
import logoImage from '../../images/logo02.png';
import bgImg from '../../images/bg01.png';

function LandingPage({ onLoginButtonClick }) {
  return (
    <div className='lp-container'>

      <div className='content-wrapper'>
          <div className='navbar' id='navbar'>
            <div className="logo">
              <img src={logoImage} alt="Botanical Buddy" className="logo-image" />
              <span className="logo-text">Botanical Buddy</span>
            </div>
            {/* Call onLoginButtonClick function when the button is clicked */}
            <button className='login-button' onClick={onLoginButtonClick}>
              Login
            </button>
          </div>

          <div className='home-content'>
              <div className="page-text">
                <h3>Botanical Buddy: <br />Your Green Paradise Awaits</h3>
                <p>Cultivate Your Green Oasis with Botanical Buddy! Discover the Joy of Growing and Caring for Your Plants, Let Nature Thrive at Your Fingertips!</p>
              </div>
              <div className="background-image">
                <img src={bgImg} alt="Botanical Buddy" className="bkgimg" />
              </div>
          </div>

      </div>
    </div>
  )
}

export default LandingPage;
