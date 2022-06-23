const Web3 = require("web3");
const web3 = new Web3("http://localhost:7545");
const abi = require("./sol/ERC-20abi");
const bin = require("./sol/ERC-20bin");
console.log({ abi, bin });

const deploy = async () => {};
