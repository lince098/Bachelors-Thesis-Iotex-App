var Gpio = require("onoff").Gpio;

const GPIO_Numbers = [
  4,
  17,
  27,
  22,
  5,
  6,
  13,
  19,
  26,
  18,
  23,
  24,
  25,
  12,
  16,
  20,
  21,
];

const transformarArray = (cadenaTexto) => {
  const stringArray = String(cadenaTexto).split(",");
  const arrayNumber = [];

  stringArray.forEach((element) => {
    arrayNumber.push(parseInt(element));
  });
  return arrayNumber;
};

export const initGpio = (cadenaTexto) => {
  console.log(Gpio.accessible)
  
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
  console.log(nuevoEstado);
  led.writeSync(Number(nuevoEstado));
};
