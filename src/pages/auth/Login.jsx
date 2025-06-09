import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Toast from '../../components/Toast'; // 🔁 Adjust path
import './Login.css';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!form.username || !form.password) {
      setToastMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/api/v1/authenticate', form);

      if (!res.data.success) {
        setToastMessage(res.data.message || 'Login failed');
        return;
      }

      const token = res.data.data.accessToken;
      const decoded = JSON.parse(atob(token.split('.')[1]));

      setAuth({ token, user: decoded });
      localStorage.setItem('token', token);

      navigate(decoded.roles.includes('ADMIN') ? '/' : '/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setToastMessage(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {toastMessage && (
        <Toast
          message={toastMessage}
          type="error"
          onClose={() => setToastMessage('')}
        />
      )}

      <div className="login-card">
        <div className="login-header">
          <h1>CRM Login</h1>
          <p>Welcome back! Please login to your account.</p>
        </div>

        <input
          type="text"
          placeholder="Username"
          className="login-input"
          onChange={e => setForm({ ...form, username: e.target.value })}
        />

        <div className="login-password">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="login-input"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>

        <div className="login-options">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="login-button"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="login-footer">
          © {new Date().getFullYear()} YourCompany. All rights reserved.
        </p>
      </div>
    </div>
  );
}
