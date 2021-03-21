import { Button, Form, Row, Col } from "react-bootstrap";
import { setTiempoExtra } from "../../utils/PistaUtils";
import { useState } from "react";

const FormTiempoExtra = () => {
  const [tiempo, setTiempo] = useState(0);
  const [mensaje, setMensaje] = useState("");

  function tiempoOnChange(event) {
    const parsedTiempo = parseInt(event.target.value);
    if (isNaN(parsedTiempo) || parsedTiempo <= 0) {
      setTiempo(0);
    } else {
      setTiempo(parsedTiempo);
    }
  }

  function enviar(event) {
    event.preventDefault();
    setTiempoExtra(tiempo)
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

  return (
    <Form>
      <Form.Group as={Row} controlId="formHorizontalTiempo">
        <Form.Label column sm={2}>
          Tiempo
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            onChange={tiempoOnChange}
            type="text"
            placeholder="Segundos"
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

export default FormTiempoExtra;
