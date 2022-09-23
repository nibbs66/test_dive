import React from 'react';
import Admin from "../../../../components/layout/Admin";
import NewProductPage from "../../../../components/Admin/Rentals/NewProductPage";
import axios from "axios";

const Index = ({category}) => {
    return (
        <div>
            <NewProductPage category={category}/>
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
