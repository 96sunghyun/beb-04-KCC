require("dotenv").config();
import Express from "express";
import mypage from "./mypage";
import content from "./content/index";
import auth from "./auth/index";
import mongoose from "mongoose";
import Post from "./models/post";
const app = new Express();

const { PORT, MONGO_URI } = process.env;

const port = PORT || 4000;

mongoose
  .connect(MONGO_URI)
  .then(console.log("Connected to MongoDB"))
  .catch((e) => console.error(e));

// post 메소드에서 json 형식의 body를 읽어오기위해 필요한 선언!
app.use(Express.json());
// post 메소드에서 x-www-form-urlencoded 형식의 body를 읽어오기 위해 필요한 선언!
app.use(Express.urlencoded({ extended: false }));

// 메인페이지
app.route("/").get(async (req, res) => {
  // db에 있는 모든 content 불러오는 함수
  try {
    const posts = await Post.find().exec();
    res.json(posts);
  } catch (error) {
    res.status(500).send({ error });
  }
});

// 회원가입, 로그인, 로그아웃, 로그인상태확인 기능 경로
app.use("/auth", auth);

// 마이페이지 경로
app.use("/mypage", mypage);

// 컨텐츠 CRUD 경로
app.use("/content", content);

app.listen(port, () => {
  console.log(`port 4000 opened...`);
});

// 쿼리문 예시
// app.route(`/posts`).get((req, res) => {
//   const { id } = req.query;
//   res.send(id ? `포스트 #${id}` : "포스트 아이디가 없습니다.");
// });
