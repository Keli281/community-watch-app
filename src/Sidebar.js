import React from 'react';
import './Sidebar.css';

function Sidebar({ issues }) {
  // Calculate statistics
  const totalIssues = issues.length;
  const resolvedIssues = issues.filter(issue => issue.status === 'resolved').length;
  const urgentIssues = issues.filter(issue => issue.category === 'roads').length;

  const issueCategories = {
    roads: issues.filter(issue => issue.category === 'roads').length,
    sanitation: issues.filter(issue => issue.category === 'sanitation').length,
    lights: issues.filter(issue => issue.category === 'lights').length,
    other: issues.filter(issue => issue.category === 'other').length
  };

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3>📊 Live Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">{totalIssues}</span>
            <span className="stat-label">Total Issues</span>
          </div>
          <div className="stat-card resolved">
            <span className="stat-number">{resolvedIssues}</span>
            <span className="stat-label">Resolved</span>
          </div>
          <div className="stat-card urgent">
            <span className="stat-number">{urgentIssues}</span>
            <span className="stat-label">Urgent</span>
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <h3>🗂️ Issue Categories</h3>
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
            <span className="category-name"> Other Issues</span>
            <span className="category-count">{issueCategories.other}</span>
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <h3>💡 How It Works</h3>
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