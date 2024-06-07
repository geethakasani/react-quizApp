import '../App.css'
import PropTypes from 'prop-types'; 
import { useNavigate } from 'react-router-dom';

const ResultComponent = ({ score, totalQuestions, attemptedQuestions, correctAnswers, wrongAnswers }) => {
    const navigate = useNavigate(); 
    const handlePlayAgain = () => {
      navigate('/quiz', { replace: true }); 
    
    };

    
    const handleBackToHome = () => {
      navigate('/', { replace: true }); 
    };
    return (
    <div className="result-container">
      <h2>Result</h2>
      <p>{score >= (totalQuestions / 2) ? "Congratulations!" : "You need more practice!"}</p>
      <h3>Your score is {score} out of {totalQuestions}</h3>
      <p>Total number of questions: {totalQuestions}</p>
      <p>Number of attempted questions: {attemptedQuestions}</p>
      <p>Number of correct answers: {correctAnswers}</p>
      <p>Number of wrong answers: {wrongAnswers}</p>
      <button onClick={handlePlayAgain}>Play Again</button>
      <button onClick={handleBackToHome}>Back to Home</button>
    </div>
  );
};

  ResultComponent.propTypes = {
    score: PropTypes.number,
    totalQuestions: PropTypes.number,
    attemptedQuestions: PropTypes.number,
    correctAnswers: PropTypes.number,
    wrongAnswers: PropTypes.number,
  };
  

export default ResultComponent;
