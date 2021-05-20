import { getPista, logPista, isEncendida } from "./src/PistaUtils.js";
import { initGpio, setState, clearGpio } from "./src/GPIO Utils.js";
require("dotenv").config();

const pistas = initGpio(process.env.PISTAS);

const tarea = () => {
  console.log("***** Nueva Comprobacion *******");
  pistas.forEach((pista) => {
    getPista(pista.id).then((res) => {
      console.log("-----------------------------");
      logPista(res);
      const enciende = isEncendida(res);
      setState(enciende, pista.led);
    });
  });
};

setInterval(tarea, 5000);

process.on("exit", () => {
  clearGpio(pistas);
  process.exit();
});

process.on("SIGINT", () => {
  clearGpio(pistas);
  process.exit();
});
