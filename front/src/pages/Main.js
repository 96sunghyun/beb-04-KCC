import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WrapperBasic from "../components/WrapperBasic";
import WrapperBody from "../components/WrapperBody";

export default function Main() {
    return (
        <WrapperBasic>
            <Navbar />
            <WrapperBody>
                "This is main"
            </WrapperBody>
            <Footer />
        </WrapperBasic>
    )
}