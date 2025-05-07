# BeFit – AI Fitness Trainer  

**BeFit** is an AI-powered fitness trainer application developed using **Python (OpenCV, MediaPipe)** for pose detection and integrated into a full-stack platform using the **MERN stack (MongoDB, Express, React, Node.js)**.  
This project was developed as part of an **academic assignment** to demonstrate the integration of AI with modern web technologies for real-time fitness tracking.


## Academic Purpose  

- 📌 **Developed for:** Academic project submission  
- 📌 **Technologies Used:** Python, MediaPipe, OpenCV, MERN Stack  
- 📌 **Skills Demonstrated:** Pose estimation, real-time video processing, full-stack development, responsive UI/UX, video streaming, session tracking.


## Key Features  

- 🧠 **Pose Detection using MediaPipe & OpenCV**  
- 🎦 **Real-Time Webcam Feed for Exercise Monitoring**  
- 🔁 **Repetition Counting with Visual Feedback**  
- 📈 **Progress Tracking and Performance Bar**  
- 📷 **Screenshot and Session Recording Support**  
- 🌐 **MERN Stack Web Integration**  
- 🔐 **User Authentication (Sign up, Sign in)**  
- 💳 **Plan-Based Payment Options (Monthly, Quarterly, Yearly)**  
- 📱 **Fully Responsive Design (Desktop + Mobile)**  


## 📂 Project Structure  
/BeFit-AI-Fitness-Trainer
├── client/ # React Frontend

│ ├── public/

│ ├── src/

│ ├── package.json

│ └── ...

├── server/ # Express Backend
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ └── ...
├── exercise-server/ # AI Logic (Pose Detection)
│ ├── PoseModule.py
│ ├── ExercisesModule.py
│ ├── bicep_check.py
│ └── ...
├── README.md


## How to Run the Project  

### 1️⃣ Python Backend for AI 
cd exercise-server/
pip install -r requirements.txt
python bicep_check.py

### 2️⃣ Backend Setup (Express.js)
cd server/
npm install
npm start

### 3️⃣ Frontend Setup (React.js)
cd client/
npm install
npm start

👉 Navigate to http://localhost:3000 in your browser.


## Tech Stack
• Frontend: React.js, CSS, Framer Motion

• Backend: Node.js, Express.js

• Database: MongoDB

• AI Module: Python, OpenCV, MediaPipe

• Payment Integration: Stripe


## 📜 License
This project is developed strictly for academic and educational use.
Not intended for commercial distribution.
 
