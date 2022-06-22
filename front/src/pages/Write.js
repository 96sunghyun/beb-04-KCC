import Footer from "../components/Footer";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import WrapperBasic from "../components/WrapperBasic";
import WrapperBody from "../components/WrapperBody";
import Button from "../components/Button";

import { useState } from "react";

const DEFAULT_BUTTON_TEXT = "POST";

export default function Write() {

    const [fail, setFail] = useState(false);

    const [buttonText, setButtonText] = useState(DEFAULT_BUTTON_TEXT)
    const [disabled, setDisabled] = useState(true);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(title, body);
    }

    return (
        <WrapperBasic>
            <Navbar />
            <div className="flex flex-col items-center w-full mt-10">
                <h1 className="text-4xl font-bold">New Post</h1>
            </div>
            <WrapperBody>
                <Input width="w-full" inputName="Title" onChange={setTitle} value={title}  />
                <div className="mt-4 mb-6 w-full">
                    <Input isLarge={true} width="w-full" inputName="Body" onChange={setBody} value={body} />
                </div>
                <Button name={buttonText} isSubmit={true} onSubmit={onSubmit} disabled={disabled} />
            </WrapperBody>
            <Footer />
        </WrapperBasic>
    )
}