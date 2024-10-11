import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Timer from './Timer';

function TakeQuiz({ quizData, setScore }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeUp, setTimeUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeUp) {
      handleNextQuestion();
    }
  }, [timeUp]);
  useEffect(() => {
    setScore(0);
  }, [setScore]);

  const handleNextQuestion = () => {
    if (selectedAnswer === quizData[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    setSelectedAnswer(null);
    setTimeUp(false);

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/result');
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer === quizData[currentQuestionIndex].correctAnswer) {
        setScore((prevScore) => prevScore + 1); 
    }
    navigate('/result');
};

  return (
    <div className="take-quiz-container">
      <h2>BrightChamps Quiz Time!</h2>
      <Timer key={currentQuestionIndex} setTimeUp={setTimeUp} duration={10} />
      <h3>{quizData[currentQuestionIndex].question}</h3>
      <div className="options-container">
        {quizData[currentQuestionIndex].options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedAnswer(index)}
            className={selectedAnswer === index ? 'selected' : ''}
          >
            {option}
          </button>
        ))}
      </div>
      {currentQuestionIndex === quizData.length - 1 ? (
        <button onClick={handleSubmit} disabled={selectedAnswer === null}>
          Submit
        </button>
      ) : (
        <button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
          Next
        </button>
      )}
    </div>
  );
}

export default TakeQuiz;
