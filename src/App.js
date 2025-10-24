import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LandingPage from './LandingPage';
import MapComponent from './MapComponent';
import BrowseIssues from './BrowseIssues';
import './App.css';

function App() {
  const [issues, setIssues] = useState([]);

  // This would be replaced with actual API call later
  useEffect(() => {
    // For now, we'll keep it empty - we'll update this when we have global state management
  }, []);

  return (
    <Router>
      <div className="App">
        <Header issues={issues} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<MapComponent />} />
            <Route path="/browse" element={<BrowseIssues />} />
            {/* We'll add these routes later */}
            {/* <Route path="/about" element={<About />} />
            <Route path="/admin" element={<AdminLogin />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;