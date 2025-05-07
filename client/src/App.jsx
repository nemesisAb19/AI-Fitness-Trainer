// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import './app.css';
// import RegisterNavbar from './components/RegisterNavbar';
// import Register from './pages/Register';
// import SignInStep1 from './pages/SignIn/SignInStep1';
// import SignInStep2 from './pages/SignIn/SignInStep2';
// import SignInQuestions from './pages/SignIn/SignInQuestions';
// import SignInQuestion2 from './pages/SignIn/SignInQuestion2';
// import SignInQuestion3 from './pages/SignIn/SignInQuestion3';
// import SignInQuestion4 from './pages/SignIn/SignInQuestion4';
// import SignInQuestion5 from './pages/SignIn/SignInQuestion5';
// import SignInQuestion6 from './pages/SignIn/SignInQuestion6';
// import SignInQuestion7 from './pages/SignIn/SignInQuestion7';
// import SignInQuestion8 from './pages/SignIn/SignInQuestion8';
// import SignInQuestion9 from './pages/SignIn/SignInQuestion9';
// import SignInQuestion10 from './pages/SignIn/SignInQuestion10';
// import Lenis from 'lenis';
// import FinalSignIn from './pages/Auth/FinalSignIn';
// // import Footer from './components/Footer';

// const App = () => {
//   // const [menuOpen] = useState(false);
//   // useEffect(() => {
//   //   document.body.classList.toggle('menu-open', menuOpen);
//   // }, [menuOpen]);

//   const location = useLocation()

//   const hideNavbarRoutes = ["/signin/final"];

//   const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

//   useEffect(() => {
//     const lenis = new Lenis();
//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);
//   }, []);
  
//   return (
//     <Router>
//       <div style={{ minHeight: "300vh" }} className="min-h-screen bg-black text-white">
//         {!shouldHideNavbar && <RegisterNavbar />}

//         <Routes>
//           <Route path="/" element={<><RegisterNavbar /><Register /></>} />
//           <Route path="/signin" element={<SignInStep1 />} />
//           <Route path="/signin/step2" element={<SignInStep2 />} />
//           <Route path="/signin/questions" element={<SignInQuestions />} />
//           <Route path="/signin/question2" element={<SignInQuestion2 />} />
//           <Route path='/signin/question3' element={<SignInQuestion3 />} />
//           <Route path='/signin/question4' element={<SignInQuestion4 />} />
//           <Route path='/signin/question5' element={<SignInQuestion5 />} />
//           <Route path='/signin/question6' element={<SignInQuestion6 />} />
//           <Route path='/signin/question7' element={<SignInQuestion7 />} />
//           <Route path='/signin/question8' element={<SignInQuestion8 />} />
//           <Route path='/signin/question9' element={<SignInQuestion9 />} />
//           <Route path='/signin/question10' element={<SignInQuestion10 />} />

//           <Route path="/signin/final" element={<FinalSignIn />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;














import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './app.css';
import Lenis from 'lenis';
import Routing from './Routing';

const App = () => {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <Router>
      <div style={{ minHeight: "300vh" }} className="min-h-screen bg-black text-white">
        <Routing />
      </div>
    </Router>
  );
};

export default App;