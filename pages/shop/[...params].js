import {useState, useEffect, useMemo} from 'react';
import axios from "axios";
import Client from "../../components/layout/Client";
import {useRouter} from 'next/router'
import ProductPage from "../../components/Client/ProductPages/ProductPage";

import CategoryListing from "../../components/Shop/CategoryListing";
import PageSelector from "../../components/Shop/PageSelector";
const Product= ({product, category}) => {

    const router = useRouter()
    const {query} = router

    const [currentPage, setCurrentPage] = useState(1);



    const handleClick = (data) => {
        const category = query.params[1].toLowerCase()
        router.push(`/shop/${query.params[0]}/${category}/${data}`)
    }

    return (
        <>
            {query.params.length === 2 && <PageSelector cat={query.params[1]} page={query.params[0]} handleClick={handleClick} category={category} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}
            {query.params.length === 3 && <ProductPage product={product}/>}

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
    if(ctx.params.params.length <3){
        const prod = await axios.get(`https://`+host+`/api/products?${ctx.params.params[0]}=${ctx.params.params[1]}`);
        return{
            props:{
                category: prod.data,
            }
        }
    }else{
        const res = await axios.get(`https://`+host+`/api/products/${ctx.params.params[2]}`);
        return{
            props:{
                product: res.data,

            }
        }
    }


    //const img = await axios.get(`http://`+host+`/api/images`);

}
