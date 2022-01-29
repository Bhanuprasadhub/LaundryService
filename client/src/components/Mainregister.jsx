import RegisterNew from "./RegisterNew"
import Header from './Header';
import Refferal from './Refferal';
import Footer from './Footer';
import FooterCopy from './FooterCopy';
import './Mainregister.css'
import Registerleft from "./Registerleft";
const MainRegister=()=>{
    return(<>
        <Header />
        <div className="middle-regi">
        <Registerleft />
        <RegisterNew />
        </div>

        <Refferal />
        <Footer />
        <FooterCopy />

        </>)


}


export default MainRegister