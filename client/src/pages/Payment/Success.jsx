import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './successCancel.css';

const Success = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      navigate("/login");
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="payment-status-page">
      <div className="animated-icon success-icon">✓</div>
      <h1 className="status-heading success-text">Payment Successful!</h1>
      <p className="status-subtext">Thank you for your purchase.</p>
      <div className="redirect-box success-box">
        You will be redirected to the Login Page in {countdown} seconds
      </div>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Success;
