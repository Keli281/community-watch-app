import React, { useState } from 'react';
import './IssueForm.css';

function IssueForm({ coordinates, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const issueData = {
      title,
      description,
      category,
      coordinates,
      status: 'reported',
      createdAt: new Date().toISOString()
    };
    onSave(issueData);
    onClose();
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h3>Report New Issue</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Issue title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Describe the issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            <option value="other">Other</option>
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