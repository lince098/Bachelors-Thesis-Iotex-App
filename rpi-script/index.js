import { getPista, logPista, isEncendida } from "./src/PistaUtils.js";
import { initGpio, setState } from "./src/GPIO Utils.js";
require("dotenv").config();

const pistas = initGpio(process.env.PISTAS);

const tarea = () => {
  pistas.forEach((pista) => {
    getPista(pista.id).then((res) => {
      logPista(res);
      const enciende = isEncendida(res);
      setState(enciende, pista.led);
    });
  });
};

setInterval(tarea, 5000);
