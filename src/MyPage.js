import React from 'react';
import './MyPage.css';
import { Link, useNavigate } from 'react-router-dom';
import ImageComponent from './ImageComponent';
import moveImage from 'C:/Users/박나영/Desktop/react/collecting/src/images/buttom.png';

const MyPage = () => {
  const navigate = useNavigate();// useNavigate 훅을 초기화합니다.

   // 로그아웃 처리를 위한 함수입니다.
  const handleLogout = () => {
       // 로그아웃 로직을 수행합니다. (인증 상태 초기화 등)
      // 여기서는 단순히 홈 페이지로 리디렉션하는 로직을 시뮬레이션합니다.
    navigate('/');
  };

  return (
    <div>
      <div className="MyPage">
        <p>
          <span className="title1">My Page</span>
        </p>
        <p>
          <span className="title2">Go to get recommendations for movies you want to see</span>
        </p>
        <p>
          <span className="title3">
            If there is a movie you want to see, briefly explain the plot of the movie you want to
            see
          </span>
        </p>
        <Link to="/Chating" className="my-button">
          <img src={moveImage} alt="Your Image" />
        </Link>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        <Link to="/ProfileUpdate" className="update-button">
          Update Profile
        </Link>
        <ImageComponent />
      </div>
    </div>
  );
};

export default MyPage;