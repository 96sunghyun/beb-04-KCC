import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WrapperBasic from "../components/WrapperBasic";
import WrapperBody from "../components/WrapperBody";
import PostPreview from "../components/PostPreview"
import Button from "../components/Button";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Mypage() {

    const [alreadyLogged, setAlreadyLogged] = useState(true);
    const [myPosts, setMyPosts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (alreadyLogged === false) {
            console.log("🔴 Rejected from mypage due to login issue");
            navigate(`/`);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alreadyLogged])

    useEffect(() => {
        getMypage();
    }, [])

    // (로그인) GET http://localhost:4000/mypage
    axios.defaults.withCredentials = true;
    const getMypage = async () => {
        try {
            const response = await axios.get('http://localhost:4000/mypage',
                {},
                {
                    withCredentials: true
                }
            );
            console.log(response);

            if (response.status === 200) {
                setMyPosts(response.data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <WrapperBasic>
            <Navbar setAlreadyLogged={setAlreadyLogged} />

            <div className="flex flex-col items-center w-full mt-10">
                <h1 className="text-4xl font-bold">My Page</h1>
                <div className="w-1/2 flex justify-center mt-5 -mb-24 space-x-2">
                    <Button name="Web3 Account" alert={true} alertMsg="Account address goes here!" />
                    <Button name="My Tokens" alert={true} alertMsg="You have # tokens!" />
                </div>
            </div>

            <WrapperBody>
                <div className="flex flex-col gap-3 py-6 px-4 w-3/4">
                    {
                        myPosts.map(m =>
                            <PostPreview
                                title={m.title}
                                creator={m.user.nickName}
                                postId={m._id}
                                body={m.body}
                                key={[m.title, m.user, m._id].join("|")}
                            />)
                    }
                </div>

                <div className="flex flex-col items-end w-full">
                    <div className="w-1/2 flex justify-center mt-6 -mb-24 space-x-2">
                        <Button name="Back to list" urlPath="" />
                        <Button name="New Post" urlPath="write" />
                    </div>
                </div>
            </WrapperBody>

            <Footer />
        </WrapperBasic>
    )
}