import { Button, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { getGanancias, retirarGanancias } from "../../utils/PistaUtils";
import { useEffect } from "react";
import { fromRau } from "iotex-antenna/lib/account/utils";

const FormRetirarGanancia = () => {
  const [mensaje, setMensaje] = useState("");
  const [ganancias, setGanancias] = useState(
    "Comprobando el dinero recaudado, espere."
  );

  useEffect(() => {
    getGanancias().then((response) => {
      const gananciasString = fromRau(response, "IOTX") + " IOTX";
      setGanancias(gananciasString);
    });
  }, []);

  const enviar = (event) => {
    event.preventDefault();

    retirarGanancias()
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
  };

  return (
    <Form>
      <Form.Group as={Row} controlId="formHorizontalGanancias">
        <Form.Label column sm={2}>
          Criptomonedas acumuladas
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" readOnly value={ganancias} />
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

export default FormRetirarGanancia;
