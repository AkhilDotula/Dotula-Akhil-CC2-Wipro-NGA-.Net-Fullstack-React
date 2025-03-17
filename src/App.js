// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import FriendList from './components/FriendList';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import './App.css';

const App = () => {
  // State for contacts and expenses.
  const [friends, setFriends] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Friend operations:
  const addNewFriend = (name) => {
    const friendObj = { id: String(Date.now()), name: name };
    setFriends((prev) => [...prev, friendObj]);
  };

  const modifyFriend = (id, newName) => {
    setFriends((prev) =>
      prev.map((f) => (f.id === id ? { ...f, name: newName } : f))
    );
  };

  const removeFriend = (id) => {
    setFriends((prev) => prev.filter((f) => f.id !== id));
  };

  // Expense operations:
  const addNewExpense = (expData) => {
    const newExp = {
      id: String(Date.now()),
      amount: parseFloat(expData.amount),
      description: expData.description,
      payer: expData.payer,
      participants: expData.participants,
      date: expData.date || new Date().toISOString().split("T")[0]
    };
    setExpenses((prev) => [...prev, newExp]);
  };

  const modifyExpense = (id, updatedExp) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, ...updatedExp } : exp))
    );
  };

  const removeExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/friends">Friends</Link></li>
              <li><Link to="/expenses">Expenses</Link></li>
              <li><Link to="/summary">Summary</Link></li>
            </ul>
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Dashboard friends={friends} expenses={expenses} />} />
            <Route path="/friends" element={<FriendList friends={friends} addFriend={addNewFriend} updateFriend={modifyFriend} deleteFriend={removeFriend} />} />
            <Route path="/expenses" element={<ExpenseList friends={friends} expenses={expenses} addExpense={addNewExpense} updateExpense={modifyExpense} deleteExpense={removeExpense} />} />
            <Route path="/summary" element={<ExpenseSummary friends={friends} expenses={expenses} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
