import React, { useState } from 'react';
import './signinStep2.css';
import RegisterNavbar from '../../components/RegisterNavbar';
import { useNavigate } from 'react-router-dom';

const SignInStep2 = () => {
  const selectedAgeGroup = localStorage.getItem("selectedAgeGroup");
  console.log("Selected Age Group:", selectedAgeGroup);

  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weightKg, setWeightKg] = useState('');

  const heightInMeters = ((+heightFt * 12) + +heightIn) * 0.0254;
  const bmi = weightKg && heightInMeters ? (weightKg / (heightInMeters ** 2)).toFixed(1) : null;

  const getBMICategory = () => {
    if (!bmi) return '';
    const num = parseFloat(bmi);
    if (num < 18.5) return 'Underweight';
    if (num < 25) return 'Healthy weight';
    if (num < 30) return 'Overweight';
    return 'Obesity';
  };

  const getBMIDescription = () => {
    const category = getBMICategory();
    switch (category) {
      case 'Underweight':
        return "Discuss your BMI category with your healthcare provider as BMI may relate to your overall health and well-being. Your healthcare provider might determine possible reasons for underweight and recommend support or treatment. BMI is a screening measure and is not intended to diagnose disease or illness.";
      case 'Healthy weight':
        return "Maintaining a BMI in the Healthy Weight range is one way to support overall health as you age. Discuss your BMI with your healthcare provider as BMI may relate to your overall health and well-being. BMI is a screening measure and is not intended to diagnose disease or illness.";
      case 'Overweight':
        return "Having excess weight can increase your risk for chronic conditions, including high blood pressure, type 2 diabetes, and high cholesterol. Discuss your BMI category with your healthcare provider as BMI may relate to your overall health and well-being. Your healthcare provider might determine possible reasons for overweight and recommend support or treatment. BMI is a screening measure and is not intended to diagnose disease or illness.";
      case 'Obesity':
        return "Having obesity can increase your risk for chronic conditions, including high blood pressure, type 2 diabetes, and high cholesterol. Discuss your BMI category with your healthcare provider as BMI may relate to your overall health and well-being. Your healthcare provider might determine possible reasons for excess weight and recommend support or treatment. BMI is a screening measure and is not intended to diagnose disease or illness.";
      default:
        return '';
    }
  };

  const navigate = useNavigate();

  const handleContinue = () => {
    const selectedAgeGroup = localStorage.getItem("selectedAgeGroup");
    if (selectedAgeGroup) {
      navigate("/signin/questions");
    }
  };

  return (
    <div className="signin-step2-wrapper">
      <RegisterNavbar />

      <div className="signin-step2-content">
        <h1>What’s your height?</h1>
        <label>Height (ft, in)</label>
        <div className="input-group">
          <input
            type="number"
            placeholder="__ ft"
            value={heightFt}
            onChange={(e) => setHeightFt(e.target.value)}
          />
          <input
            type="number"
            placeholder="__ in"
            value={heightIn}
            onChange={(e) => setHeightIn(e.target.value)}
          />
        </div>

        <h1>What’s your current weight?</h1>
        <label>Weight (kg)</label>
        <input
          type="number"
          placeholder="__ kg"
          className="weight-input"
          value={weightKg}
          onChange={(e) => setWeightKg(e.target.value)}
        />

        {bmi && (
          <div className="bmi-box">
            <p>
              Based on the information entered, your body mass index (BMI) is <strong>{bmi}</strong>, indicating your weight is in the <strong>{getBMICategory()}</strong> category.
            </p>
          </div>
        )}

        {bmi && (
          <p className="bmi-description">
            {getBMIDescription()}
          </p>
        )}

        <p className="bmi-formula">
          The Body Mass Index (BMI) formula is calculated by dividing weight in kilograms (kg) by height in meters squared (m²): <strong>BMI = weight (kg) / height² (m²)</strong>
        </p>
      </div>
        <button className="continue-btn" disabled={!heightFt || !heightIn || !weightKg} onClick={handleContinue}>
            Continue
        </button>
    </div>
  );
};

export default SignInStep2;
