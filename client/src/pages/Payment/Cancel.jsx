import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './successCancel.css';

const Cancel = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      navigate("/payment");
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="payment-status-page">
      <div className="animated-icon cancel-icon">✕</div>
      <h1 className="status-heading cancel-text">Payment Unsuccessful!</h1>
      <div className="redirect-box cancel-box">
        You will be redirected to the Payment Page in {countdown} seconds
      </div>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Cancel;
