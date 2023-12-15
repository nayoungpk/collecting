import React, { useState, useEffect } from 'react';
import './MyPage.css';
import { Link, useNavigate } from 'react-router-dom';
import moveImage from './images/buttom.png';
import defaultImage from './images/4.png';

const MyPage = () => {
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedImageOverview, setSelectedImageOverview] = useState(null);

  useEffect(() => {
    // 데이터베이스에서 이미지 URL 및 overview 가져오기
    fetch('/api/mypage')
      .then(response => response.json())
      .then(data => {
        // 서버 응답 콘솔로 출력
        console.log('서버 응답:', data);
        
        setImageUrls(data.length > 0 ? data : [{ url: defaultImage, overview: null }]);
      })
      .catch(error => {
        console.error('이미지 및 Overview 가져오기 오류:', error);
        setImageUrls([{ url: defaultImage, overview: null }]);
      });
  }, []);

  const handleLogout = async () => {
    try {
      // 로그아웃 API 호출
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // 로그아웃 성공 시 홈페이지로 이동
        navigate('/');
      } else {
        console.error('로그아웃 실패');
        // 로그아웃 실패 시 알림
        alert('로그아웃 실패. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('로그아웃 API 오류:', error);
      // 로그아웃 API 오류 시 알림
      alert('로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleImageClick = (imageUrl, overview) => {
    // 이미지 클릭 시 모달을 열고 선택된 이미지 및 overview 설정
    setSelectedImageUrl(imageUrl);
    setSelectedImageOverview(overview);
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
        <button className="logout-button1" onClick={handleLogout}>
          Logout
        </button>
        <Link to="/ProfileUpdate" className="update-button">
          Update Profile
        </Link>
      </div>

      <div className="image-scroll-box">
        <h1 className="movie_title">MOVIES</h1>
        {imageUrls.map((image, index) => (
          <div key={index} className="movie-image-container">
            <img
              src={process.env.PUBLIC_URL + image.url}
              alt={`Sample ${index + 1}`}
              onClick={() => handleImageClick(image.url, image.overview)}
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
            {selectedImageOverview ? (
              <>
                <img src={process.env.PUBLIC_URL + selectedImageUrl} alt="Selected Movie" />
                <p>{selectedImageOverview}</p>
              </>
            ) : (
              <p>Overview not available</p>
            )}
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