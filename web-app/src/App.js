import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "./components/Navbar";
import VistaPistas from "./components/VistaPistas";
import { AntennaUtils } from "./utils/antanna";
import { getAll,getPista,logPista } from "./utils/PistaUtils";

function effect() {
  const antenna = AntennaUtils.getAntenna();
  console.log(antenna);
  AntennaUtils.getIoPayAddress().then((response) => {
    console.log(response);
  });
  getAll().then((response) => {
    console.log("Log de getAll ",response);
  });
  getPista(1)
}

function App() {
  useEffect(effect, []);

  return (
    <div className="App">
      <MyNavbar />
      <VistaPistas></VistaPistas>
    </div>
  );
}

export default App;
