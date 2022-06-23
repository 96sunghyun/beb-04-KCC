// get userAddress => get serverAddress => send ether from serverAddress to userAddress
import Express from "express";
import Web3 from "web3";
import mongoose from "mongoose";
import User from "./models/user";
import bcrypt from "bcrypt";
const ethFaucet = Express.Router();
const web3 = new Web3("http://localhost:7545");

ethFaucet.route("/").post(async (req, res) => {
  // req.body 중 비교해야 할 요소들 구조분해할당
  const { email, password } = req.body;
  // email을 기준으로 계정 찾기
  const user = await User.find({ email });
  // user은 배열 안의 0번째 요소이기때문에 비교를 위해 밖으로 꺼내준다
  const userObj = user[0];
  // 제공받은 email이 존재하지 않는다면 에러 반환
  if (!userObj) return res.status(404).send({ error: "Invalid email" });
  const isMatch = await userObj.comparePassword(password);
  // 제공받은 password가 일치하지 않는다면 에러 반환
  if (!isMatch) return res.status(404).send({ error: "Invalid password" });
  // userAddress 저장
  const userAddress = userObj.address;

  // 데이터베이스에서 서버 계정의 pk와 address 정보를 가져와 저장
  const server = await User.find({ email: "server" });
  const serverObj = server[0];
  const serverPk = serverObj.privateKey;
  console.log(serverPk);

  // signedTransaction 객체 생성
  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: userAddress,
      gas: 2000000,
      gasPrice: await web3.eth.getGasPrice(),
      value: web3.utils.toWei("1"),
    },
    serverPk
  );

  // signedTransaction의 rawTransaction을 이용하여 transaction 실행 및 res.send로 결과 반환
  await web3.eth.sendSignedTransaction(
    signedTx.rawTransaction,
    async (error, result) => {
      if (error) return res.status(500).send({ error });
      return res.status(200).send({
        message: "Faucet Successed",
        data: {
          username: userObj.nickName,
          address: userAddress,
          balance: await web3.eth.getBalance(userAddress),
          txHash: result,
        },
      });
    }
  );
});

export default ethFaucet;
