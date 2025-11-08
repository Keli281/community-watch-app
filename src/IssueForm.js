import React, { useState } from 'react';
import './IssueForm.css';

// API base URL with fallback for local development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function IssueForm({ coordinates, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState(''); // NEW: Location field

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const issueData = {
      title,
      description,
      category,
      location, // NEW: Include location text
      coordinates,
      status: 'reported',
      createdAt: new Date().toISOString()
    };
    
    try {
      // Save to backend first
      const response = await fetch(`${API_BASE_URL}/issues`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(issueData)
      });

      if (!response.ok) {
        throw new Error('Failed to save issue');
      }

      const savedIssue = await response.json();
      
      // Call onSave to refresh the issues list in MapComponent
      onSave(); // Changed: Just call the function without parameters
      
      // Close the form
      onClose();
      
      // Show success message
      alert(`Issue "${title}" reported successfully! ✅`);
      
    } catch (error) {
      console.error('Error saving issue:', error);
      alert('Failed to save issue. Please check if backend is running and try again.');
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h3>Report New Issue</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Issue title (e.g., Pothole on Main Street)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          
          <textarea
            placeholder="Describe the issue in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="3"
          />
          
          {/* NEW: Location Input */}
          <input
            type="text"
            placeholder="Specific location (e.g., Near Main St & 5th Ave, Downtown)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="roads">Roads & Potholes</option>
            <option value="sanitation">Sanitation</option>
            <option value="lights">Street Lights</option>
            <option value="parks">Parks & Public Spaces</option>
            <option value="insecurity">Security Issues</option>
            <option value="power">Power Outages</option>
            <option value="other">Other Issues</option>
          </select>
          
          <div className="form-buttons">
            <button type="submit">Submit Issue</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IssueForm;