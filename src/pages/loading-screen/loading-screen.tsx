import './style.css';
function LoadingScreen(): JSX.Element {
  return (
    <div id="wrapper">
      <div className="loader">
        <div className="holder">
          <img src="img/spinner-image.png" alt="spinner-image" />
          <span>some text</span>
        </div>
      </div>
    </div>);
}

export default LoadingScreen;
