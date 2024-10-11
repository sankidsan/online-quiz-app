
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateQuiz from './components/CreateQuiz';
import TakeQuiz from './components/TakeQuiz';
import Result from './components/Result';
import './styles.css';

function App() {
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);

  return (
  
    
      <div className="App">
        <header className="header">
          <h1>Online Quiz Platform</h1>
        </header>
        <Router >
        <Routes>
          <Route path="/" element={<CreateQuiz setQuizData={setQuizData} />} />
          <Route path="/take-quiz" element={<TakeQuiz quizData={quizData} setScore={setScore} />} />
          <Route path="/result" element={<Result score={score} totalQuestions={quizData.length} />} />
        </Routes>
        </Router>
      </div>
   
  );
}

export default App;
