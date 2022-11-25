import {useState} from 'react';

import Footer from "../Client/Footer";
import Navbar from "../Client/Navbar";
import CookieModal from "../Modal/CookieModal";
import CookieAlert from "../Cookies/CookieAlert";


const MainLayout = ({children}) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <CookieModal open={open} setOpen={setOpen}/>
            <CookieAlert open={open} setOpen={setOpen}/>
            <Navbar />
            {children}
            <Footer/>


        </>
    );
};

export default MainLayout;
