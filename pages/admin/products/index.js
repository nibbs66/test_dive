import {useState, useEffect} from 'react';
import Admin from "../../../components/layout/Admin";
import axios from "axios";
import {ProductsColumns} from "../../../tableData";
import TableActions from "../../../components/Table/TableActions";
import TableDisplay from "../../../components/Table/TableDisplay";

const Index = ({products, categories}) => {
    const [rows, setRows] = useState([]);
    const [filterManufacturer, setFilterManufacturer] = useState([])
    const [filterCategory, setFilterCategory] = useState([])
    const [filterIsNew, setFilterIsNew] = useState([])
    const [filterStock, setFilterStock] = useState([])
    const [activeFilter, setActiveFilter] = useState(false);
    const [filterData, setFilterData] = useState([])

    const [checked, setChecked] = useState('')
    const filterColumns = [
        { header: "Manufacturer", field: "manufacturer",   },
        { header: "Category", field: "category",  sortable: true},
        { header: "New", field: "isNew",   },
        { header: "Stock", field: "stock",   },
    ]

    useEffect(()=>{
        setRows([])
        setFilterManufacturer([])
        setFilterCategory([])
        setFilterIsNew([])
        setFilterStock([])

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
                isNew: product.new,
                action: <TableActions key={idx} link={`/admin/products/product/`} editLink={`/admin/products/edit/`} handleDelete={handleDelete}  id={product._id}/>

            }])
            setFilterManufacturer((prev)=>[...prev, product.manufacturer])
            setFilterCategory((prev)=>[...prev, product.categories[0]])
            setFilterIsNew((prev)=>[...prev, product.new])
            setFilterStock((prev)=>[...prev, product.stock])
        })

    },[products])
    useEffect(()=>{
        setFilterData([])
        const stockFilter = ['< 10', '11-20', '21-30', '31-40', '41-50', '> 50']
        const filterManufacturerSet = [...new Set(filterManufacturer)]
        filterManufacturerSet.map((item)=>{
            setFilterData((prev)=>[...prev, {
                'manufacturer': item
            }])
        })
        const filterCategorySet = [...new Set(filterCategory)]
        filterCategorySet.map((item)=>{
            setFilterData((prev)=>[...prev, {
                'category': item
            }])
        })
        const filterIsNewSet = [...new Set(filterIsNew)]
        filterIsNewSet.map((item)=>{
            if(item !==undefined){
                setFilterData((prev)=>[...prev, {
                    'isNew': item
                }])
            }

        })
        const stockFilterSet = [...new Set(stockFilter)]
        stockFilterSet.map((item)=>{
            setFilterData((prev)=>[...prev, {
                'stock': item
            }])
        })


    },[filterManufacturer])
    const handleDelete = async(id) => {
        try{
            const res = await axios.delete(`/api/products/${id}`)
            console.log(res.data)
        }catch(err){
            console.log(err)
        }
        console.log(id)
    }
    const handleFilter = (e, item, field) => {

        setChecked(e.target.value)
        setActiveFilter(true)
        let filteredProducts;
        if (field === 'category') {

            setRows([])
            filteredProducts =  products.filter((product)=>product.categories[0] === item)
        }else if(field === 'isNew'){
            setRows([])
            filteredProducts =  products.filter((product)=>product.new === item )
        }else if(field === 'stock'){
            setRows([])
            if(item === '< 10'){
                filteredProducts =  products.filter((product)=>product.stock <=10 || product.stock===undefined)
            }else if(item === '11-20'){

                filteredProducts =  products.filter((product)=>product.stock >10 && product.stock <=20)
            }else if(item === '21-30'){

                filteredProducts =  products.filter((product)=>product.stock >20 && product.stock <=30)
            }else if(item === '31-40'){

                filteredProducts =  products.filter((product)=>product.stock >30 && product.stock <=40)
            }else if(item === '41-50'){

                filteredProducts =  products.filter((product)=>product.stock >40 && product.stock <=50)
            }else{


                filteredProducts =  products.filter((product)=>product.stock >50)
            }


        }else {

            setRows([])
            filteredProducts =  products.filter((product)=>  product[field] === item)
        }
        filteredProducts.map((product, idx)=>{
            setRows( (prev)=>[...prev, {
                id: product._id,
                manufacturer: product.manufacturer,
                name: product.name.slice(0, 10)+'...',
                category: product.categories[0],
                cost: product.cost,
                price: product.price.toFixed(2),
                stock: product.stock,
                isNew: product.new,
                action: <TableActions key={idx} link={`/admin/products/product/`} editLink={`/admin/products/edit/`} handleDelete={handleDelete}  id={product._id}/>

            }])

        })

        /*
        else if(field === 'carrier'){

                    setRows([])
                    filteredProducts =  products.filter((product)=>product.shippingMethod.method === item)

                }
        */

    }
    const handleReset = () =>{
        setRows([])
        setChecked('')
        setActiveFilter(false)
        products?.map((product, idx)=> {
            setRows( (prev)=>[...prev, {
                id: product._id,
                manufacturer: product.manufacturer,
                name: product.name.slice(0, 10)+'...',
                category: product.categories[0],
                cost: product.cost,
                price: product.price.toFixed(2),
                stock: product.stock,
                isNew: product.new,
                action: <TableActions key={idx} link={`/admin/products/product/`} editLink={`/admin/products/edit/`} handleDelete={handleDelete}  id={product._id}/>

            }])

        })
    }

    return (
        <div className={`p-10`}>
            <TableDisplay   columns={ProductsColumns} showFilter={true} tableTitle={true} font={'text-slate-800'} textSize={'text-3xl'}
                            rows={rows} setRows={setRows}  title={'Product'}  activeFilter={activeFilter} handleReset={handleReset}
                            PageSize={10} handleFilter={handleFilter} filterColumns={filterColumns} filterData={filterData} checked={checked}
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
