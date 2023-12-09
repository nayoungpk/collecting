import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 API에서 사용자 목록을 가져옵니다.
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users'); // 실제 API 엔드포인트로 대체하세요.
      setUsers(response.data);
    } catch (error) {
      console.error('사용자 정보를 가져오는 중 에러 발생:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      // 사용자를 삭제하는 API 엔드포인트를 호출합니다.
      await axios.delete(`/api/users/${userId}`); // 실제 API 엔드포인트로 대체하세요.
      // 삭제 후 사용자 목록을 업데이트합니다.
      fetchUsers();
    } catch (error) {
      console.error('사용자 삭제 중 에러 발생:', error);
    }
  };

  return (
    <div className="admin-page-container">
      <h2>관리자 페이지</h2>
      <table>
        <thead>
          <tr>
            <th>사용자명</th>
            <th>이메일</th>
            <th>동작</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;