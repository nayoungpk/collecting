import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './MainPage';
import Login from './Login';
import Signup from './Signup';
import MyPage from './MyPage';
import Chating from './Chating';
import ProfileUpdate from './ProfileUpdate'; // Import the ProfileUpdate component
import AdminPage from './AdminPage'; // Import the AdminPage component

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <div className="background">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/MyPage" element={<MyPage />} />
            <Route path="/Chating" element={<Chating />} />
            <Route path="/profileUpdate" element={<ProfileUpdate />} /> {/* Add this line */}
            <Route path="/AdminPage" element={<AdminPage />} />
          </Routes>
        </div>
        <footer className="footer">
          <p>&copy; 2023 collecting. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;