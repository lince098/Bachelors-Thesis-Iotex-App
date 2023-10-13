# Blockchain Technology in IoT Devices

## Project Overview

This project conducts an applicability study of blockchain technology in IoT (Internet of Things) devices. The study encompasses both theoretical analysis and practical implementation to explore the potential synergy between blockchain and IoT.

The project unfolds in two main phases:

1. **Theoretical Analysis**: Theoretical groundwork is laid by delving into the core concepts of blockchain technology and analyzing solutions proposed by various organizations that explicitly emphasize IoT as their primary field of application. This phase serves to establish a solid understanding of the theoretical underpinnings.

2. **Practical Implementation (Proof of Concept)**: To validate the theoretical analysis, a practical case is developed as a proof of concept. The objective is to demonstrate how the most suitable blockchain technology, as determined in the theoretical analysis, can run an IoT application on low-cost hardware, such as a Raspberry Pi.

For more in-depth information, you can refer to the [digital library of the University of Malaga](https://riuma.uma.es/xmlui/handle/10630/23512).

## Proof of Concept Details

The proof of concept involves the creation of a system composed of three applications that collectively manage a track lighting system in a sports facility:

1. **Smart Contract**: A smart contract is deployed on the IoTeX Testnet. It forms the backbone of the system and governs the interactions between various components.

2. **Web Application**: This web application provides a user interface to interact with the status and functionalities of the smart contract.

3. **IoT Application**: This application is designed to read the status of the smart contract and, based on the contract's conditions, trigger the control of track lighting via the output pins of a Raspberry Pi.

The successful execution of this proof of concept serves as a tangible illustration of how blockchain technology can enhance the capabilities of IoT devices while utilizing cost-effective hardware.


