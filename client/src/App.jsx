import React from 'react';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import LandingPage from './components/LandingPage';
 import SignUpLogin from './Components/SignUpLogin';

 function App() {
  return (
  <Router>
  <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/auth" element={<SignUpLogin/>} />
  {/* <Route path="/host" element={<HostPartyPage />} />
  <Route path="/join" element={<JoinPartyPage />} /> */}
  </Routes>
  </Router>
  );
 }

 export default App;