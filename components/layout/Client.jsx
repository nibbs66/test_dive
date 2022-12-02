import {useState} from 'react';
import Footer from "../Client/Footer";
import Navbar from "../Client/Navbar";
import CookieModal from "../Modal/CookieModal";
import CookieAlert from "../Cookies/CookieAlert";
import  {Toaster} from 'react-hot-toast'

const MainLayout = ({children}) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Toaster toastOptions={{className: 'text-center', duration: 5000}}/>
            <CookieModal open={open} setOpen={setOpen}/>
            <CookieAlert open={open} setOpen={setOpen}/>
            <Navbar />
            {children}
            <Footer/>


        </>
    );
};

export default MainLayout;
