import React from 'react';
import Admin from "../../../components/layout/Admin";
import ProductPage from "../../../components/Admin/Products/ProductPage";
import {useRouter} from "next/router";

import axios from "axios";
import EditProductPage from "../../../components/Admin/Products/EditProductPage";


const Product = ({product, orders}) => {
    const router = useRouter()
    const {query} = router



    return (
        <>
            { query.params[0] === 'product' ? <ProductPage product={product}  orders={orders}/> :
                <EditProductPage product={product}/>

            }
        </>
    );
};

export default Product;
    Product.getLayout = function getLayout(page){
        return(
            <Admin>
                {page}
            </Admin>
        )
    }
export const getServerSideProps = async (ctx) =>{
    const host = ctx.req.headers.host;
    let id= ctx.params.params[1]


    const res = await axios.get(`https://`+host+`/api/products/${id}`);
    //const order = await axios.get(`https://`+host+`/api/orders?prod=${id}`);
    const order = await axios.get(`https://`+host+`/api/orders`);

    return{
        props:{
            product: res.data,
            orders: order.data

        }
    }
}
