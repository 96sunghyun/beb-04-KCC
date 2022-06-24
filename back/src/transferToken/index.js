import Express from "express";
import transferToken from "../lib/tranferToken";
import User from "../models/user";
const crypto = Express.Router();

crypto.route("/transfer").post(async (req, res) => {
  if (!req.state) {
    return res.status(404).send("Invalid Access");
  }
  try {
    const { result, fromAmount, toAmount } = await transferToken(
      req.state.address,
      req.body.toAddr,
      req.body.value
    );
    await User.findOneAndUpdate(
      {
        address: req.state.address,
      },
      {
        $set: {
          tokenAmount: fromAmount,
        },
      }
    );
    await User.findOneAndUpdate(
      {
        address: req.body.toAddr,
      },
      {
        $set: {
          tokenAmount: toAmount,
        },
      }
    );
    const data = {
      txHash: result.transactionHash,
      userId: req.state.id,
      address: req.state.address,
      tokenBalance: fromAmount,
    };
    return res.json({ message: "Transfer Successed", data: data });
  } catch (error) {
    console.log(error);
  }
});

crypto.route("/count").get(async (req, res) => {
  const user = await User.findOne({ _id: req.state.id });
  if (!user) {
    return res.status(404).end();
  }
  try {
    return res.send({ amount: user.tokenAmount });
  } catch (error) {
    return res.send({ error });
  }
});

export default crypto;
