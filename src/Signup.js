import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  // useState 훅을 사용하여 상태 관리
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // useNavigate 훅을 사용하여 네비게이션 객체 가져오기
  const navigate = useNavigate();

  // 회원가입 처리 함수
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // axios를 사용하여 서버에 회원가입 요청
      const response = await axios.post('/api/signup', {
        username,
        password,
        email,
      });

      // 전체 응답을 콘솔에 출력
      console.log('Signup Response:', response);

      // 서버 응답에 따라 처리
      if (response.status === 200) {
        // 성공 알림
        alert('회원가입이 성공적으로 완료되었습니다! 이제 로그인할 수 있습니다.');
        // 로그인 페이지로 이동
        navigate('/login');
      } else {
        // 실패 알림
        alert('회원가입 실패. 다시 시도해주세요.');
        console.error('회원가입 실패');
      }
    } catch (error) {
      // API 연결 실패 시 성공으로 가정 (테스트 목적)
      alert('회원가입이 성공적으로 완료되었습니다! (테스트 목적)');
      // 홈 페이지로 이동
      navigate('/');
      console.error('에러:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
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
          Sign Up
        </button>
      </form>
      <span className="e13_156">Already have an account? </span>
      <a href="/login" className="e13_157">
        Log In
      </a>
    </div>
  );
};

export default Signup;