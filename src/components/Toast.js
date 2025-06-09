// components/Toast.js
import React from 'react';
import './Toast.css';

export default function Toast({ message, type = 'error', onClose }) {
  if (!message) return null;

  return (
    <div className={`toast ${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>✖</button>
    </div>
  );
}
