import "../components/CSS/TutorialPage.css";
import Paso1 from "../assets/tutorial/Paso1.png";
import Paso2 from "../assets/tutorial/Paso2.png";
import Paso4 from "../assets/tutorial/Paso4.png";
import Faucet from "../assets/tutorial/Faucet.png";
import { publicConfig } from "../configs/public";
import React, { useState } from "react";

export default function Tutorial() {
  const [active, setActive] = useState({
    paso0: "",
    paso1: "",
    paso2: "",
    paso3: "",
    paso4: "",
  });

  const linkOnClick = (event) => {
    const paso = event.target.hash;
    switch (paso) {
      case "#paso0":
        setActive({
          paso0: "active",
          paso1: "",
          paso2: "",
          paso3: "",
          paso4: "",
        });
        break;
      case "#paso1":
        setActive({
          paso0: "",
          paso1: "active",
          paso2: "",
          paso3: "",
          paso4: "",
        });
        break;
      case "#paso2":
        setActive({
          paso0: "",
          paso1: "",
          paso2: "active",
          paso3: "",
          paso4: "",
        });
        break;
      case "#paso3":
        setActive({
          paso0: "",
          paso1: "",
          paso2: "",
          paso3: "active",
          paso4: "",
        });
        break;
      case "#paso4":
        setActive({
          paso0: "",
          paso1: "",
          paso2: "",
          paso3: "",
          paso4: "active",
        });
        break;

      default:
        setActive({ paso0: "", paso1: "", paso2: "", paso3: "", paso4: "" });
        break;
    }
  };

  return (
    <React.Fragment>
      <div className="miContainer">
        <div className="box1">
          <h2>Navegador</h2>
          <hr></hr>
          <ul>
            <li>
              <a href="#paso0" className={active.paso0} onClick={linkOnClick}>
                Instalación de IoPay Desktop
              </a>
            </li>
            <li>
              <a href="#paso1" className={active.paso1} onClick={linkOnClick}>
                Crear cartera
              </a>
            </li>
            <li>
              <a href="#paso2" className={active.paso2} onClick={linkOnClick}>
                Configuración modo test
              </a>
            </li>
            <li>
              <a href="#paso3" className={active.paso3} onClick={linkOnClick}>
                Conseguir criptomonedas
              </a>
            </li>
            <li>
              <a href="#paso4" className={active.paso4} onClick={linkOnClick}>
                Empiece a usar la app
              </a>
            </li>
          </ul>
        </div>

        <div className="box2">
          <h1>Tutorial</h1>

          <h2 id="paso0">Instalación de la aplicación cartera</h2>
          <p>
            Para utilizar ésta aplicación se requiere de una aplicación que se
            comunicará con la blockchain permitiendo hacer uso de nuestras
            criptomonedas y firmar transacciones. Dicha app se encuentra en el
            siguiente link:{" "}
            <a href="https://iopay.iotex.io/desktop">
              https://iopay.iotex.io/desktop
            </a>
            .
          </p>

          <h2 id="paso1">Creando nuestra cartera</h2>
          <p>
            Una vez instalada la aplicación en la esquina inferior izquierda le
            pedirá que cree una cuenta en caso de no tenerla. Y ofrecerá varios
            métodos para usted guardarla y desbloquearla a voluntad.
          </p>
          <img src={Paso1} alt="Paso1.jpg"></img>

          <h2 id="paso2">Configurar el modo test</h2>
          <p>
            El contrato inteligente se encuentra desplegado en la TestNet de
            IoTeX y por defecto la cartera se abre en la red principal. Para
            cambiar a la Testnet en la esquina superior derecha.
          </p>
          <img src={Paso2} alt="Paso2.jpg"></img>

          <h2 id="paso3">Consiga criptomonedas de prueba</h2>
          <p>
            Para poder utilizar la app web será necesario tener criptomonedas
            tanto para hacer pagos al propietario a la administración de las
            pistas de padel como para enviar las transacciones. Para obtener
            dichas criptomonedas en la Testnet será necesario hacerlo a través
            del siguiente link{" "}
            <a href="https://faucet.iotex.io/">https://faucet.iotex.io/</a>.
          </p>
          <img src={Faucet} alt="Faucet.jpg"></img>

          <h2 id="paso4">Empiece a usar la app</h2>
          <p>
            Una vez llegados a este punto ya es posible utilizar las
            funcionalidades aplicación web una vez se acceda a ella con la
            cartera desbloqueada. Aunque a través de la interfaz también de
            IoPay podrá acceder e interactuar con el contrato inteligente
            directamente si lo desea, para ello necesita utilizar la dirección
            del contrato: "{publicConfig.CONTRATO_DIRECCION}".
          </p>
          <p>Y el ABI:</p>
          <textarea
            rows="6"
            value={publicConfig.CONTRATO_ABI}
            readOnly
          ></textarea>
          <img style={{ marginTop: "2em" }} src={Paso4} alt="Paso4.jpg"></img>
        </div>
      </div>
    </React.Fragment>
  );
}
