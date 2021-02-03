import react from "react";
import { Navbar, Nav } from "react-bootstrap";
import IconoPadel from "../assets/IconoPadel.png";
export default function MyNavbar() {
  return (
    <Navbar bg="success" variant="dark" expand="lg">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={IconoPadel}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        Nombre de la web
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Tutorial</Nav.Link>
          <Nav.Link href="#pricing">Pistas</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
