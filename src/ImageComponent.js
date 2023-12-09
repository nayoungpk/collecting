import React, { useState, useEffect } from 'react';
import placeholderImage from 'C:/Users/박나영/Desktop/react/collecting/src/images/4.png';

const ImageComponent = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchImageFromDatabase = async () => {
    try {
      const response = await fetch('your_database_api_endpoint');
      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  useEffect(() => {
    fetchImageFromDatabase();
  }, []);

  const placeholderImageUrl = placeholderImage;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ margin: '300px 0 0 250px', textAlign: 'center' }}>
      <h2 style={{ color: 'white' }}>Movie</h2>
      <img
        src={imageUrl || placeholderImageUrl}
        alt="Database Entry"
        style={{ maxWidth: '300px', maxHeight: '100%', width: 'auto', height: 'auto', cursor: 'pointer' }}
        onClick={openModal}
      />

      {isModalOpen && (
        <div
            style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Content inside the modal */}
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
            <p>Your additional content goes here.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageComponent;