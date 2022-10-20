import {useState, useEffect} from 'react';
import Admin from "../../../components/layout/Admin";
import axios from "axios";
import {ProductsColumns} from "../../../tableData";
import TableActions from "../../../components/Table/TableActions";
import TableDisplay from "../../../components/Table/TableDisplay";

const Index = ({products, categories}) => {
    const [rows, setRows] = useState([]);

    useEffect(()=>{
        setRows([])

        products.map((product, idx)=>{

            let isNew;
            let stockText;
            let newText;
            let prodName;
            let newStock;
            if(product.new){
                isNew = 'Ja'
                newText = 'text-blue-700'
            }
            if(!product.new){
                isNew = 'Nee'
                newText = 'text-red-700'
            }
            if(product.stock > 5){

                stockText = 'text-green-700'
                newStock = <span  key={idx} className={`text-green-700 uppercase font-bold`}>{product.stock}</span>
            }
            if(product.stock < 5){
                newStock = <span  key={idx} className={`text-red-700 uppercase font-bold`}>{product.stock}</span>
                stockText = 'text-red-700'
            }
            if(product.name){
                prodName = product.name.slice(0, 10)+'...'
            }


            setRows( (prev)=>[...prev, {
                id: product._id,
                manufacturer: product.manufacturer,
                name: product.name.slice(0, 10)+'...',
                category: product.categories[0],
                cost: product.cost,
                price: product.price.toFixed(2),
                stock: product.stock,
                isNew: isNew,
                action: <TableActions key={idx} link={`/admin/products/product/`} editLink={`/admin/products/edit/`} handleDelete={handleDelete}  id={product._id}/>

            }])

        })


    },[products])
    const handleDelete = async(id) => {
        try{
            const res = await axios.delete(`/api/products/${id}`)
            console.log(res.data)
        }catch(err){
            console.log(err)
        }
        console.log(id)
    }

    return (
        <div className={`p-10`}>
            <TableDisplay   columns={ProductsColumns} tableTitle={true} font={'text-slate-800'} textSize={'text-3xl'}
                            rows={rows} setRows={setRows}  title={'Product'}  PageSize={10}
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
