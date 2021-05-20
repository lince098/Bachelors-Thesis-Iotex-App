import "./CSS/MainPage.css";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";

const PaginaPrincipal = () => {
  const history= useHistory()
  function buttonOnClick(event){
    event.preventDefault()
    history.push("/tutorial")
  }

  return (
    <div>
      <div id="FirstHeader">
        <div className="textFirstHeader">
          <h1>Elysium Photonics</h1>
          <p>
            El sistema de iluminación de pistas soportado por la Blockchain
          </p>
          <Button onClick={buttonOnClick} className="linkButton" variant="outline-light">
            Empieza ahora
          </Button>
        </div>
        <div className="wave">
          <svg
            className="svgWave"
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
          >
            <path
              className="wavePath"
              d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PaginaPrincipal;
