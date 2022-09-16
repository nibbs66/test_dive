import React from 'react';
import Admin from "../../components/layout/Admin";
import ActivateSuccess from "../../components/credentials/ActivateSuccess";
import Client from "../../components/layout/Client";

const Activate = () => {
    return (
        <div>
            <ActivateSuccess/>
        </div>
    );
};

    export default Activate;
    Activate.getLayout = function getLayout(page){
        return(
            <Client>
                {page}
            </Client>
        )
    }
