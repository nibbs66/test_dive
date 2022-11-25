import React from 'react';
import Client from "../../components/layout/Client";
import CookiePolicy from "../../components/Cookies/CookiePolicy";

const Index = () => {
    return (
        <>
          <CookiePolicy/>
        </>
    );
};

export default Index;
Index.getLayout = function getLayout(page){
    return(
        <Client>
            {page}
        </Client>
    )
}
