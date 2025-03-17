// src/components/Dashboard.js
import React from 'react';
import { calcTotalExpenses } from '../services/CalculationService';
import './Dashboard.css';

const Dashboard = ({ friends, expenses }) => {
  const totalExpenses = calcTotalExpenses(expenses);

  return (
    <div className="dashboard-container">
      <h2>Dashboard Overview</h2>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Friends</h3>
          <span>{friends.length}</span>
        </div>
        <div className="stat-card">
          <h3>Total Expenses</h3>
          <span>₹{totalExpenses.toFixed(2)}</span>
        </div>
      </div>
      <p>Manage your group expenses easily. Navigate via the top menu.</p>
    </div>
  );
};

export default Dashboard;
