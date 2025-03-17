// src/components/ExpenseSummary.js
import React from 'react';
import { calcSummary, calcTotalExpenses } from '../services/CalculationService';
import './ExpenseSummary.css';

const ExpenseSummary = ({ friends, expenses }) => {
  const summary = calcSummary(friends, expenses);
  const total = calcTotalExpenses(expenses);

  return (
    <div className="summary-container">
      <h2>Expense Summary</h2>
      <p><strong>Total Expenses:</strong> ₹{total.toFixed(2)}</p>
      <table>
        <thead>
          <tr>
            <th>Friend</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {friends.map((f) => (
            <tr key={f.id}>
              <td>{f.name}</td>
              <td className={summary[f.id] >= 0 ? "balance-positive" : "balance-negative"}>
                ₹{summary[f.id].toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="help-text">Positive: Owed money | Negative: Owes money</p>
    </div>
  );
};

export default ExpenseSummary;
