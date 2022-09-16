import {useState, useEffect} from 'react';
import axios from "axios";
import Client from "../../components/layout/Client";

import ProductPage from "../../components/Client/ProductPages/ProductPage";
import Incentive from "../../components/Incentive"
const Product= ({product, images}) => {
    return (
      <>
          <ProductPage product={product}/>
          <Incentive/>
      </>
    )
}
    export default Product;
    Product.getLayout = function getLayout(page){
        return(
            <Client>
                {page}
            </Client>
        )
    }
        export const getServerSideProps = async (ctx) =>{

            const host = ctx.req.headers.host;
            const res = await axios.get(`http://`+host+`/api/products/${ctx.params.params[1]}`);
            const img = await axios.get(`http://`+host+`/api/images`);
            return{
                props:{
                    product: res.data,
                    images: img.data,


                }
            }
        }
