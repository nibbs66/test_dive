import React from 'react';
import Admin from "../../../../components/layout/Admin";
import NewUser from "../../../../components/User/NewUser";
import axios from "axios";
import NewVendorPage from "../../../../components/Vendors/NewVendor";

const New = () => {

    return (
        <div>
           <NewVendorPage/>

        </div>
    );
};

export default New;
New.getLayout = function getLayout(page){
    return(
        <Admin>
            {page}
        </Admin>
    )
}

