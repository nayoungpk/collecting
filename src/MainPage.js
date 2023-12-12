import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css'; // Import the CSS file



const MainPage = () => {
  return (
    <div>
      <div className="Mainpage">
        <div className="text-container">
          <span className="e71_30">The movie you want through</span>
          <p>
            <span className="e71_31"> The collecting</span>
            <span className="e71_49">You should look it up.</span>
          </p>
          <span className="e71_32">Tell us the characteristics of the movie you want to see</span>
        </div>

        <div className="button-container">
          <Link to="/login" className="button1">
            <span className="button-text">Go to login</span>
          </Link>
          <Link to="/signup" className="button2">
            <span className="button-text">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPage;