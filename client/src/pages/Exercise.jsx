import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from "react-router-dom";
import '../styles/exercise.css';
import appLogo from "../assets/befit-logo-white.png";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

import bodyweight from "../assets/equipment/bodyweight.jpg";
import barbell from "../assets/equipment/barbell.jpg";
import dumbbells from "../assets/equipment/dumbbells.jpg";
import kettlebell from "../assets/equipment/kettlebell.jpg";
import bench from "../assets/equipment/bench.jpg";
import cardioMachine from "../assets/equipment/cardioiMachines.jpg";
import strengthMachine from "../assets/equipment/strengthMachine.jpg";
import plates from "../assets/equipment/plates.jpg";
import pullup from "../assets/equipment/pullup_bar.jpg";
import ball from "../assets/equipment/exercise_ball.jpg";
import bands from "../assets/equipment/bands.jpg";

const Exercise = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const muscles = [
    { name: 'Abs', img: require('../assets/muscles/abs.png') },
    { name: 'Back', img: require('../assets/muscles/back.png') },
    { name: 'Biceps', img: require('../assets/muscles/biceps.png') },
    { name: 'Cardio', img: require('../assets/muscles/cardio.png') },
    { name: 'Chest', img: require('../assets/muscles/chest.png') },
    { name: 'Forearms', img: require('../assets/muscles/forearm.png') },
    { name: 'Glutes', img: require('../assets/muscles/glutes.png') },
    { name: 'Shoulders', img: require('../assets/muscles/shoulder.png') },
    { name: 'Triceps', img: require('../assets/muscles/triceps2.png') },
    { name: 'Upper Legs', img: require('../assets/muscles/upper_legs.png') },
    { name: 'Lower Legs', img: require('../assets/muscles/shin.png') },
  ];

  const scrollContainer = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollContainer;
    if (direction === 'left') {
      current.scrollBy({ left: -300, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const [selectedMuscles, setSelectedMuscles] = useState([]);

  const handleMuscleClick = (muscle) => {
    setSelectedMuscles((prevSelected) => 
      prevSelected.includes(muscle)
        ? prevSelected.filter((m) => m !== muscle)  // deselect
        : [...prevSelected, muscle]               // select
    );
  };


  const equipmentData = [
    { name: "Body Weight", image: bodyweight },
    { name: "Barbell", image: barbell },
    { name: "Dumbbells", image: dumbbells },
    { name: "Kettlebell", image: kettlebell },
    { name: "Bench", image: bench },
    { name: "Cardio", image: cardioMachine },
    { name: "Strength", image: strengthMachine },
    { name: "Plates", image: plates },
    { name: "Pullup Bar", image: pullup },
    { name: "Ball", image: ball },
    { name: "Bands", image: bands },
  ];  

  const scrollEquipment = (direction) => {
    const container = document.getElementById("equipment-scroll");
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };
  
  

  const nextSectionRef = useRef(null);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false); // Scroll Down -> hide
    } else {
      setShowNavbar(true);  // Scroll Up -> show
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const scrollToNextSection = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const exerciseData = [
    {
      name: "Push Up",
      image: require("../assets/BeFit_Exercises/PushUp_1.jpg"),
      description: "A bodyweight exercise that primarily targets the chest, shoulders, and triceps. Helps build upper body strength and endurance. Can be modified for beginners or intensified for advanced levels.",
      muscles: ["Chest", "Triceps", "Shoulders", "Abs"],
    },
    {
      name: "Bicep Curls",
      image: require("../assets/BeFit_Exercises/BicepCurls_2.jpg"),
      description: "Strength training exercise targeting the biceps. Can be performed using dumbbells or barbells. Helps improve arm strength and definition. Maintain controlled motion for best results.",
      muscles: ["Biceps", "Forearms"],
    },
    {
      name: "Mountain Climbers",
      image: require("../assets/BeFit_Exercises/MountainClimbers_3.jpg"),
      description: "A full-body cardio move that engages core, legs, and shoulders. Great for burning calories. Improves endurance and agility. Can be done anywhere with no equipment.",
      muscles: ["Cardio", "Abs", "Upper Legs"],
    },
    {
      name: "Squats",
      image: require("../assets/BeFit_Exercises/squats_1.jpg"),
      description: "A fundamental lower-body movement. Builds strength in quads, hamstrings, and glutes. Enhances core stability and posture. Can be done with or without weights.",
      muscles: ["Glutes", "Upper Legs"],
    },
    {
      name: "Skipping",
      image: require("../assets/BeFit_Exercises/Skipping_1.jpg"),
      description: "Cardiovascular workout using a jump rope. Improves coordination, footwork, and heart health. Ideal for warm-ups or standalone cardio sessions. Portable and effective.",
      muscles: ["Cardio", "Lower Legs"],
    },
    {
      name: "Plank",
      image: require("../assets/BeFit_Exercises/Plank.jpg"),
      description: "Isometric core exercise. Targets abs, back, and shoulders. Builds endurance and improves posture. Hold position with straight body and engage core muscles.",
      muscles: ["Abs"],
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCards, setExpandedCards] = useState([]);


  const filteredExercises = exerciseData.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  

    const matchesMuscle = selectedMuscles.length === 0
      ? true
      : exercise.muscles.some((muscle) => selectedMuscles.includes(muscle));

      return matchesSearch && matchesMuscle;
  });

  const toggleMore = (index) => {
    setExpandedCards((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };


  const tips = [
    {
      title: "01 Set Clear Goals",
      desc: "Define what you want to achieve—whether it's weight loss, muscle gain, or improved endurance. Clear goals give direction and purpose to your workouts."
    },
    {
      title: "02 Create a Workout Plan",
      desc: "Map out a weekly schedule that aligns with your fitness goals. A consistent and structured plan increases your chances of long-term success."
    },
    {
      title: "03 Focus on Compound Workouts",
      desc: "Incorporate exercises that target multiple muscle groups, like squats and bench presses, to maximize efficiency and effectiveness."
    },
    {
      title: "04 Progressive Overload",
      desc: "Gradually increase weight, reps, or intensity over time to continuously challenge your body and stimulate growth."
    },
    {
      title: "05 Listen to Your Body During Workouts",
      desc: "Pay attention to fatigue, pain, or discomfort. Rest when needed and avoid pushing through injury to prevent setbacks."
    },
    {
      title: "06 Prioritize Recovery Between Workouts",
      desc: "Allow your body ample time to recover through sleep, rest days, and stretching. Recovery is just as vital as training."
    },
    {
      title: "07 Stay Hydrated During and After Workouts",
      desc: "Proper hydration supports muscle function, energy levels, and recovery. Drink water before, during, and after exercise."
    },
    {
      title: "08 Vary Your Workouts Regularly",
      desc: "Switch up your routine to avoid plateaus and boredom. Try different exercises, intensities, or workout styles."
    },
    {
      title: "09 Stay Consistent with Your Workouts",
      desc: "Consistency trumps perfection. Aim to stick to your schedule, even if you’re not always at 100%."
    },
    {
      title: "10 Track Your Progress with Workouts",
      desc: "Use a fitness journal or app to log workouts, weights, and milestones. Tracking helps you stay motivated and measure results."
    },
    {
      title: "11 Warm Up Properly Before Workouts",
      desc: "Start each session with dynamic stretches or light cardio to prepare your muscles and reduce the risk of injury."
    },
    {
      title: "12 Focus on Proper Form During Workouts",
      desc: "Good form prevents injuries and ensures you're targeting the right muscles. Don't compromise form for heavier weights."
    },
    {
      title: "13 Include Restorative Activities Between Workouts",
      desc: "Incorporate yoga, stretching, or massage to boost recovery, flexibility, and mental relaxation."
    },
    {
      title: "14 Stay Motivated with Your Workouts",
      desc: "Set mini goals, reward progress, or find a workout buddy. Motivation is key to keeping up your routine."
    },
    {
      title: "15 Be Patient with Your Workouts",
      desc: "Fitness progress takes time. Celebrate small wins, and trust the process while staying committed."
    },
    {
      title: "16 Visualize Success with Your Workouts",
      desc: "Picture yourself achieving your goals. Visualization enhances focus, confidence, and workout performance."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleTip = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  

  return (
    <>
      <div className={`exercise-navbar-wrapper ${showNavbar ? 'show' : 'hide'}`}>
        <Navbar />
      </div>

      <div className="exercise-banner">
        <div className="exercise-banner-overlay">
          <div className="exercise-banner-content">
            <h1 className="exercise-banner-heading">
              <span className="exercise-gradient-text">TRAIN HARD</span> <br/><span className="exercise-white-text">LIVE BETTER</span>.
            </h1>
            <p className="exercise-banner-subtext">Let's Achieve Your Desired Body Shape</p>
          </div>
          {/* Scroll Down Icon */}
          <div className="scroll-down-icon" onClick={scrollToNextSection}>
            <ChevronDown className="bounce-icon" />
          </div>
        </div>
      </div>

      <div className="exercise-section" ref={nextSectionRef}>
        <h2 className="exercise-title">EXERCISES</h2>
        <p className="exercise-desc">
          Find the perfect workouts from the BeFit exercise database by muscle group, equipment, or try something new.
        </p>

        <div className="muscle-section">
          <h2 className="muscle-heading">Select by Muscle</h2>
          {/* <div className="muscle-scroll-wrapper"> */}
          <div className="muscle-scroll-container">
            <div className="scroll-button left" onClick={() => scroll('left')}>
              <ChevronLeft size={28} />
            </div>

            {/* <div className="muscle-cards-container" ref={scrollContainer}> */}
            <div className="muscle-cards-container" ref={scrollContainer}>
                {muscles.map((muscle, index) => (
                // {/* {muscleGroups.map((muscle, index) => ( */}
                  //  {/* <div className="muscle-card" key={index}>
                  //  <div className="muscle-card" key={index}> */}
                  <div className={`muscle-card ${selectedMuscles.includes(muscle.name) ? 'selected' : ''}`} 
                        key={index}
                        onClick={() => handleMuscleClick(muscle.name)}
                  >
                    <div className="muscle-image-placeholder">
                      <img src={muscle.img} alt={muscle.name} className="muscle-image"/>
                      <span>{muscle.name}</span>
                    </div>
                  </div>
                ))}
            </div>
            {/* <button className="scroll-btn right" onClick={() => scroll('right')}> */}
            <div className="scroll-button right" onClick={() => scroll('right')}>
              <ChevronRight size={28} />
            </div>
          </div>
        </div>

        {/* Select by Equipment Section */}
        <div className="equipment-section">
          <h2 className="equipment-heading">Select by Equipment</h2>
          <div className="equipment-scroll-container">
            <div className="scroll-button left" onClick={() => scrollEquipment('left')}>
              <ChevronLeft size={28} />
            </div>

            <div className="equipment-cards" id="equipment-scroll">
              {equipmentData.map((item, index) => (
                <div key={index} className="equipment-card">
                  <div className="equipment-image-placeholder">
                    <img src={item.image} alt={item.name} className="equipment-image" />
                    <p>{item.name}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="scroll-button right" onClick={() => scrollEquipment('right')}>
              <ChevronRight size={28} />
            </div>
          </div>
        </div>

        <div className="befit-exercises-section">
          <h2 className="befit-exercises-heading">BeFit Exercises</h2>

          {/* Search Box */}
          <input
            type="text"
            placeholder="Search exercises..."
            className="exercise-searchbox"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="exercise-cards-grid">
            {filteredExercises.map((exercise, index) => {
              const isExpanded = expandedCards.includes(index);
              const words = exercise.description.split(" ");
              const shortDescription = words.slice(0, 40).join(" ");
              return (
                <Link to={`/exercise/${exercise.name.toLowerCase().replace(/\s+/g, "")}`} key={index}>
                  <div className="exercise-card">
                    <img src={exercise.image} alt={exercise.name} className="exercise-img" />
                    <h3>{exercise.name}</h3>
                    <p className="exercise-desc">
                      {isExpanded ? exercise.description : shortDescription}
                      {words.length > 40 && (
                        <span className="more-text" onClick={(e) => { e.preventDefault(); toggleMore(index); }}>
                          {isExpanded ? " Show less" : "...more"}
                        </span>
                      )}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="pagination">
            {[1, 2, 3].map((num) => (
              <div className="page-circle" key={num}>
                {num}
              </div>
            ))}
          </div>
        </div>

        <div className="workout-tips-section">
          <img src={appLogo} alt="BeFit Logo" className="logo-watermark" />

          <h2 className="workout-heading">
            Workout Tips & Advice to Elevate Your Fitness Journey
          </h2>

          <p className="workout-desc">
            Embarking on a fitness journey requires dedication, strategy, and a solid plan. To help you make the most out of your workouts and achieve your fitness goals, we've compiled an extensive list of workout tips and advice.
            <br /><br />
            From optimizing your training routine to staying motivated and overcoming plateaus, these tips cover all aspects of your fitness journey.
          </p>

          <div className="tips-list">
            {tips.map((tip, index) => (
              <motion.div
                className="tip-item"
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div
                  className="tip-header"
                  onClick={() => toggleTip(index)}
                >
                  <span className="tip-number">{tip.title}</span>
                  <span className="tip-toggle">{activeIndex === index ? "-" : "+"}</span>
                </div>
                {activeIndex === index && (
                  <motion.div
                    className="tip-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{tip.desc}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

    </>
  );
};

export default Exercise;
