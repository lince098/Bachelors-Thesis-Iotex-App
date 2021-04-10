import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useStore } from "./store/store";
import MyNavbar from "./components/Navbar";
import VistaPistas from "./components/VistaPistas";
import { hooks } from "./utils/hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Reserva from "./components/Reserva";
import VistaAdmin from "./components/VistaAdmin";
import PaginaPrincipal from "./components/PaginaPrincipal";
import Tutorial from "./components/Tutorial"

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
  });

  return (
    <Router>
      <div className="App" style={{position: "relative"}}>
        <MyNavbar />
        <Switch>
          <Route exact path="/">
            <PaginaPrincipal />
          </Route>
          <Route path="/tutorial"><Tutorial></Tutorial></Route>
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

export default App;
