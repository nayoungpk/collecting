import React from 'react';
import { createRoot } from 'react-dom/client'; // "react-dom/client"에서 createRoot를 가져옵니다.
import App from './App';

// ReactDOM.render를 createRoot().render로 대체합니다.
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);