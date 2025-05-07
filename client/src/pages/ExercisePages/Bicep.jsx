import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./bicep.css";
import Navbar from "../../components/Navbar";
import { ChevronRight, ChevronLeft } from "lucide-react";
import bicep1 from "../../assets/BeFit_Exercises/gif_bicepcurls_men.gif";
import bicep2 from "../../assets/BeFit_Exercises/gif_bicepcurls_women.gif";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const Bicep = () => {
  const gifs = [bicep1, bicep2];
  const [current, setCurrent] = React.useState(0);

  const handleNext = () => setCurrent((prev) => (prev + 1) % gifs.length);
  const handlePrev = () => setCurrent((prev) => (prev - 1 + gifs.length) % gifs.length);

  const [showInstructions, setShowInstructions] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="bicep-page">
        <motion.div
          className="bicep-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Column */}
          <div className="bicep-left">
            <div className="gif-container">
              <img src={gifs[current]} alt="bicep" className="gif-image" />
              <div className="gif-nav left" onClick={handlePrev}><ChevronLeft /></div>
              <div className="gif-nav right" onClick={handleNext}><ChevronRight /></div>
            </div>
            <button className="try-btn" onClick={() => navigate("/bicep/setup")}>
              Try it out
            </button>
          </div>

          {/* Right Column */}
          <div className="bicep-right">
            <motion.h1
              className="bicep-title"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Bicep Curl
            </motion.h1>
            <h3 className="target-title">Target Muscle Groups</h3>
            <div className="target-boxes">
              <div className="target-box">Biceps</div>
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
                    The bicep curl is a fundamental exercise that primarily targets the biceps brachii muscle in the front of the upper arm. Here's a step-by-step guide on how to perform a standard dumbbell bicep curl:
                    <br /><br />
                    <strong>Starting Position:</strong><br />
                    <strong>Stance:</strong> Stand with your feet shoulder-width apart, maintaining a slight bend in your knees for stability.<br />
                    <strong>Grip:</strong> Hold a dumbbell in each hand with an underhand grip (palms facing forward).<br />
                    <strong>Arm Position:</strong> Let your arms hang straight down at your sides, with the dumbbells resting against your thighs.<br />
                    <strong>Posture:</strong> Keep your back straight, chest up, and shoulders relaxed (not shrugged).
                    <br /><br />

                    <strong>Curling Phase:</strong><br />
                    <strong>Exhale</strong> as you slowly curl the dumbbells up towards your shoulders.<br />
                    <strong>Movement:</strong> Keep your elbows tucked in close to your sides throughout the movement. The primary movement should occur at your elbow joint.<br />
                    <strong>Focus:</strong> Concentrate on squeezing your biceps at the top of the movement.<br />
                    <strong>Wrist Position:</strong> Maintain a neutral wrist position (don't bend your wrists forward or backward).
                    <br /><br />

                    <strong>Lowering Phase:</strong><br />
                    <strong>Inhale</strong> as you slowly lower the dumbbells back down to the starting position.<br />
                    <strong>Control:</strong> Resist the pull of gravity and control the descent of the dumbbells. Don't let them drop quickly.<br />
                    <strong>Full Extension:</strong> Allow your arms to fully extend at the bottom, but avoid locking your elbows.<br />                    
                    <br /><br />
                    <strong>Important Considerations:</strong><br />
                    <strong>Weight Selection:</strong> Choose a weight that allows you to maintain good form throughout the entire range of motion for the desired number of repetitions.<br />
                    <strong>Momentum:</strong> Avoid using momentum or swinging your body to lift the weight. The movement should be controlled and driven by your biceps.<br />
                    <strong>Breathing:</strong> Remember to exhale during the exertion (curling up) and inhale during the relaxation (lowering down).<br />
                    <strong>Variations:</strong> There are variations of the bicep curl, such as hammer curls (palms facing each other) and concentration curls, which target the biceps from slightly different angles.
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

export default Bicep;

