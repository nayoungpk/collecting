import React, { useState, useEffect } from 'react';
import './MyPage.css';
import { Link, useNavigate } from 'react-router-dom';
import moveImage from './images/buttom.png'; // 변경된 경로
import defaultImage from './images/4.png'; // 변경된 경로

const MyPage = () => {
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedImageOverview, setSelectedImageOverview] = useState(null);

  useEffect(() => {
    // 데이터베이스에서 이미지 URL 가져오기
    fetch('/api/mypage') // 실제 엔드포인트로 변경
      .then(response => response.json())
      .then(data => {
        // 이미지 URL을 가져오지 못했거나 비어있을 경우 기본 이미지 추가
        setImageUrls(data.length > 0 ? data : [defaultImage]);
      })
      .catch(error => {
        console.error('이미지 가져오기 오류:', error);
        // 이미지 가져오기 실패 시 기본 이미지 추가
        setImageUrls([defaultImage]);
      });
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  const handleImageClick = (imageUrl) => {
    // 이미지 클릭 시 모달을 열고 선택된 이미지 설정
    setSelectedImageUrl(imageUrl);
    setSelectedImageOverview(null); // Reset the overview for the default image
  };

  const handleCloseModal = () => {
    // 모달 닫기
    setSelectedImageUrl(null);
    setSelectedImageOverview(null);
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
          <img src={moveImage} alt="" />
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
          <div key={index} className="movie-image-container">
            <img
              src={process.env.PUBLIC_URL + imageUrl}
              alt={`Sample ${index + 1}`}
              onClick={() => handleImageClick(imageUrl)}
            />
          </div>
        ))}
      </div>

      {selectedImageUrl && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={handleCloseModal}>
        &times;
      </span>
      {selectedImageOverview && (
        <>
          <img src={process.env.PUBLIC_URL + selectedImageUrl} alt="Selected Movie" />
          <p>{selectedImageOverview}</p>
        </>
      )}
      {!selectedImageOverview && <p>Overview not available</p>}
      <button className="cancel-button" onClick={handleCloseModal}>
        Cancel
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default MyPage;