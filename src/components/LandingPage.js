import React from 'react';
import { useNavigate } from 'react-router-dom';
import Landing from '../images/landing.png';
import './LandingPage.css';
 

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="container text-center mt-5">
      
      <h1 className="welcome-text">Welcome to IMS-Connect</h1>
      <p className="lead">Your one-stop solution for managing ideas and innovations within your organization.</p>
      <img src={Landing} alt="Central" className="img-fluid my-4 landing-image" />
      <p className="site-message">Join us to explore, share, and implement innovative ideas that drive success and growth.</p>
      <button className="btn btn-primary btn-lg get-started-btn" onClick={handleGetStarted}>Get Started</button>
    </div>
  );
}

export default LandingPage;