import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero fade-in">
        <div className="hero-content">
          <h1>Transform Your Community, One Issue at a Time</h1>
          <p>CommunityWatch empowers residents to report neighborhood issues and track their resolution in real-time.</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="number">500+</span>
              <span className="label">Active Users</span>
            </div>
            <div className="stat">
              <span className="number">5,000+</span>
              <span className="label">Positive Reviews</span>
            </div>
            <div className="stat">
              <span className="number">1,500+</span>
              <span className="label">Issues Resolved</span>
            </div>
          </div>
          <Link to="/dashboard" className="btn-primary">
            Get Started Free
          </Link>
        </div>
        <div className="hero-image">
          <div className="city-night-image">
            <div className="image-overlay">
              <h3>Community Impact</h3>
              <p>Real-time issue tracking and resolution</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>How CommunityWatch Works</h2>
        <div className="features-grid">
          <div className="feature-card card">
            <div className="feature-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Pinpoint Issues</h3>
            <p>Click exact locations on our interactive map to report problems with precision.</p>
          </div>
          <div className="feature-card card">
            <div className="feature-icon">
              <i className="fas fa-bullhorn"></i>
            </div>
            <h3>Report Easily</h3>
            <p>Submit issue details quickly without needing to create an account.</p>
          </div>
          <div className="feature-card card">
            <div className="feature-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>Community Power</h3>
            <p>Upvote and comment on important issues to show local authorities what matters most.</p>
          </div>
          <div className="feature-card card">
            <div className="feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Track Progress</h3>
            <p>Watch real-time updates as issues move from reported to resolved.</p>
          </div>
          <div className="feature-card card"> 
            <div className="feature-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Zone Management</h3>
            <p>Visualize issues by zones for better resource allocation and planning.</p>
          </div>
          <div className="feature-card card">
            <div className="feature-icon">
              <i className="fas fa-globe-americas"></i>
            </div>
            <h3>Sustainable Cities</h3>
            <p>Supporting UN Sustainable Development Goal #11 for better urban living.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Make a Difference?</h2>
          <p>Join thousands of community champions already improving their neighborhoods.</p>
          <Link to="/dashboard" className="btn-secondary">
            Start Reporting Issues
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;