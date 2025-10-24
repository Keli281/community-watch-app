import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BrowseIssues.css';

function BrowseIssues() {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    sortBy: 'newest'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);

  // Load real issues from API
  useEffect(() => {
    loadIssuesFromAPI();
  }, []);

  const loadIssuesFromAPI = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/issues');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const issuesData = await response.json();
      setIssues(Array.isArray(issuesData) ? issuesData : []);
      setFilteredIssues(Array.isArray(issuesData) ? issuesData : []);
    } catch (error) {
      console.error('Error loading issues:', error);
      setIssues([]);
      setFilteredIssues([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort issues
  useEffect(() => {
    let result = [...issues];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(issue => 
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category !== 'all') {
      result = result.filter(issue => issue.category === filters.category);
    }

    // Apply status filter
    if (filters.status !== 'all') {
      result = result.filter(issue => issue.status === filters.status);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'most-upvotes':
        result.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
        break;
      case 'most-comments':
        result.sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0));
        break;
      default:
        break;
    }

    setFilteredIssues(result);
  }, [issues, filters, searchTerm]);

  const handleUpvote = async (issueId) => {
    try {
      console.log('🔄 Attempting to upvote issue:', issueId);
      
      const response = await fetch(`http://localhost:5000/api/issues/${issueId}/upvote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const updatedIssue = await response.json();
      console.log('✅ Upvote successful:', updatedIssue);
      
      // Update the issues list
      setIssues(prevIssues => 
        prevIssues.map(issue => 
          issue._id === issueId ? updatedIssue : issue
        )
      );
    } catch (error) {
      console.error('❌ Upvote error:', error);
      alert(`Failed to upvote: ${error.message}`);
    }
  };

  const openCommentModal = (issue) => {
    setSelectedIssue(issue);
    setCommentText('');
    setShowCommentModal(true);
  };

  const closeCommentModal = () => {
    setShowCommentModal(false);
    setSelectedIssue(null);
    setCommentText('');
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      alert('Please enter a comment');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/issues/${selectedIssue._id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: commentText })
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const updatedIssue = await response.json();
      
      // Update the issues list with the new comment
      setIssues(prevIssues => 
        prevIssues.map(issue => 
          issue._id === selectedIssue._id ? updatedIssue : issue
        )
      );
      
      // Close modal and reset
      closeCommentModal();
      alert('Comment added successfully!');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'reported': return '#ff6b6b';
      case 'in-progress': return '#ffd93d';
      case 'resolved': return '#6bcf7f';
      default: return '#adb5bd';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'roads': return '🚧';
      case 'lights': return '💡';
      case 'sanitation': return '🗑️';
      default: return '📋';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="browse-issues">
        <div className="loading">
          <h2>Loading issues...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="browse-issues">
      {/* Header Section */}
      <div className="browse-header">
        <h1>Community Issues</h1>
        <p>Browse, support, and track neighborhood issues</p>
        
        <div className="header-actions">
          <Link to="/dashboard" className="report-button">
            📝 Report New Issue
          </Link>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search issues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <select 
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="roads">Roads & Potholes</option>
            <option value="lights">Street Lights</option>
            <option value="sanitation">Sanitation</option>
            <option value="other">Other</option>
          </select>

          <select 
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="reported">Reported</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          <select 
            value={filters.sortBy}
            onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
            className="filter-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="most-upvotes">Most Upvotes</option>
            <option value="most-comments">Most Comments</option>
          </select>
        </div>
      </div>

      {/* Issues Grid */}
      <div className="issues-grid">
        {filteredIssues.length === 0 ? (
          <div className="no-issues">
            <h3>No issues found</h3>
            <p>Try adjusting your filters or search terms</p>
            <Link to="/dashboard" className="report-button">
              Report the First Issue
            </Link>
          </div>
        ) : (
          filteredIssues.map(issue => (
            <div key={issue._id} className="issue-card">
              <div className="issue-header">
                <span className="category-icon">
                  {getCategoryIcon(issue.category)}
                </span>
                <div className="issue-meta">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(issue.status) }}
                  >
                    {issue.status.replace('-', ' ')}
                  </span>
                  <span className="zone">{issue.zone || 'General'}</span>
                </div>
              </div>

              <h3 className="issue-title">{issue.title}</h3>
              <p className="issue-description">{issue.description}</p>

              <div className="issue-footer">
                <div className="engagement">
                  <button 
                    className="upvote-btn"
                    onClick={() => handleUpvote(issue._id)}
                  >
                    ❤️ {issue.upvotes || 0}
                  </button>
                  <button 
                    className="comment-btn"
                    onClick={() => openCommentModal(issue)}
                  >
                    💬 {issue.comments?.length || 0}
                  </button>
                </div>
                
                <div className="issue-date">
                  {new Date(issue.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Comment Modal */}
      {showCommentModal && selectedIssue && (
        <div className="modal-overlay" onClick={closeCommentModal}>
          <div className="comment-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Comment</h3>
              <button className="close-btn" onClick={closeCommentModal}>×</button>
            </div>
            
            <div className="modal-content">
              <div className="issue-preview">
                <strong>{selectedIssue.title}</strong>
                <p>{selectedIssue.description}</p>
              </div>

              <div className="existing-comments">
                <h4>Existing Comments ({selectedIssue.comments?.length || 0})</h4>
                {selectedIssue.comments && selectedIssue.comments.length > 0 ? (
                  <div className="comments-list">
                    {selectedIssue.comments.map((comment, index) => (
                      <div key={index} className="comment-item">
                        <p className="comment-text">{comment.text}</p>
                        <span className="comment-date">
                          {comment.date ? formatDate(comment.date) : 'Recently'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-comments">No comments yet. Be the first to comment!</p>
                )}
              </div>

              <div className="comment-form">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts, suggestions, or additional information..."
                  className="comment-textarea"
                  rows="4"
                />
                <div className="modal-actions">
                  <button className="cancel-btn" onClick={closeCommentModal}>
                    Cancel
                  </button>
                  <button className="submit-btn" onClick={handleAddComment}>
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BrowseIssues;