import {useState, useEffect} from 'react';
import Admin from "../../../components/layout/Admin";
import axios from "axios";
import {ProductsColumns} from "../../../tableData";
import TableActions from "../../../components/Table/TableActions";
import TableDisplay from "../../../components/Table/TableDisplay";

const Index = ({products, categories}) => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        setData([])

        products.map((product, idx)=>{
            let stock;
            let isNew;
            let stockText;
            let newText;
            if(product.new){
                isNew = 'Ja'
                newText = 'text-blue-700'
            }
            if(!product.new){
                isNew = 'Nee'
                newText = 'text-red-700'
            }
            if(product.inStock){
                stock = 'Ja'
                stockText = 'text-blue-700'
            }
            if(!product.inStock){
                stock = 'Nee'
                stockText = 'text-red-700'
            }


            setData( (prev)=>[...prev, {
                id: product._id,
                items: [
                    product.manufacturer,
                    <span key={idx}>{product.name.slice(0, 10)}...</span>,
                    product.categories[0],
                    product.cost,
                    product.price.toFixed(2),
                    <span  key={idx} className={`${stockText} uppercase font-bold`}>{stock}</span>,
                    <span  key={idx} className={`${newText} uppercase font-bold`}>{isNew}</span>,
                    <TableActions key={idx} link={`/admin/products/product/`} editLink={`/admin/products/edit/`}  id={product._id}/>
                ]
            }])

        })


    },[products])


    return (
        <div className={`p-10`}>
            <TableDisplay   columns={ProductsColumns} tableTitle={true} font={'text-slate-800'} textSize={'text-3xl'}
                            rows={data} setRows={setData}  title={'Product'}  PageSize={10}
            />

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
    const res = await axios.get(`https://`+host+`/api/products`);
    const cat = await axios.get(`https://`+host+`/api/catMenu`);

    return{
        props: {
            products: res.data,
            categories: cat.data
        }
    }


};
