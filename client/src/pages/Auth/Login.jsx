import React from "react";
import "./login.css";
import logo from "../../assets/befit-logo-white.png";
import background from "../../assets/Login_bg.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
      navigate("/signin/final");
    };

    const handleSignInClick = () => {
      navigate('/splash');
    };
  return (
    <div className="login-page" style={{ backgroundImage: `url(${background})` }}>
      <div className="login-form-container">
        <div className="login-form">
          <img src={logo} alt="BeFit Logo" className="login-logo" />
          <input type="email" placeholder="Email" className="login-input" />
          <input type="password" placeholder="Password" className="login-input" />
          <div className="forgot-password">Forgot Password?</div>
          <button className="signin-btn" onClick={handleSignInClick}>SIGN IN</button>
          <p className="signup-link">
            Don’t have an Account? <span className="signup-hover" onClick={handleSignUpClick}>SIGN UP</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
