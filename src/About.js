import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About CommunityWatch</h1>
        <p>Empowering communities to create sustainable and connected neighborhoods</p>
      </div>

      <div className="about-content">
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            CommunityWatch is dedicated to supporting UN Sustainable Development Goal #11 - 
            making cities and human settlements inclusive, safe, resilient, and sustainable.
            We believe that technology can bridge the gap between residents and local authorities,
            creating more responsive and engaged communities.
          </p>
        </section>

        <section className="features-section">
          <h2>How We Help Communities</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">📍</div>
              <h3>Easy Issue Reporting</h3>
              <p>Residents can report neighborhood issues quickly without creating accounts, making the process accessible to everyone.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">👁️</div>
              <h3>Transparent Tracking</h3>
              <p>Track issue progress from reported to resolved in real-time with full visibility for the entire community.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💬</div>
              <h3>Community Engagement</h3>
              <p>Upvote and comment on issues to prioritize community needs and share additional information.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🗺️</div>
              <h3>Zone-Based Management</h3>
              <p>Organize and visualize issues by geographical zones for better resource allocation and planning.</p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>Built for Communities, By Developers</h2>
          <p>
            CommunityWatch is developed as a final project for a MERN Stack software development program, 
            demonstrating how modern web technologies can solve real-world community problems. Our goal is 
            to create tools that empower residents and make local governance more accessible and effective.
          </p>
          <div className="sdg-badge">
            <h3>🌍 Supporting UN Sustainable Development Goal #11</h3>
            <p>Sustainable Cities and Communities</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;