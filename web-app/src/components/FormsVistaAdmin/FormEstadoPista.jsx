import { Button, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { setPistaEstado } from "../../utils/PistaUtils";

const FormEstadoPista = () => {
  const [mensaje, setMensaje] = useState("");
  const [id, setId] = useState(0);
  const [estado, setEstado] = useState(1);

  function idOnChange(event) {
    const idNumber = parseInt(event.target.value);
    if (!isNaN(idNumber) && idNumber >= 0) {
      setId(idNumber);
    }
  }

  function estadoOnChange(event) {
    const estadoNumber = parseInt(event.target.value);
    if (estadoNumber >= 0 && estadoNumber <= 2) {
      setEstado(estadoNumber);
    }
  }

  function enviar() {
    if (id !== null && estado !== null) {
      setPistaEstado(id, estado)
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
  }

  return (
    <Form>
      <Form.Group as={Row} controlId="formEstadoPistaId">
        <Form.Label column sm={2}>
          Id de la pista
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" onChange={idOnChange} placeholder="" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formEstadoPistaEstado">
        <Form.Label column sm={2}>
          Estado
        </Form.Label>
        <Col sm={10}>
          <Form.Control as="select" onChange={estadoOnChange} value={estado}>
            <option value="0">Apagado</option>
            <option value="1">Funcionando</option>
            <option value="2">Encendido</option>
          </Form.Control>
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

export default FormEstadoPista;
