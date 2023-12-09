import React from 'react';
import './MyPage.css';
import { Link } from 'react-router-dom';
import ImageComponent from './ImageComponent';
import moveImage from 'C:/Users/박나영/Desktop/react/collecting/src/images/buttom.png';

const MyPage = () => {
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
        <Link to="/ProfileUpdate" className="update-button">
          Update Profile
        </Link>
        <ImageComponent />
      </div>
    </div>
  );
};

export default MyPage;