import React from 'react';

import Footer from "../Client/Footer";
import Navbar from "../Client/Navbar";


const MainLayout = ({children}) => {

    return (
        <>
            <Navbar />
            {children}
            <Footer/>


        </>
    );
};

export default MainLayout;
