import './style.css';
import spinnerImage from './spinner-image.png';
function LoadingPage(): JSX.Element {
  return (
    <div id="wrapper">
      <div className="image">
        <div className="back"></div>
      </div>
      <div className="loader">
        <div className="holder">
          <img src={spinnerImage} alt="loading spinner" />
          <span>Loading...</span>
        </div>
      </div>
    </div>);
}

export default LoadingPage;
