import React from 'react';
import './Sidebar.css';

function Sidebar({ issues }) {
  // Calculate statistics - UPDATED: Changed urgent to in-progress
  const totalIssues = issues.length;
  const resolvedIssues = issues.filter(issue => issue.status === 'resolved').length;
  const inProgressIssues = issues.filter(issue => issue.status === 'in-progress').length;

  // UPDATED: Added insecurity and power categories
  const issueCategories = {
    roads: issues.filter(issue => issue.category === 'roads').length,
    sanitation: issues.filter(issue => issue.category === 'sanitation').length,
    lights: issues.filter(issue => issue.category === 'lights').length,
    parks: issues.filter(issue => issue.category === 'parks').length,
    insecurity: issues.filter(issue => issue.category === 'insecurity').length, // NEW
    power: issues.filter(issue => issue.category === 'power').length, // NEW
    other: issues.filter(issue => issue.category === 'other').length
  };

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3> Live Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">{totalIssues}</span>
            <span className="stat-label">Total Issues</span>
          </div>
          <div className="stat-card resolved">
            <span className="stat-number">{resolvedIssues}</span>
            <span className="stat-label">Resolved</span>
          </div>
          {/* CHANGED: Urgent to In Progress */}
          <div className="stat-card in-progress">
            <span className="stat-number">{inProgressIssues}</span>
            <span className="stat-label">In Progress</span>
          </div>
        </div>
      </div>
      
      <div className="sidebar-section">
        <h3>Resolution Progress</h3>
        <div className="progress-item">
          <span>Issue Resolution Rate</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${totalIssues > 0 ? (resolvedIssues / totalIssues) * 100 : 0}%` }}
            ></div>
          </div>
          <small>{totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0}% resolved</small>
        </div>
      </div>

      <div className="sidebar-section">
        <h3> Issue Categories</h3>
        <div className="categories">
          <div className="category">
            <span className="category-name"> Roads & Potholes</span>
            <span className="category-count">{issueCategories.roads}</span>
          </div>
          <div className="category">
            <span className="category-name"> Sanitation</span>
            <span className="category-count">{issueCategories.sanitation}</span>
          </div>
          <div className="category">
            <span className="category-name"> Street Lights</span>
            <span className="category-count">{issueCategories.lights}</span>
          </div>
          <div className="category">
            <span className="category-name"> Parks & Public Spaces</span>
            <span className="category-count">{issueCategories.parks}</span>
          </div>
          {/* NEW CATEGORIES */}
          <div className="category">
            <span className="category-name"> Security Issues</span>
            <span className="category-count">{issueCategories.insecurity}</span>
          </div>
          <div className="category">
            <span className="category-name"> Power Outages</span>
            <span className="category-count">{issueCategories.power}</span>
          </div>
          <div className="category">
            <span className="category-name"> Other Issues</span>
            <span className="category-count">{issueCategories.other}</span>
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <h3> How It Works</h3>
        <div className="instructions">
          <p>1. <strong>Click anywhere</strong> on the map to place a pin</p>
          <p>2. <strong>Report the issue</strong> with details and category</p>
          <p>3. <strong>Track progress</strong> as admins resolve problems</p>
          <p>4. <strong>Upvote & comment</strong> on important issues</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;