import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useStore } from "./store/store";
import MyNavbar from "./components/Navbar";
import VistaPistas from "./components/VistaPistas";
import { observer } from "mobx-react";
import { hooks } from "./utils/hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Reserva from "./components/Reserva";
import { isLoggedAccountGestor, getRoleGestor } from "./utils/PistaUtils";
import VistaAdmin from "./components/VistaAdmin";
import { action } from "mobx";

function App() {
  const { wallet } = useStore();

  useEffect(() => {
    wallet.init();
    hooks.waitAccount().then(() => {
      console.log("load account success", wallet.account.address);
    });
    hooks.waitIotxBalance().then(() => {
      console.log("load iotx balance success", wallet.account.balance);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <MyNavbar />
        <p>
          Parrafo para ver el estado de la cartera:
          {wallet.account.address} , {wallet.account.balance},{" "}
          {wallet.account.gestor.toString()}, {wallet.account.admin.toString()}
        </p>
        <p>___________________________</p>
        <Switch>
          <Route exact path="/"></Route>
          <Route path="/tutorial">Nueva ruta</Route>
          <Route path="/pistas">
            <VistaPistas />
          </Route>
          <Route path="/pista/:id">
            <Reserva />
          </Route>
          <Route path="/admin">
            <VistaAdmin></VistaAdmin>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default observer(App);
