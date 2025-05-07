import { Routes, Route, useLocation } from 'react-router-dom';
import RegisterNavbar from './components/RegisterNavbar';
import Register from './pages/Register';
import SignInStep1 from './pages/SignIn/SignInStep1';
import SignInStep2 from './pages/SignIn/SignInStep2';
import SignInQuestions from './pages/SignIn/SignInQuestions';
import SignInQuestion2 from './pages/SignIn/SignInQuestion2';
import SignInQuestion3 from './pages/SignIn/SignInQuestion3';
import SignInQuestion4 from './pages/SignIn/SignInQuestion4';
import SignInQuestion5 from './pages/SignIn/SignInQuestion5';
import SignInQuestion6 from './pages/SignIn/SignInQuestion6';
import SignInQuestion7 from './pages/SignIn/SignInQuestion7';
import SignInQuestion8 from './pages/SignIn/SignInQuestion8';
import SignInQuestion9 from './pages/SignIn/SignInQuestion9';
import SignInQuestion10 from './pages/SignIn/SignInQuestion10';
import FinalSignIn from './pages/Auth/FinalSignIn';
import Payment from './pages/Payment/Payment';
import Success from './pages/Payment/Success';
import Cancel from './pages/Payment/Cancel';

import Login from './pages/Auth/Login';

import SplashScreen from './components/SplashScreen';

import Exercise from './pages/Exercise';
import PushUp from './pages/ExercisePages/PushUp';
import Bicep from './pages/ExercisePages/Bicep';
import Squats from './pages/ExercisePages/Squats';
import BicepSetReps from './pages/ExercisePages/SetReps/BicepSetReps';
import SquatsSetReps from './pages/ExercisePages/SetReps/SquatsSetReps';
import PushupSetReps from './pages/ExercisePages/SetReps/PushupSetReps';
import ExerciseComplete from './pages/ExercisePages/SetReps/ExerciseComplete';

const Routing = () => {
    const location = useLocation();

    const hideNavbarRoutes = ["/signin/final", "/payment", "/payment/success", "/payment/cancel", "/login", "/splash", '/exercise', "/exercise/pushup"
      , "/exercise/bicepcurls", "/exercise/squats", "/bicep/setup", "/squats/setup", "/pushups/setup"
    ];
    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <RegisterNavbar />}

      <Routes>
        <Route path="/" element={<><RegisterNavbar /><Register /></>} />
        <Route path="/signin" element={<SignInStep1 />} />
        <Route path="/signin/step2" element={<SignInStep2 />} />
        <Route path="/signin/questions" element={<SignInQuestions />} />
        <Route path="/signin/question2" element={<SignInQuestion2 />} />
        <Route path='/signin/question3' element={<SignInQuestion3 />} />
        <Route path='/signin/question4' element={<SignInQuestion4 />} />
        <Route path='/signin/question5' element={<SignInQuestion5 />} />
        <Route path='/signin/question6' element={<SignInQuestion6 />} />
        <Route path='/signin/question7' element={<SignInQuestion7 />} />
        <Route path='/signin/question8' element={<SignInQuestion8 />} />
        <Route path='/signin/question9' element={<SignInQuestion9 />} />
        <Route path='/signin/question10' element={<SignInQuestion10 />} />

        <Route path="/signin/final" element={<FinalSignIn />} />

        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/success" element={<Success />} />
        <Route path="/payment/cancel" element={<Cancel />} />
        <Route path="/login" element={<Login />} />

        <Route path="/splash" element={<SplashScreen />} />

        <Route path='/exercise' element={<Exercise/>} />
        <Route path="/exercise/pushup" element={<PushUp />} />
        <Route path="/exercise/bicepcurls" element={<Bicep />} />
        <Route path="/exercise/squats" element={<Squats />} />
        <Route path="/bicep/setup" element={<BicepSetReps />} />
        <Route path="/squats/setup" element={<SquatsSetReps />} />
        <Route path="/pushups/setup" element={<PushupSetReps />} />
        <Route path="/exercise-complete/:exerciseName" element={<ExerciseComplete />} />

        {/* Add more routes as needed */}

      </Routes>
    </>
  );
};
export default Routing;
