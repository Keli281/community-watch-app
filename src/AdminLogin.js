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
      // For now, we'll use a simple client-side check
      // Later we'll connect to backend authentication
      const hardcodedAdmin = {
        email: 'admin@communitywatch.com',
        password: 'admin123' // Temporary - we'll hash this later
      };

      if (email === hardcodedAdmin.email && password === hardcodedAdmin.password) {
        // Store admin login status (temporary)
        localStorage.setItem('isAdmin', 'true');
        alert('Login successful! Redirecting to admin dashboard...');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid admin credentials');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <h1>🔐 Admin Portal</h1>
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
              placeholder="admin@communitywatch.com"
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
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In as Admin'}
          </button>
        </form>

        <div className="login-footer">
          <p>⚠️ Restricted Access - Authorized Personnel Only</p>
          <p><strong>Demo Credentials:</strong><br />
          Email: admin@communitywatch.com<br />
          Password: admin123</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;