import React from 'react';
import Pos from "../../../components/Pos/Pos";
import axios from "axios";

import Admin from "../../../components/layout/Admin";

const Index = ({categories, products}) => {
    return (
        <div className=' flex h-screen w-full  pt-5'>
            <Pos categories={categories} products={products}/>
        </div>
    );
};

export default Index;
export async function getServerSideProps() {

    const res = await axios.get(process.env.PUBLIC_URL + `/api/catMenu`);
    const prod = await axios.get(process.env.PUBLIC_URL + `/api/products`);
    return {
        props: {
            categories: res.data,
            products: prod.data


        },
    }
}
Index.getLayout = function getLayout(page){
    return(
        <Admin>
            {page}
        </Admin>
    )
}
