import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signinQuestion7.css";

const SignInQuestion7 = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    "Yes, definitely",
    "Maybe",
    "Not at this time",
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
    navigate("/signin/question8");
  };

  return (
    <div className="q7-wrapper">
      <h1 className="q7-title">
      Are you interested in receiving guidance on nutrition to support your fitness goals?
      </h1>

      <div className="q7-options-grid">
        {options.map((option, index) => (
          <div
            key={index}
            className={`q7-option-card ${selectedOption === option ? "selected" : ""}`}
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

export default SignInQuestion7;
