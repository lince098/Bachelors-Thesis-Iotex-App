import { Button, Form, Row, Col } from "react-bootstrap";
import { setTiempoExtra, getTiempoExtra } from "../../utils/PistaUtils";
import { useState, useEffect } from "react";

const FormTiempoExtra = () => {
  const [tiempo, setTiempo] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [tiempoExtraActual, setTiempoExtraActual] = useState(
    "Comprobando tiempo extra actual, espere."
  );

  useEffect(() => {
    getTiempoExtra().then((response) => {
      setTiempoExtraActual(response + " minutos.");
    });
  }, []);

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
        const link = "https://testnet.iotexscan.io/action/" + response;
        setMensaje(
          <p className="text-success">
            La transacción se ha enviado con éxito, puedes verificar si se ha
            ejecutado correctamente clicando aquí: <a href={link}>{link}</a>.
          </p>
        );
      })
      .catch((response) => {
        setMensaje(
          <p className="text-danger">
            La transacción no ha podido realizarse debido a un error con el
            envío de la transaccion
          </p>
        );
      });
  }

  return (
    <Form>
      <Form.Group as={Row} controlId="formHorizontalTiempoExtraActual">
        <Form.Label column sm={2}>
          Tiempo extra actual
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" readOnly value={tiempoExtraActual} />
        </Col>
      </Form.Group>

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
