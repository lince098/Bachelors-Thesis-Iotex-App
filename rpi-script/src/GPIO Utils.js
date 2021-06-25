var Gpio = require("onoff").Gpio;

const GPIO_Numbers = [
  4, 17, 27, 22, 5, 6, 13, 19, 26, 18, 23, 24, 25, 12, 16, 20, 21,
];

export const clearGpio = (arrayDePistaLed) => {
  arrayDePistaLed.forEach((pista) => {
    setState(false, pista.led);
  });
};

const transformarArray = (cadenaTexto) => {
  const stringArray = String(cadenaTexto).split(",");
  const arrayNumber = [];

  stringArray.forEach((element) => {
    arrayNumber.push(parseInt(element));
  });
  return arrayNumber;
};

export const initGpio = (cadenaTexto) => {
  const IdPistas = transformarArray(cadenaTexto);
  if (IdPistas.length > GPIO_Numbers.length) {
    throw "La cantidad de pistas superan los GPio disponibles.";
  }
  const arrayDePistaLed = [];
  for (let index = 0; index < IdPistas.length; index++) {
    const pistaLed = {
      id: IdPistas[index],
      led: new Gpio(GPIO_Numbers[index], "out"),
    };
    arrayDePistaLed.push(pistaLed);
  }

  return arrayDePistaLed;
};

export const setState = (nuevoEstado, led) => {
  led.writeSync(Number(nuevoEstado));
};
