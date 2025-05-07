import React from "react";
import { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import "../styles/register.css";
import aiTrainer from "../assets/What_We_Do/ai-trainer-2.png";
import Footer from "../components/Footer";

const Register = () => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4500,
      arrows: false,
      pauseOnHover: false,
      fade: true
    };
  
    const slides = [
        require("../assets/RegisterBanner/banner-1.jpg"),
        require("../assets/RegisterBanner/banner-2.webp"),
        require("../assets/RegisterBanner/banner-3-1.jpg"),
        require("../assets/RegisterBanner/banner-4.jpg"),
        require("../assets/RegisterBanner/banner-5.jpeg"),
    ];
    

    const fadeUp = {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const titleRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const letters = titleRef.current.querySelectorAll(".letter");
            letters.forEach((el) => el.classList.add("animate"));
          }
        },
        { threshold: 0.5 }
      );

      if (titleRef.current) {
        observer.observe(titleRef.current);
      }

      return () => {
        if (titleRef.current) observer.unobserve(titleRef.current);
      };
    }, []);

  return (
    <>
      <div className="banner-container">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="banner-slide">
              <img src={slide} alt={`Slide ${index + 1}`} className="slide-image" />
            </div>
          ))}
        </Slider>

        {/* Overlay Text */}
        <motion.div
          className="banner-overlay"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h1>Welcome to <span>BeFit</span></h1>
          <p>Your AI-powered fitness companion.</p>
          {/* <motion.button
            className="get-started-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>

          <motion.div
            className="down-arrow"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            <FaArrowDown />
          </motion.div> */}
          <motion.button
              className="banner-button"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4 }}
              onClick={() => {
                const element = document.getElementById("motivation");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
          >
              Get Started
              <FaArrowDown className="arrow-icon" />
          </motion.button>
        </motion.div>
      </div>

      <div className="previous-section">
        <motion.section 
            id="motivation"
            class="motivation-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}      
        >
          <h1>IT'S TIME TO PUT YOURSELF FIRST</h1>
          <p>
            <strong>Feeling like your well-being is always last on your list?</strong> You're not alone. Many let fitness slide, but want to change.
          </p>
          <p>
            Our <strong>Befit Transformation Formula</strong> guides you to a healthier, happier, more confident you in 6 weeks – without tedious workouts or restrictive fad diets.
          </p>
          <p>
            At Befit, we believe <strong>fitness should enhance your life, not detract from it.</strong> Every Befit Transformation begins with a thorough understanding of your current situation, allowing us to create an achievable path to your desired outcome.
          </p>
          <p>
            Whether that means <strong>ditching the mid-afternoon energy slump</strong> or finally gaining the <strong>body confidence</strong> to wear clothes that highlight your physique, rather than conceal it – we're here to help.
          </p>
          <p>
            In just <strong>42 days</strong>, you can move from feeling stuck and perhaps a little disappointed with your current health to feeling empowered by the positive changes you've made with Befit.
          </p>
        </motion.section>

      </div>

      {/* <section className="parallax-section">
      <div className="parallax-content">
        <motion.div
          className="parallax-text"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h1>WHAT WE DO</h1>
          <p>
            Our AI-powered fitness trainer is built with your individual goals at its core. Just like traditional coaching options, our digital approach prioritizes your unique needs and aspirations. Leveraging advanced artificial intelligence, we provide personalized workout plans, adaptive training adjustments, and insightful progress tracking, all designed to put you first. This technology-driven guidance is engineered to deliver impressive results, not just in the short term, but by fostering sustainable habits that empower you to achieve lasting health and well-being.
          </p>
          <p>
            Think of our AI as your dedicated virtual coach, constantly learning and adapting to your progress and feedback. It's designed to provide you with a tailored fitness experience, offering customized workout routines, real-time form analysis (if applicable), and motivational support. Our AI-powered system aims to make achieving your fitness goals more accessible, convenient, and ultimately, a sustainable part of your life, ensuring that the positive changes you make become long-term habits.
          </p>
        </motion.div>

        <motion.div
          className="parallax-image"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <img src={aiTrainer} alt="AI Fitness Trainer" />
        </motion.div>
      </div>
    </section> */}

    {/* WHAT WE DO Section */}
    <section className="what-we-do-section">
      <div className="what-we-do-content">
        <motion.div 
          className="text-content"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h1>WHAT WE DO</h1>
          <p>
            Our AI-powered fitness trainer is built with your individual goals at its core. Just like traditional coaching options, our digital approach prioritizes your unique needs and aspirations. Leveraging advanced artificial intelligence, we provide personalized workout plans, adaptive training adjustments, and insightful progress tracking, all designed to put you first. This technology-driven guidance is engineered to deliver impressive results, not just in the short term, but by fostering sustainable habits that empower you to achieve lasting health and well-being.
          </p>
          <p>
            Think of our AI as your dedicated virtual coach, constantly learning and adapting to your progress and feedback. It's designed to provide you with a tailored fitness experience, offering customized workout routines, real-time form analysis (if applicable), and motivational support. Our AI-powered system aims to make achieving your fitness goals more accessible, convenient, and ultimately, a sustainable part of your life, ensuring that the positive changes you make become long-term habits.
          </p>
        </motion.div>

        <motion.div 
          className="image-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <img src={aiTrainer} alt="AI Trainer" />
        </motion.div>
      </div>
    </section>

    {/* OUR MISSION Section */}
    <section className="our-mission-section">
        <div className="mission-wrapper">
          {/* <motion.h1
            className="mission-heading"
            initial={{ scale: 0.8, rotateX: 90, opacity: 0 }}
            whileInView={{ scale: 1, rotateX: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            OUR MISSION
          </motion.h1> */}

          <h1 className="mission-title" ref={titleRef}>
            {"OUR MISSION".split("").map((char, idx) => (
              <span key={idx} className="letter" style={{ animationDelay: `${idx * 0.1}s` }}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <motion.p
            className="mission-content"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            At BeFit, our mission is simple: to empower you to become the healthiest, happiest, and most confident version of yourself through the power of personalized AI-driven fitness. We believe everyone deserves a fitness journey that truly understands and caters to their unique needs and goals.
          </motion.p>
        </div>

        <div className="mission-cards">
          {[
            {
              title: "Weight Loss",
              img: require("../assets/Cards/weight-loss-1.jpg"),
              desc: "We provide intelligently designed workout and (optional) nutrition plans that adapt to your body and progress, making sustainable weight loss achievable and manageable. Our AI focuses on effective strategies and personalized guidance to help you reach your goals.",
            },
            {
              title: "Energy Boost",
              img: require("../assets/Cards/EnergyBoost.jpeg"),
              desc: "We understand the importance of feeling energized throughout your day. Our AI crafts workouts that not only improve your physical fitness but also enhance your stamina and vitality, helping you ditch the slumps and embrace a more active life.",
            },
            {
              title: "Confidence Boost",
              img: require("../assets/Cards/ConfidenceBoost.jpg"),
              desc: "We believe that feeling good in your own skin is paramount. By providing personalized support, tracking your achievements, and guiding you towards your fitness goals, our AI helps you build self-esteem and cultivate a stronger, more confident you, inside and out.",
            },
          ].map((card, idx) => (
            <div className="mission-card" key={idx}>
              <div className="card-image" style={{ backgroundImage: `url(${card.img})` }}></div>
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>


      </section>
      <Footer />

    </>
  );
};

export default Register;

