import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signinQuestion9.css";

const SignInQuestion9 = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    "Gym with equipment",
    "At home with limited or no equipment",
    "Outdoors (e.g., running, cycling)",
    "A mix of locations",
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
    navigate("/signin/question10");
  };

  return (
    <div className="q9-wrapper">
      <h1 className="q9-title">
        Do you prefer working out at a...?
      </h1>

      <div className="q9-options-grid">
        {options.map((option, index) => (
          <div
            key={index}
            className={`q9-option-card ${selectedOption === option ? "selected" : ""}`}
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

export default SignInQuestion9;
