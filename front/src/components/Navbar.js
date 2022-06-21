import { useState } from 'react';
import Button from './Button';

export default function Navbar() {

    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div className="flex justify-end items-center px-12 py-6 gap-6">
            {
                loggedIn ?
                    <>
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
    )
}