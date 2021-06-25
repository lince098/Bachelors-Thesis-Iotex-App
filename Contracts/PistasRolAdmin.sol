// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.7.0;

import "../node_modules/openzeppelin-solidity/contracts/access/AccessControl.sol";

contract PistasRolAdmin is AccessControl {

    bytes32 public constant GESTOR_PISTAS_ROLE = keccak256("Gestor");

    modifier onlyGestor {
        require(hasRole(GESTOR_PISTAS_ROLE, msg.sender));
        _;
    }

    modifier onlyAdmin {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender));
        _;
    }

    constructor() public {
        _setupRole(DEFAULT_ADMIN_ROLE,msg.sender);
        _setupRole(GESTOR_PISTAS_ROLE,msg.sender);
    }
}