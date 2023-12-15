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
      // 최초 한 번만 메시지를 추가하도록 수정
      addMessage('collecting : 보고싶은 영화의 줄거리나 키워드를 입력해주세요', false);
    }
  }, []); // 빈 배열로 전달하여 한 번만 실행되도록 함

  useEffect(() => {
    // messages가 업데이트 될 때마다 스크롤을 최하단으로 조절
    scrollToBottom();
  }, [messages]);

  const addMessage = (content, isUser = false) => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const messageWithTime = `${content} - ${currentTime}`;

    // 출력되는 느낌을 주기 위해 각 메시지를 일정한 시간 간격으로 추가
    const delay = 600; // 각 메시지 간격 (밀리초)

    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, { content: messageWithTime, isUser }]);
      scrollToBottom(); // 메시지를 추가할 때마다 스크롤을 최하단으로 이동
    }, delay);
  };

  const handleDeleteAllMessages = () => {
    // 모든 메시지 및 영화 정보를 삭제합니다.
    setMessages([]);
    setMovieInfo(null);
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // 유저 메시지를 추가합니다.
    addMessage(input, true);

    setTimeout(() => {
      addMessage('추천할 영화를 찾고 있습니다...', false);
    }, 1500); // 500 밀리초(0.5초)로 설정, 필요에 따라 조절 가능

    try {
      // 영화 정보를 API에서 가져오는 비동기 함수를 호출합니다.
      const movieData = await fetchMovieDataFromApi(input);
      setMovieInfo(movieData);

      // 일정 시간 간격을 두고 챗봇 응답 및 영화 정보 메시지를 추가합니다.
      setTimeout(() => {
        addMessage(`포스터: ${movieData.data.backdrop_path}`, false);
      }, 500); // 500 밀리초(0.5초)로 설정, 필요에 따라 조절 가능

      setTimeout(() => {
        addMessage(`영화제목: ${movieData.data.original_title}`, false);
      }, 1000); // 1000 밀리초(1초)로 설정, 필요에 따라 조절 가능

      setTimeout(() => {
        addMessage(`줄거리: ${movieData.data.overview}`, false);
      }, 1500); // 1500 밀리초(1.5초)로 설정, 필요에 따라 조절 가능

      setTimeout(() => {
        addMessage(`개봉일: ${movieData.data.release_date}`, false);
      }, 2000); // 2000 밀리초(2초)로 설정, 필요에 따라 조절 가능
    } catch (error) {
      // 오류가 발생한 경우 일정 시간 후에 오류 메시지를 추가합니다.
      setTimeout(() => {
        addMessage('죄송합니다. 오류가 발생했습니다. 다시 입력해주세요.', false);
      }, 2500); // 500 밀리초(0.5초)로 설정, 필요에 따라 조절 가능
    }

    // 입력값 초기화
    setInput('');
  };

  const scrollToBottom = () => {
    // 메시지 컨테이너를 최하단으로 스크롤합니다.
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  };

  const fetchMovieDataFromApi = async (keyword) => {
    try {
      // /api/analyze-movie 엔드포인트로 POST 요청을 보내서 영화 정보를 가져옵니다.
      const response = await fetch('/api/analyze-movie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      });

      // HTTP 응답이 성공이 아닌 경우 에러를 발생시킵니다.
      if (!response.ok) {
        throw new Error(`Error fetching movie data: ${response.status} ${response.statusText}`);
      }

      // JSON 형식의 응답을 파싱하여 영화 정보를 반환합니다.
      const movieData = await response.json();

      // 가져온 영화 정보를 데이터베이스에 저장하지 않습니다.
      return movieData;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      throw error;
    }
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