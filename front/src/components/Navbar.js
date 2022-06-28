import { useEffect, useState } from 'react';
import Button from './Button';

import axios from "axios"

export default function Navbar({ setAlreadyLogged=()=>{}, setAddress=null }) {

    const [loggedIn, setLoggedIn] = useState(false);

    // (로그인 상태확인) GET http://localhost:4000/auth/login
    axios.defaults.withCredentials = true;
    const getLoginAuth = async () => {
        try {
            const response = await axios.get('http://localhost:4000/auth/check',
                {},
                {
                    withCredentials: true
                }
            );

            console.log(response);
            if (setAddress !== null) {
                setAddress(response.data.address);
            }
            setLoggedIn(true);

            // 상위 컴포넌트에 넘기기 (페이지 자동 이동을 위한)
            setAlreadyLogged(true);

            console.log("Auth check success:", response.data.address);
        } catch (e) {
            console.log("🔴 Auth check fail:", e);
            setAlreadyLogged(false)
        }
    }

    useEffect(() => {
        getLoginAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex justify-between items-center px-12 py-6">
            <div>
                <Button name="🏠" urlPath="" />
            </div>
            <div className="flex justify-end items center gap-6">
                {
                    loggedIn ?
                        <>
                            <Button name="Logout" urlPath="logout" />
                            <Button name="Create Post" urlPath="write" />
                            <Button name="My Page" urlPath="mypage" />
                        </>
                        :
                        <>
                            <Button name="Login" urlPath="login" />
                            <Button name="Join Us" urlPath="signup" />
                        </>
                }
            </div>
        </div>
    )
}