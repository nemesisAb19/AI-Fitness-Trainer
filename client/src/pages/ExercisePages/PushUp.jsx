import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./pushup.css";
import Navbar from "../../components/Navbar";
import { ChevronRight, ChevronLeft } from "lucide-react";
import pushup1 from "../../assets/BeFit_Exercises/Push_Up_5.gif";
import pushup2 from "../../assets/BeFit_Exercises/Push_Up_6.gif";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const PushUp = () => {
  const gifs = [pushup1, pushup2];
  const [current, setCurrent] = React.useState(0);

  const handleNext = () => setCurrent((prev) => (prev + 1) % gifs.length);
  const handlePrev = () => setCurrent((prev) => (prev - 1 + gifs.length) % gifs.length);

  const [showInstructions, setShowInstructions] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="pushup-page">
        <motion.div
          className="pushup-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Column */}
          <div className="pushup-left">
            <div className="gif-container">
              <img src={gifs[current]} alt="pushup" className="gif-image" />
              <div className="gif-nav left" onClick={handlePrev}><ChevronLeft /></div>
              <div className="gif-nav right" onClick={handleNext}><ChevronRight /></div>
            </div>
            <button className="try-btn" onClick={() => navigate("/pushups/setup")}>Try it out</button>
          </div>

          {/* Right Column */}
          <div className="pushup-right">
            <motion.h1
              className="pushup-title"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Push-Up
            </motion.h1>
            <h3 className="target-title">Target Muscle Groups</h3>
            <div className="target-boxes">
              <div className="target-box">Body Weight</div>
              <div className="target-box">Chest</div>
              <div className="target-box">Shoulders</div>
            </div>

            <div className="info-columns">
              <div className="info-item">
                <h4>DIFFICULTY</h4>
                <p>Beginner</p>
              </div>
              <div className="info-item">
                <h4>EXERCISE TYPE</h4>
                <p>Strength</p>
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <h3 className="instructions-title" onClick={() => setShowInstructions(prev => !prev)} style={{ cursor: "pointer", display: "inline-block" }}>
                {showInstructions ? "▼" : "▶"} Instructions
              </h3>
              <AnimatePresence>
                {showInstructions && (
                  <motion.p className="instructions-text" initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  >
                    The push-up is a fundamental bodyweight exercise that primarily targets the chest, shoulders, and triceps, while also engaging the core and other stabilizing muscles. Here's a step-by-step guide on how to perform a standard push-up:
                    <br /><br />
                    <strong>Starting Position:</strong><br />
                    <strong>Hand Placement:</strong> Place your hands on the ground, slightly wider than shoulder-width apart.<br />
                    <strong>Body Alignment:</strong> Extend your legs straight behind you, with your feet together or slightly apart. Your body should form a straight line from your head to your heels.<br />
                    <strong>Engage Your Core:</strong> Tighten your core muscles to keep your body straight and avoid sagging in the lower back.
                    <br /><br />
                    <strong>Lowering Phase:</strong><br />
                    Inhale as you bend your elbows and lower your body toward the ground. Keep your elbows at about a 45-degree angle to your body. Lower yourself until your chest nearly touches the ground, while maintaining a straight body line.
                    <br /><br />
                    <strong>Pushing Phase:</strong><br />
                    Exhale as you push through your palms to straighten your arms and lift your body back to the starting position.
                    Keep your core engaged and your body in a straight line throughout the movement.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default PushUp;

