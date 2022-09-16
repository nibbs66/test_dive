import React from 'react';
import Admin from "../../../components/layout/Admin";

const Index = () => {
    return (
        <div>
            rental
        </div>
    );
};

export default Index;
Index.getLayout = function getLayout(page){
    return(
        <Admin>
            {page}
        </Admin>
    )
}
