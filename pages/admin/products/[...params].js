import {useState, useEffect} from 'react';
import Admin from "../../../components/layout/Admin";
import ProductPage from "../../../components/Products/ProductPage";
import {useRouter} from "next/router";
import ProductPageDisplay from "../../../components/Products/ProductPageDisplay";
import axios from "axios";
import EditProductPage from "../../../components/Products/EditProductPage";
import NewProductPage from "../../../components/Products/NewProductPage";

const Product = ({product, orders}) => {
    const router = useRouter()
    const {query} = router
    const [productSales, setProductSales] = useState([])

    useEffect(()=>{
        const salesTracking = []
        orders.map((order)=>{
            order.items.map((array)=>{
                array.productId === product._id && salesTracking.push(order)
                setProductSales(salesTracking)

            })
        })




    },[orders])

    return (
        <>
            { query.params[0] === 'product' ? <ProductPage product={product} productSales={productSales}/> :
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
