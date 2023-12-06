import React, { useState, useEffect } from 'react';

const ImageComponent = () => {
  // 상태로 이미지 URL을 관리합니다.
  const [imageUrl, setImageUrl] = useState('');

  // 데이터베이스에서 이미지 URL을 가져오는 비동기 함수를 정의합니다.
  const fetchImageFromDatabase = async () => {
    try {
      // 데이터베이스에서 이미지 URL을 가져오는 API 호출 또는 다른 방식을 사용합니다.
      const response = await fetch('your_database_api_endpoint');
      const data = await response.json();

      // 가져온 이미지 URL을 상태에 설정합니다.
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  // 컴포넌트가 마운트될 때 이미지를 가져오도록 useEffect를 사용합니다.
  useEffect(() => {
    fetchImageFromDatabase();
  }, []); // 두 번째 매개변수가 빈 배열이므로 컴포넌트가 처음 마운트될 때만 호출됩니다.

  // 임시로 사용할 이미지 URL
  const placeholderImageUrl = 'C:/Users/박나영/Desktop/react/collecting/src/images/background.jpg';

  return (
    <div>
      {/* 이미지 URL이 있을 때는 데이터베이스에서 가져온 이미지를 렌더링합니다.
          없을 때는 임시 이미지를 렌더링합니다. */}
      <img src={imageUrl || placeholderImageUrl} alt="Database Entry" />
    </div>
  );
  
};

export default ImageComponent;