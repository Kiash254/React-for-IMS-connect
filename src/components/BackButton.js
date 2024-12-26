import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css'; // Import the CSS file for styling

function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <button className="back-button" onClick={handleBack}>
      Back
    </button>
  );
}

export default BackButton;