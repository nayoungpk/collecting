import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import axios from 'axios'; // Import axios for API requests

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    email: '',
  });

  // Fetch users from the database on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch users from the backend API
      const response = await axios.get('/api/users'); // Replace with the actual API endpoint
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    console.log('Edit user:', user);
    // You can implement the logic for editing a user here
  };

  const handleDelete = async (username) => {
    try {
      // Delete user from the backend API
      await axios.delete(`/api/users/${username}`); // Replace with the actual API endpoint
      // Update the users state after deletion
      setUsers(users.filter((user) => user.username !== username));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      // Add a new user to the backend API
      await axios.post('/api/users', newUser); // Replace with the actual API endpoint
      // Fetch the updated list of users after addition
      fetchUsers();
      // Clear the newUser state after adding the user
      setNewUser({
        username: '',
        password: '',
        email: '',
      });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <h3 className="custom-heading">
        This is the Administrator page. Members' information can be deleted and modified.
      </h3>
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

      {/* Add a new user form */}
      <div>
        <h2>Add New User</h2>
        <form>
          <label>
            Username:
            <input
              type="text"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </label>
          <button type="button" onClick={handleAddUser}>
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;