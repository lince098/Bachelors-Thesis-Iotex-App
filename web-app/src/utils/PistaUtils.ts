import { publicConfig } from "../configs/public";
import { AntennaUtils } from "./antanna";
import { Contract } from "iotex-antenna/lib/contract/contract";
import { fromRau, toRau } from "iotex-antenna/lib/account/utils";

interface PistaObjeto {
  id: number;
  estado: string;
  plazoEncendido: string;
  nombre: string;
}

export const Roles = {
  ADMIN_ROLE: "0x0",
  GESTOR_ROLE:
    "0x687797022fb88d524c9d386b0ec1c01a0799fff1f1f8403113dffa17f4bf6ab2",
};

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
    // @ts-ignore
    { provider: antenna.iotx, signer: antenna.iotx.signer }
  );
}

export async function reservar(pistaObj: PistaObjeto, minutos: number) {
  const antenna = AntennaUtils.getAntenna();
  const contrato = getContrato();
  const cuenta = await AntennaUtils.getIoPayAddress();
  const precio = Number(await getPrecio());

  const ammount = String(minutos * precio);

  const hash = await contrato.methods.reservar(pistaObj.id, minutos, {
    account: cuenta,
    amount: ammount,
    ...AntennaUtils.defaultContractOptions,
  });

  return hash;
}

export async function setTiempoExtra(segundos: number) {
  const antenna = AntennaUtils.getAntenna();
  const contrato = getContrato();
  const cuenta = await AntennaUtils.getIoPayAddress();

  const hash = await contrato.methods.setTiempoExtra(segundos, {
    account: cuenta,
    amount: 0,
    ...AntennaUtils.defaultContractOptions,
  });

  return hash;
}
//TODO
export async function crearPista(segundos: number) {
  const antenna = AntennaUtils.getAntenna();
  const contrato = getContrato();
  const cuenta = await AntennaUtils.getIoPayAddress();
  const hash = await contrato.methods.setTiempoExtra(segundos, {
    account: cuenta,
    amount: 0,
    ...AntennaUtils.defaultContractOptions,
  });

  return hash;
}

export async function darRolGestor(cuentaNueva: string) {
  const antenna = AntennaUtils.getAntenna();
  const contrato = getContrato();
  const cuenta = await AntennaUtils.getIoPayAddress();

  const hash = await contrato.methods.grantRole(
    Roles.GESTOR_ROLE,
    cuentaNueva,
    {
      account: cuenta,
      amount: 0,
      ...AntennaUtils.defaultContractOptions,
    }
  );
  return hash;
}

export async function setPrecioXMinutos(cantidad: string, unidad: string) {
  const antenna = AntennaUtils.getAntenna();
  const contrato = getContrato();
  const cuenta = await AntennaUtils.getIoPayAddress();

  const precioFinal = toRau(cantidad, unidad);

  const hash = await contrato.methods.setPrecioXMinuto(precioFinal, {
    account: cuenta,
    amount: 0,
    ...AntennaUtils.defaultContractOptions,
  });

  return hash;
}

export async function setPistaEstado(pistaid: number, estado: number) {
  const antenna = AntennaUtils.getAntenna();
  const contrato = getContrato();
  const cuenta = await AntennaUtils.getIoPayAddress();
  const pista = await getPistaObject(pistaid);
  let hash;
  console.log(console.log(pista));
  console.log(estado);

  switch (estado) {
    case Estados.Apagado:
      hash = await contrato.methods.setPistaApagado(pista.id, {
        account: cuenta,
        amount: 0,
        ...AntennaUtils.defaultContractOptions,
      });
      break;
    case Estados.Encendido:
      hash = await contrato.methods.setPistaEncendido(pista.id, {
        account: cuenta,
        amount: 0,
        ...AntennaUtils.defaultContractOptions,
      });
      break;
    case Estados.Funcionando:
      hash = await contrato.methods.setPistaFuncionamiento(pista.id, {
        account: cuenta,
        amount: 0,
        ...AntennaUtils.defaultContractOptions,
      });
      break;
    default:
      console.log("Caso default ha habido un error con los estados.");
      break;
  }

  return hash;
}

export async function logTransaction(hash: string) {
  const antenna = AntennaUtils.getAntenna();
  // @ts-ignore
  const transaction = await antenna.iotx.getActions({
    byHash: { actionHash: hash, checkingPending: true },
  });
  console.log("Transaction: ", transaction);
}

export async function hasRol(rol: string, cuenta: string) {
  const contrato = getContrato();

  const response = await contrato.methods.hasRole(rol, cuenta, {
    account: cuenta,
  });

  return response;
}

export async function getRoleGestor() {
  const contrato = getContrato();

  const cuenta = await AntennaUtils.getIoPayAddress();
  const response = await contrato.methods.GESTOR_PISTAS_ROLE({
    account: cuenta,
  });

  console.log(response, typeof response);
}

export async function isLoggedAccountGestor() {
  const cuenta = await AntennaUtils.getIoPayAddress();
  const response = await hasRol(Roles.GESTOR_ROLE, cuenta);

  return response;
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
  // @ts-ignore
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
  // @ts-ignore
  const numPist = await antenna.iotx.readContractByMethod({
    from: await AntennaUtils.getIoPayAddress(),
    contractAddress: publicConfig.CONTRATO_DIRECCION,
    abi: publicConfig.CONTRATO_ABI,
    method: "numeroPistas",
  });
  return numPist;
}

export async function getPistaObject(idPista: number): Promise<PistaObjeto> {
  const pista = await getPista(idPista);
  return {
    id: idPista,
    nombre: pista[0],
    plazoEncendido: pista[1],
    estado: pista[2],
  };
}

export const getPista = async (idPista: number) => {
  const antenna = AntennaUtils.getAntenna();
  // @ts-ignore
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

export const logPista = (pistaArray: Array<any>) => {
  console.log("Nombre: " + pistaArray[0]);
  console.log("\tPlazo:" + pistaArray[1]);
  console.log("\tEstado:" + pistaArray[2]);
};

export const isReservable = (pista: PistaObjeto) => {
  let reservable = false;
  const now = new Date();
  if (parseInt(pista.estado, 10) === Estados.Funcionando) {
    const timestamp = Math.trunc(now.getTime() / 1000);
    reservable = timestamp > parseInt(pista.plazoEncendido, 10);
  }
  return reservable;
};

export const isEncendida = (pistaArray: Array<any>) => {
  switch (pistaArray[2].toNumber()) {
    case Estados.Apagado:
      return false;

    case Estados.Encendido:
      return true;

    case Estados.Funcionando:
      const now = new Date();
      const timestamp = Math.trunc(now.getTime() / 1000);

      return timestamp >= pistaArray[1];
  }
};
