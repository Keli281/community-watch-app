import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

// API base URL with fallback for local development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token and redirect
      localStorage.setItem('adminToken', data.token);
      
      // Show success state briefly before redirect
      setLoading('success');
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
      
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <h1>Admin Portal</h1>
          <p>CommunityWatch Administration</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Admin Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className={`login-button ${loading === 'success' ? 'success' : ''}`}
            disabled={loading}
          >
            {loading === true ? (
              <>
                <div className="button-spinner"></div>
                Signing In...
              </>
            ) : loading === 'success' ? (
              <>
                <i className="fas fa-check"></i>
                Login Successful!
              </>
            ) : (
              'Sign In as Admin'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>⚠ Restricted Access - Authorized Personnel Only</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;