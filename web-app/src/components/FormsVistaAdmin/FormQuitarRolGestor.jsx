import { Button, Table } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { getAllGestores, quitarRolGestor } from "../../utils/PistaUtils";

const CuentaFila = (props) => {
  const cuenta = props.cuenta;
  const setMensaje = props.setMensaje;

  const buttonOnClick = () => {
    quitarRolGestor(cuenta)
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
    <tr>
      <td>{cuenta}</td>
      <td>
        <Button onClick={buttonOnClick}>Quitar rol</Button>
      </td>
    </tr>
  );
};

const FormQuitarRolGestor = () => {
  const [mensaje, setMensaje] = useState("");
  const [filas, setFilas] = useState([]);

  useEffect(() => {
    getAllGestores().then((response) => {
      setFilas(response);
    });
  }, []);

  let filasRender = filas.map((cuenta) => (
    <CuentaFila key={cuenta} cuenta={cuenta} setMensaje={setMensaje} />
  ));

  return (
    <React.Fragment>
      <Table bordered striped>
        <thead>
          <tr>
            <th>User</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{filasRender}</tbody>
      </Table>
      {mensaje}
    </React.Fragment>
  );
};

export default FormQuitarRolGestor;
