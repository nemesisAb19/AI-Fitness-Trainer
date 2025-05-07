import React, { useState } from "react";
import "./signinQuestion2.css"; // you can reuse the same CSS as Question 1
import loseWeight from "../../assets/age-groups/BeachBody.png";
import gainMuscle from "../../assets/age-groups/MuscularBody.png";
import getShredded from "../../assets/age-groups/ShrededBody.png";
import { useNavigate } from "react-router-dom";
import RegisterNavbar from "../../components/RegisterNavbar";

const SignInQuestion2 = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (goal) => {
    setSelectedGoal(goal);
    localStorage.setItem("fitnessGoal", goal);
  };

  const handleContinue = () => {
    if (!selectedGoal) {
      alert("Please select a goal to continue.");
      return;
    }
    navigate("/signin/question3");
  };

  return (
    <div className="signin-wrapper">
      <RegisterNavbar />
      <h1 className="signin-title" style={{marginTop: "3.5rem"}}>Choose your goal</h1>

      <div className="options-grid">
        <div
          className={`option-card ${selectedGoal === "loseWeight" ? "selected" : ""}`}
          onClick={() => handleSelect("loseWeight")}
        >
          <img src={loseWeight} alt="Lose Weight" />
          <p>Lose Weight</p>
        </div>

        <div
          className={`option-card ${selectedGoal === "gainMuscle" ? "selected" : ""}`}
          onClick={() => handleSelect("gainMuscle")}
        >
          <img src={gainMuscle} alt="Gain Muscle Mass" />
          <p>Gain Muscle Mass</p>
        </div>

        <div
          className={`option-card ${selectedGoal === "getShredded" ? "selected" : ""}`}
          onClick={() => handleSelect("getShredded")}
        >
          <img src={getShredded} alt="Get Shredded" />
          <p>Get Shredded</p>
        </div>
      </div>

      <button className="continue-btn" disabled={!selectedGoal} onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

export default SignInQuestion2;
