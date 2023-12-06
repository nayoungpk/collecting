
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './chating.css';
import backArrowImage from './images/move.png'; 

const Chating = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatBoxRef = useRef();

  const sendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      {/* Move the navigation button inside the chat container */}
      <Link to="/MyPage" className="navigation-button">
      <img src={backArrowImage} alt="Back" />
      </Link>

      <div className="chat-box" id="chat-box" ref={chatBoxRef}>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          id="message-input"
          placeholder="메시지를 입력하세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
};

export default Chating;