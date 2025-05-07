import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signinQuestion6.css";

const SignInQuestion6 = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    "Only Coffee or Tea",
    "Less than 2 glasses",
    "2-6 glasses",
    "7-10 glasses",
    "More than 10 glasses",
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
    navigate("/signin/question7");
  };

  return (
    <div className="q6-wrapper">
      <h1 className="q6-title">
        How much water do you drink daily?
      </h1>

      <div className="q6-options-grid">
        {options.map((option, index) => (
          <div
            key={index}
            className={`q6-option-card ${selectedOption === option ? "selected" : ""}`}
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

export default SignInQuestion6;
