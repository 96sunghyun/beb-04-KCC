import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WrapperBasic from "../components/WrapperBasic";
import WrapperBody from "../components/WrapperBody";
import Input from "../components/Input";
import Button from "../components/Button";
import Message from "../components/Message";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_actions";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      email: Email,
      password: Password,
      userName: Name,
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    });
  };

  return (
    <WrapperBasic>
      <Navbar backButton={true} />
      <WrapperBody>
        <div className="flex flex-col items-center space-y-6 w-full my-4">
          <div className="flex flex-col space-y-2 w-1/2 m-auto justify-center items-end">
            <Input inputName="Name" value={Name} onChange={onNameHandler} />
            <Input inputName="ID" value={Email} onChange={onEmailHandler} />
            <Input
              inputName="PW"
              value={Password}
              onChange={onPasswordHandler}
            />
            <Input
              inputName="ConfirmPW"
              value={ConfirmPassword}
              onChange={onConfirmPasswordHandler}
            />
          </div>
          <Button
            name={buttonText}
            isSubmit={true}
            onSubmit={onSubmitHandler}
            disabled={disabled}
          />
          {fail ? <Message /> : null}
        </div>
      </WrapperBody>
      <Footer />
    </WrapperBasic>
  );
}
export default Signup;
