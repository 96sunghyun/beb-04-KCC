const Express = require("express");
const register = require("./register");
const mypage = require("./mypage");
const login = require("./login");
const content = require("./content");
const app = new Express();

// 메인페이지
app.route("/").get((req, res) => {
  // db에 있는 모든 content 불러오는 함수
});

// 회원가입 페이지
app.use("/register", register);

// 마이페이지
app.use("/mypage", mypage);

// 로그인
app.use("/login", login);

// 컨텐츠 CRUD routing
app.use("/content", content);

app.listen(4000, () => {
  console.log(`port 4000 opened...`);
});

// 쿼리문 예시
// app.route(`/posts`).get((req, res) => {
//   const { id } = req.query;
//   res.send(id ? `포스트 #${id}` : "포스트 아이디가 없습니다.");
// });
