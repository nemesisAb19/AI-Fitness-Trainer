import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import logo from "../assets/befit-logo-black.png";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <section className="fixed-footer">
      <div className="content-inner">
        <div className="footer-container">
          {/* Columns */}
          <div className="footer-grid">
            {/* Column 1 - Logo & Socials */}
            <div className="footer-column">
              <Link to="/" className="footer-logo-link">
                <img src={logo} alt="BeFit Logo" className="footer-logo" />
              </Link>
              <div className="social-icons">
                <FaFacebookF />
                <FaInstagram />
                <FaXTwitter />
              </div>
            </div>

            {/* Column 2 - Product */}
            <div className="footer-column">
              <h3>PRODUCT</h3>
              <ul>
                <li>ELITE MEMBERSHIP</li>
                <li>COACH</li>
                <Link to="/signin" >
                  <li>SIGN UP</li>
                </Link>
                <li>LOGIN</li>
              </ul>
            </div>

            {/* Column 3 - Resources */}
            <div className="footer-column">
              <h3>RESOURCES</h3>
              <ul>
                <li>WORKOUT PLANS</li>
                <li>EXERCISE DATABASE</li>
                <li>COMMUNITY</li>
              </ul>
            </div>

            {/* Column 4 - Legal */}
            <div className="footer-column">
              <h3>LEGAL</h3>
              <ul>
                <li>PRIVACY POLICY</li>
                <li>TERMS OF SERVICE</li>
                <li>COOKIE POLICY</li>
                <li>DO NOT SELL MY PERSONAL INFORMATION</li>
              </ul>
            </div>

            {/* Column 5 - About */}
            <div className="footer-column">
              <h3>ABOUT</h3>
              <ul>
                <li>OUR STORY</li>
                <li>PEOPLE</li>
              </ul>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="footer-bottom">
            <hr />
            <p>© {new Date().getFullYear()} BeFit. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
