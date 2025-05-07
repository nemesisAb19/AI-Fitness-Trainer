import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signinQuestion5.css";

const SignInQuestion5 = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    "1-2 days",
    "3-4 days",
    "5+ days",
    "It varies week to week",
  ];

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (!selectedOption) {
      alert("Please select an option before continuing.");
      return;
    }

    // Save answer to localStorage or state management
    localStorage.setItem("workoutDays", selectedOption);
    navigate("/signin/question6");
  };

  return (
    <div className="q5-wrapper">
      <h1 className="q5-title">
        How many days per week are you realistically able to dedicate to structured workouts?
      </h1>

      <div className="q5-options-grid">
        {options.map((option, index) => (
          <div
            key={index}
            className={`q5-option-card ${selectedOption === option ? "selected" : ""}`}
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

export default SignInQuestion5;
