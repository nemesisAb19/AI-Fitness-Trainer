import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signinQuestion3.css";

const SignInQuestion3 = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    "Upper Body (arms, shoulders, back)",
    "Lower Body (legs, glutes)",
    "Core (abs, obliques, lower back)",
    "Overall Body Toning",
    "No specific area",
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
    navigate("/signin/question4"); // update route as needed
  };

  return (
    <div className="q3-wrapper">
      <h1 className="q3-title">
        Are there any specific areas of your body you'd like to focus on?
      </h1>

      <div className="q3-options-grid">
        {options.map((option, index) => (
          <div
            key={index}
            className={`q3-option-card ${
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

export default SignInQuestion3;
