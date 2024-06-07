
import  { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Questions from './QuestionsData';
import ResultComponent from './ResultComponent';

function QuizComponent() {
  const [score, setScore] = useState(null); 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(Questions.length).fill('')); 
  const [showQuitConfirmation, setShowQuitConfirmation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleQuit = () => {
    setShowQuitConfirmation(true);
  };

  const handleQuitConfirmation = (confirm) => {
    if (confirm) {
      navigate('/', { replace: true }); 
    } else {
      setShowQuitConfirmation(false);
    }
  };

  const handleAnswer = (option) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = option;
    setUserAnswers(updatedAnswers);
  };

  const calculateResult = () => {
    // Calculate the result  based on user answers and correct answers
    let correctAnswersCount = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === Questions[index].answer) {
        correctAnswersCount++;
      }
    });
    return correctAnswersCount;
  };

  const handleSubmit = () => {
    const score = calculateResult();
    setShowResult(true);
    setScore(score);
    navigate('/result');
  };

  if (showResult && score !== null) { 
    return (
      <ResultComponent 
        score={score} 
        totalQuestions={Questions.length} 
        attemptedQuestions={userAnswers.filter(answer => answer !== '').length}
        correctAnswers={calculateResult()} 
        wrongAnswers={Questions.length - calculateResult()} 
      />
    );
  }

  return (
    <div className="quiz-container">
      <h2>Question {currentQuestion + 1}</h2>
      <p>{Questions[currentQuestion].question}</p>

      <div className="button-group">
        <button onClick={() => handleAnswer(Questions[currentQuestion].optionA)}>{Questions[currentQuestion].optionA}</button>
        <button onClick={() => handleAnswer(Questions[currentQuestion].optionB)}>{Questions[currentQuestion].optionB}</button>
        <button onClick={() => handleAnswer(Questions[currentQuestion].optionC)}>{Questions[currentQuestion].optionC}</button>
        <button onClick={() => handleAnswer(Questions[currentQuestion].optionD)}>{Questions[currentQuestion].optionD}</button>
      </div>

      <div className="remaining-buttons">
        <button style={{ backgroundColor: '#dc3545', color: '#fff' }} onClick={handlePrevious}>Previous</button>
        <button style={{ backgroundColor: 'green', color: '#fff' }} onClick={handleNext}>Next</button>
        <button style={{ backgroundColor: 'red', color: '#fff' }} onClick={handleQuit}>Quit</button>
      </div>

      {showQuitConfirmation && (
        <div className="quit-confirmation">
          <p>Are you sure you want to quit?</p>
          <button onClick={() => handleQuitConfirmation(true)}>Yes</button>
          <button onClick={() => handleQuitConfirmation(false)}>No</button>
        </div>
      )}

      <button onClick={handleSubmit} style={{ marginTop: '20px' }}>Submit</button>
    </div>
  );
}

export default QuizComponent;
