# Todo list for ethereum blockchain

This is my first Solidity and dApp learning project.

## Features

- create a new todo by depositing any amount of ETH
- read only todo items created by you
- mark todo item as done and receive your deposit back

## Todo

- test if two different accounts don't see each others tasks, also on updates
- react to network changes, test with different networks
- deploy contract to test network and publish frontend to netlify

## How to run localy

1. Install dependencies

   `yarn`

2. Start local Ganache, make sure the configuration in `truffle-config.js` is correct

3. Migrate contracts

   `yarn truffle:migrate`

4. Start the frontend

   `yarn start`

5. Connect with MetaMask using one of the test accounts provided by Ganache

## License

Built by Kris Urbas ([@krzysu](https://twitter.com/krzysu)).
Code in this repo is available under MIT License.
