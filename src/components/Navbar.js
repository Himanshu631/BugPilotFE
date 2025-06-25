import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Navbar.css";
import ConfirmDialog from "./ConfirmDialog";
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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

      {/* Top Navbar */}
      <div className="navbar">
        <div className="navbar-left">
          <div className="navbar-logo" onClick={() => navigate('/dashboard')}>
            BugPilot
          </div>
        </div>

        <div className="navbar-right">
          <button className="profile-button">Profile</button>
          <button className="logout-button" onClick={() => setShowConfirm(true)}>Logout</button>
          <button className="hamburger" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Sub Navbar */}
      <div className={`sub-navbar ${menuOpen ? 'open' : ''}`}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/modules">Modules</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/assigned">Assingned</Link>
        <Link to="/reported">Reported</Link>
        <Link to="/my-teams">MyTeam</Link>
      </div>
    </>
  );
}
