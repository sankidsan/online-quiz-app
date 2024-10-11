
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import CreateQuiz from './online-quiz-app/components/CreateQuiz';
import TakeQuiz from './online-quiz-app/components/TakeQuiz';
import Result from './online-quiz-app/components/Result';
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </Router>
      </div>
   
  );
}

export default App;
