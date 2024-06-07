import { useNavigate } from 'react-router-dom';
import '../App.css';
import PropTypes from 'prop-types';

function HomeComponent() {
  const navigate = useNavigate();

  const handlePlayClick = ({onPlayClick}) => {
    if (onPlayClick) {
        onPlayClick();
      } else {
        navigate('/quiz');
      }
    };
  return (
    <div className="home-container">
      <h1>Quiz App</h1>
      <button onClick={handlePlayClick}>Play</button>
    </div>
  );
}

HomeComponent.propTypes = {
  onPlayClick: PropTypes.func,
};

export default HomeComponent;
