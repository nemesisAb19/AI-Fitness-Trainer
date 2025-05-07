import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/splashScreen.css';
import logo from '../assets/befit-logo-black.png'; 

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/exercise');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <img src={logo} alt="BeFit Logo" className="splash-logo" />
    </div>
  );
};

export default SplashScreen;
