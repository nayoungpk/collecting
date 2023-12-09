import React, { useState, useEffect } from 'react';
import './AdminPage.css'; // Import the CSS file

// Mock data for testing
const mockUsers = [
  { id: 1, username: 'user1', password: 'password1', email: 'user1@example.com' },
  { id: 2, username: 'user2', password: 'password2', email: 'user2@example.com' },
  { id: 3, username: 'user3', password: 'password3', email: 'user3@example.com' },
];

const AdminPage = () => {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    console.log('Edit user:', user);
  };

  const handleDelete = (username) => {
    setUsers(users.filter((user) => user.username !== username));
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.username)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;