import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Navbar.css";
import ConfirmDialog from "./ConfirmDialog";

export default function Navbar() {
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
    };
  
    return (
      <>
        {showConfirm && (
          <ConfirmDialog
            message="Are you sure you want to logout?"
            onConfirm={handleLogout}
            onCancel={() => setShowConfirm(false)}
          />
        )}
        <div className="navbar">
          <div className="navbar-left">
            <div className="navbar-logo" onClick={() => navigate('/dashboard')}>
              BugPilot
            </div>
            <div className="navbar-links">
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/admin/dashboard">Admin</Link>
              <Link to="/onboard">Onboard</Link>
            </div>
          </div>
          <div className="navbar-right">
            <button className="logout-button" onClick={() => setShowConfirm(true)}>Logout</button>
          </div>
        </div>
      </>
    );
  }