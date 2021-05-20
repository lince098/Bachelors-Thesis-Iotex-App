// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.7.0;
import "./PistasRolAdmin.sol";

contract PistasGestion is PistasRolAdmin {
    enum Estado {Apagado, Funcionamiento, Encendido}

    /**
     * nombre: Dirección y número en el frontend.
     * plazoEncendido: Timestamp que indica cuando se debe volver a apagar la pista. Si plazoEncendido > now entonces la raspberry se encenderá.
     * estado: Hace que el dispositivo lector apague, encienda o ejerza la lógica anterior sobre las pistas que controle.
     */

    struct Pista {
        string nombre;
        uint256 plazoEncendido;
        Estado estado;
    }

    Pista[] public pistas;

    function crearPista(string memory _nombre)
        public
        onlyGestor
        returns (uint256)
    {
        Pista memory p = Pista(_nombre, 0, Estado.Funcionamiento);
        uint256 n = pistas.length;
        pistas.push(p);
        return n;
    }

    function numeroPistas() public view returns (uint256) {
        return pistas.length;
    }

    function resetearPlazos(uint256[] calldata _idReset) public onlyGestor {
        for (uint256 index = 0; index < _idReset.length; index++) {
            pistas[_idReset[index]].plazoEncendido = 0;
        }
    }

    function setPistaApagado(uint256 idPista) public onlyGestor {
        require(
            // no me hace falta que sea >= 0 ya que es tratado como un unsigned int no puede ser el indice un numero negativo
            idPista < pistas.length,
            "No existe identificador de la pista reclamada."
        );
        require(
            pistas[idPista].estado != Estado.Apagado,
            "La pista ya está apagada."
        );
        pistas[idPista].estado = Estado.Apagado;
    }

    function setPistaFuncionamiento(uint256 idPista) public onlyGestor {
        require(
            idPista < pistas.length,
            "No existe identificador de la pista reclamada."
        );
        require(
            pistas[idPista].estado != Estado.Funcionamiento,
            "La pista ya está en funcionamiento."
        );
        pistas[idPista].estado = Estado.Funcionamiento;
    }

    function setPistaEncendido(uint256 idPista) public onlyGestor {
        require(
            idPista < pistas.length,
            "No existe identificador de la pista reclamada."
        );
        require(
            pistas[idPista].estado != Estado.Encendido,
            "La pista ya está encendida."
        );
        pistas[idPista].estado = Estado.Encendido;
    }

    modifier estadoDePistaFuncionamiento(uint256 idPista) {
        require(idPista < pistas.length);
        require(
            pistas[idPista].estado == Estado.Funcionamiento,
            "La pista no se encuentra disponible para el uso al cliente en este momento."
        );
        _;
    }
}
