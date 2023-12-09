import React, { useState } from 'react';

import './chating.css';

const Chating = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const addMessage = (content, isUser = false) => {
    setMessages((prevMessages) => [...prevMessages, { content, isUser }]);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // 유저 메시지 추가
    addMessage(input, true);

    // 챗봇 응답 추가
    if (!messages.find((msg) => msg.content.includes('무슨 영화 보고 싶어'))) {
      // 챗봇이 먼저 물어봄
      addMessage('챗봇: 무슨 영화를 보고 싶으세요?', false);
    } else {
      // 챗봇이 이미 물어본 상태일 때
      // 여기에서 챗봇이 응답 로직을 추가할 수 있습니다.
      addMessage(`챗봇: "${input}"이(가) 궁금하시군요!`, false);
    }

    // 입력값 초기화
    setInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={message.isUser ? 'user-message' : 'chatbot-message'}>
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleInputSubmit}>
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
};

export default Chating;