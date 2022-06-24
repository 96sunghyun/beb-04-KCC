import Web3 from "web3";
import HDWalletProvider from "../../node_modules/@truffle/hdwallet-provider/dist/index";
import abi from "../../sol/ERC-20abi";
import User from "../models/user";

const sendToken = async (userAddr) => {
  const server = await User.findOne({ email: "server" });

  const provider = new HDWalletProvider(
    server.privateKey,
    "http://localhost:7545"
  );

  const web3 = new Web3(provider);

  const myContract = new web3.eth.Contract(
    abi,
    "0x4824628771a029dbDca23714641EBa0230cb99fE"
  );
  const value = web3.utils.toWei("1");

  const result = await myContract.methods.transfer(userAddr, value).send({
    from: server.address,
    gas: 2000000,
    gasPrice: await web3.eth.getGasPrice(),
  });

  let userAmount = await myContract.methods.balanceOf(userAddr).call();
  userAmount = userAmount / value;

  //   console.log({ result, userAmount });
  return { result, userAmount };
};

export default sendToken;
