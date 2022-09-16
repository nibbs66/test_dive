import React from 'react';
import Admin from "../../../components/layout/Admin";
import Calendar from "../../../components/Calendar/Calendar";


const Index = () => {
    return (
        <div>

            <Calendar/>
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
