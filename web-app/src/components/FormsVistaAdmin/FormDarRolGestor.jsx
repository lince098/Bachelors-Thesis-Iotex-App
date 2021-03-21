import { Button, Form, Row, Col } from "react-bootstrap";
import { darRolGestor } from "../../utils/PistaUtils";
import { useState } from "react";

const FormDarRolGestor = () => {
  const [cuenta, setCuenta] = useState(0);
  const [mensaje, setMensaje] = useState("");

  function cuentaOnChange(event) {
    setCuenta(event.target.value);
  }

  function enviar(event) {
    event.preventDefault();

    darRolGestor(cuenta).then((response) => {
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

  return (
    <Form>
      <Form.Group as={Row} controlId="formDarGestorCuenta">
        <Form.Label column sm={2}>
          Cuenta:
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            onChange={cuentaOnChange}
            type="text"
            placeholder="Cuenta"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button onClick={enviar}>Enviar</Button>
        </Col>
        {mensaje}
      </Form.Group>
    </Form>
  );
};

export default FormDarRolGestor;
