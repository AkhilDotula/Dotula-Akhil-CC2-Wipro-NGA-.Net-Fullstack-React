// src/components/ExpenseList.js
import React, { useState } from 'react';
import './ExpenseList.css';

const ExpenseList = ({ friends, expenses, addExpense, updateExpense, deleteExpense }) => {
  const [expInput, setExpInput] = useState({
    amount: '',
    description: '',
    payer: '',
    participants: [],
    date: ''
  });

  const [editExpId, setEditExpId] = useState(null);
  const [editInput, setEditInput] = useState({
    amount: '',
    description: '',
    payer: '',
    participants: [],
    date: ''
  });

  // Handle new expense changes.
  const handleExpInput = (e) => {
    const { name, value } = e.target;
    setExpInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleExpParticipants = (e) => {
    const fid = e.target.value;
    let updated = [...expInput.participants];
    if (e.target.checked) {
      updated.push(fid);
    } else {
      updated = updated.filter((id) => id !== fid);
    }
    setExpInput((prev) => ({ ...prev, participants: updated }));
  };

  const submitExpense = (e) => {
    e.preventDefault();
    if (
      expInput.amount <= 0 ||
      !expInput.description.trim() ||
      !expInput.payer ||
      expInput.participants.length === 0
    ) return;
    addExpense(expInput);
    setExpInput({ amount: '', description: '', payer: '', participants: [], date: '' });
  };

  // Handle edit changes.
  const beginEditExpense = (exp) => {
    setEditExpId(exp.id);
    setEditInput(exp);
  };

  const handleEditInput = (e) => {
    const { name, value } = e.target;
    setEditInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditParticipants = (e) => {
    const fid = e.target.value;
    let updated = [...editInput.participants];
    if (e.target.checked) {
      updated.push(fid);
    } else {
      updated = updated.filter((id) => id !== fid);
    }
    setEditInput((prev) => ({ ...prev, participants: updated }));
  };

  const submitEditExpense = (e, id) => {
    e.preventDefault();
    if (
      editInput.amount <= 0 ||
      !editInput.description.trim() ||
      !editInput.payer ||
      editInput.participants.length === 0
    ) return;
    updateExpense(id, editInput);
    setEditExpId(null);
    setEditInput({ amount: '', description: '', payer: '', participants: [], date: '' });
  };

  return (
    <div className="expense-container">
      <h2>Expenses</h2>
      <form onSubmit={submitExpense} className="expense-form">
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={expInput.amount}
          onChange={handleExpInput}
          step="0.01"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={expInput.description}
          onChange={handleExpInput}
        />
        <select name="payer" value={expInput.payer} onChange={handleExpInput}>
          <option value="">Select payer</option>
          {friends.map((f) => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>
        <div className="participant-group">
          <p>Select participants:</p>
          {friends.map((f) => (
            <label key={f.id}>
              <input
                type="checkbox"
                value={f.id}
                checked={expInput.participants.includes(f.id)}
                onChange={handleExpParticipants}
              />
              {f.name}
            </label>
          ))}
        </div>
        <input
          type="date"
          name="date"
          value={expInput.date}
          onChange={handleExpInput}
        />
        <button type="submit">Add Expense</button>
      </form>

      <ul>
        {expenses.map((exp) => (
          <li key={exp.id} className="expense-item">
            {editExpId === exp.id ? (
              <form onSubmit={(e) => submitEditExpense(e, exp.id)}>
                <input
                  type="number"
                  name="amount"
                  value={editInput.amount}
                  onChange={handleEditInput}
                  step="0.01"
                />
                <input
                  type="text"
                  name="description"
                  value={editInput.description}
                  onChange={handleEditInput}
                />
                <select name="payer" value={editInput.payer} onChange={handleEditInput}>
                  <option value="">Select payer</option>
                  {friends.map((f) => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
                <div className="participant-group">
                  <p>Select participants:</p>
                  {friends.map((f) => (
                    <label key={f.id}>
                      <input
                        type="checkbox"
                        value={f.id}
                        checked={editInput.participants.includes(f.id)}
                        onChange={handleEditParticipants}
                      />
                      {f.name}
                    </label>
                  ))}
                </div>
                <input
                  type="date"
                  name="date"
                  value={editInput.date}
                  onChange={handleEditInput}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditExpId(null)}>Cancel</button>
              </form>
            ) : (
              <div className="expense-details">
                <p><strong>Amount:</strong> ₹{exp.amount.toFixed(2)}</p>
                <p><strong>Description:</strong> {exp.description}</p>
                <p>
                  <strong>Payer:</strong> {friends.find((f) => f.id === exp.payer)?.name || 'N/A'}
                </p>
                <p><strong>Date:</strong> {exp.date}</p>
                <p>
                  <strong>Participants:</strong> {exp.participants.map((pid) =>
                    friends.find((f) => f.id === pid)?.name
                  ).join(', ')}
                </p>
                <button onClick={() => beginEditExpense(exp)}>Edit</button>
                <button onClick={() => deleteExpense(exp.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
