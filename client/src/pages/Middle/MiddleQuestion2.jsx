import React, { useState, useEffect } from "react";
import "./middleQuestion2.css";
import slimImg from "../../assets/age-groups/SlimBody.png";
import averageImg from "../../assets/age-groups/AverageBody.png";
import heavyImg from "../../assets/age-groups/HeavyBody.png";
import { useNavigate } from "react-router-dom";

const MiddleQuestion2 = () => {
  const [selectedBodyType, setSelectedBodyType] = useState(null);
  const [ageGroup, setAgeGroup] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const group = localStorage.getItem("selectedAgeGroup");
    if (group) setAgeGroup(group);
  }, []);

  const handleSelect = (type) => {
    setSelectedBodyType(type);
  };

  const handleContinue = () => {
    if (!selectedBodyType) {
      alert("Please select your body type to continue.");
      return;
    }
    localStorage.setItem("selectedBodyType", selectedBodyType);
    navigate("/signin/middle/question3");

    };

  // Optionally store in localStorage or navigate to next question page
  //localStorage.setItem("bodyType", selectedOption);

  return (
    <div className="questionnaire-container">
      <h1 style={{marginTop: "2rem"}}>Choose your body type</h1>
      <div className="bodytype-options">
        <div
          className={`bodytype-card ${selectedBodyType === "Slim" ? "selected" : ""}`}
          onClick={() => handleSelect("Slim")}
        >
          <img src={slimImg} alt="Slim" />
          <p>Slim</p>
        </div>
        <div
          className={`bodytype-card ${selectedBodyType === "Average" ? "selected" : ""}`}
          onClick={() => handleSelect("Average")}
        >
          <img src={averageImg} alt="Average" />
          <p>Average</p>
        </div>
        <div
          className={`bodytype-card ${selectedBodyType === "Heavy" ? "selected" : ""}`}
          onClick={() => handleSelect("Heavy")}
        >
          <img src={heavyImg} alt="Heavy" />
          <p>Heavy</p>
        </div>
      </div>

      <button className="continue-btn" disabled={!selectedBodyType} onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

export default MiddleQuestion2;
