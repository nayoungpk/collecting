import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 아이디가 '1'이고 비밀번호가 '1'인 경우를 예외로 처리
      if (username === '1' && password === '1') {
        navigate('/AdminPage');
        return;
      }

      // 아이디가 '12'이고 비밀번호가 '12'인 경우를 예외로 처리
      if (username === '12' && password === '12') {
        navigate('/MyPage');
        return;
      }

      // 실제로는 서버에서 사용자 인증을 처리하는 API를 호출해야 합니다.
      const response = await axios.post('/api/login', { username, password });

      // 예시: 서버에서 반환하는 데이터에 따라 로그인 처리
      if (response.data.role === 'user') {
        navigate('/MyPage');
      } else {
        alert('로그인 실패. 사용자명과 비밀번호를 확인하세요.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="login-container">
      <h2>LOGIN</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

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

        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <span className="e13_156">Don't have an account yet? </span>
      <a href="/" className="e13_157">
        Sign up
      </a>
    </div>
  );
};

export default Login;