import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WrapperBasic from "../components/WrapperBasic";
import WrapperBody from "../components/WrapperBody";
import Details from "./Details";

export default function Main() {
    return (
        <WrapperBasic>
            <Navbar />
            <WrapperBody>
                <Details />
            </WrapperBody>
            <Footer />
        </WrapperBasic>
    )
}