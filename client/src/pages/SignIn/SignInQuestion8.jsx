import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signinQuestion8.css";

const SignInQuestion8 = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    "Yes",
    "No",
    "I have occasional aches or pains",
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
    navigate("/signin/question9");
  };

  return (
    <div className="q8-wrapper">
      <h1 className="q8-title">
        Do you have any current injuries, physical limitations, or health conditions we should be aware of?
      </h1>

      <div className="q8-options-grid">
        {options.map((option, index) => (
          <div
            key={index}
            className={`q8-option-card ${selectedOption === option ? "selected" : ""}`}
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

export default SignInQuestion8;
