
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateQuiz({ setQuizData }) {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // Track the index of the current question being edited
  const navigate = useNavigate();

  // Function to handle updating options
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddQuestion = () => {
    if (question && correctAnswer !== null && options.every(opt => opt !== '')) {
      const newQuestions = [...questions];
      if (currentQuestionIndex !== -1) {
        newQuestions[currentQuestionIndex] = { question, options, correctAnswer };
      } else {
        //  to add new question
        newQuestions.push({ question, options, correctAnswer });
      }

      setQuestions(newQuestions);
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrectAnswer(null);
      setCurrentQuestionIndex(-1); 
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      const prevQuestion = questions[prevIndex];
      setQuestion(prevQuestion.question);
      setOptions(prevQuestion.options);
      setCorrectAnswer(prevQuestion.correctAnswer);
      setCurrentQuestionIndex(prevIndex);
    } else if (currentQuestionIndex === -1 && questions.length > 0) {
      const prevIndex = questions.length - 1;
      const prevQuestion = questions[prevIndex];
      setQuestion(prevQuestion.question);
      setOptions(prevQuestion.options);
      setCorrectAnswer(prevQuestion.correctAnswer);
      setCurrentQuestionIndex(prevIndex);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      const nextQuestion = questions[nextIndex];
      setQuestion(nextQuestion.question);
      setOptions(nextQuestion.options);
      setCorrectAnswer(nextQuestion.correctAnswer);
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const startQuiz = () => {
    if (question && correctAnswer !== null && options.every(opt => opt !== '')) {
      setQuestions([...questions, { question, options, correctAnswer }]);
      setQuizData([...questions, { question, options, correctAnswer }]);
    } else {
      setQuizData(questions);
    }
    navigate('/take-quiz');
  };

  return (
    <div className="create-quiz-container">
      <h2>Create Your Quiz</h2>
      <input
        type="text"
        placeholder="Enter question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <div className="options-container">
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}
      </div>
      <select
        onChange={(e) => setCorrectAnswer(parseInt(e.target.value))}
        value={correctAnswer !== null ? correctAnswer : ''}
      >
        <option value="">Select Correct Answer</option>
        {options.map((option, index) => (
          <option key={index} value={index}>
            {option}
          </option>
        ))}
      </select>
      <div>
        <button onClick={handlePreviousQuestion} disabled={questions.length === 0}>
          Previous
        </button>
        <button onClick={handleAddQuestion}>
          {currentQuestionIndex === -1 ? 'Add Question' : 'Update Question'}
        </button>
        <button onClick={handleNextQuestion} disabled={currentQuestionIndex >= questions.length - 1 || currentQuestionIndex === -1}>
          Next
        </button>
        <button onClick={startQuiz} disabled={questions.length === 0}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default CreateQuiz;
