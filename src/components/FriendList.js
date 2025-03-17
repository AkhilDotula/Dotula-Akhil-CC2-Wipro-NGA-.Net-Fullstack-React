// src/components/FriendList.js
import React, { useState } from 'react';
import './FriendList.css';

const FriendList = ({ friends, addFriend, updateFriend, deleteFriend }) => {
  const [friendName, setFriendName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Add new contact.
  const handleAdd = (e) => {
    e.preventDefault();
    if (!friendName.trim()) return;
    addFriend(friendName.trim());
    setFriendName('');
  };

  // Begin editing contact.
  const startEdit = (contact) => {
    setEditingId(contact.id);
    setEditValue(contact.name);
  };

  // Submit updated contact.
  const handleUpdate = (e, id) => {
    e.preventDefault();
    if (!editValue.trim()) return;
    updateFriend(id, editValue.trim());
    setEditingId(null);
    setEditValue('');
  };

  return (
    <div className="friendlist-wrapper">
      <h2>Contacts</h2>
      <form onSubmit={handleAdd} className="friend-form">
        <input 
          type="text" 
          placeholder="Enter friend's name" 
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {friends.map((f) => (
          <li key={f.id}>
            {editingId === f.id ? (
              <form onSubmit={(e) => handleUpdate(e, f.id)}>
                <input 
                  type="text" 
                  value={editValue} 
                  onChange={(e) => setEditValue(e.target.value)} 
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <span>{f.name}</span>
                <button onClick={() => startEdit(f)}>Edit</button>
                <button onClick={() => deleteFriend(f.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;
