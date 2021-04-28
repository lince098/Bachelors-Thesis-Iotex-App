import { Button, Form, Row, Col } from "react-bootstrap";
import { crearPista } from "../../utils/PistaUtils";
import { useState } from "react";

const FormCrearPista = () => {
  const [nombrePista, setNombrePista] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const mensajeOnChange = (event) => {
    if (nombrePista === "") setNombrePista(null);
    else setNombrePista(event.target.value);
  };

  const enviar = (event) => {
    event.preventDefault();
    if (nombrePista != null && nombrePista.length > 0) {
      crearPista(nombrePista)
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
    } else {
      setMensaje(<p className="text-danger">No se permiten valores nulos.</p>);
    }
  };

  return (
    <Form>
      <Form.Group as={Row} controlId="formHorizontalNombre">
        <Form.Label column sm={2}>
          Nombre pista
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            onChange={mensajeOnChange}
            placeholder="Nombre para la nueva pista"
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

export default FormCrearPista;
