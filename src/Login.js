import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory 대신 useNavigate 사용
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useHistory 대신 useNavigate 사용

  const handleLogin = (e) => {
    e.preventDefault();

    // 여기서 실제로 백엔드 API 호출을 수행하는 대신에,
    // 임시로 사용자명과 비밀번호를 확인하여 로그인을 시뮬레이션합니다.
    if (username === '12' && password === '12') {
      // 로그인 성공 시 MyPage로 이동
      navigate('/MyPage');
    } else {
      alert('로그인 실패. 사용자명과 비밀번호를 확인하세요.');
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
      <a href="/" className="e13_157">Sign up</a>
    </div>
  );
};

export default Login;