import { publicConfig } from "../configs/public";
import { AntennaUtils } from "./antanna";
const BN = require("bn.js");

export const Estados = {
  Apagado: 0,
  Funcionando: 1,
  Encendido: 2,
};

export async function getAll() {
  const numPist = await numeroPistas();
  let array = [];
  for (let index = 0; index < numPist; index++) {
    let response = await getPista(index);
    let pista = {
      id: index,
      nombre: response[0],
      plazoEncendido: response[1],
      estado: response[2],
    };
    array.push(pista);
  }
  return array;
}

export async function numeroPistas() {
  const antenna = AntennaUtils.getAntenna();
  const numPist = await antenna.iotx.readContractByMethod({
    from: await AntennaUtils.getIoPayAddress(),
    contractAddress: publicConfig.CONTRATO_DIRECCION,
    abi: publicConfig.CONTRATO_ABI,
    method: "numeroPistas",
  });
  return numPist;
}

export const getPistaObject = async (idPista) => {
  const pista = await getPista(idPista);

  return {
    id: idPista,
    nombre: pista[0],
    plazoEncendido: pista[1],
    estado: pista[2],
  };
};

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

export const isReservable = (pista) => {
  let reservable = false;
  const now = new Date();
  if (parseInt(pista.estado, "10") === Estados.Funcionando) {
    const timestamp = Math.trunc(now.getTime() / 1000);
    reservable = timestamp > parseInt(pista.plazoEncendido, "10");
  }
  return reservable;
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
      console.log("Momento plazo:" + pistaArray[1]);
      console.log("Momento Actual Truncado:\n" + timestamp);
      console.log("Momento Actual :\n" + now.getTime());

      return timestamp >= pistaArray[1];
  }
};
