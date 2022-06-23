import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WrapperBasic from "../components/WrapperBasic";
import WrapperBody from "../components/WrapperBody";
import PostPreview from "../components/PostPreview"
import Button from "../components/Button";

const dummy = [
    {
        title: "Hello new post here",
        creator: "KCC",
        postId: "1"
    },
    {
        title: "This is second post",
        creator: "KCC",
        postId: "2"
    },
    {
        title: "3rd post herehrher",
        creator: "KCC",
        postId: "3"
    }
]

export default function Mypage() {

    return (
        <WrapperBasic>
            <Navbar />

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
                        dummy.map(d =>
                            <PostPreview
                                title={d.title}
                                creator={d.creator}
                                postId={d.postId}
                                key={[d.title, d.creator, d.postId].join("|")}
                            />)
                    }
                </div>

                <div className="flex flex-col items-end w-full">
                    <div className="w-1/2 flex justify-center mt-6 -mb-24 space-x-2">
                        <Button name="Back to list" urlPath="main" />
                        <Button name="New Post" urlPath="write" />
                    </div>
                </div>
            </WrapperBody>

            <Footer />
        </WrapperBasic>
    )
}