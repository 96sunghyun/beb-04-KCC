import mongoose from "mongoose";

import Web3 from "../node_modules/web3/types/index";
const web3 = new Web3("http://localhost:7545");

mongoose
  .connect(MONGO_URI)
  .then(console.log("Connected to MongoDB"))
  .catch((e) => console.error(e));

const account = web3.eth.accounts.create();

console.log(account);
