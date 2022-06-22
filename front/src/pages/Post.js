import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WrapperBasic from "../components/WrapperBasic";
import WrapperBody from "../components/WrapperBody";

export default function Post() {
    return (
        <WrapperBasic>
            <Navbar />
            <div className="flex flex-col items-center w-full mt-10">
                <h1 className="text-4xl font-bold">Post</h1>
            </div>
            <WrapperBody>
            </WrapperBody>
            <Footer />
        </WrapperBasic>
    )
}