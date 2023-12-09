import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProfileUpdate.css';

const ProfileUpdate = ({ history }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const updateProfileOnServer = async (data) => {
    try {
      // 백엔드 API 호출로 수정
      const response = await axios.post('/api/updateProfile', data);
      console.log('서버에서 프로필을 업데이트 중...', response.data);

      // 성공 알림 표시
      toast.success('프로필이 성공적으로 업데이트되었습니다.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // 프로필 업데이트가 성공했을 때 MyPage로 이동
      history.push('/MyPage');
    } catch (error) {
      console.error('프로필 업데이트 중 오류 발생:', error);

      // 오류 알림 표시
      toast.error('프로필 업데이트에 실패했습니다.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = { password, email };

    // 서버에 프로필 업데이트를 요청합니다.
    await updateProfileOnServer(updatedData);

    // 업데이트 후 추가 작업이 필요하다면 여기에서 처리
  };

  return (
    <div className="profile-update-container">
      <h1>Profile Update</h1>
      <form className="profile-update-form" onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="update-button">
          Update Profile
        </button>

        <ToastContainer />
      </form>
    </div>
  );
};

export default ProfileUpdate;