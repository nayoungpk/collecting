import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import sendImage from './images/send.png'; // 상대 경로로 변경
import './chating.css';

const Chating = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [movieInfo, setMovieInfo] = useState(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // 컴포넌트가 처음 렌더링 될 때만 실행
    if (messages.length === 0) {
      console.log('useEffect is running');
      addMessage('collecting : 보고싶은 영화의 줄거리나 키워드를 입력해주세요', false);
    }
  }, [messages]);

  useEffect(() => {
    // messages가 업데이트 될 때마다 스크롤을 최하단으로 조절
    scrollToBottom();
  }, [messages]);

  const addMessage = (content, isUser = false) => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const messageWithTime = `${content} - ${currentTime}`; // 시간과 메시지를 '-'로 구분하여 합침

    setMessages((prevMessages) => [...prevMessages, { content: messageWithTime, isUser }]);
  };

  const handleDeleteAllMessages = () => {
    // 모든 메시지 및 영화 정보 삭제
    setMessages([]);
    setMovieInfo(null);
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // 유저 메시지 추가
    addMessage(input, true);

    // AI 모델과 연결하여 응답 받기
    try {
      // 사용자 입력을 AI 모델에 전달하고 AI 응답을 받아옴
      const aiResponse = await simulateAIRequest(input);

      // 챗봇 응답 추가
      addMessage(`collecting : "${aiResponse}"`, false);

      // AI 응답을 가지고 영화 정보 가져오기 (API 호출)
      const movieData = await fetchMovieData(input);
      setMovieInfo(movieData);

      // 영화 정보 메시지 추가 (수정된 부분)
      addMessage(`collecting : "${movieData.original_title}" - ${movieData.overview} - Release Date: ${movieData.release_date}`, false);

      // 디버깅을 위해 AI 모델의 결과도 화면에 출력
      addMessage(`AI 모델 응답: ${aiResponse}`, false);
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
    return new Promise((resolve) => {
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

  // 영화 정보를 가져오는 비동기 함수 (API 호출 추가)
  const fetchMovieData = (keyword) => {
    return new Promise(async (resolve, reject) => {
      try {
        // 여기에서 실제 영화 데이터를 가져오는 로직을 추가할 수 있습니다.
        // /api/analyze-movie와 같은 실제 엔드포인트로 요청을 보낼 수 있습니다.
        const response = await fetch('/api/analyze-movie', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ keyword }), // 또는 다른 필요한 데이터
        });

        if (!response.ok) {
          // API 호출이 실패한 경우
          reject(new Error('API 호출이 실패했습니다.'));
          return;
        }

        const movieData = await response.json();
        resolve(movieData);
      } catch (error) {
        // 오류가 발생한 경우
        reject(error);
      }
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