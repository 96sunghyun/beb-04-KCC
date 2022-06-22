import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WrapperBasic from "../components/WrapperBasic";
import WrapperBody from "../components/WrapperBody";
import Input from "../components/Input";
import Button from "../components/Button";
import Message from "../components/Message";

import { useEffect, useState } from "react";

const DEFAULT_BUTTON_TEXT = "Input ID/PW";

export default function Login() {

    // Signup POST failed?
    const [fail, setFail] = useState(false);

    const [buttonText, setButtonText] = useState(DEFAULT_BUTTON_TEXT)
    const [disabled, setDisabled] = useState(true);

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    useEffect(() => {
        if (id && pw) {
            setDisabled(false);
            setButtonText("Login!");
        } else {
            setDisabled(true);
            setButtonText(DEFAULT_BUTTON_TEXT);
        }
    }, [id, pw])

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(id, pw);
    }

    return (
        <WrapperBasic>
            <Navbar backButton={true} />
            <WrapperBody>
                <div className="flex flex-col items-center space-y-6 w-full my-4">
                    <div className="flex flex-col space-y-2 justify-center items-center">
                        <Input inputName="ID" value={id} onChange={setId} />
                        <Input inputName="PW" value={pw} onChange={setPw} />
                    </div>
                    <Button name={buttonText} isSubmit={true} onSubmit={onSubmit} disabled={disabled} />
                    { fail ? <Message m="Login failed." /> : null }
                </div>
            </WrapperBody>
            <Footer />
        </WrapperBasic>
    )
}