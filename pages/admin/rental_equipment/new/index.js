import React from 'react';
import Admin from "../../../../components/layout/Admin";
import axios from "axios";
import NewRentalProduct from "../../../../components/Admin/RentalProduct/NewRentalProduct";

const Index = ({category}) => {
    return (
        <div>

            <NewRentalProduct category={category}/>
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
export const getServerSideProps = async(ctx) => {
    const host = ctx.req.headers.host;


    const cat = await axios.get(`https://`+host+`/api/catMenu`);



    return{
        props:{
            category: cat.data,


        }
    }
}
