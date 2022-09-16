import React from 'react';


import Admin from '../../../components/layout/Admin'
import axios from "axios";

const Index = ({category}) => {
    console.log(category)
    return (
        <div>
          hello
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
    const res = await axios.get(`http://`+host+`/api/products`);
    const cat = await axios.get(`http://`+host+`/api/catMenu`);

    return{
        props: {
            products: res.data,
            category: cat.data
        }
    }


};
