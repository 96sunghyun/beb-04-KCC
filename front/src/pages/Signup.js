import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WrapperBasic from "../components/WrapperBasic";
import WrapperBody from "../components/WrapperBody";
import Input from "../components/Input";
import Button from "../components/Button";
import Message from "../components/Message";

import { useEffect, useState } from "react";

const DEFAULT_BUTTON_TEXT = "Input Data First";

export default function Signup() {

    // Signup POST failed?
    const [fail, setFail] = useState(false);

    const [buttonText, setButtonText] = useState(DEFAULT_BUTTON_TEXT)
    const [disabled, setDisabled] = useState(true);

    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    useEffect(() => {
        if (name && id && pw) {
            setDisabled(false);
            setButtonText("Submit");
        } else {
            setDisabled(true);
            setButtonText(DEFAULT_BUTTON_TEXT);
        }
    }, [name, id, pw])

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(name, id, pw);
    }

    return (
        <WrapperBasic>
            <Navbar backButton={true} />
            <WrapperBody>
                <div className="flex flex-col items-center space-y-6 w-full my-4">
                    <div className="flex flex-col space-y-2 w-1/2 m-auto justify-center items-end">
                        <Input inputName="Name" value={name} onChange={setName} />
                        <Input inputName="ID" value={id} onChange={setId} />
                        <Input inputName="PW" value={pw} onChange={setPw} />
                    </div>
                    <Button name={buttonText} isSubmit={true} onSubmit={onSubmit} disabled={disabled} />
                    { fail ? <Message /> : null }
                </div>
            </WrapperBody>
            <Footer />
        </WrapperBasic>
    )
}