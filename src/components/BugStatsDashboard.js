import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

const categories = [
  {
    name: "Editorial",
    avg: 49.22,
    total: 293,
    resolved: 264,
    open: 3,
    awaiting: 2,
    inProgress: 24,
    high: 120,
    mid: 124,
    low: 49,
  },
  {
    name: "Problem",
    avg: 33.28,
    total: 658,
    resolved: 529,
    open: 5,
    awaiting: 54,
    inProgress: 70,
    high: 345,
    mid: 212,
    low: 101,
  },
  {
    name: "Video",
    avg: 29.73,
    total: 176,
    resolved: 107,
    open: 20,
    awaiting: 14,
    inProgress: 35,
    high: 128,
    mid: 39,
    low: 9,
  },
  {
    name: "Tech",
    avg: 46.29,
    total: 580,
    resolved: 534,
    open: 1,
    awaiting: 21,
    inProgress: 24,
    high: 0,
    mid: 0,
    low: 0,
  },
  {
    name: "Others",
    avg: 81.38,
    total: 202,
    resolved: 189,
    open: 4,
    awaiting: 4,
    inProgress: 5,
    high: 0,
    mid: 0,
    low: 0,
  }
];

export default function BugStatsDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // const token = localStorage.getItem("token"); // or sessionStorage, or context
  
    axios
      .get("http://localhost:8080/api/v1/stats/cummulative", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdGV2ZS5qb2JzQGFwcGxlLmNvbSIsInJvbGVzIjpbIkNMSUVOVF9BRE1JTiJdLCJwZXJtaXNzaW9ucyI6WyJVU0VSX01BTkFHRSIsIlJPTEVfTUFOQUdFIiwiUEVSTUlTU0lPTl9NQU5BR0UiXSwiaXNzIjoiVGVjaGlvIEJ1Z1BpbG90IiwiaWF0IjoxNzQ5NDA3Nzg3LCJleHAiOjE3NDk0MTEzODd9.sx5XD1SDFq5b3F78p6saUOq4KJ6dQmkqStqiZj4NYxE`
        }
      })
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch stats");
        console.error(err);
        setLoading(false);
      });
  }, []);
  

  if (loading) return <div className="dashboard">Loading stats...</div>;
  if (error) return <div className="dashboard">{error}</div>;

  return (
    <div className="dashboard">
      <div className="header-row">
        <h1 className="heading">Bug Pilot</h1>
        <div className="date-filter">
          <div>
            <label>Start Date</label>
            <input type="date" defaultValue="2025-01-01" />
          </div>
          <div>
            <label>End Date</label>
            <input type="date" defaultValue="2025-09-28" />
          </div>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card purple">
          Avg. Resolution Time: <strong>{stats.avgResolutionTime} hrs</strong>
        </div>
        <div className="stat-card blue">
          Total Bugs: <strong>{stats.totalBugs}</strong>
        </div>
        <div className="stat-card green">
          Resolved Bugs: <strong>{stats.resolvedBugs}</strong>
        </div>
        <div className="stat-card red">
          Open Bugs: <strong>{stats.openBugs}</strong>
        </div>
        <div className="stat-card yellow">
          Awaiting Reply Bugs: <strong>{stats.awaitingReplyBugs}</strong>
        </div>
        <div className="stat-card orange">
          In Progress Bugs: <strong>{stats.inProgressBugs}</strong>
        </div>
      </div>

      <div
        className={`category-grid ${
          categories.length < 3 ? "center-wrapper" : ""
        }`}
      >
        {categories.map((cat) => (
          <div className="category-card" key={cat.name}>
            <h2>{cat.name}</h2>
            <p className="avg">
              Avg Resolution: <strong>{cat.avg} hrs</strong>
            </p>
            <ul className="category-list">
              <li>
                <span className="label">Total:</span>
                <span className="value">{cat.total}</span>
              </li>
              <li>
                <span className="label">Resolved:</span>
                <span className="value">{cat.resolved}</span>
              </li>
              <li>
                <span className="label">Open:</span>
                <span className="value">{cat.open}</span>
              </li>
              <li>
                <span className="label">Awaiting Reply:</span>
                <span className="value">{cat.awaiting}</span>
              </li>
              <li>
                <span className="label">In Progress:</span>
                <span className="value">{cat.inProgress}</span>
              </li>
            </ul>

            <div className="badge-section">
              <span className="badge high">High: {cat.high}</span>
              <span className="badge mid">Mid: {cat.mid}</span>
              <span className="badge low">Low: {cat.low}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
