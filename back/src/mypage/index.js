const Express = require("express");
const mypage = Express.Router();

// db에서 id owner가 쓴 모든 글을 return해줌
mypage.route("/:userId").get((req, res) => {
  const { userId } = req.params;
  res.send(`id : #${userId}`);
});

module.exports = mypage;
