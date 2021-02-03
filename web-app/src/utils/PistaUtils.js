import { publicConfig } from "../configs/public";
import { AntennaUtils } from "./antanna";
const BN = require("bn.js");

const Estados = {
  Apagado: 0,
  Funcionando: 1,
  Encendido: 2,
};

export async function getAll() {
  const antenna = AntennaUtils.getAntenna();
  console.log(publicConfig);
  const pistas = await antenna.iotx.readContractByMethod({
    from: await AntennaUtils.getIoPayAddress(),
    contractAddress: publicConfig.CONTRATO_DIRECCION,
    abi: publicConfig.CONTRATO_ABI,
    method: "getAllPistas",
  });
  return pistas;
}

export const getPista = async (idPista) => {
  const antenna = AntennaUtils.getAntenna();
  const pista = await antenna.iotx.readContractByMethod(
    {
      from: await AntennaUtils.getIoPayAddress(),
      contractAddress: publicConfig.CONTRATO_DIRECCION,
      abi: publicConfig.CONTRATO_ABI,
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
      console.log("Momento Actual Truncado:\n" + timestamp);
      console.log("Momento Actual :\n" + now.getTime());
      console.log("Momento plazo:" + pistaArray[1]);
      return timestamp < pistaArray[1];
  }
};
