import React from 'react';
import './LandingPage.css';
import lpimg from '../../images/lpimg1.png';

function LandingPage({ onLoginButtonClick }) {
  return (
    <div className='lp-container'>

      <div className='content-wrapper'>
          <div className='navbar' id='navbar'>
            <h3 className="logo-text">Botanical Buddy</h3>
            {/* Call onLoginButtonClick function when the button is clicked */}
            <button className='login-button' onClick={onLoginButtonClick}> Login </button>
          </div>

          <div className='home-content'>
              <div className="page-text">
                <h3>Botanical Buddy: <br />Your Green Paradise Awaits</h3>
                <p>Cultivate Your Green Oasis with Botanical Buddy! Discover the Joy of Growing and Caring for Your Plants, Let Nature Thrive at Your Fingertips!</p>
                <button className='login-btn2'>Explore your plant list</button>
              </div>
          </div>
          <img src={lpimg} alt="" className='lpimg'/>

      </div>
    </div>
  )
}

export default LandingPage;
