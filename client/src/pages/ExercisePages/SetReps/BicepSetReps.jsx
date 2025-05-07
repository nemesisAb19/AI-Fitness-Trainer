import React, { useState, useEffect, useRef } from "react";
import "./bicepSetReps.css";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown, X, Maximize, Camera, CircleDot } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BicepSetReps = () => {
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [restTime, setRestTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const handleIncrement = (setter) => setter((prev) => prev + 1);
  const handleDecrement = (setter) => setter((prev) => (prev > 1 ? prev - 1 : 1));

  const startExercise = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/start-bicep-exercise", {
        sets,
        reps,
        rest_time: parseInt(restTime) || 30,
      });
      console.log(response.data.message);
      alert("Bicep exercise started!");
      setShowModal(true);
    } catch (error) {
      console.error("Error starting exercise:", error);
      alert("Failed to start exercise.");
    }
  };

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "exerciseDone" && e.newValue === "true") {
        alert("Bicep exercise completed!");
        localStorage.removeItem("exerciseDone");
        stopRecording();
        setShowModal(false);
        setLoading(false);
        setVideoError(false);
        navigate("/exercise-complete/bicep");
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [navigate]);

  const startRecording = () => {
    const video = videoRef.current;
    if (!video || !video.captureStream) {
      alert("Recording not supported in this browser.");
      return;
    }
    const stream = video.captureStream();
    const recorder = new MediaRecorder(stream);
    setRecordedChunks([]);
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) setRecordedChunks((prev) => [...prev, e.data]);
    };
    recorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `bicep_session_${Date.now()}.webm`;
      a.click();
    };
    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const captureScreenshot = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const image = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = image;
    a.download = `bicep_screenshot_${Date.now()}.png`;
    a.click();
  };

  const toggleFullscreen = () => {
    const el = document.querySelector(".video-modal");
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen().catch(console.error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bicep-setup-page">
        <motion.div
          className="setup-container"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="setup-title">Customize Your Workout</h1>
          <div className="input-group">
            <label className="input-label">Sets</label>
            <div className="input-control">
              <input type="number" value={sets} readOnly />
              <div className="arrows">
                <ChevronUp onClick={() => handleIncrement(setSets)} />
                <ChevronDown onClick={() => handleDecrement(setSets)} />
              </div>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Reps</label>
            <div className="input-control">
              <input type="number" value={reps} readOnly />
              <div className="arrows">
                <ChevronUp onClick={() => handleIncrement(setReps)} />
                <ChevronDown onClick={() => handleDecrement(setReps)} />
              </div>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Rest Time (in seconds)</label>
            <input
              type="number"
              value={restTime}
              onChange={(e) => setRestTime(e.target.value)}
              placeholder="sec"
              className="rest-input"
            />
          </div>

          <motion.button
            className="start-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startExercise}
            disabled={showModal}
          >
            START
          </motion.button>
        </motion.div>
      </div>

      {showModal && (
        <div className="video-modal">
          <div className="video-header">
            <X className="close-icon" onClick={() => {
              stopRecording();
              setShowModal(false);
              setVideoError(false);
              setLoading(false);
            }} />
            <div className="video-controls">
              <Camera className="icon-btn" onClick={captureScreenshot} title="Take Screenshot" />
              <Maximize className="icon-btn" onClick={toggleFullscreen} title="Toggle Fullscreen" />
              <CircleDot
                className={`icon-btn ${isRecording ? "recording" : ""}`}
                onClick={isRecording ? stopRecording : startRecording}
                title={isRecording ? "Stop Recording" : "Start Recording"}
              />
            </div>
          </div>

          {loading && !videoError && (
            <div className="spinner-container">
              <div className="spinner"></div>
              <p className="loading-text">Loading live video stream...</p>
            </div>
          )}

          {videoError && (
            <div className="error-container">
              <p className="error-text">Failed to load video stream. Try again or check the backend.</p>
              <button onClick={() => {
                setLoading(true);
                setVideoError(false);
              }} className="retry-btn">Retry</button>
            </div>
          )}

          {!videoError && (
            <img
              src="http://localhost:5001/bicep_feed"
              alt="Exercise Stream"
              className="video-stream"
              ref={videoRef}
              style={{ display: loading ? "none" : "block" }}
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setVideoError(true);
              }}
            />
          )}
        </div>
      )}
      <Footer />
    </>
  );
};

export default BicepSetReps;
