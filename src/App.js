import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LandingPage from './LandingPage';
import MapComponent from './MapComponent';
import BrowseIssues from './BrowseIssues';
import About from './About';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import './App.css';

// API base URL with fallback for local development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [issues, setIssues] = useState([]);

  // Load issues from API for global state
  const loadIssuesFromAPI = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/issues`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const issuesData = await response.json();
      setIssues(Array.isArray(issuesData) ? issuesData : []);
    } catch (error) {
      console.error('Error loading issues in App:', error);
      setIssues([]);
    }
  };

  // Load issues when component mounts and set up refresh interval
  useEffect(() => {
    loadIssuesFromAPI();
    
    // Refresh issues every 30 seconds to keep stats updated
    const interval = setInterval(loadIssuesFromAPI, 30000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
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
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;