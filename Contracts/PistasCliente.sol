// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.7.0;
import "./PistasGestion.sol";

contract PistasCliente is PistasGestion {
    uint256 public PrecioXMinuto = 1 ether;

    uint256 public TiempoExtra = 1 minutes;

    uint256 private ganancias = 0;

    function reservar(uint256 idPista, uint256 minutos)
        public
        payable
        estadoDePistaFuncionamiento(idPista)
    {
        uint256 nuevoPlazo = now + minutos * 1 minutes + TiempoExtra;
        precondicionesReserva(idPista, msg.value, minutos, nuevoPlazo);

        pistas[idPista].plazoEncendido = nuevoPlazo;
        ganancias += msg.value;
    }

    function precondicionesReserva(
        uint256 idPista,
        uint256 value,
        uint256 minutos,
        uint256 nuevoPlazo
    ) private view {
        require(value > 0, "No se ha introducido ninguna cantidad de IOTX.");
        require(
            ganancias + value > ganancias,
            "Error de acarreo de bits: Es necesario retirar la cantidad acumulada de ganancias del contrato antes de poder continuar haciendo operaciones."
        );
        require(
            value == minutos * PrecioXMinuto,
            "No se ha enviado la cantidad de IOTX adecuada."
        );
        require(
            pistas[idPista].plazoEncendido < now,
            "La pista ya está solicitada."
        );
        require(
            nuevoPlazo > now,
            "Error de acarreo de bits, el nuevo plazo no está calculandose correctamente."
        );
    }

    function retirarGanancias() public payable onlyAdmin returns (bool) {
        if (!msg.sender.send(ganancias)) {
            return false;
        }
        ganancias = 0;
        return true;
    }

    function getGanancias() public view onlyAdmin returns (uint256) {
        return ganancias;
    }

    function setPrecioXMinuto(uint256 _precio) public onlyGestor {
        require(_precio > 0, "El precio es menor o igual a 0");
        PrecioXMinuto = _precio;
    }

    function setTiempoExtra(uint256 segundos) public onlyGestor {
        TiempoExtra = segundos;
    }
}
