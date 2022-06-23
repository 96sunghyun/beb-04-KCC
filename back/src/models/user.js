import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import lightwallet from "eth-lightwallet";

const saltRounds = 10;

const userSchema = mongoose.Schema({
  // unique 속성을 추가하였더니 같은 값을 넣었을 때 error를 반환하면서 서버가 멈추게 된다.
  // 그러므로 static 함수를 사용하여 중복되는 값을 검사하는 것이 더 나을 것 같다.
  nickName: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //공백제거
  },
  password: {
    type: String,
    minlength: 5,
  },
  address: {
    type: String,
  },
  privateKey: {
    type: String,
  },
});

// pre 함수를 선언해주었기때문에 save()메소드가 실행되면 그 전에 pre함수가 실행되고 save된다.
userSchema.pre("save", function (next) {
  // model에 주어진 객체 그 자체가 this가 된다.
  // 그러므로 아래 user에는 req.body가 담겨있다고 볼 수 있다.
  const user = this;
  // password라는 key값의 value가 변경되었는지 확인하는 함수, 아이디 생성시에는 항상 true가 된다.(이전 값이 없기 때문에)
  if (user.isModified("password")) {
    // bcrypt 모듈로 salt값 생성
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      // 입력받은 password와 salt값을 가지고 hash값을 만든다.
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        // 위에서 생성된 hash값은 user.password로 저장된다.
        user.password = hash;
      });
    });
    next();
  } else {
    next();
  }
});

// 입력받은 비밀번호가 올바른지 검사하는 함수
userSchema.methods.comparePassword = async function (plainPassword) {
  const result = await bcrypt.compare(plainPassword, this.password);
  return result; // true / false
};

userSchema.methods.makePK = function () {
  console.log("making...");
  let user = this;
  let info = {};
  let mnemonic;

  mnemonic = lightwallet.keystore.generateRandomSeed();
  lightwallet.keystore.createVault(
    {
      password: user.password,
      seedPhrase: mnemonic,
      hdPathString: "m/0'/0'/0'",
    },
    function (err, ks) {
      user.address = "321";
      console.log(user.address);
      //여기까진 들어와짐
      ks.keyFromPassword(user.password, function (err, pwDerivedKey) {
        ks.generateNewAddress(pwDerivedKey, 1);
        let address = ks.getAddresses().toString();
        let privateKey = ks.exportPrivateKey(address, pwDerivedKey);
        privateKey;
      });
    }
  );
  // console.log(user);
};

// res.send()로 보낼 객체에서 password를 빼는 함수 생성
userSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.password;
  delete data.privateKey;
  return data;
};

// JWT 생성 함수
userSchema.methods.generateToken = function () {
  const user = this;
  //jsonwebtoken을 이용해서 token생상하기
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

userSchema.statics.findByNickName = function (nickName) {
  return this.findOne({ nickName });
};

userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

//스키마는 모델로 감싸줘야 함
const User = mongoose.model("User", userSchema); // ("모델이름", 스키마)

export default User;
