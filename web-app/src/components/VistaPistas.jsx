import { Table, Button, Form } from "react-bootstrap";
import { getAllPistas, Estados, isReservable } from "../utils/PistaUtils";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const alignRightStyle = {
  justifyContent: "center",
};

function FechaFormat(props) {
  const date = props.date;
  const day =
    date.getDate().toString().length === 1
      ? "0" + date.getDate().toString()
      : date.getDate().toString();
  const monthNumber = date.getMonth() + 1;
  const month =
    monthNumber.toString().length === 1
      ? "0" + monthNumber.toString()
      : monthNumber.toString();
  const year = date.getFullYear();
  const hours =
    date.getHours().toString().length === 1
      ? "0" + date.getHours().toString()
      : date.getHours().toString();
  const minutes =
    date.getMinutes().toString().length === 1
      ? "0" + date.getMinutes().toString()
      : date.getMinutes().toString();
  const seconds =
    date.getSeconds().toString().length === 1
      ? "0" + date.getSeconds().toString()
      : date.getSeconds().toString();

  return (
    <React.Fragment>
      {day}-{month}-{year} {hours}:{minutes}:{seconds}
    </React.Fragment>
  );
}

function PistaFila({ pista }) {
  const history = useHistory();
  let estado = "";
  switch (parseInt(pista.estado, "10")) {
    case Estados.Apagado:
      estado = "Apagado";
      break;

    case Estados.Encendido:
      estado = "Forzado a encendido";
      break;

    case Estados.Funcionando:
      estado = "Operativa";
      break;
    default:
  }

  const buttonOnClick = (event) => {
    event.preventDefault();
    const next = "/pista/" + pista.id;
    history.push(next);
  };

  let button = "";
  if (isReservable(pista)) {
    button = (
      <Button variant="success" onClick={buttonOnClick}>
        Reserve ahora{" "}
      </Button>
    );
  } else {
    button = (
      <Button variant="danger" disabled>
        Pista ocupada
      </Button>
    );
  }

  const date = new Date(pista.plazoEncendido * 1000);

  return (
    <tr>
      <td>{pista.id}</td>
      <td>{pista.nombre}</td>
      <td>{estado}</td>
      <td>
        <FechaFormat date={date} />
      </td>
      <td>{button}</td>
    </tr>
  );
}

export default function TablaPistas() {
  const [pistas, setPistas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getAllPistas().then((data) => {
      setPistas(data);
    });
  }, []);

  const boxOnChange = (event) => {
    const chk = event.target.checked;
    setChecked(chk);
  };

  const filtroOnChange = (event) => {
    event.preventDefault();
    const filtr = event.target.value;
    setFiltro(filtr);
  };

  let pistasMostradas = pistas;

  if (filtro !== "") {
    pistasMostradas = pistasMostradas.filter((pista) =>
      pista.nombre.toUpperCase().includes(filtro.toUpperCase())
    );
  }

  if (checked) {
    pistasMostradas = pistasMostradas.filter((pista) => isReservable(pista));
  }

  const pistaRender = pistasMostradas.map((pista) => (
    <PistaFila key={pista.id} pista={pista} />
  ));

  return (
    <div>
      <Form inline className="my-2" style={alignRightStyle}>
        <Form.Label className="my-1 mr-2" htmlFor="filtroNombre">
          Filtro por nombre:
        </Form.Label>
        <Form.Control
          onChange={filtroOnChange}
          type="text"
          className="my-1 mr-sm-2"
          id="filtroNombre"
        />

        <Form.Label className="my-1 mr-2" htmlFor="filtroReservable">
          Filtro de reservables:
        </Form.Label>
        <Form.Control
          onChange={boxOnChange}
          type="checkbox"
          className="my-1 mr-sm-2"
          id="filtroReservable"
        />
      </Form>

      <Table bordered striped>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Ocupado hasta</th>
            <th>Reservar</th>
          </tr>
        </thead>
        <tbody>{pistaRender}</tbody>
      </Table>
    </div>
  );
}
