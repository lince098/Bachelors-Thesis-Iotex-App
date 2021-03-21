import { observer } from "mobx-react";
import { Accordion, Card, Button, Form, Row, Col } from "react-bootstrap";
import FormPrecio from "./FormsVistaAdmin/FormPrecio";
import FormTiempoExtra from "./FormsVistaAdmin/FormTiempoExtra";
import FormEstadoPista from "./FormsVistaAdmin/FormEstadoPista";
import FormDarRolGestor from "./FormsVistaAdmin/FormDarRolGestor";

const VistaAdmin = () => {
  return (
    <Accordion>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Modificar precio por minuto.
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <FormPrecio></FormPrecio>
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="1">
            Modificar tiempo extra.
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <FormTiempoExtra></FormTiempoExtra>
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="2">
            Cambiar estado de una pista.
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body>
            <FormEstadoPista></FormEstadoPista>
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="3">
            Retirar ganancias.
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="3">
          <Card.Body>Form retirar ganancias.</Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="4">
            Dar rol gestor.
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="4">
          <Card.Body>
            <FormDarRolGestor></FormDarRolGestor>
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="5">
            Quitar rol gestor.
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="5">
          <Card.Body>tabla de gente y botoncito con quitar rol</Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="6">
            Crear Pista
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="6">
          <Card.Body>FormCrearPista</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default VistaAdmin;
