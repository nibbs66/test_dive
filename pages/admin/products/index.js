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

const Index = ({products}) => {
    const [rows, setRows] = useState([]);

    const [activeFilter, setActiveFilter] = useState(false);
    const [filterData, setFilterData] = useState([])
    const [checked, setChecked] = useState('')
    const [deleteProduct, setDeleteProduct] = useState(false)

    const {

        validateProduct,
        mutateProduct
    } = useAdmin()
    const stockFilter = ['< 10', '11-20', '21-30', '31-40', '41-50', '> 50']
    const filterColumns = [
        { header: "Vendor", field: "vendor",   },
        { header: "Category", field: "category",  sortable: true},
        { header: "New", field: "isNew",   },

    ]

    useEffect(()=>{
        setRows([])
        const man = [];
        const newItem = [];
        const cat = [];
        products?.map((product, idx)=>{

            setRows( (prev)=>[...prev, {
                id: product._id,
                vendor: product.vendor,
                name: product?.name?.slice(0, 10)+'...',
                category: product?.category,
                cost: product?.cost,
                price: product?.price?.toFixed(2),
                isNew: product?.new,
                action: <TableActions key={idx} link={`/admin/products/product/`} editLink={`/admin/products/edit/`} handleDelete={handleDelete}  item={product}/>

            }])
            man.push(product.vendor)
            newItem.push(product.new)
            cat.push(product.category)

        })
        Array.from(new Set(man)).map((item)=>{
            setFilterData((prev)=>[...prev, {'vendor': item}])
        })
        Array.from(new Set(newItem)).map((item)=>{
            setFilterData((prev)=>[...prev, {'isNew': item}])
        })
        Array.from(new Set(cat)).map((item)=>{
            setFilterData((prev)=>[...prev, {'category': item}])
        })
        stockFilter.map((item)=>{
            setFilterData((prev)=>[...prev, {'stock': item}])
        })
    },[products])


    console.log(filterData)
    const handleDelete = async(product) => {

        let emptyPhotoArray=product.img.length
        await product.img.map((file, idx)=>{

            const storage = getStorage(app);
            const fileRef = ref(storage, file);
            deleteObject(fileRef).then(async() =>{
                toast.success('Image Successfully Deleted')
            }).catch((error) => {

                console.log(error)
                toast.error('Uh-oh, an error occurred!')

                // Uh-oh, an error occurred!
            });
            emptyPhotoArray = emptyPhotoArray - 1
        })

        if(emptyPhotoArray === 0){
            try{
                const res = await axios.delete(`/api/products/${product._id}`)
                res.status === 200 && toast.success('Product successfully deleted.')
                mutateProduct()
            }catch(err){
                console.log(err)
            }
        }

    }
    const handleFilter = (e, item, field) => {

        setChecked(e.target.value)
        setActiveFilter(true)
        let filteredProducts;
        if (field === 'category') {

            setRows([])
            filteredProducts =  products.filter((product)=>product.category === item)
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
                vendor: product.vendor,
                name: product.name.slice(0, 10)+'...',
                category: product.category,
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
                vendor: product.vendor,
                name: product.name.slice(0, 10)+'...',
                category: product.vendor,
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

            <TableDisplay   columns={ProductsColumns} showFilter={true} tableTitle={true} font={'text-slate-800'} textSize={'text-3xl'}
                            rows={rows} setRows={setRows}  title={'Product'}  activeFilter={activeFilter} handleReset={handleReset}
                            PageSize={10} handleFilter={handleFilter} filterColumns={filterColumns} filterData={filterData} checked={checked}
            />

        </div>
    );
};

export default Index;;
Index.getLayout = function getLayout(page){
    return(
        <Admin>
            {page}
        </Admin>
    )
}
export async function getServerSideProps(ctx){
    const host = ctx.req.headers.host;
    const res = await axios.get(`https://`+host+`/api/products`)
    return{
        props: {
            products: res.data
        }
    }

}
