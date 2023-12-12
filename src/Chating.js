import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // React Router에서 Link를 import
import sendImage from 'C:/Users/박나영/Desktop/react/collecting/src/images/send.png'; // 이미지 경로에 맞게 수정
import './chating.css';

const Chating = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // 컴포넌트가 처음 렌더링 될 때 챗봇의 초기 메시지를 추가합니다.
    addMessage('collecting : 보고싶은 영화의 줄거리나 키워드를 입력해주세요', false);
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정합니다.

  useEffect(() => {
    // messages가 업데이트 될 때마다 스크롤을 최하단으로 조절
    scrollToBottom();
  }, [messages]);

  const addMessage = (content, isUser = false) => {
    setMessages((prevMessages) => [...prevMessages, { content, isUser }]);
  };

  const handleDeleteAllMessages = () => {
    // 모든 메시지 삭제
    setMessages([]);
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // 유저 메시지 추가
    addMessage(input, true);

    // AI 모델과 연결하여 응답 받기 (예시로 비동기 함수 simulateAIRequest 사용)
    try {
      const aiResponse = await simulateAIRequest(input);

      // 챗봇 응답 추가
      addMessage(`collecting : "${aiResponse}"`, false);
    } catch (error) {
      // 오류가 발생한 경우
      addMessage('collecting : 죄송합니다. 오류가 발생했습니다. 다시 입력해주세요.', false);
    }

    // 입력값 초기화
    setInput('');
  };

  const scrollToBottom = () => {
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  };

  // AI 모델과 통신하는 비동기 함수 (임시로 비동기적으로 응답을 시뮬레이션하는 함수)
  const simulateAIRequest = (userInput) => {
    return new Promise((resolve, reject) => {
      // 여기에서 실제 AI 모델과 통신하고 응답을 받아오는 로직을 추가할 수 있습니다.
      // 임시로 1초 후에 응답을 시뮬레이션합니다.
      setTimeout(() => {
        // 성공적인 응답
        resolve(`"${userInput}"에 대한 응답입니다.`);
        // 실패하는 경우:
        // reject(new Error('AI 모델에서 오류가 발생했습니다.'));
      }, 1000);
    });
  };
  return (
    <div>
      <h1>Chating</h1>
      <h4 className="your-custom-class">" Please tell me the plot of the movie you want to see now in a short line "</h4>
      <div className="chatbot-container">
        <div className="chatbot-messages" ref={messagesContainerRef}>
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
          <button type="submit">
            <img src={sendImage} alt="Send" />
          </button>
        </form>
        {/* 전체 메시지 삭제 버튼 */}
        <button className="delete-button" onClick={handleDeleteAllMessages}>Delete Chat</button>

        {/* 페이지 이동을 위한 버튼 */}
        <Link to="/MyPage">
          <button className="navigate-button">Go to My Page</button>
        </Link>
      </div>
    </div>
  );
};

export default Chating;