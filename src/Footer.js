import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>CommunityWatch</h3>
          <p>Empowering communities to create sustainable and connected neighborhoods.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/dashboard">Report Issue</Link>
          <Link to="/browse">Browse Issues</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
        
        <div className="footer-section">
          <h4>Support</h4>
          <Link to="/help">Help Center</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/admin" className="admin-link">Admin Login</Link>
        </div>
        
        <div className="footer-section">
          <h4>Connect With Us</h4>
          <p>SDG #11 - Sustainable Cities & Communities</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <FaFacebook className="social-icon" />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter className="social-icon" />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram className="social-icon" />
            </a>
            <a href="#" aria-label="Email">
              <FaEnvelope className="social-icon" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 CommunityWatch. Built with ❤️ for better communities.</p>
      </div>
    </footer>
  );
}

export default Footer;