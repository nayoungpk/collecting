import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // 서버로 사용자 정보 전송
      const response = await axios.post('/api/signup', {
        username,
        password,
        email,
      });

      // 가입 성공 시 홈 페이지로 이동
      if (response.status === 200) {
        history.push('/');
      } else {
        console.error('가입 실패');
      }
    } catch (error) {
      console.error('에러:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Sign up</h2>
      <form className="login-form" onSubmit={handleSignup}>
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

        <button type="submit" className="login-button">
          Sign up
        </button>
      </form>
      <span className="e13_156">Have you already ID and password ? </span>
      <a href="/login" className="e13_157">
        Login
      </a>
    </div>
  );
};

export default Signup;