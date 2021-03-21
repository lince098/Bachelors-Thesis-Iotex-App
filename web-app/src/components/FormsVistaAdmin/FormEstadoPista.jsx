import { Button, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { setPistaEstado } from "../../utils/PistaUtils";
import { set } from "mobx";

const FormEstadoPista = () => {
  const [mensaje, setMensaje] = useState("");
  const [id, setId] = useState(0);
  const [estado, setEstado] = useState(1);

  function idOnChange(event) {
    console.log(event.target.value);
    const idNumber = parseInt(event.target.value);
    if (idNumber !== NaN && idNumber >= 0) {
      setId(idNumber);
    }
  }

  function estadoOnChange(event) {
    console.log(event.target.value);
    const estadoNumber = parseInt(event.target.value);
    if (estadoNumber >= 0 && estadoNumber <= 2) {
      setEstado(estadoNumber);
    }
  }

  function enviar() {
    console.log("Enviar", id,estado);
    if (id !== null && estado !== null) {
      console.log("Pasa el if");
      setPistaEstado(id,estado)
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
              La transacción no ha podido realizarse debido al error interno:{" "}
              {""}
            </p>
          );
          console.log(response);
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
          <Form.Control
            as="select"
            onChange={estadoOnChange}
            value="1"
          >
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
