// src/components/LogoutButton.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import "../styles/Logout.css";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(null);
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
}
