import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin');
      const data = await response.json();
      console.log('Response from server:', data);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // 서버 연결 오류 시 임시 데이터를 사용
      setUsers([
        { id: 1, username: 'TempUser1', password: 'TempPassword1', email: 'tempuser1@example.com' },
        { id: 2, username: 'TempUser2', password: 'TempPassword2', email: 'tempuser2@example.com' },
      ]);
    }
  };

  const handleEdit = (userId) => {
    console.log(`Edit user with ID: ${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      const deleteApiUrl = `/api/admin/users/${userId}`;

      await fetch(deleteApiUrl, { method: 'DELETE' });

      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <h3 className="custom-heading">This is the Administrator page. Members' information can be deleted and modified.</h3>
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
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/admin/users/${user.id}`}>
                  <button onClick={() => handleEdit(user.id)}>Edit</button>
                </Link>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;