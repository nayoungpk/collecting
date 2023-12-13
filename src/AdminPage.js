import React, { useState, useEffect } from 'react';
import './AdminPage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
 //const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // 데이터를 가져올 API 엔드포인트 URL
    const apiUrl = '/api/updateProfile'; // 실제 백엔드 API 주소로 수정

    // 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // 데이터 가져오기
    fetchData();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정

  const handleEdit = (user) => {
    console.log('Edit user:', user);
  };

  const handleDelete = async (username) => {
    try {
      // 삭제 요청을 보낼 API 엔드포인트 URL
      const deleteApiUrl = `/api/updateProfile${username}`; // 실제 백엔드 API 주소로 수정

      // 삭제 요청 보내기
      await fetch(deleteApiUrl, { method: 'DELETE' });

      // 삭제 후 업데이트된 사용자 목록 가져오기
      const response = await fetch('/api/updateProfile'); // 실제 백엔드 API 주소로 수정
      const data = await response.json();
      setUsers(data);
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