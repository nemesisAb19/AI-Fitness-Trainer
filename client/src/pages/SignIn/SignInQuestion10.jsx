import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signinQuestion10.css";

const SignInQuestion10 = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    "Weightlifting or strength training",
    "Running, cycling, or other cardio",
    "Team sports or recreational activities",
    "Yoga, Pilates, or flexibility-based workouts",
    "Dance or other movement-based activities",
  ];

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    // Save answer to localStorage or state management
    localStorage.setItem("workoutDays", selectedOption);
    navigate("/signin/final");
  };

  return (
    <div className="q10-wrapper">
      <h1 className="q10-title">
        What types of exercise have you enjoyed in the past?
      </h1>

      <div className="q10-options-grid">
        {options.map((option, index) => (
          <div
            key={index}
            className={`q10-option-card ${selectedOption === option ? "selected" : ""}`}
            onClick={() => handleSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>

      <button disabled={!selectedOption} onClick={handleContinue} className="continue-btn">
        Continue
      </button>
    </div>
  );
};

export default SignInQuestion10;
