import Express from "express";
import Post from "../models/post";
const mypage = Express.Router();

// db에서 id owner가 쓴 모든 글을 return해줌
mypage.route("/").get(async (req, res) => {
  const userId = req.state.id;
  const list = await Post.find({ "user.id": `${userId}` }).sort({ _id: -1 });
  res.send(list);
});

export default mypage;
