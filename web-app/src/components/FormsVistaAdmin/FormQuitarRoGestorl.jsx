import { Button, Form, Row, Col } from "react-bootstrap";
import { darRolGestor } from "../../utils/PistaUtils";
import { useState } from "react";

const FormquitarRolGestor = () => {
  const [cuenta, setCuenta] = useState(0);
  const [mensaje, setMensaje] = useState("");

  function cuentaOnChange(event) {
    setCuenta(event.target.value);
  }

  function enviar(event) {
    event.preventDefault();

    darRolGestor()
      .then((response) => {
        console.log("Then Log response: ", response);
        const link = "https://testnet.iotexscan.io/action/" + response;
        setMensaje(
          <p className="text-success">
            La transacción se ha enviado con éxito, puedes verificar si se ha
            ejecutado correctamente clicando aquí: <a href={link}>{link}</a>.
          </p>
        );
      })
      .catch((response) => {
        console.log("Catch response: ", response);
        setMensaje(
          <p className="text-danger">
            La transacción no ha podido realizarse debido al error interno: {""}
          </p>
        );
        console.log(response);
      });
  }

  return <div></div>;
};

export default FormDarRolGestor;
