import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import YieldPrediction from './pages/YieldPrediction';
import FertilizerRecommendation from './pages/FertilizerRecommendation';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="content" style={{ paddingTop: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/yield" element={<YieldPrediction />} />
            <Route path="/fertilizer" element={<FertilizerRecommendation />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
