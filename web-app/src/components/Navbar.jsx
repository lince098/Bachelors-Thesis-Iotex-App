import { Navbar, Nav } from "react-bootstrap";
import IconoPadel from "../assets/IconoPadel.png";
import { NavLink } from "react-router-dom";
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
          <Nav.Link as={NavLink} exact to="/">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} exact to="/tutorial">
            Tutorial
          </Nav.Link>
          <Nav.Link as={NavLink} exact to="/pistas">
            Pistas
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

/*
<LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/tutorial">
            <Nav.Link>Tutorial</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/pistas">
            <Nav.Link>Pistas</Nav.Link>
          </LinkContainer>


          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/tutorial">Tutorial</Nav.Link>
          <Nav.Link href="/pistas">Pistas</Nav.Link>
*/
