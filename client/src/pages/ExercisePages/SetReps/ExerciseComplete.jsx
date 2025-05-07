import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import "./exerciseComplete.css";
import { useParams } from "react-router-dom";

const exerciseData = {
    bicep: {
      emoji: "💪",
      title: "Biceps Blasted!",
      message: "Feel that pump? You're one rep closer to stronger arms!",
    },
    squats: {
      emoji: "🏋️‍♂️",
      title: "Squats Complete!",
      message: "Great job powering through those squats! Legs like steel!",
    },
    pushup: {
      emoji: "🤸‍♂️",
      title: "Pushups Done!",
      message: "Chest and arms are feeling the burn – nice work!",
    },
    plank: {
      emoji: "🧘",
      title: "Plank Mastered!",
      message: "Core strength activated. Balance and power in one!",
    },
    default: {
      emoji: "🎉",
      title: "Workout Complete!",
      message: "Amazing job! You crushed your session. Keep pushing!",
    },
  };

const ExerciseComplete = () => {
    const { exerciseName } = useParams();
    const exercise = exerciseData[exerciseName?.toLowerCase()] || exerciseData.default;
  
  return (
    <>
      <Navbar />
      <motion.div
        className="exercise-complete-container"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="celebration"
          initial={{ scale: 0 }}
          animate={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          {exercise.emoji}
        </motion.div>

        <motion.h1
          className="congrats-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {exercise.emoji}
        </motion.h1>

        <motion.p
          className="congrats-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {exercise.message}
        </motion.p>

        <motion.button
          className="back-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = "/exercise"}
        >
          Back to Exercises
        </motion.button>
      </motion.div>
      <Footer />
    </>
  );
};

export default ExerciseComplete;
