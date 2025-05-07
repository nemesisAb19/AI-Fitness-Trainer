import React, { useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
import "./payment.css";

const stripePromise = loadStripe("pk_test_51RD3BPKVRyZbo6ENvZsKfsM1J6C0ow2WgVLF0340qALIKUS9QOpdVkT1Ez3Ic9aWWIwove5tjjGc75JZYu0rk3G400EUhjAsF4");

const plans = [
  { name: "Monthly", price: "₹499" },
  { name: "Quarterly", price: "₹899" },
  { name: "Yearly", price: "₹1499" }
];

const Payment = () => {
  const [selectedPlan, setSelectedPlan] = useState("Monthly");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    try {
      const res = await axios.post("http://localhost:5000/api/stripe/create-checkout-session", {
        plan: selectedPlan
      });

      await stripe.redirectToCheckout({ sessionId: res.data.id });
    } catch (err) {
      console.error("Error redirecting to Stripe:", err);
      alert("Payment error. Please try again later.");
    } finally {
      setLoading(false);
    }


    //   const data = await res.json();

    //   if (data.id) {
    //     stripe.redirectToCheckout({ sessionId: data.id });
    //   } else {
    //     console.error("Stripe session creation failed:", data.error);
    //     alert("Something went wrong! Please try again.");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   alert("Payment error. Please try again later.");
    // }
  };

  return (
    <div className="payment-container">
      <h1 className="payment-heading">Unlock Your Potential: Choose Your Plan</h1>
      <p className="payment-subheading">
        Ready to transform your fitness with personalized AI guidance? Choose the plan that fits your goals and enjoy unlimited access to all features, workouts, and nutritional insights within BeFit.
      </p>

      <div className="benefits-section">
        <h2>BENEFITS</h2>
        <ul className="benefits-list">
          <li> Personalized AI Workout Plans</li>
          <li> Adaptive Training Adjustments</li>
          <li> Exercise Form Analysis</li>
          <li> Progress Tracking & Analytics</li>
          <li> Personalized Nutritional Guidance</li>
          <li> Access to Our Entire Exercise Library</li>
          <li> Motivational Support & Reminders</li>
          <li> New Content & Features</li>
        </ul>
      </div>

      <div className="plans-container">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`plan-card ${selectedPlan === plan.name ? "active" : ""}`}
            onClick={() => setSelectedPlan(plan.name)}
          >
            <h3>{plan.name}</h3>
            <p>{plan.price}</p>
          </div>
        ))}
      </div>

      <button className="continue-btn" onClick={handleCheckout} disabled={loading}>
        {loading ? <span className="spinner" /> : `Continue with ${selectedPlan}`}
      </button>
    </div>
  );
};

export default Payment;
