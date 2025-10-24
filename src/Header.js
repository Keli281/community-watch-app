import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

function Header({ issues }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const totalIssues = issues ? issues.length : 0;
  const resolvedIssues = issues ? issues.filter(issue => issue.status === 'resolved').length : 0;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Check if link is active for styling
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <div className="logo">
          <Link to="/" className="logo-link">
            <h1>🏙️ CommunityWatch</h1>
            <span className="logo-subtitle">Connecting Communities, Fixing Neighborhoods</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="navigation desktop-nav">
          <Link 
            to="/" 
            className={`nav-link ${isActiveLink('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActiveLink('/dashboard') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/browse" 
            className={`nav-link ${isActiveLink('/browse') ? 'active' : ''}`}
          >
            Browse Issues
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${isActiveLink('/about') ? 'active' : ''}`}
          >
            About
          </Link>
          <Link 
            to="/admin" 
            className="nav-link admin-link"
          >
            Admin Login
          </Link>
        </nav>

        {/* Desktop Stats */}
        <div className="stats desktop-stats">
          <div className="stat">
            <span className="number">{totalIssues}</span>
            <span className="label">Total Issues</span>
          </div>
          <div className="stat resolved">
            <span className="number">{resolvedIssues}</span>
            <span className="label">Resolved</span>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'mobile-nav-open' : ''}`}>
        <div className="mobile-stats">
          <div className="stat">
            <span className="number">{totalIssues}</span>
            <span className="label">Total Issues</span>
          </div>
          <div className="stat resolved">
            <span className="number">{resolvedIssues}</span>
            <span className="label">Resolved</span>
          </div>
        </div>
        
        <Link 
          to="/" 
          className={`mobile-nav-link ${isActiveLink('/') ? 'active' : ''}`}
          onClick={closeMobileMenu}
        >
          🏠 Home
        </Link>
        <Link 
          to="/dashboard" 
          className={`mobile-nav-link ${isActiveLink('/dashboard') ? 'active' : ''}`}
          onClick={closeMobileMenu}
        >
          🗺️ Dashboard
        </Link>
        <Link 
          to="/browse" 
          className={`mobile-nav-link ${isActiveLink('/browse') ? 'active' : ''}`}
          onClick={closeMobileMenu}
        >
          📋 Browse Issues
        </Link>
        <Link 
          to="/about" 
          className={`mobile-nav-link ${isActiveLink('/about') ? 'active' : ''}`}
          onClick={closeMobileMenu}
        >
          ℹ️ About
        </Link>
        <Link 
          to="/admin" 
          className="mobile-nav-link admin-link"
          onClick={closeMobileMenu}
        >
          🔐 Admin Login
        </Link>
      </div>
    </header>
  );
}

export default Header;