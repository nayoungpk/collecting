import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import './ProfileUpdate.css';

const ProfileUpdate = ({ history }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const updateProfileOnServer = async (data) => {
    try {
      const response = await axios.post('/api/updateProfile', data);
      console.log('서버에서 프로필을 업데이트 중...', response.data);

      toast.success('프로필이 성공적으로 업데이트되었습니다.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      history.push('/MyPage');
    } catch (error) {
      console.error('프로필 업데이트 중 오류 발생:', error);

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

    await updateProfileOnServer(updatedData);
  };

  return (
    <div className="profile-update-container">
      <h1>Profile Update</h1>
      <Link to="/MyPage">
        <button className="back-button">Go Back to My Page</button>
      </Link>
      <div>
        <h4>" If there is no change, please enter the original information and change<br />
          only the part you want to change. "</h4>
      </div>

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

        <button type="submit" className="update-button1">
          Update Profile
        </button>

        <ToastContainer />
      </form>
    </div>
  );
};

export default ProfileUpdate;