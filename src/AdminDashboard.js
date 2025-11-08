import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

// API base URL with fallback for local development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function AdminDashboard() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const navigate = useNavigate();

  // loadIssues function MUST be defined BEFORE useEffect that uses it
  const loadIssues = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`${API_BASE_URL}/issues`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // If unauthorized, redirect to login
      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('isAdmin');
        navigate('/admin');
        return;
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const issuesData = await response.json();
      setIssues(Array.isArray(issuesData) ? issuesData : []);
    } catch (error) {
      console.error('Error loading issues:', error);
      setIssues([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [navigate]);

  // Check if user is authenticated as admin - NOW this comes AFTER loadIssues is defined
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }
    loadIssues();
  }, [navigate, loadIssues]);

  const handleStatusUpdate = async (issueId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`${API_BASE_URL}/issues/${issueId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      // If unauthorized, redirect to login
      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const updatedIssue = await response.json();
      
      // Update the local state with the backend response
      setIssues(prevIssues => 
        prevIssues.map(issue => 
          issue._id === issueId ? updatedIssue : issue
        )
      );
      
      alert(`✅ Issue status updated to: ${newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('❌ Failed to update status. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  const handleRefresh = () => {
    loadIssues(true);
  };

  const filteredIssues = selectedStatus === 'all' 
    ? issues 
    : issues.filter(issue => issue.status === selectedStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case 'reported': return '#ff6b6b';
      case 'in-progress': return '#ffd93d';
      case 'resolved': return '#6bcf7f';
      default: return '#adb5bd';
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">
          <div className="spinner"></div>
          <h2>Loading admin dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Dashboard</h1>
          <p>Manage community issues and track resolutions</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Statistics */}
      <div className="admin-stats">
        <div className="stat-card">
          <span className="stat-number">{issues.length}</span>
          <span className="stat-label">Total Issues</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {issues.filter(issue => issue.status === 'reported').length}
          </span>
          <span className="stat-label">Reported</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {issues.filter(issue => issue.status === 'in-progress').length}
          </span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {issues.filter(issue => issue.status === 'resolved').length}
          </span>
          <span className="stat-label">Resolved</span>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        <h3>Issue Management</h3>
        <div className="filter-controls">
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Statuses</option>
            <option value="reported">Reported</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <button 
            className="refresh-btn" 
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? (
              <>
                <div className="button-spinner"></div>
                Refreshing...
              </>
            ) : (
              <>
                <i className="fas fa-sync-alt"></i>
                Refresh
              </>
            )}
          </button>
        </div>
      </div>

      {/* Issues Table */}
      <div className="issues-table-container">
        {filteredIssues.length === 0 ? (
          <div className="no-issues">
            <h3>No issues found</h3>
            <p>Try adjusting your status filter</p>
          </div>
        ) : (
          <table className="issues-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
                <th>Upvotes</th>
                <th>Date Reported</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.map(issue => (
                <tr key={issue._id}>
                  <td className="issue-title">
                    <strong>{issue.title}</strong>
                    <br />
                    <small>{issue.description}</small>
                  </td>
                  <td>
                    <span className="category-badge">
                      {issue.category}
                    </span>
                  </td>
                  <td>{issue.location || 'Not specified'}</td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(issue.status) }}
                    >
                      {issue.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="upvotes">{issue.upvotes || 0}</td>
                  <td className="date">
                    {new Date(issue.createdAt).toLocaleDateString()}
                  </td>
                  <td className="actions">
                    <select 
                      value={issue.status}
                      onChange={(e) => handleStatusUpdate(issue._id, e.target.value)}
                      className="status-select"
                    >
                      <option value="reported">Reported</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;