import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./squats.css";
import Navbar from "../../components/Navbar";
import { ChevronRight, ChevronLeft } from "lucide-react";
import squats1 from "../../assets/BeFit_Exercises/gif_squats_men.gif";
import squats2 from "../../assets/BeFit_Exercises/gif_squats_women.gif";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const Squats = () => {
  const gifs = [squats1, squats2];
  const [current, setCurrent] = React.useState(0);

  const handleNext = () => setCurrent((prev) => (prev + 1) % gifs.length);
  const handlePrev = () => setCurrent((prev) => (prev - 1 + gifs.length) % gifs.length);

  const [showInstructions, setShowInstructions] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="squats-page">
        <motion.div
          className="squats-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Column */}
          <div className="squats-left">
            <div className="gif-container">
              <img src={gifs[current]} alt="squats" className="gif-image" />
              <div className="gif-nav left" onClick={handlePrev}><ChevronLeft /></div>
              <div className="gif-nav right" onClick={handleNext}><ChevronRight /></div>
            </div>
            <button className="try-btn" onClick={() => navigate("/squats/setup")}>Try it out</button>
          </div>

          {/* Right Column */}
          <div className="squats-right">
            <motion.h1
              className="squats-title"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Squats
            </motion.h1>
            <h3 className="target-title">Target Muscle Groups</h3>
            <div className="target-boxes">
              <div className="target-box">Upper Legs</div>
              <div className="target-box">Abs</div>
              <div className="target-box">Glutes</div>
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
                    The bodyweight squat is a fundamental lower body exercise that primarily targets the quadriceps, glutes, and hamstrings, while also engaging the core and calf muscles for stability. Here's a step-by-step guide on how to perform a standard bodyweight squat:
                    <br /><br />
                    <strong>Starting Position:</strong><br />
                    <strong>Stance:</strong> Place your hands on the ground, slightly wider than shoulder-width apart.<br />
                    <strong>Foot Angle:</strong> Extend your legs straight behind you, with your feet together or slightly apart. Your body should form a straight line from your head to your heels.<br />
                    <strong>Posture:</strong> Tighten your core muscles to keep your body straight and avoid sagging in the lower back.
                    <br /><br />
                    <strong>Lowering Phase:</strong><br />
                    <strong>Initiate the Movement:</strong> Begin by hinging at your hips, as if you are about to sit down in a chair.<br />
                    <strong>Maintain Back Position:</strong> Keep your back straight and your core engaged throughout the movement. Avoid rounding your back.<br />
                    <strong>Knee Tracking:</strong> As you lower, allow your knees to track over your toes. It's okay for your knees to go slightly past your toes, as long as you maintain good form and don't experience any pain.<br /> 
                    <strong>Depth:</strong> Lower your hips as far as comfortably possible, ideally until your thighs are parallel to the ground or even slightly below. This is often referred to as "breaking parallel." However, listen to your body and only go as low as your mobility allows while maintaining good form.<br />
                    <strong>Weight Distribution:</strong> Keep your weight evenly distributed across your entire foot, or slightly towards your heels. Avoid letting your weight shift onto your toes.                 
                    <br /><br />
                    <strong>Ascending Phase:</strong><br />
                    <strong>Drive Up:</strong> Initiate the upward movement by pressing through your heels and engaging your glutes and quadriceps.<br />
                    <strong>Maintain Back Position:</strong> Continue to keep your back straight and your core engaged as you stand back up.<br />
                    <strong>Full Extension:</strong> Return to the starting standing position, fully extending your hips and knees.                   
                    
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

export default Squats;

