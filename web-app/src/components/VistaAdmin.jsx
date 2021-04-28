import { Accordion, Card, Button } from "react-bootstrap";
import FormPrecio from "./FormsVistaAdmin/FormPrecio";
import FormTiempoExtra from "./FormsVistaAdmin/FormTiempoExtra";
import FormEstadoPista from "./FormsVistaAdmin/FormEstadoPista";
import FormDarRolGestor from "./FormsVistaAdmin/FormDarRolGestor";
import FormCrearPista from "./FormsVistaAdmin/FormCrearPista";
import FormRetirarGanancia from "./FormsVistaAdmin/FormRetirarGanancia";
import FormQuitarRolGestor from "./FormsVistaAdmin/FormQuitarRolGestor";
import { useStore } from "../store/store";
import { observer } from "mobx-react";

const VistaAdmin = () => {
  const { wallet } = useStore();
  const showAdmin = wallet.account.address !== "" && wallet.account.admin;
  const showGestor = wallet.account.address !== "" && wallet.account.gestor;

  return (
    <Accordion>
      {showGestor && (
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              Cambiar estado de una pista.
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <FormEstadoPista />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )}

      {showGestor && (
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="6">
              Crear Pista
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="6">
            <Card.Body>
              <FormCrearPista />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )}

      {showGestor && (
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Modificar precio por minuto.
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <FormPrecio />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )}

      {showGestor && (
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Modificar tiempo extra.
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <FormTiempoExtra />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )}

      {showAdmin && (
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="3">
              Retirar ganancias.
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <FormRetirarGanancia />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )}

      {showAdmin && (
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="4">
              Dar rol gestor.
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="4">
            <Card.Body>
              <FormDarRolGestor />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )}

      {showAdmin && (
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="5">
              Quitar rol gestor.
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="5">
            <Card.Body>
              <FormQuitarRolGestor />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )}
    </Accordion>
  );
};

export default observer(VistaAdmin);
