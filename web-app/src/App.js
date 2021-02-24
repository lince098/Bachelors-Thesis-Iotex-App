import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useStore } from "./store/store";
import MyNavbar from "./components/Navbar";
import VistaPistas from "./components/VistaPistas";
import { observer } from "mobx-react";
import { hooks } from "./utils/hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import  Reserva from "./components/Reserva";

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
          {wallet.account.address} , {wallet.account.balance}
        </p>
        <Switch>
          <Route exact path="/"></Route>
          <Route path="/tutorial">Nueva ruta</Route>
          <Route path="/pistas">
            <VistaPistas />
          </Route>
          <Route path="/pista/:id">
            <Reserva />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default observer(App);
