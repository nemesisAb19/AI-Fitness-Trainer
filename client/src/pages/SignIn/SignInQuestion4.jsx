import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signinQuestion4.css";

const SignInQuestion4 = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    "See noticeable physical changes",
    "Feel stronger and more capable",
    "Improve my mood and reduce stress",
    "Develop a consistent workout routine",
    "Achieve a specific performance goal",
  ];

  const handleOptionToggle = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleContinue = () => {
    if (selectedOptions.length === 0) {
      alert("Please select at least one focus area.");
      return;
    }
    console.log("Selected areas:", selectedOptions); // or save to context/localStorage
    navigate("/signin/question5"); // update route as needed
  };

  return (
    <div className="q4-wrapper">
      <h1 className="q4-title">
      What are you hoping to achieve with your fitness in the next 3-6 months?
      </h1>

      <div className="q4-options-grid">
        {options.map((option, index) => (
          <div
            key={index}
            className={`q4-option-card ${
              selectedOptions.includes(option) ? "selected" : ""
            }`}
            onClick={() => handleOptionToggle(option)}
          >
            <p>{option}</p>
          </div>
        ))}
      </div>

      <button className="continue-btn" disabled={!selectedOptions} onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

export default SignInQuestion4;
