import React, { useState } from "react";
import "./finalSignIn.css";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import logo from "../../assets/befit-logo-white.png";
import { FaXTwitter } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const FinalSignIn = () => {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState(null); // 'signin' or 'signup'

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="final-signin-container">
      <div className="logo-section" onClick={handleLogoClick}>
        <img src={logo} alt="BeFit Logo" className="app-logo" />
      </div>
      <h1 className="welcome-text">Welcome</h1>

      <div className="auth-buttons">
        <button className="auth-btn signin-btn" onClick={() => setActiveForm("signin")}>
          SIGN IN
        </button>
        <button className="auth-btn signup-btn" onClick={() => setActiveForm("signup")}>
          SIGN UP
        </button>
      </div>

      <p className="continue-with">Continue with</p>

      <div className="social-icons">
        <FaFacebookF className="icon facebook" />
        <FaInstagram className="icon google" />
        <FaXTwitter className="icon twitter" style={{color: "#eee"}}/>
      </div>

      {activeForm && (
        <>
          <div className="overlay" onClick={() => setActiveForm(null)}></div>

          {activeForm === "signup" && (
            <div className="signup-slideup">
              <button className="close-btn" onClick={() => setActiveForm(null)}>
                <IoClose size={24} />
              </button>
              <h2>Create Your Account</h2>
              <form className="signup-form">
                <div className="input-container">
                  <input type="text" required />
                  <label>Full Name</label>
                </div>
                <div className="input-container">
                  <input type="email" required />
                  <label>Email</label>
                </div>
                <div className="input-container">
                  <input type="password" required />
                  <label>Password</label>
                </div>
                <button className="submit-signup" onClick={() => navigate("/payment")}>SIGN UP</button>
              </form>
              <p className="existing-user">
                Already a member?{" "}
                <span onClick={() => setActiveForm("signin")}>SIGN IN</span>
              </p>
            </div>
          )}

          {activeForm === "signin" && (
            <div className="signup-slideup">
              <button className="close-btn" onClick={() => setActiveForm(null)}>
                <IoClose size={24} />
              </button>
              <h2>Welcome Back</h2>
              <form className="signup-form">
                <div className="input-container">
                  <input type="email" required />
                  <label>Email</label>
                </div>
                <div className="input-container">
                  <input type="password" required />
                  <label>Password</label>
                </div>
                <div className="forgot-password">
                  <span>Forgot Password?</span>
                </div>
                <button className="submit-signup">SIGN IN</button>
              </form>
              <p className="existing-user">
                Don&apos;t have an account?{" "}
                <span onClick={() => setActiveForm("signup")}>SIGN UP</span>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FinalSignIn;
