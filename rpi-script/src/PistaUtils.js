import Antenna from "iotex-antenna";
require("dotenv").config();
const BN = require("bn.js");

const antenna = new Antenna("http://api.testnet.iotex.one:80");
const wallet = antenna.iotx.accounts.privateKeyToAccount(process.env.PRIV_KEY);

const Estados = {
  Apagado: 0,
  Funcionando: 1,
  Encendido: 2,
};

export const getPista = async (idPista) => {
  const pista = await antenna.iotx.readContractByMethod(
    {
      from: wallet.address,
      contractAddress: process.env.CONTRATO_DIRECCION,
      abi: process.env.CONTRATO_ABI,
      method: "pistas",
    },
    idPista
  );
  return pista;
};

export const logPista = (pistaArray) => {
  console.log("Nombre: " + pistaArray[0]);
  console.log("\tPlazo:" + pistaArray[1]);
  console.log("\tEstado:" + pistaArray[2]);
};

export const isEncendida = (pistaArray) => {
  switch (pistaArray[2].toNumber()) {
    case Estados.Apagado:
      return false;

    case Estados.Encendido:
      return true;

    case Estados.Funcionando:
      const now = new Date();
      const timestamp = Math.trunc(now.getTime() / 1000);
      console.log("Momento actual:\n" + timestamp);
      console.log("Momento plazo:" + pistaArray[1]);
      console.log("actual<plazo: "+ timestamp<pistaArray)
      return timestamp < pistaArray[1];
  }
};
