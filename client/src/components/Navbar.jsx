import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars } from "react-icons/fa";
import { LogOut } from 'lucide-react';
import { MdClose } from "react-icons/md";
import appLogo from "../assets/befit-logo-white.png";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav-content">
        <div className="nav-logo-box">
          <img src={appLogo} alt="BEFIT" className="nav-logo" />
        </div>

        <div className="nav-center-tabs">
          <Link to="/exercise" className="nav-tab">EXERCISES</Link>

          <div className="nav-dropdown">
            <span className="nav-tab">SERVICES</span>
            <div className="nav-dropdown-menu">
              <Link to="/nutrition-plan">NUTRITION PLAN</Link>
              <Link to="/routine-builder">ROUTINE BUILDER</Link>
            </div>
          </div>

          <Link to="/about" className="nav-tab">ABOUT</Link>
          <Link to="/contact" className="nav-tab">CONTACT</Link>
        </div>

        <div className="nav-right">
          <button onClick={() => setMenuOpen(true)} className="nav-menu-button">
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
            className="nav-menu-overlay"
          >
            <button onClick={() => setMenuOpen(false)} className="nav-close-button">
              <MdClose />
            </button>
            <nav className="nav-menu-links">
              <div className="nav-terms-group">
                <a href="#">TERMS & POLICIES</a>
                <div className="nav-terms-dropdown">
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

            {/* <Link to="/signin" className="nav-signin-btn">
              <FaSignInAlt /> SIGN IN
            </Link> */}
            <Link to="/login" className="nav-signin-btn">
              <LogOut className="w-5 h-5" /> SIGN OUT
            </Link>

            <div className="nav-menu-footer">
              <img src={appLogo} alt="BEFIT" />
              <p>Copyright © BEFIT 2025. All rights reserved.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
