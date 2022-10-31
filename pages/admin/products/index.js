import {useState, useEffect} from 'react';
import Admin from "../../../components/layout/Admin";
import axios from "axios";
import {ProductsColumns} from "../../../tableData";
import TableActions from "../../../components/Table/TableActions";
import TableDisplay from "../../../components/Table/TableDisplay";
import useAdmin from '../../api/hooks/useAdmin'
import Loader from "../../../components/icons/Loader";
import toast, {Toaster} from 'react-hot-toast'
import app from "../../../lib/firebase";
import {getDownloadURL, getStorage, ref, uploadBytesResumable, deleteObject} from "firebase/storage";

const Index = () => {
    const [rows, setRows] = useState([]);
    const [filterManufacturer, setFilterManufacturer] = useState([])
    const [filterCategory, setFilterCategory] = useState([])
    const [filterIsNew, setFilterIsNew] = useState([])
    const [filterStock, setFilterStock] = useState([])
    const [activeFilter, setActiveFilter] = useState(false);
    const [filterData, setFilterData] = useState([])
    const [checked, setChecked] = useState('')
    const {
        products,
        validateProduct,
        mutateProduct
    } = useAdmin()
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

        products?.map((product, idx)=>{

            setRows( (prev)=>[...prev, {
                id: product._id,
                manufacturer: product.manufacturer,
                name: product?.name?.slice(0, 10)+'...',
                category: product?.categories[0],
                cost: product?.cost,
                price: product?.price?.toFixed(2),
                stock: product?.stock,
                isNew: product?.new,
                action: <TableActions key={idx} link={`/admin/products/product/`} editLink={`/admin/products/edit/`} handleDelete={handleDelete}  item={product}/>

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

    const handleDelete = async(product) => {
        let success;
        await product.img.map((file)=>{
            const storage = getStorage(app);
            const fileRef = ref(storage, file);
            deleteObject(fileRef)
                .then(async() =>{
                    toast.success('Product Successfully Deleted')
                }).catch((error) => {
                success= 'oops'
                console.log(error)
                toast.error('Uh-oh, an error occurred!')
                // Uh-oh, an error occurred!
            });
        }).then(async()=>{
            try{
                const res = await axios.delete(`/api/products/${product._id}`)
                res.status === 200 && toast.success('Product successfully deleted.')
                mutateProduct()
            }catch(err){
                console.log(err)
            }
        })




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
                action: <TableActions key={idx} link={`/admin/products/product/`} editLink={`/admin/products/edit/`} handleDelete={handleDelete}  item={product}/>

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
                action: <TableActions key={idx} link={`/admin/products/product/`} editLink={`/admin/products/edit/`} handleDelete={handleDelete}  item={product}/>

            }])

        })
    }
    if(validateProduct){
        return  <Loader/>
    }

    return (
        <div className={`p-10`}>
            <Toaster toastOptions={{className: 'text-center', duration: 5000,}}/>
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
