import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const LoadingSpinner = () => {

  return (
    <>
      <div style={{fontSize:"50px",position:"absolute",top:"35%",left:"50%"}}>
        <FontAwesomeIcon icon={faSpinner} spinPulse size="2xl" />
      </div>
    </>
  );
};


export default LoadingSpinner;