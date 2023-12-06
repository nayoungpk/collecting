import React from 'react';
import './MyPage.css'
import { Link } from 'react-router-dom'; 
import ImageComponent from './ImageComponent'; // 이미지 컴포넌트를 가져옵니다.

const MyPage = () => {

return (
   
   <div>
        <div className="MyPage">
        <p><span className="title1">My Page</span></p>
        <p><span className="title2">Go to get recommendations for movies you want to see</span></p>
        <p><span className="title3">If there is a movie you want to see, briefly explain the plot of the movie you want to see</span></p>
        <Link to="/Chating" className="my-button">start</Link>
         {/* ImageComponent를 렌더링합니다. */}
         <ImageComponent />
        </div>
   </div>
);


};
export default MyPage;