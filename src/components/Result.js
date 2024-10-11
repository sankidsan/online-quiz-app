import React from 'react';
import { useNavigate } from 'react-router-dom';

function Result({ score, totalQuestions }) {
  const navigate = useNavigate();

  const restartQuiz = () => {
    navigate('/');
  };

  return (
    <div className="result-container">
      <h2>Quiz Completed!</h2>
      <p>Thank you for taking the test. Your response has been submitted.</p>
      <p>Your Score: {score} out of {totalQuestions}</p>
      <button onClick={restartQuiz} className="btn">
        Create New Quiz
      </button>
    </div>
  );
}

export default Result;
