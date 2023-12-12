import React, { useState, useEffect } from 'react';
import './MyPage.css';
import { Link, useNavigate } from 'react-router-dom';
import moveImage from 'C:/Users/박나영/Desktop/react/collecting/src/images/buttom.png';
import defaultImage from 'C:/Users/박나영/Desktop/react/collecting/src/images/4.png';

const MyPage = () => {
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // 데이터베이스에서 이미지 URL 가져오기~
    fetch('/api/getImages') // 실제 엔드포인트로 변경~
      .then(response => response.json())
      .then(data => setImageUrls(data))
      .catch(error => {
        console.error('이미지 가져오기 오류:', error);
        // 이미지 가져오기 실패 시 기본 이미지 추가~
        setImageUrls([defaultImage]);
      });
  }, []);

  const handleLogout = () => {
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
      </div>

      <div className="image-scroll-box">
        <h1 className="movie_title">MOVIE</h1>
        {imageUrls.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Sample ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default MyPage;