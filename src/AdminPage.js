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
      const response = await fetch('/api/admin'); // /api/admin으로 수정
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (userId) => {
    console.log(`Edit user with ID: ${userId}`);
    // 사용자를 수정하는 페이지로 이동
    // 이동할 페이지에서는 해당 userId를 사용하여 사용자 정보를 가져와 수정할 수 있도록 구현
  };

  const handleDelete = async (userId) => {
    try {
      const deleteApiUrl = `/api/admin/users/${userId}`; // /api/admin/users/:userId로 수정

      await fetch(deleteApiUrl, { method: 'DELETE' });

      // 삭제 후에는 fetchData를 호출하여 업데이트된 데이터를 가져옴
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
                {/* Link 컴포넌트를 사용하여 클릭 시 해당 사용자의 수정 페이지로 이동 */}
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