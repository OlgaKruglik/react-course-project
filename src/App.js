import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Registration from './Pages/Registration'
import Home from './Pages/Home'



function App() {
  return (
    <Router basename="/OlgaKruglik/react-course-project.git">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </Router>
  );
};


export default App;
