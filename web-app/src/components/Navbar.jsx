import { Navbar, Nav } from "react-bootstrap";
import IconoPadel from "../assets/IconoPadel.png";
import { NavLink } from "react-router-dom";
import { useStore } from "../store/store";
import { observer } from "mobx-react";
function MyNavbar() {
  const { wallet } = useStore();

  const showPistas = wallet.account.address !== "";
  let pistaTab = "";
  if (showPistas) {
    pistaTab = (
      <Nav.Link as={NavLink} exact to="/pistas">
        Pistas
      </Nav.Link>
    );
  }

  const showAdmin =
    wallet.account.address !== "" &&
    (wallet.account.gestor || wallet.account.admin);
  let adminTab = "";
  if (showAdmin) {
    adminTab = (
      <Nav.Link as={NavLink} exact to="/admin">
        Administrar
      </Nav.Link>
    );
  }

  return (
    <Navbar bg="success" variant="dark" expand="lg">
      <Navbar.Brand as={NavLink} exact to="/">
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
          {pistaTab}
          {adminTab}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default observer(MyNavbar);
