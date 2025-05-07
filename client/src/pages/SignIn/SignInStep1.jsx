import "./signinStep1.css";
import young from "../../assets/age-groups/YoungAge.png";
import middle from "../../assets/age-groups/CrossfitBody.png";
import older from "../../assets/age-groups/Age(56).png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInStep1 = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [selectedAge, setSelectedAge] = useState(null);

  const handleAgeSelect = (age) => {
    setSelectedAge(age);
    localStorage.setItem("selectedAgeGroup", age);
  };


  const handleContinue = () => {
    if (!isChecked) {
      alert("You must agree to the terms and policies before continuing.");
      return;
    }

    if (!selectedAge) {
        alert("Please select your age group before continuing.");
        return;
    }

    // if (isChecked && selectedAge) {
    //   navigate("/signin/step2");
    // }

    const selectedAgeGroup = localStorage.getItem("selectedAgeGroup");

    if (selectedAgeGroup === "young") {
      navigate("/signin/step2");
    }
    else if (selectedAgeGroup === "middle") {
      // navigate("/signin/middle/question1");
      navigate("/signin/step2");
    }
    else if (selectedAgeGroup === "older") {
      navigate("/signin/step2");
    }
  };

  return (
    <div className="signin-wrapper" style={{backgroundColor: "#0f0f0f"}}>
      <h1 className="signin-title" style={{marginTop: "3.5rem"}}>BUILD YOUR PERFECT BODY</h1>
      <p className="signin-subtitle">Getting To Know You</p>

      <div className="age-cards">
        <div className={`age-card ${selectedAge === "young" ? "selected" : ""}`}
          onClick={() => handleAgeSelect("young")}
        >
          <img src={young} alt="Young Age" />
          <p>Young Age (18-35)</p>
        </div>
        <div className={`age-card ${selectedAge === "middle" ? "selected" : ""}`}
          onClick={() => handleAgeSelect("middle")}
        >
          <img src={middle} alt="Middle Age" />
          <p>Middle Age (36-55)</p>
        </div>
        <div className={`age-card ${selectedAge === "older" ? "selected" : ""}`}
          onClick={() => handleAgeSelect("older")}
        >
          <img src={older} alt="Older Age"/>
          <p>Older Age (56+)</p>
        </div>
      </div>

      <div className="terms-section">
        <input
          type="checkbox"
          id="terms"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <label htmlFor="terms">
          By continuing, you agree to our <strong><u>Terms of service</u></strong> and acknowledge our <strong><u>Privacy Policy</u></strong> and <strong><u>Cookie Policy</u></strong>.
        </label>
      </div>

      <p className="disclaimer">
        We recommend that you consult with your physician before beginning any exercise program.
      </p>

      <button onClick={handleContinue} className="continue-btn">Continue</button>
    </div>
  );
};

export default SignInStep1;
