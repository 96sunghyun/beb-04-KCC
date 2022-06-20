const Express = require("express");
const login = Express.Router();

login.route("/").post((req, res) => {
  const { id, password } = req.data;
  // 로그인 하는 함수 구현 (jwt 사용)
});

module.exports = login;
