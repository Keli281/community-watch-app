import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Transform Your Community, One Issue at a Time</h1>
          <p>CommunityWatch empowers residents to report neighborhood issues and track their resolution in real-time.</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="number">4,000+</span>
              <span className="label">Daily Active Users</span>
            </div>
            <div className="stat">
              <span className="number">10,000+</span>
              <span className="label">Positive Reviews</span>
            </div>
            <div className="stat">
              <span className="number">15,000+</span>
              <span className="label">Issues Resolved</span>
            </div>
          </div>
          <Link to="/dashboard" className="cta-button">
            Get Started Free
          </Link>
        </div>
        <div className="hero-image">
          {/* We'll add a city image here */}
          <div className="placeholder-image">🏙️ City Visualization</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>How CommunityWatch Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>Pinpoint Issues</h3>
            <p>Click exact locations on our interactive map to report problems with precision.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Community Power</h3>
            <p>Upvote and comment on important issues to show local authorities what matters most.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Watch real-time updates as issues move from reported to resolved.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Sustainable Cities</h3>
            <p>Supporting UN Sustainable Development Goal #11 for better urban living.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Make a Difference?</h2>
        <p>Join thousands of community champions already improving their neighborhoods.</p>
        <Link to="/dashboard" className="cta-button secondary">
          Start Reporting Issues
        </Link>
      </section>
    </div>
  );
}

export default LandingPage;