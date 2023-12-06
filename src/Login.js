import React from 'react';
//import { Link } from 'react-router-dom';  // React Router의 Link 가져오기
import './Login.css';  // Import the CSS file

const Login = () => {

  return (
    <div className="login-container">
      <h2>LOGIN</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>

        <div className="form-group">
          
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>

        <button type="submit" className="login-button">
          <a href ="/MyPage">Sign up</a>
        </button>
      </form>
      <span  class="e13_156">Don't have an account yet?</span>
      <a href="/" class="e13_157">Sign up</a>

      

    </div>
  );
};


export default Login;