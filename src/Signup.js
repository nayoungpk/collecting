import React from 'react';
//import './Signup.css';  // Import the CSS file

const Signup = () => {

  return (

    <div className="login-container">
    <h2>Sign up</h2>
    <form className="login-form">

      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
      </div>

      <div className="form-group">
        <label htmlFor="email">email:</label>
        <input type="email" id="email" name="email" required />
      </div>

      <button type="submit" className="login-button">
        <a href ="/MyPage">Sign up</a>
      </button>
    </form>
    <span  class="e13_156"> Have you already ID and password </span>
    <a href="/login" class="e13_157">login</a>

    

  </div>

  );
};

export default Signup;