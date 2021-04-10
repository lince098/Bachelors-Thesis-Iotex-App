import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { getPistaObject, getPrecio } from "../utils/PistaUtils";
import { fromRau } from "iotex-antenna/lib/account/utils";
import { reservar } from "../utils/PistaUtils";

export default function Reserva() {
  // eslint-disable-next-line
  const [id ,setId]= useState(useParams().id);
  const [pista, setPista] = useState(undefined);
  const [precioXMinuto, setPrecioXMinuto] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [logMessage, setLogMessage] = useState("");

  useEffect(() => {
    getPistaObject(parseInt(id, "10")).then((response) => {
      setPista(response);
    });
    getPrecio().then((response) => {
      setPrecioXMinuto(response);
    });
  },[id]);

  function reservaOnClick(event) {
    event.preventDefault();
    reservar(pista, Number(minutos))
      .then((response) => {
        console.log("Then Log response: ", response);
        const link = "https://testnet.iotexscan.io/action/" + response;
        setLogMessage(
          <p className="text-success">
            La transacción se ha enviado con éxito, puedes verificar si se ha
            ejecutado correctamente clicando aquí: <a href={link}>{link}</a>.
          </p>
        );
      })
      .catch((response) => {
        console.log("Catch response: ", response);
        setLogMessage(
          <p className="text-danger">
            La transacción no ha podido realizarse debido al error interno: {""}
          </p>
        );
        console.log(response);
      });
  }
  function minutosOnChange(event) {
    setMinutos(event.target.value);
  }

  let precioRender = 0;
  if (precioXMinuto !== 0) {
    precioRender = fromRau(precioXMinuto, "IOTX");
    console.log("PrecioRender: ", precioRender, typeof precioRender);
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <Form className="mx-5">
        <Form.Group as={Row} controlId="formPrecioBlank">
          <Form.Label column sm="2">
            Precio por minuto:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              value={precioRender + " IOTX"}
              readOnly
            ></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formMinutos">
          <Form.Label column sm="2">
            Minutos:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Tiempo ej: 1,2,60"
              onChange={minutosOnChange}
            />
          </Col>
        </Form.Group>

        <Button variant="primary" onClick={reservaOnClick}>
          Enviar
        </Button>
        {logMessage}
      </Form>
    </div>
  );
}
