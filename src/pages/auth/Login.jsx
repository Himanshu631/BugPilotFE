import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/v1/authenticate', form);
      const token = res.data.data.token;
      const decoded = JSON.parse(atob(token.split('.')[1]));

      setAuth({ token, user: decoded });
      localStorage.setItem('token', token);

      // 🔁 Redirect based on role
      if (decoded.roles.includes('ADMIN')) {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
