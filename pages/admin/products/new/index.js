import React from 'react';

import NewProductPage from "../../../../components/Admin/Products/NewProductPage";
import Admin from "../../../../components/layout/Admin";
import axios from "axios";

const Index = ({category, colors, sizes}) => {

    return (
        <div>
            <NewProductPage category={category} productColors={colors} productSizes={sizes}/>
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
    const color = await axios.get(`https://`+host+`/api/color`);
    const size = await axios.get(`https://`+host+`/api/size`);


    return{
        props:{
            category: cat.data,
            colors: color.data,
            sizes: size.data,

        }
    }
}
