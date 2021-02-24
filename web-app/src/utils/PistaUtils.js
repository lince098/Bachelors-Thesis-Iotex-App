import { publicConfig } from "../configs/public";
import { AntennaUtils } from "./antanna";
import { Contract } from "iotex-antenna/lib/contract/contract";
import { fromRau, toRau } from "iotex-antenna/lib/account/utils";
import { wait } from "@testing-library/react";
import sleep from "sleep-promise";

export const Estados = {
  Apagado: 0,
  Funcionando: 1,
  Encendido: 2,
};

function getContrato() {
  const antenna = AntennaUtils.getAntenna();
  return new Contract(
    publicConfig.CONTRATO_ABI_NO_STRING,
    publicConfig.CONTRATO_DIRECCION,
    { provider: antenna.iotx, signer: antenna.iotx.signer }
  );
}

export async function reservar(pistaObj, minutos) {
  const antenna = AntennaUtils.getAntenna();
  const contrato = getContrato();
  const cuenta = await AntennaUtils.getIoPayAddress();
  const precio = Number(await getPrecio());

  console.log("minutos: ", typeof minutos, minutos);
  console.log("precio: ", typeof precio, precio);

  const ammount = String(minutos * precio);

  console.log("Amount contract: ", ammount, typeof ammount);

  const hash = await contrato.methods.reservar(pistaObj.id, minutos, {
    account: cuenta,
    amount: ammount,
    ...AntennaUtils.defaultContractOptions,
  });

  console.log("Funcion reserva response hash: ", hash);

  /*
  await sleep(15000)
  const transaction = await antenna.iotx.getActions({
    byHash: { actionHash: hash, checkingPending: true },
  });
  console.log("Transaction: ", transaction);
  return transaction;
  */
  return hash;
}

export async function getAll() {
  const numPist = await numeroPistas();
  let array = [];
  for (let index = 0; index < numPist; index++) {
    let pista = await getPistaObject(index);
    array.push(pista);
  }
  return array;
}

export async function getPrecio() {
  const antenna = AntennaUtils.getAntenna();
  const precio = await antenna.iotx.readContractByMethod({
    from: await AntennaUtils.getIoPayAddress(),
    contractAddress: publicConfig.CONTRATO_DIRECCION,
    abi: publicConfig.CONTRATO_ABI,
    method: "PrecioXMinuto",
  });
  return precio;
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
