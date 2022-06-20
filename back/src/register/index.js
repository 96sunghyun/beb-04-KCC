const Express = require("express");
const register = Express.Router();

// 회원가입 기능 구현 및 결과값 반환

register.route("/").get((req, res) => {
  res.send("registerPage");
});

module.exports = register;
