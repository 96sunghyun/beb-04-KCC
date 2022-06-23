// require = require("esm")(module);
// module.exports = require("./main");

const express = require("express"); //express 모듈을 가져온다
const app = express(); //새로운 express app을 만들고
const port = 4000; //4천번 포트를 백서버로 두고
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");

const lightwallet = require("eth-lightwallet");
const fs = require("fs");

const config = require("./config/key");

//application/x-www-form-urlencoded 타입으로 분석된 것을 가져올 수 있도록
app.use(bodyParser.urlencoded({ extended: true }));
//application/json 타입으로 분석된 것을 가져올 수 있도록
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  //요청한 이메일이 db에 있는지 찾음
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.status(409).send("해당 이메일은 이미 존재합니다.");
    }
    //db에 없으면 니모닉코드 생성
    let mnemonic;
    mnemonic = lightwallet.keystore.generateRandomSeed();
    // 생성된 니모닉코드와 password로 keyStore, address 생성
    lightwallet.keystore.createVault(
      {
        password: req.body.password,
        seedPhrase: mnemonic,
        hdPathString: "m/0'/0'/0'",
      },
      function (err, ks) {
        ks.keyFromPassword(password, function (err, pwDerivedKey) {
          ks.generateNewAddress(pwDerivedKey, 1);

          let address = ks.getAddresses().toString();
          let keystore = ks.serialize();

          res.json({ keystore: keystore, address: address });
        });
      }
    );
  }).catch((exception) => console.log("NewWallet ==>>>> " + exception));

  //save()는 몽고디비에 있는 메서드
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/api/users/login", (req, res) => {
  //요청된 이메일을 데이터베이스에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀립니다.",
        });
      }
      //비밀번호까지 맞다면 유저를 위한 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지, 세션 등
        //여기서는 쿠키에 저장함 -> npm install cookie-parser --save
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  //여기까지 미들웨어를 통과해왔다는 얘기는 authentication이 true라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
