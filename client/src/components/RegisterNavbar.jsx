import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLanguage, FaSignInAlt, FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import appLogo from "../assets/befit-logo-white.png";
import "../styles/registerNavbar.css";

const RegisterNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  
    return (
      <header className="reg-navbar">
        <div className="reg-navbar-content">
          <Link to="/" className="reg-nav-logo-link">
            <img src={appLogo} alt="BEFIT" className="reg-nav-logo" />
          </Link>  
          {/* Language & Menu */}
          <div className="reg-nav-right">
            <div className="reg-nav-languages">
              <FaLanguage className="reg-language-icon" />
              <select>
                <option>English</option>
                <option>Hindi</option>
                <option>Bengali</option>
                <option>Spanish</option>
              </select>
            </div>
  
            {/* Menu Button */}
            <button onClick={() => setMenuOpen(true)} className="reg-menu-button">
              <FaBars />
            </button>
          </div>
        </div>
  
        {/* Fullscreen Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.5 }}
              className="reg-menu-overlay"
            >
              <button onClick={() => setMenuOpen(false)} className="reg-close-button">
                <MdClose />
              </button>
              <nav className="reg-menu-links">
                {/* <a href="#">My Account</a>
                <a href="#">Support</a> */}
                <div className="reg-terms-group">
                  <a href="#">TERMS & POLICIES</a>
                  <div className="reg-terms-dropdown">
                    <a href="#">PRIVACY POLICY</a>
                    <a href="#">TERMS OF SERVICE</a>
                    <a href="#">COOKIE POLICY</a>
                    <a href="#">DO NOT SELL MY PERSONAL INFORMATION</a>
                  </div>
                </div>
                <a href="#">MY ACCOUNT</a>
                <a href="#">SUPPORT</a>
                <a href="#">OUR STORY</a>
              </nav>
  
              <Link to="/signin" className="reg-signin-btn">
                <FaSignInAlt /> SIGN IN
              </Link>
  
              {/* Footer inside menu screen */}
              <div className="reg-menu-footer">
                <img src={appLogo} alt="BEFIT" />
                <p>Copyright © BEFIT 2025. All rights reserved.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    );
  };
  
  export default RegisterNavbar;