import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WrapperBasic from "../components/WrapperBasic";
import WrapperBody from "../components/WrapperBody";

import { useState } from "react";

export default function Post() {

    const [title, setTitle] = useState("title");
    const [body, setBody] = useState("body is body in body");

    return (
        <WrapperBasic>
            <Navbar />
            <div className="flex flex-col items-center w-full mt-10">
                <h1 className="text-4xl font-bold">Post</h1>
            </div>
            <WrapperBody>
                <div className="text-xl font-bold mb-6">
                    {title}
                </div>
                <div>
                    {body}
                </div>
            </WrapperBody>
            <Footer />
        </WrapperBasic>
    )
}