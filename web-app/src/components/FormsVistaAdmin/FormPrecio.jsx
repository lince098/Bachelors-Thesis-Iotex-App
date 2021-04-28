import {
  Button,
  Form,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useState } from "react";
import { InfoSquare } from "react-bootstrap-icons";
import { setPrecioXMinutos, getPrecio } from "../../utils/PistaUtils";
import { useEffect } from "react";
import { fromRau } from "iotex-antenna/lib/account/utils";

const FormPrecio = () => {
  const [selectValue, setSelectValue] = useState("IOTX");
  const [nuevoPrecio, setNuevoPrecio] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [precioActual, setPrecioActual] = useState(
    "Comprobando el precio, espere."
  );

  useEffect(() => {
    getPrecio().then((response) => {
      const precioEnIotex = fromRau(response, "IOTX") + " IOTX";
      setPrecioActual(precioEnIotex);
    });
  }, []);

  const selectOnChange = (event) => {
    const unidad = event.target.value;
    setSelectValue(unidad);
  };

  const nuevoPrecioOnChange = (event) => {
    const precioString = event.target.value;
    if (precioString === "") {
      setNuevoPrecio(0);
    } else {
      const parsedPrecio = parseInt(precioString);
      if (isNaN(parsedPrecio)) {
        setNuevoPrecio(0);
      } else {
        setNuevoPrecio(parsedPrecio);
      }
    }
  };

  const renderTooltip = (props) => (
    <Tooltip {...props}>
      Las equivalencias entre las monedas se encuentran{" "}
      <a href="https://docs.iotex.io/introduction/IOTX-token-concept.html">
        aquí
      </a>
      .{" "}
    </Tooltip>
  );

  const enviar = (event) => {
    event.preventDefault();
    setPrecioXMinutos(nuevoPrecio, selectValue)
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
      <Form.Group as={Row} controlId="formHorizontalPrecioActual">
        <Form.Label column sm={2}>
          Precio actual
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" readOnly value={precioActual} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formHorizontalPrecio">
        <Form.Label column sm={2}>
          Precio
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            onChange={nuevoPrecioOnChange}
            placeholder="Cantidad en números enteros"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formHorizontalUnidad">
        <Form.Label column sm={2}>
          Moneda{" "}
          <OverlayTrigger
            delay={{ show: 250, hide: 1000 }}
            placement="auto"
            overlay={renderTooltip}
          >
            <InfoSquare />
          </OverlayTrigger>
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="select"
            defaultValue="IOTX"
            onChange={selectOnChange}
          >
            <option value="IOTX">IOTX</option>
            <option value="Jing">Jing</option>
            <option value="Qev">Qev</option>
            <option value="GRau">Grau</option>
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

export default FormPrecio;
